import React from 'react'
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useParams, useSearchParams } from "react-router-dom";

const ViewPaste = () => {

    const {id} =useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.filter((p) => p._id===id)[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 place-content-between w-[600px]">
        <input
          className="p-2 rounded-2xl mt-2 border-black border-2"
          type="text"
          placeholder="Enter Title here...."
          value={paste.title}
          disabled
        />
      </div>
      <div>
        <textarea 
            className='p-2 rounded-2xl mt-4 border-black border-2'
            value={paste.content}
            placeholder="Enter content here...."
            disabled
            onChange={(e) => setValue(e.target.value)}
            rows={20}
            cols={73}
        />
      </div>
    </div>
  )
}

export default ViewPaste
