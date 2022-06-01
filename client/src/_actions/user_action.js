import axios from "axios";
import { LOGIN_USER } from "./types";
export function loginUser(dataToSubmit) {
  const req = axios
    .post("http://localhost:8000/api/users/login", dataToSubmit)
    .then((res) => {
      return res.data;
    });

  return {
    type: LOGIN_USER,
    payload: req,
  };
}
