import React from "react";
import LeftPageImageComponent from "../../components/leftPageImageComponent";
import zod from "zod";
import LoadingScreen from "../../components/loadingScreen";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [error, setError] = React.useState<string | boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();
  async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    //validate the data
    const schema = zod.object({
      name: zod
        .string()
        .min(3, { message: "name must be at least 3 characters" }),
      username: zod
        .string()
        .min(6, { message: "username must be at least 6 characters" }),
      email: zod.string().email({ message: "please enter a valid email" }),
      password: zod
        .string()
        .min(6, { message: "password must be at least 6 characters" }),
    });

    const result = schema.safeParse(data);
    if (!result.success) {
      setError(result.error.errors.map((err) => err.message).join(", "));
      return;
    }

    //

    try {
      setLoading(true);
      const response = await fetch(
        //VITE_BACKEND_LINK env variable
        import.meta.env.VITE_BACKEND_LINK + "/createNewUser",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (responseData.error) {
        setError(responseData.error);
        return;
      }

      //set token in cookie for 10 days

      document.cookie = `token=${responseData.token}; max-age=${
        60 * 60 * 24 * 15
      }; path=/`;

      //redirect to home page

      navigate("/signup-1");
    } catch (error) {
      setError("An error occured, please try again later");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="
    
    flex h-screen bg-gray-100 
    
    "
    >
      <LeftPageImageComponent />

      <div className="flex flex-col w-full justify-center items-center min-h-full relative ">
        {loading && <LoadingScreen />}
        <div className=" w-full overflow-auto">
          <div className="flex p-6 justify-end w-full">
            <a href="/login" className="">
              Already a member?
              <span className="text-[#ff2184] pl-1 font-bold">Login</span>
            </a>
          </div>

          <div className="w-full max-w-[450px] m-auto px-3 mb-5 ">
            <h1 className="text-3xl font-bold py-3">Signup to scribble</h1>
            {/* //add error message */}

            {error && <li className="text-red-500 pt-2">{error}</li>}

            <form onSubmit={formSubmit} className="flex flex-col  ">
              <div className="flex justify-between py-5">
                <div className="flex flex-col w-[45%] ">
                  <label htmlFor="name" className="py-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="p-2 border border-gray-300 rounded bg-[#ffe3df]"
                  />
                </div>
                <div className="flex flex-col w-[45%]">
                  <label htmlFor="username" className="py-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="p-2 border border-gray-300 rounded bg-[#ffe3df]"
                  />
                </div>
              </div>
              <div className="flex flex-col pb-5 w-full">
                <label htmlFor="email" className="py-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="p-2 border w-full border-gray-300 rounded bg-[#ffe3df]"
                />
              </div>
              <div className="flex flex-col pb-5 w-full">
                <label htmlFor="password" className="py-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-2 border w-full border-gray-300 rounded bg-[#ffe3df]"
                />
              </div>
              {/* create a check box to take concent on privacy terms */}
              <div className="flex items-center pb-5">
                <input
                  type="checkbox"
                  name="privacy"
                  id="privacy"
                  className="p-2 border w-5 h-5 cursor-pointer
                border-gray-300 rounded bg-[#ffe3df]"
                />
                <label htmlFor="privacy" className="pl-2">
                  I agree to the terms and conditions
                </label>
              </div>
              <div className="flex justify-left">
                <button
                  type="submit"
                  className="bg-[#ff2184] text-white p-2 rounded w-[50%] hover:bg-[#f48a86] hover:text-white"
                >
                  Create Account
                </button>
              </div>
            </form>
            {/* protected by recaptcha */}
            <div className="flex justify-center pt-5">
              <p>Protected by reCAPTCHA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
