const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const Users = require ('./models/user.Model');
const Notes = require ('./models/notesModel');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Notes-App');

app.post('/signup', (req, res)=>{
    // To post / insert data into database

    const {username,email, password} = req.body;
    Users.findOne({email: email})
    .then((user) => {
        if(user){
            res.json("Already registered")
        }
        else{
            Users.create({fullname:username,email:email, password:password})//"fullname" is variable in the database assigning it to (data of req: name=req.body)
         /*store the 3 variable in variable (sendvaluestoAPIcallinfrontend)*/.then((sendvaluestoAPIcallinfrontend) => res.json(sendvaluestoAPIcallinfrontend))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    Users.findOne({email: email})
    .then((user) => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.listen(3000, () => {
    console.log("Server listining on http://127.0.0.1:3000");

});
//add note
app.post("/newnote",async (req,res)=>{
      
    
   /*To populate req.user, you must use authentication middleware or token decoding logic, as shown in the Passport.js or JWT examples.
In Express.js, req.user is commonly used and populated by authentication middleware (like Passport.js or custom JWT verification middleware).
    const {userId}=req.user;*/

    const { title, content, tags } = req.body;
    try {
        const newnote = new Notes({
          title,
          content,
          tags,
        });
    
        // Save the card to the database
        await newnote.save();
    
        // Respond with the saved card
        res.status(201).json(newnote);
      } catch (err) {
        res.status(500).json({ message: 'Failed to add card', error: err.message });
      }
})
          
        
               
  
//Edit Note
app.put('/edit-note/:noteId',async (req,res)=>{
//const userid=req.params.noteId // Extracting the user ID from the URL,since the ID is passed as a URL parameter, you would typically use req.params to capture it and store or update a record in MongoDB
//const {title,content,tags}=req.body;
//const {userId}=req.user;// To populate req.user, you must use authentication middleware with  JWT verification middleware

const editnote = await Notes.findById(req.params.noteId)

 

  try {
    if (title) {
      editnote.title = title
    }

    if (content) {
      editnote.content = content
    }

    if (tags) {
     editnote.tags = tags
    }

    
    await editnote.save()

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      editnote,
    })
  } catch (error) {
   
  }
});


//delete note
app.delete('/delete-note/:noteId',async (req,res)=>{

  const noteId = req.params.noteId

  const note = await Notes.findOne({ _id: noteId })

  if (!note) {
    return next(errorHandler(404, "Note not found"))
  }

  try {
    await Notes.deleteOne({ _id: noteId})

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    })
  } catch (err) {seterror(err); }})


app.put('/update-pinned-note/:noteId',async (req,res)=>{
const userid=req.params.noteId 
//const{ispinned}=req.body use this incase u want to send isPinned value by 
try{
  const updatepinned=await Notes.findById(userid)//same to fondOne({_id:userid})
  /*updatepinned.isPinned=ispinned*/;//here u cannot set updatepinned.isPinned=!isPinned,since both are from database so u have to assign updatepinned.isPinned to value inserted in the req(ex:req.body)
 const opposite= updatepinned.isPinned/*Amazing I wrote these 2line(89 & 90)to change isPinned once this route is called without the need to send req body with "isPinned":"false" or "true" */
 updatepinned.isPinned=!opposite
 await updatepinned.save()
 
   res.status(200).json({ updatepinned ,message:`successfully ${opposite}`
})}
catch (err) {
  res.status(400).json({ error: err.message });
}})

//Get all notes
app.get('/get-all-notes',async (req,res)=>{

    try {
        const allnotes = await Notes.find();  // Fetch all items
        res.json(allnotes);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch items' });
      }
})