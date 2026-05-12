import React from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {

  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          View Paste
        </h1>

        <p className="text-gray-400 mt-2">
          Read your saved paste content
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl">

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-400 mb-2 text-sm">
            Paste Title
          </label>

          <input
            className="w-full p-4 rounded-2xl bg-gray-800 border border-gray-700 text-white outline-none"
            type="text"
            placeholder="Enter Title here...."
            value={paste.title}
            disabled
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-400 mb-2 text-sm">
            Paste Content
          </label>

          <textarea
            className="w-full min-h-[500px] p-5 rounded-2xl bg-gray-800 border border-gray-700 text-white resize-none outline-none"
            value={paste.content}
            placeholder="Enter content here...."
            disabled
            rows={20}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center flex-wrap gap-4">

          <div className="text-gray-500 text-sm">
            Read Only Mode
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(paste.content);
            }}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium"
          >
            Copy Content
          </button>

        </div>
      </div>
    </div>
  )
}

export default ViewPaste