import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-10 px-4">
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
