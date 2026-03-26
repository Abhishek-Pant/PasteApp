import { createSlice } from "@reduxjs/toolkit"
import { act } from "react";
import { toast } from "react-hot-toast"
import { jsx } from "react/jsx-runtime";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item.title === paste.title);
      if (index >= 0) {
        // If the course is already in the Pastes, do not modify the quantity
        toast.error("Paste already exist");
        return;
      }
      // If the course is not in the Pastes, add it to the Pastes
      state.pastes.push(paste);
      // Update to localstorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      // show toast
      toast.success("Paste added");
    },
    updateToPastes: (state, action) => {
        const paste=action.payload;
        const index=state.pastes.findIndex((item) => item._id==paste._id);
        if(index>=0){
            state.pastes[index]=paste;
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("paste updated")
        }
    },
    resetAllPastes: (state, action) => {
        state.pastes=[];
        localStorage.removeItem("pastes");
    },
    removeFromPastes: (state, action) => {
        const pasteId=action.payload;
        console.log(pasteId);
        const index=state.pastes.findIndex((item) => item._id==action.payload);
        if(index>=0){
            state.pastes.splice(index,1);
            localStorage.setItem("pastes",JSON.stringify(state.pastes));
            toast.success("Paste deleted");
        }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;
