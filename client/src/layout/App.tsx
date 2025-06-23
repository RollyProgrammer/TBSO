import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

function App() {


  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Banner />
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-10">
        <div className="max-w-screen-1800 mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
