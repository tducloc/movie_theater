import React, { useEffect } from "react";
import Google from "../../components/Svg/Google/Google";
import "./index.scss";
import { signInWithGoogle } from "../../services/googleAuth";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";
export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleClickLoginWithGoogle = async () => {
    const result = await signInWithGoogle();
    if (!result) return;

    dispatch(
      login({
        email: result.user.email,
        uid: result.user.uid,
        displayName: result.user.displayName,
        photoUrl: result.user.photoURL,
      })
    );
    navigate(-1);
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="auth container">
      <h1>Login</h1>

      <div className="auth__input">
        <button
          className="auth__input-google-btn"
          onClick={handleClickLoginWithGoogle}
        >
          <Google />
          <span> Login with Google</span>
        </button>
      </div>
    </div>
  );
}
