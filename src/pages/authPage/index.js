import React, { useEffect,useState } from "react";
import Google from "../../components/Svg/Google/Google";
import "./index.scss";
import { signInWithGoogle } from "../../services/googleAuth";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/reducers/userReducer";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { formatPathName } from "../../lib/library";


export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const location = useLocation();
  const [authType, setAuthType] = useState("");
  useEffect(() => {
    setAuthType(formatPathName(location.pathname));
  },[location])

  const handleClickLoginWithGoogle = async () => {
    const result = await signInWithGoogle();
    if (!result || typeof result === "string") return;


    dispatch(login(result));
    navigate(-1);
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="auth container">
      <h1>{authType === "signup" ? "Sign Up" : "Login"}</h1>

      <div className="auth__input">
        <AuthForm type={authType} />

        <div className="auth__space">
          <p>Or</p>
          <div className="space"></div>
        </div>
        <button
          className="auth__input-google-btn"
          onClick={handleClickLoginWithGoogle}
        >
          <Google />
          <span> Login with Google</span>
        </button>
      </div>

      <div className="auth__others">
        {authType === "login" && (
          <span>
            <Link to="/signup">Sign Up</Link>
          </span>
        )}

        {authType === "signup" && (
          <span>
            <Link to="/login">Login</Link>
          </span>
        )}

        <span>
          <Link to="/signup">Change password</Link>
        </span>
      </div>
    </div>
  );
}
