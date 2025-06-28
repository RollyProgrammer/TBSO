import { useState } from "react";
import { ArrowForward } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { email, password });
    // 🔐 Implement auth logic here
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-15">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src="https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/464563976_8671049262964365_7696643051574271148_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeEy2LCy2vTyo-qPLUQ01yPG6X3WtDedWVXpfda0N51ZVY-wiRDFMr21HOhjRjmjUBrLZpZI_eHUvaQIG9hkRden&_nc_ohc=wdCLOIBhd68Q7kNvwGzGXh3&_nc_oc=AdnzNycPhknXqeyivsGUIyaQ14CpPh2YMYXJEoLc2ZplTAODveCJl5Cp2631uC6SkF4&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=SqKQ8DGqro7OPG_-5CDNrQ&oh=00_AfOmC1-xnIwCwd6gUdVFxWLbUFCsGMwk53yogx7M2lkxHw&oe=685EC4F5"
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
            onSubmit={onSubmit}
            className="flex flex-col gap-4 mx-auto text-left"
          >
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
            />

            <button
              type="submit"
              className="bg-black text-white font-semibold px-6 py-3 hover:bg-gray-800 transition text-sm sm:text-base flex items-center justify-between gap-2"
            >
              Log In <ArrowForward fontSize="small" />
            </button>

             <div className="text-sm text-right text-gray-600 hover:underline">
              <a href="#">Forgot your password?</a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
