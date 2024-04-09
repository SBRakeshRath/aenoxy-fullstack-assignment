//signupStep1.tsx

import React, { useState } from "react";
import SmallNav from "../../components/smallNav";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import the necessary package
import zod from "zod";
import axios from "axios";
import LoadingScreen from "../../components/loadingScreen";
import { useNavigate } from "react-router-dom";

export default function SignUpStep1() {
  const navigate = useNavigate();
  const [isImageSelected, setIsImageSelected] = useState<string | boolean>(
    false
  );
  const [errorMessage, setErrorMessage] = useState<string | boolean>(false); //error message from backend
  const [loading, setLoading] = useState<string | boolean>(false); //loading state
  const formContainer = React.useRef<HTMLFormElement>(null);
  const imageContainer = React.useRef<HTMLImageElement>(null);

  function imageUpload() {
    const input = document.getElementById("avatar") as HTMLInputElement;
    input.click();
  }

  function imageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;
    if (file) {
      const reader = new FileReader();
      setIsImageSelected(true);

      reader.onload = function () {
        if (imageContainer.current) {
          imageContainer.current.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file[0]);
    }
  }

  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(false);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    //validate the data

    const schema = zod.object({
      location: zod.string().min(1, { message: "Location is required" }),
    });

    const result = schema.safeParse(data);
    if (!result.success) {
      setErrorMessage(result.error.errors[0].message);
      return;
    }

    //get token from cookie

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token"))
      ?.split("=")[1];

    if (!token) {
      navigate("/login");
      return;
    }

    //send data to backend with token in authorization header

    try {
      setLoading(true);
      const response = await axios(
        //VITE_BACKEND_LINK env variable
        import.meta.env.VITE_BACKEND_LINK + "/addProfilePicAndLocation",

        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        }
      );

      const responseData = await response.data;

      if (responseData.error) {
        setErrorMessage(responseData.error);
        return;
      }

      //redirect to next page
      navigate("/signup-2");
    } catch (error) {
      setErrorMessage("An error occured");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SmallNav />

      <form
        className="bg-white p-6 rounded-lg shadow-md max-w-[500px] m-auto mb-8 relative"
        ref={formContainer}
        onSubmit={formSubmit}
      >
        {loading && <LoadingScreen />}
        <h1 className="text-2xl font-semibold mb-4">
          Welcome! Let's create your profile
        </h1>
        <p className="text-gray-600 mb-6">
          Let others get to know you better! You can do these later
        </p>
        {
          //error message
          errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {errorMessage}
            </div>
          )
        }

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-8">Add an avatar</h2>

          <div className="flex flex-row items-center ">
            <div
              className={
                "relative overflow-hidden w-24 h-24 border-4 flex items-center justify-center rounded-full border-dashed border-gray-400 mb-2" +
                (isImageSelected ? " border-0" : "")
              }
            >
              {isImageSelected ? (
                <img
                  src="https://randomuser.me/api/portraits"
                  ref={imageContainer}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faCamera} className="text-gray-400" />
              )}
            </div>

            <div className="flex flex-col ml-5">
              <button
                type="button"
                onClick={imageUpload}
                className="  px-4 py-2 rounded-md transition-colors duration-200 border-gray-400  border mb-2 hover:bg-slate-50"
              >
                Upload
              </button>
              <input
                type="file"
                name="profilePic"
                id="avatar"
                className="hidden"
                onChange={imageChange}
              />
              <p className="text-sm text-gray-500">
                Or choose one of our defaults
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Add your location</h2>
          <input
            type="text"
            placeholder="Enter a location"
            className="w-full p-2  border-solid border-b-2 border-gray-300 rounded  "
            name="location"
          />
        </div>

        <div className="flex justify-left">
          <button
            type="submit"
            className="bg-[#ff2184] text-white p-2 rounded w-[200px] m-w-full hover:bg-[#f48a86] hover:text-white"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
