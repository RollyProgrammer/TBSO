import { useState } from "react";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up submitted:", { firstName, lastName, email, password });
    // 🔐 Hook up registration logic here
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-15">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.etsystatic.com/45397601/r/isla/1192e6/70573975/isla_500x500.70573975_sqw22kb4.jpg"
            alt="Sign Up visual"
            className="w-full h-auto shadow-md"
          />
        </div>

        {/* Signup Form Section */}
        <div className="w-full lg:w-1/2 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold mb-4 sm:mb-5">
            Sign Up
          </h1>
          <p className="text-xl mb-5 text-gray-600">Sign up with</p>

          {/* Third-party options (horizontal layout with logos) */}
          <div className="flex items-center justify-center gap-4 mb-6 text-sm sm:text-base text-gray-700 flex-wrap">
            <button className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Google
            </button>
            <button className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="h-5 w-5"
              />
              Apple
            </button>
            <button className="flex items-center gap-2 border border-gray-300 py-2 px-4 rounded hover:bg-gray-100 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="h-5 w-5"
              />
              Facebook
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-gray-500 text-sm font-medium">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Sign Up Form */}
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 mx-auto text-left"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                required
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-black text-white font-semibold px-6 py-3 hover:bg-gray-800 transition text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Create Account <ArrowForward fontSize="small" />
            </button>

            <div className="text-sm text-right text-gray-600 hover:underline mt-2">
              <Link to="/login">Already have an account? Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
