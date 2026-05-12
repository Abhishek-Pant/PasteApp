import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handelDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste Deleted");
  }

  return (
    <div className="w-full">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Your Pastes
        </h1>

        <p className="text-gray-400 mt-2">
          Search, manage and share your saved notes
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <input
          className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          type="search"
          placeholder="Search your pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center text-gray-500 mt-20 text-xl">
          No Paste Found
        </div>
      )}

      {/* Paste Cards */}
      <div className="flex flex-col gap-6">

        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div
                className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
                key={paste?._id}
              >

                {/* Title */}
                <div className="text-2xl font-bold text-white break-words">
                  {paste.title}
                </div>

                {/* Content */}
                <div className="text-gray-300 mt-4 whitespace-pre-wrap break-words line-clamp-4">
                  {paste.content}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">

                  <button className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-all">
                    <a href={`/?pasteId=${paste?._id}`}>
                      Edit
                    </a>
                  </button>

                  <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all">
                    <a href={`/pastes/${paste?._id}`}>
                      View
                    </a>
                  </button>

                  <button
                    onClick={() => handelDelete(paste?._id)}
                    className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-all"
                  >
                    Copy
                  </button>

                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}/?pasteId=${paste._id}`;
                      navigator.clipboard.writeText(shareUrl);
                      toast.success("Share link copied!");
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-all"
                  >
                    Share
                  </button>

                </div>

                {/* Date */}
                <div className="mt-5 text-sm text-gray-500">
                  Created At :{" "}
                  {new Date(paste.createdAt).toLocaleString()}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;