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
        if(pasteId){
            const paste=allPaste.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    },[pasteId])
  function createPaste(){
    // empty input check
    if (!title.trim() || !value.trim()) {
    toast.error("Enter title and content first!");
    return;
  }

    //create paste and sent it to slice
    const paste={
        title:title,
        content:value,
        _id: pasteId || Date.now().toString(36),
        createdAt:new Date().toISOString(),
    }



    if(pasteId) {
        //update
        dispatch(updateToPastes(paste));
    }
    else{
        //create
        dispatch(addToPastes(paste));
    }
    //afte creation or updation 
    setTitle('');
    setValue('');
    setSearchParams({});
  }


  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 place-content-between w-[600px]">
        <input
          className="p-2 rounded-2xl mt-2 border-black border-2"
          type="text"
          placeholder="Enter Title here...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button 
        onClick={createPaste}
        className="p-2 rounded-2xl mt-2 border-black border-2"
        >
          {pasteId ? "Update Paste" : "Create Paste"}

        </button>
      </div>
      <div>
        <textarea 
            className='p-2 rounded-2xl mt-4 border-black border-2'
            value={value}
            placeholder="Enter content here...."
            onChange={(e) => setValue(e.target.value)}
            rows={20}
            cols={73}
        />
      </div>
    </div>
  );
};

export default Home;
