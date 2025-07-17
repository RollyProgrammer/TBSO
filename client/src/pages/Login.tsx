import { ArrowForward } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation } from "../features/account/accountApi";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [fetchUserInfo] = useLazyUserInfoQuery();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
    await fetchUserInfo();
    navigate(location.state?.from || "/");
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-15">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.etsystatic.com/45397601/r/isla/1192e6/70573975/isla_500x500.70573975_sqw22kb4.jpg"
            alt="Login visual"
            className="w-full h-auto shadow-md"
          />
        </div>

        {/* Login Text + Form */}
        <div className="w-full lg:w-1/2 text-start">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold mb-4 sm:mb-5">
            Log in
          </h1>

          <p className="mb-4 text-sm sm:text-base text-gray-700">
            Welcome to our online store! We are dedicated to providing you with
            the best shopping experience.
          </p>
          <p className="mb-4 text-sm sm:text-base text-gray-700">
            Our team is passionate about curating a wide range of products that
            cater to your needs and preferences.
          </p>
          <p className="mb-10 text-sm sm:text-base text-gray-700">
            Thank you for choosing us, and we look forward to serving you!
          </p>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mx-auto text-left"
          >
            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register("email", { required: "Email is required" })}
                className={`w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black text-sm sm:text-base
                    ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-black"
                    }`}
              />
              {errors.email && typeof errors.email.message === "string" && (
                <p className="text-sm text-red-500 leading-none">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className={`w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black text-sm sm:text-base
                  ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-black"
                  }`}
              />
              {errors.password &&
                typeof errors.password.message === "string" && (
                  <p className="text-sm text-red-500 leading-none">
                    {errors.password.message}
                  </p>
                )}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="bg-black text-white font-semibold px-6 py-3 hover:bg-gray-800 transition text-sm sm:text-base flex items-center justify-between gap-2"
            >
              Log In <ArrowForward fontSize="small" />
            </button>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <a href="#" className="underline transition-colors duration-200">
                Forgot your password?
              </a>
              <div className="flex items-center space-x-1">
                <p>Already have an account?</p>
                <Link
                  to="/signup"
                  className="underline hover:text-gray-800 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
