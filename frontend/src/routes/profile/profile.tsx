//profile.tsx
;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/loadingScreen";
import Header from "./header";
import VerificationSection from "./verificationSection";
import Footer from "./footer";

interface User {
  name: string;
  username: string;
  email: string;
  location: string;
  profile_pic: string;
}
export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<User | boolean>(false); //user details from backend
  const [verificationMailSent, setVerificationMailSent] =
    useState<boolean>(false);

  async function getUser() {
    setError(false);

    //get token from cookie

    const token = document.cookie
      .split(";")
      .find((row) => row.startsWith("token"))
      ?.split("=")[1];

    if (!token) {
      navigate("/login");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios(
        import.meta.env.VITE_BACKEND_LINK + "/verifyToken",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      //get signup step from response

      const responseData = await response.data;
      const step = responseData.signup_step;
      if (step === 1) {
        navigate("/signup-1");
        return;
      }
      if (step === 2) {
        navigate("/signup-2");
        return;
      }

      //if email is not verified
      setIsEmailVerified(responseData.email_verified);

      setUserDetails({
        name: responseData.name,
        username: responseData.username,
        email: responseData.email,
        location: responseData.location,
        profile_pic: responseData.profile_pic,
      });

      //send email to verify
      if (isEmailVerified) {
        return;
      }

      const emailRes = await axios(
        import.meta.env.VITE_BACKEND_LINK + "/sendEmailToVerify",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (emailRes.status !== 200) {
        setError("Something went wrong, please try again");
        return;
      }

      setVerificationMailSent(true);
    } catch (error) {
      setError("Invalid token");
      if (error instanceof axios.AxiosError && error.response) {
        if (error.response.data.message === "Unauthorized") {
          navigate("/login");
        }
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
    <div>
      <Header
        imageUrl={
          userDetails &&
          typeof userDetails === "object" &&
          "profile_pic" in userDetails
            ? userDetails.profile_pic
            : ""
        }
      />
      {verificationMailSent && <VerificationSection
      
        email={
          userDetails &&
          typeof userDetails === "object" &&
          "email" in userDetails
            ? userDetails.email
            : ""
        }
      />}
      {isLoading && <LoadingScreen />}
      {error && <p
        className="text-red-500 text-center mt-5 py-[200px]"
      >{error}</p>}

      <Footer />
    </div>
  );
}
