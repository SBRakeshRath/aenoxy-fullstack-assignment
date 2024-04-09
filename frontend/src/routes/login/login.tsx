//login.tsx

import axios, { AxiosError } from "axios";
import SmallNav from "../../components/smallNav";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingScreen from "../../components/loadingScreen";

export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = useState<string | boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setError(false);

    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;

    try {
      setIsLoading(true);

      //use axios
      //send email and password to backend

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_LINK + "/login",
        {
          email,
          password,
        }
      );

      if (response.status !== 200) {
        setError("Invalid email or password");
        return;
      }

      //get token from response
      const token = response.data.token;

      //store token in cookie

      // document.cookie = `token=${token}`;

      //set cookie for 15 days
      document.cookie = `token=${token}; max-age=${60 * 60 * 24 * 15}`;

      //redirect to dashboard

      navigate("/profile");
    } catch (error) {
      setError("Invalid email or password");

      if (error instanceof AxiosError && error.response) {

        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <SmallNav />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white relative p-8 rounded-lg shadow-md max-w-md w-full">
        {
          isLoading && <LoadingScreen />
        }
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {
          error && <p className="text-red-500 text-center mb-4">{error}</p>
        }
        <form onSubmit={login}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="remember"
              />
              <label htmlFor="remember" className="form-check-label inline-block text-gray-800">
                Remember me
              </label>
            </div>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-800">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
