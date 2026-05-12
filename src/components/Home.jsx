import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);

      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    // empty input check
    if (!title.trim() || !value.trim()) {
      toast.error("Enter title and content first!");
      return;
    }

    //create paste and sent it to slice
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">
          Paste App
        </h1>

        <p className="text-gray-400 mt-2">
          Save and manage your notes securely
        </p>
      </div>

      {/* Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center">

          {/* Title Input */}
          <input
            className="w-full md:flex-1 p-4 rounded-2xl bg-gray-800 text-white border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            placeholder="Enter Title Here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={createPaste}
            className="w-full md:w-auto px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold text-white shadow-lg"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        {/* Textarea */}
        <div className="mt-6">
          <textarea
            className="w-full min-h-[500px] p-5 rounded-2xl bg-gray-800 text-white border border-gray-700 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={value}
            placeholder="Write your content here..."
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;