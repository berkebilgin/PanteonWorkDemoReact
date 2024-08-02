import { Route, Routes } from "react-router-dom";
import Login from "../page/authentication/Login";
import Register from "../page/authentication/Register";

function Auth() {
  return (
    <Routes>
      <Route path="*" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Auth;
