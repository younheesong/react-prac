import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  let navigate = useNavigate();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    let query = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(query)).then((res) => {
      if (res.payload.loginSuccess) {
        navigate("/");
      } else {
        alert("hi");
      }
    });
  };
  return (
    <div>
      LoginPage
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <button>login</button>
      </form>
    </div>
  );
}

export default LoginPage;
