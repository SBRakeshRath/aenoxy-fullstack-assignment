//signupStep2.tsx

import Card1 from "../../components/card1";
import clipart from "./../../assets/clipart.svg";
import SmallNav from "../../components/smallNav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

export default function SignUpStep2() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | boolean>(false);

  async function submit() {
    setIsLoading(true);
    //get the value of the selected radio button
    const selectedValue = document.querySelectorAll("input:checked");

    let value: string = "";
    selectedValue.forEach((item) => {
      const inputElement = item as HTMLInputElement;
      value = value + inputElement.name;
    });

    console.log(value);
    //get token from cookie

    const token = document.cookie
      .split(";")
      .find((row) => row.startsWith("token"))
      ?.split("=")[1];

    //send the value to the backend
    try {
      const response = await axios(
        //VITE_BACKEND_LINK env variable
        import.meta.env.VITE_BACKEND_LINK + "/addPurpose",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: JSON.stringify({ purpose: parseInt(value) }),
        }
      );

      const responseData = await response.data;
      console.log(responseData);
      if (responseData.error) {
        setError(responseData.error);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      console.log("success");
      navigate("/profile");

        // navigate("/signup-3");
    } catch (error) {
      setError("Something went wrong, please try again");

      if (error instanceof AxiosError && error.response?.data.message) {
        if (error.response.data.message === "Unauthorized") {
          navigate("/login");
        }
        setError(error.response.data.message);
      }
      setIsLoading(false);
    }
  }

  return (
    <div>
      <SmallNav />
      <div className="flex flex-col w-full max-w-[1000px] m-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          What Brings You to Dribble
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Select the option that best describes you. Don't worry, you can change
          this later.
        </p>
        {
          //error message
          error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )
        }
        <div className="flex p-4 pt-[80px] justify-center flex-wrap gap-8">
          <Card1
            tittle="I am a designer looking to share my work"
            desc="I am a designer looking to share my work"
            img={clipart}
            name="1"
          />
          <Card1
            tittle="I am looking for designers to hire"
            desc="I am looking for designers to hire"
            img={clipart}
            name="2"
          />
          <Card1
            tittle="I am a designer looking for Inspiration"
            desc="I am a designer looking for Inspiration"
            img={clipart}
            name="3"
          />
        </div>
        <div className="flex justify-center m-8">
          <button
            onClick={submit}
            className="bg-[#ff2184] text-white p-2 rounded min-w-[100px] hover:bg-[#f48a86] hover:text-white"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-b-2 border-[#fff] rounded-full animate-spin"></div>
              </div>
            ) : (
              "Finish"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
