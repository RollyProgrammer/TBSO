const Footer = () => {
  const year = new Date().getFullYear();

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <div className="mx-50 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
          <div>
            {/* <img src={assets.logo} className='mb-5 w-32' alt="" /> */}
            <h1 className="text-4xl font-semibold uppercase tracking-widest text-gray-900 mb-5">
              Sign up for our <br /> newsletter
            </h1>
            <p className="w-full md:w-2/3 text-gray-600">
              Be the first to know about our special offers, news, and updates.
            </p>
            <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 my-6 border pl-3">
              <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter your email"
              />
              <button type="submit" className="bg-black text-white text-xs px-10 py-4">
                SIGN UP
              </button>
            </form>
          </div>

          {/* Column 2 */}
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-1 text-gray-600">
              <li>+63 (02) 2418501 to 04</li>
              <li>+63 (02) 2413846</li>
              <li>+63 (02) 2410621</li>
              <li>bluesky@bluesky.com.ph</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-4 text-sm text-center bg-black text-white">
          Copyright {year} @ The BlueSky Online - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
