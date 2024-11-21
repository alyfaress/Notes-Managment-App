import React, { useState } from 'react'
import TagInput  from './TagInput'
import axios from 'axios';
const AddCard = ({ onClose, noteData, type, getAllNotes }) => {//take care of type param search for it and discuss its functionality
  const [title, setTitle] = useState(noteData.title || "")
  const [content, setContent] = useState(noteData.content || "")
  const [tags, setTags] = useState(noteData.tags || [])
  const [error, setError] = useState(null)

  const handleAdd_editNote = () => {
   
    if (type === "edit") { //Super vital:this controls whether the add button is used to add note or edit existing one,"type "is para for Modalstatus that is passed as argue that diifers upon whether  pen icon is pressed or add btn is pressed
      editNote()
    } else {
      addNewNote()
    }
    if (!title) {
      setError("Please enter the title")
      return
    }

    if (!content) {
      setError("Please enter the content")
      return
    }

    setError("")
  }
 
        //Add Note API call
  const addNewNote = async () => {
 try {
      // Make a POST request to the backend
      const response =  axios.post('http://localhost:3000/newnote', {//to access res.data and res.data.(name of data sent from backend) you must assign const res= awaitaxios.get(..)
        title,
        content,
        tags,
      });
///dont forget onClose( ) method and to display all notes after it
      // Handle successful response
      console.log('Card added:', response.data);//"response.data" is data brought from backend by axois.post
      alert('Card added successfully!');
      onClose()// SUPER.imp:how onClose() and getAllNotes() ended here and how they operate are the most advanced thing I know currently
      getAllNotes()///onClose( ) method is responsible to open add card if it is closed and close it if its open ,we called after it getallnotes()to display all notes after it closes
    } catch (err) {
      console.error('Error adding card:', err);
      alert('Failed to add card');
    }}
  
    const editNote = async () => {
      const noteId = noteData._id
     
  
      try {
      const res = await axios.post( "http://localhost:3000/edit-note/" + noteId,  { title,content,tags } )
                                                                             //super imp:these 3 are from noteData they are already exusted,as we want to edit them,we should save them in useState before we use them,check usestates to see how we added them there
        
  
        if (res.data.editnot && res.data) {
          getAllNotes()
        onClose()
        }
        
      } catch (error) {
        console.log(error.message)
        setError(error.message)
      }
    }
  
  
  return (
     
  
 
     //these 2 first divs are reponsible for modal container and its blury background
  <div name="modalBackground" className="h-screen w-screen  bg-gray-400 fixed flex justify-center items-center ">
  <div name="modalContainer" className=" w-[500px] height-[500px] border-[3px] bg-white shadow-slate-50	rounded-xl flex flex-col p-[25px]">
<form className="relative" onSubmit={handleAdd_editNote}>
<button
  className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
  onClick={onClose}
>
  
</button>
<div className="flex flex-col gap-2">
  <label className="input-label text-red-400 uppercase">Title</label>

  <input
    type="text"
    className="text-2xl text-slate-950 outline-none"
    placeholder="Wake up at 6 a.m."
    value={title}
    onChange={({ target }) => setTitle(target.value)}
  />
</div>
<div className="flex flex-col gap-2 mt-4">
  <label className="input-label text-red-400 uppercase">Content</label>

  <textarea
    type="text"
    className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
    placeholder="Content..."
    rows={10}
    value={content}
    onChange={({ target }) => setContent(target.value)}
  />
</div>

<div className="mt-3">
  <label className="input-label text-red-400 uppercase">tags</label>
  <TagInput tags={tags} setTags={setTags} />
</div>

{error && <p className="text-red-500 text-xs pt-4">{error}</p>}

<button
  className="btn-primary font-medium mt-5 p-3"
  
>
  {type === "edit" ? "UPDATE" : "ADD"} {/*IMP: if type(inherited as argument) is edit change btn text to "update"*/}
</button>
</form></div></div>

)}

export default AddCard