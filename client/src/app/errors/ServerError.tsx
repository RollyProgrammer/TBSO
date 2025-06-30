import { useLocation } from "react-router-dom";

export default function ServerError() {
  const { state } = useLocation();

  return (
    <div className="bg-white shadow rounded p-6">
      {state?.error ? (
        <>
          <h1 className="text-5xl text-red-700 font-semibold px-4 pt-2">
            {state.error.title}
          </h1>
          <hr className="my-4 border-gray-300" />
          <p className="text-base px-4 pb-2">{state.error.detail}</p>
        </>
      ) : (
        <h2 className="text-xl font-medium text-gray-800">Server Error</h2>
      )}
    </div>
  );
}
