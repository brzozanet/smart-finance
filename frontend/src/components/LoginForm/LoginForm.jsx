import { ReactComponent as GoogleIcon } from "../../assets/Google.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../redux/user/operations";

//CSS
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    star: "",
  });
  const [apiError, setApiError] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "This is a required field";
      newErrors.star = "*";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      newErrors.star = "*";
    }

    if (!formData.password) {
      newErrors.password = "This is a required field";
      newErrors.star = "*";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      newErrors.star = "*";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (apiError) {
      setApiError("");
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setApiError("");
    dispatch(login(formData))
      .unwrap()
      .catch((message) => {
        setApiError(message || "Login failed. Please try again.");
      });
  };

  const onSignup = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setApiError("");
    dispatch(register(formData))
      .unwrap()
      .then(() => {
        setApiError("Registration successful. You can now log in.");
      })
      .catch((message) => {
        setApiError(message || "Registration failed. Please try again.");
      });
  };

  return (
    <div className={css.LoginFormContainer}>
      <div className={css.LoginFormWrapper}>
        <p className={css.LoginFirstParagraph}>
          You can log in with your Google Account:
        </p>
        <div className={css.ButtonGoogle}>
          <GoogleIcon />
          Google
        </div>
        <p className={css.LoginSecondParagraph}>
          Or log in using an email and password,
          <br /> after registering:
        </p>
        <form className={css.Form}>
          <div className={css.InputContainer}>
            <label className={css.Label} required value={formData.email}>
              {errors.email && (
                <span className={css.InputValidation} style={{ margin: "0" }}>
                  {errors.star}
                </span>
              )}
              Email
            </label>
            <input
              className={css.InputField}
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
            {errors.email && (
              <span className={css.InputValidation}>{errors.email}</span>
            )}
          </div>

          <div className={css.InputContainer}>
            <label className={css.Label} required value={formData.password}>
              {errors.password && (
                <span className={css.InputValidation} style={{ margin: "0" }}>
                  {errors.star}
                </span>
              )}
              Password
            </label>

            <input
              className={css.InputField}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="your password"
            />
            {errors.password && (
              <span className={css.InputValidation}>{errors.password}</span>
            )}
          </div>

          <div className={css.GroupButton}>
            <button className={css.ButtonLogin} type="submit" onClick={onLogin}>
              Log in
            </button>
            <button
              className={css.ButtonSignup}
              type="submit"
              onClick={onSignup}
            >
              Registration
            </button>
          </div>
          {apiError && <span className={css.ApiMessage}>{apiError}</span>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
