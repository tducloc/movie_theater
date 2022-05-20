import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { emailPattern, passwordPattern } from "../../config/componentVariable";
import { login } from "../../redux/reducers/userReducer";
import {
  registerWithEmailAndPassword,
  signInWithAccount,
} from "../../services/googleAuth";
import "./AuthForm.scss";
export default function AuthForm({ type }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ reValidateMode: "onSubmit" });

  const dispatch = useDispatch();
  const _handleOnChange = (e, input) => {
    register(input).onChange(e);

    if (errors[input]?.type === "required") {
      clearErrors(input);
      return;
    }

    if (!e.target.value) clearErrors(input);
  };

  const _handleSubmit = async (data) => {
    let result;
    switch (type) {
      case "signup":
        result = await registerWithEmailAndPassword(
          data.name,
          data.email,
          data.password
        );
        break;

      case "login":
        result = await signInWithAccount(data.email, data.password);
        break;
      default:
        break;
    }

    console.log(typeof result);
    if (typeof result === "string") {
      const errorMess = handleError(result);
      alert(errorMess);
      return;
    }
    dispatch(login(result));
  };

  function handleError(message) {
    let result = "";
    console.log(message.toString());
    switch (message.toString()) {
      case "auth/wrong-password":
        result = "Wrong password";
        break;

      case "auth/email-already-exists":
        result = "Email has existed";
        break;

      case "auth/user-not-found":
        result = "Email not found";
        break;

      case "auth/too-many-requests":
        result = "Your account has been disabled because of multi fail attempts";
        break;
      default:
        break;
    }
    return result;
  }

  return (
    <form className="auth__input-form" onSubmit={handleSubmit(_handleSubmit)}>
      <input
        type="text"
        id="email"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: emailPattern,
        })}
        onChange={(e) => {
          _handleOnChange(e, "email");
        }}
      />
      {errors.email?.type === "required" && (
        <span className="error">Email is required</span>
      )}
      {errors.email?.type === "pattern" && (
        <span className="error">Email format is wrong</span>
      )}
      <input
        type="password"
        id="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          pattern: passwordPattern.content,
        })}
        onChange={(e) => {
          _handleOnChange(e, "password");
        }}
      />

      {errors.password?.type === "required" && (
        <span className="error">Password is required</span>
      )}

      {errors.password?.type === "pattern" && (
        <span className="error">{passwordPattern.message}</span>
      )}

      {type === "signup" && (
        <input
          type="text"
          id="name"
          placeholder="Your name"
          {...register("name", { required: "Name is required" })}
          onChange={(e) => {
            _handleOnChange(e, "name");
          }}
        />
      )}

      {errors.name?.type === "required" && (
        <span className="error">Name is required</span>
      )}

      <button className="btn--blue" type="submit">
        {type === "signup" ? "Register" : "Login"}
      </button>
    </form>
  );
}
