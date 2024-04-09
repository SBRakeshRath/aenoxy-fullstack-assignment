import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const VerificationSection = ({ email }: { email: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Please verify your email...</h2>
      </div>
      <div className=" text-white rounded-full p-2 mr-2">
        <FontAwesomeIcon icon={faEnvelopeCircleCheck} className="h-[100px]" />
      </div>
      <div className=" rounded-lg p-6 max-w-md">
        <div className="flex flex-col items-center justify-center mb-4">
          <p className="text-gray-800 font-medium text-center">
            Please verify your email address. We've sent a confirmation email
            to:
          </p>
        </div>
        <p className="text-gray-700 text-center mb-4">{email}</p>
        <p className="text-gray-600 text-center mb-4">
          Click the confirmation link in that email to begin using Dribbble.
        </p>
        <div className="text-center">
          <p className="text-gray-600 mb-2">Didn't receive the email?</p>
          <p className="text-gray-600">
            Check your Spam folder, it may have been caught by a filter. If you
            still don't see it, you can{" "}
            <a href="#" className="text-pink-500 hover:underline">
              resend the confirmation email
            </a>
            .
          </p>
          <p className="text-gray-600 mt-4">
            <a href="#" className="text-pink-500 hover:underline">
              Wrong email address? Change it.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationSection;
