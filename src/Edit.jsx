import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between h-[85vh] bg-gray-100 p-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Edit Page</h1>
      </div>

      {/* White Boxes */}
      <div className="flex flex-col gap-4 flex-grow justify-center">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Example text for the first box.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Example text for the second box.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600">Example text for the third box.</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className="rounded-md bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => navigate("/previous")}
        >
          Back
        </button>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => navigate("/next")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Edit;