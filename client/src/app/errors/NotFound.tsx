import { SearchOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-[400px] flex flex-col justify-center items-center p-6 bg-white rounded shadow">
      <SearchOff className="text-blue-600" style={{ fontSize: 100 }} />
      <h1 className="text-3xl font-semibold text-center mb-4">
        Oops - we could not find what you were looking for
      </h1>
      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded w-[200px] text-center hover:bg-blue-700 transition"
      >
        Go back to shop
      </Link>
    </div>
  );
}
