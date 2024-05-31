import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="flex flex-col  bg-white">
      <div className="flex flex-col self-center px-5 mt-16 max-w-full w-[495px] max-md:mt-10">
        <div className="self-center text-4xl font-semibold leading-10 text-slate-900">
          ZodiacGems
        </div>
        <div className="flex flex-col mt-8 max-md:max-w-full">
          <div className="flex flex-col max-md:max-w-full">
            <div className=" justify-center text-3xl font-semibold tracking-tight leading-9 text-slate-900 max-md:max-w-full">
              Forgot your password?
            </div>
            <div className="mt-2 text-sm leading-5 text-slate-500 max-md:max-w-full">
              Enter your email address and we’ll send you a code to reset your
              password
            </div>
          </div>
          <div className="flex flex-col mt-5 max-md:max-w-full">
            <div className="flex flex-col max-md:max-w-full">
              <div className="flex flex-col whitespace-nowrap max-md:max-w-full">
                <div className="text-sm font-medium leading-5 text-slate-900 max-md:max-w-full">
                  Email
                </div>
                <div className="flex flex-col justify-center mt-1.5 text-base leading-6 text-slate-400 max-md:max-w-full">
                  <div className="flex flex-col justify-center max-md:max-w-full">
                    <input
                      type="email"
                      placeholder="Email"
                      className="text-black justify-center items-start px-3 py-2 bg-white rounded-md border border-solid border-slate-300 max-md:pr-5 max-md:max-w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center px-4 py-2 mt-4 text-sm font-medium leading-6 text-white rounded-md bg-slate-900 max-md:px-5 max-md:max-w-full">
                Reset password
              </div>
            </div>
            <Link
              to="/login"
              className="self-center mt-5 text-sm leading-5 underline text-slate-500"
            >
              Back to login page
            </Link>
          </div>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a86a699345d885d7b39629c6d34c5f78b862847a62aed687bf45d66451bfd25?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
        className="mt-28 w-full aspect-[5] max-md:mt-10 max-md:max-w-full"
      />
    </div>
  );
}

export default ForgotPassword;
