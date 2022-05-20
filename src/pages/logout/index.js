import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../redux/reducers/userReducer";
import { googleLogout } from "../../services/googleAuth";

export default function LogoutPage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      googleLogout();
      dispatch(logout());
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  return null;
}
