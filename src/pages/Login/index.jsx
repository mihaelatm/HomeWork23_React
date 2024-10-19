import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, resetState } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(login({ email, password }));
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }

    return () => {
      dispatch(resetState());
    };
  }, [isSuccess, navigate, dispatch]);

  if (isLoading) return <h1>loading</h1>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {isError && <p className={styles.error_message}>{message}</p>}
      {isSuccess && <p className={styles.success_message}>Login successful</p>}
    </div>
  );
}

export default Login;
