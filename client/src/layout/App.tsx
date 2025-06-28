import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import { useAppSelector } from "../app/store/store";
import { LinearProgress } from "@mui/material";

function App() {
  const { isLoading } = useAppSelector((state) => state.ui);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Banner />
      <NavBar />
      {/* Global top loader, under the navbar */}
      {isLoading && (
        <div className="fixed left-0 w-full z-50 top-[calc(92px+3rem)] sm:top-[calc(2.5rem+3rem)]">
          <LinearProgress
            sx={{
              backgroundColor: "#e0e0e0",
              "& .MuiLinearProgress-bar": { backgroundColor: "black" },
            }}
          />
        </div>
      )}

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
