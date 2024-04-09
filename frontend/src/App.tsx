import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./routes/signup/signUpPage";
import SignUpStep1 from "./routes/signup/signupStep1";
import SignUpStep2 from "./routes/signup/signupStep2";
import Login from "./routes/login/login";
import Profile from "./routes/profile/profile";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup-1" element={<SignUpStep1 />} />
      <Route path="/signup-2" element={<SignUpStep2 />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/" element={<Navigate to="/profile" />} />
    </Routes>
  );
}
