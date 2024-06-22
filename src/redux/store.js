import noteSlice from "./noteSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store=configureStore({
    reducer:{
        note:noteSlice
    }
})