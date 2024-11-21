import {React,useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus}  from '@fortawesome/free-solid-svg-icons'
import NoteCard from'./cards/NoteCard'
import AddCard from'./Components/AddCard'
import axios from 'axios';
const Home=(e)=> {
 
const [ModalStatus,setModalStatus]=useState({  isShown:false, //these 3 params of this object stored in this hook are used to 
                                                              //  handle addbtn(when to close and when to open by isShown,it really has 2 cases to be opened :one to addnote and other to edit it ) 
                                                              //and to edit the existing note by changing type to "edit and recieving data:when is new data to be edited"
                                               type:"add",
                                               data:null,})

const[allNotes,setallNotes]=useState([])

useEffect(() => {                            //SUPER.IMP THIS LINE OF CODE
  //if (currentUser === null || !currentUser) {
    //navigate("/login")
  //} else {
    //setUserInfo(currentUser?.rest)
    getAllNotes()
  }//}
, [])
//Get All Notes API:

const getAllNotes = async () => {
  try {
  axios.get('http://localhost:3000/get-all-notes')
    .then((response) => {
      setallNotes(response.data);
    })
  }catch (err) {seterror(err); }}

//delet a  Note API:

const deleteNote = async (data) => {//core concept:this API call leads the API to know when and where to execute its logic,here its settled to be called when delete button is called  
  const noteId = data._id           //deleteNote is an asynchronous function, meaning it will handle asynchronous operations (like HTTP reqs), the function takes data as an argument, which is expected to be an object representing the note.
                                    //The noteId is extracted from the data object. This ID is likely unique and identify which note to delete from the server
  try {
    const res = await axios.delete("http://localhost:3000/delete-note/" + noteId,)//This line sends an HTTP DELETE request with a param(noteId) to the server. The noteId is appended to the URL

    if (res.data.success === false) {//Handling the Response(API) after sending Delete API req:"success" is var at back end "i can access it here by res.data.success
                                   {/*var like "success" cannot be called only if res is variable foe endpoint(res=await axois.post....) */}
      console.log(res.data.message)
      
    }

    setallNotes(allNotes.filter(note => note._id ));
    getAllNotes()
  } catch (err) { console.log(err.message) }
}
const handleEdit = (noteDetails) => {
  setModalStatus({ isShown: true, data: noteDetails, type: "edit" })
}

return (
    <div className='relative grid grid-cols-3 h-screen w-screen'>{/*h-screen and  w-full are important since we want to use full page h and w to locate (+) at bottom left*/}
                               {/*grid-cols-3:arranges every 3 notes in a line */}
      {allNotes.map((note, index) => (
              <NoteCard
                          key={note._id}
                          title={note.title}
                          date={note.createdAt}
                          content={note.content}
                          tags={note.tags}
                          isPinned={note.isPinned}
                          onEdit={() => {handleEdit(note)
                                               }}
                          onDelete={() => {deleteNote(note)
                                          }}
                          onPinNote={() => {updateIsPinned(note)}}
              />
            ))}

     <button className=' size-12 bg-primary hover:bg-blue-600 rounded-xl my-5  mr-10 absolute end-1  bottom-10'
              onClick={()=>{setModalStatus({isShown:true,type:"add",data:null});
              }}>
      <FontAwesomeIcon icon={faPlus} className='size-[32px] text-white ' />
      </button>

                                               
  {ModalStatus.isShown &&  <AddCard onClose={()=>{setModalStatus({isShown:false,type:'add',data:null})}}
                                      noteData={ModalStatus.data}
                                      type={ModalStatus.type}
                                      getAllNotes={getAllNotes}/>}   {/*vital:to give child component aparameter the para(ex:setModalStatus) must be declared in the same page
                                     *if u pass para between 2 child it wont work in the 2nd child*/}
  </div>
  )
}

export default Home