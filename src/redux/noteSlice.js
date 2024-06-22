import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createNote = createAsyncThunk("noteSlice/createNote", async (noteData) => {

    try {
        const {data} = await axios.post("https://quicknotes-server-ov7k.onrender.com/notes", noteData)
        return data
    }
    catch (error) {
        return error
    }

})

export const fetchNote = createAsyncThunk("noteSlice/fetchNote", async () => {

    try {
        const {data} = await axios.get("https://quicknotes-server-ov7k.onrender.com/notes")
        console.log(data);
        return data
    }
    catch (error) {
        return error
    }

})

export const deleteNote = createAsyncThunk("noteSlice/deleteNote", async (id) => {

    try {
        await axios.delete(`https://quicknotes-server-ov7k.onrender.com/notes/${id}`)
        return id
    }
    catch (error) {
        return error
    }

})

export const editNote = createAsyncThunk("noteSlice/editNote", async ({id,bodyData}) => {

    try {
        const {data} = await axios.patch(`https://quicknotes-server-ov7k.onrender.com/notes/${id}`,bodyData)
        return {id,data}
    }
    catch (error) {
        return error
    }

})




const noteSlice = createSlice({
    name: "noteSlice",
    initialState: { 
        notes: [], 
        loading: true, 
        error: null 
    },
    extraReducers:(builder)=>{
        //get slice
        builder.addCase(fetchNote.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchNote.fulfilled,(state,action)=>{
            state.loading=false
            state.notes=action.payload
            state.error=""
        })
        builder.addCase(fetchNote.rejected,(state,action)=>{
            state.loading=false
            state.notes=[]
            state.error=action.payload
        })
        //create note
        builder.addCase(createNote.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(createNote.fulfilled,(state,action)=>{
            state.loading=false
            state.notes.push(action.payload)
        })
        builder.addCase(createNote.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        // delete note
        builder.addCase(deleteNote.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(deleteNote.fulfilled,(state,action)=>{
            state.loading=false
            state.notes=state.notes.filter(note=>note.id!=action.payload)
        })
        builder.addCase(deleteNote.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        //edit note
        builder.addCase(editNote.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(editNote.fulfilled,(state,action)=>{
            state.loading=false
            const {id,data}=action.payload
            const existingNote=state.notes.findIndex(note=>note.id==id)
            if(existingNote!=-1){
                state.notes[existingNote]={...state.notes[existingNote],...data}
            }
        })
        builder.addCase(editNote.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

    }
})


export default noteSlice.reducer