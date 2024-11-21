import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import validateEmail from"./utils/helper"
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [NName,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [error,seterror]=useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!NName){
            seterror("Please enter a valid name!");
            return;}
            
            if (!validateEmail(email)){
            seterror("Please enter a valid email!");
            return;}
           
          
          else if ( !password){ //!password means if password is not existed
           seterror("Please enter a valid password!");
           return;
           }
           seterror('') 
            
       //Signup API call 
      //  axios.post( 'http://localhost:3000/signup', {name, email, password})// {name, email, password} is an object with para given to this post(endpoint)with this route(http://localhost:3000/signup') given by backend endpoint app.post('/signup', (req, res)=>{..../.then((sendcredtoAPIcallinfrontend) => res.json(sendcredtoAPIcallinfrontend)),,,}
        //.then((result) => {//store the 3 values of (name,email,password) in variable "result"
          //  console.log(result);//see object in the console
            //API is responsible for actions in front depending on back data and responses
         //   if(result.data === "Already registered"){/*how is this like of code possible!!?answer:"Already registered" is a result of code written in app.post(/signup.... if(user){
             //                                                              res.json("Already registered").)*/
               /* alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            }
            else{
                 navigate('/home');
            }}).catch(err => console.log(err));*/
            try {
                 axios.post('http://localhost:3000/signup', { NName, email, password })// { NName, email, password } is an object with para given from this page values of hooks(usestate) NName,email,password
              //see object in the console uncomment this code   .then((result) => { console.log(result); and put }) after..me")
              .then((result) => {//store the 3 values of (name,email,password) in variable "result"
                        if(result.data === "Already registered"){/*how is this like of code possible!!?answer:"Already registered" is a result of code written in app.post(/signup.... if(user){
                                                                                        res.json("Already registered").)*/
                       alert("E-mail already registered! Please Login to proceed.");
                      navigate('/login');
                  }
                  else{
                       navigate('/home');
                  }})
              } catch (err) {
                seterror(err);
              }
   
        }


    return (
        <div className='mx-[450px] my-48'>
        <div className=' w-80 p-7 border rounded  items-center justify-center'>
            
            <form onSubmit={handleSubmit}
                  className='flex flex-col gap-3 items-start'>
    
            <h4 className='text-2xl mb-3'>Signup</h4>
            <input type="text" placeholder='Name' 
                               className='input-box'
                               onChange={(e)=>setname(e.target.value)}/>
                              {/*very.very.imp:never forget to to store whats typed in input to a  variable with useState ,to make use of this value either to validate it its an aprove crediantial(incase of login),
                              or to stor it in database in case of signup }/>*/}
            <input type="email" placeholder='Email' 
                               className='input-box'
                               onChange={(e)=>setemail(e.target.value)}/>
                            
            <input type="text" placeholder='Password' 
                               className='input-box'
                               onChange={(e)=>setpassword(e.target.value)}/>
    
    {error && <p className='text-red-500 test-xs '>{error}</p>}
    
            <button className='btn-primary '>Create Account</button>
            <p className='text-sm font-medium	'>Already ahs an account? <u>Login</u></p>{/*u have to replace <u> with <link > figure it how*/}
    
            </form>
            </div></div>
      )
}

export default Signup