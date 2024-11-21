import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import validateEmail from"./utils/helper"
const Login = () => {
    
  const [email,setEmail]=useState("");//"useState" is used to store a value of a variable, its usually assinged in the same page(here in the input(e)),we link the two variable with onChange={(e)=>setEmail(e.target.value)},this assigns input variable(e)
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);
  
  const navigate=useNavigate()
    const handleLogin = (e) => {//since this method will handle the submited data ,so it will be given to <form onsumit={handlelogin}>check if they fullfill methods and conditions inside it 
        e.preventDefault();  // async will perform more than one action at same time ,this is used here since we have more than one method to be checked,this is due to multiple inputs we want to check(email and pass) 


        if (!validateEmail(email)){//!password means if password is not existed  ....import validEmail() method from helper file in utils folder
            setError("Please enter a valid email!");// we checked by an external method(validateEmail)th eemail inside it we set(by useState-internal method) error to a sentence if case email isnt valide
            //we still have to display the error(once its found) above button check it down ..if we dont display it nothing this method(handleLogin) will be useless 
          return;// we used "return" since the method will return something(sentence) 
           } 
          
          
          if ( !password){ //!password means if password is not existed
           setError("Please enter a valid password!");
           return;
           }
           setError('') // this means else(if validEmail(emial)is true) delete error sentence,its for all(3) if conditions above once one of then isnt fullfilled error is empty   //here make API call 
         

        //Login API call
         axios.post( 'http://localhost:3000/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/home');
            }
            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }


    return (
        <>
    
    <div className='mx-[450px] my-48'>
    <div className=' w-80 p-7 border rounded  items-center justify-center'>
        
        <form onSubmit={handleLogin}//dont add () to hadleLogin other wise there will be an error,i predict since this method doesnt take a parameter
  // very.IMP:onSubmit is when the button is pressed the method in it(handleLogin) will check if submitted data from the whole <form> will fullfill conditions and code inside it
              className='flex flex-col gap-3 items-start'>

        <h4 className='text-2xl mb-3'>Login</h4>
        <input type="text" placeholder='Email' 
                           className='input-box'
                           onChange={(e)=>{setEmail(e.target.value)}  //very.very.very.imp:we have to access written text in input cuurently to chech if it is typed con in handlesubbmit() to excuted login ,else error will be displayed (enter pass)
                         //onChange={(e)=>{setEmail(e.target.value) is used to access value of variable written currently in the input(e) and store in in email variable with hook(usestate),and no need to use useref hook here
                           }/>
        
        <input type="text" placeholder='password' 
                           className='input-box'
                           onChange={(e)=>{setPassword(e.target.value)}  //very.very.very.imp:we have to access written text in input cuurently to chech if it is typed con in handlesubbmit() to excuted login ,else error will be displayed (enter pass)

                           }/>
        
{error && <p className='text-red-500 test-xs '>{error}</p>}{/*This code will be executed whenever error exists(it exists by setError method ,its called two time one for pass and other for email ..so this one code
is responsible for displaying values of two methos) this code means if  error is true(ya3ni existed )  then executed whats after ($$) so:display <p>values ,this is advanced syntax maybe ES6*/}

        <button className='btn-primary '>Login</button>
        <p className='text-sm font-medium	'>Not registered yet? <u> Create an Account</u></p>{/*u have to replace <u> with <link > figure it how*/}

        </form>
        </div></div>
    
    
    
    </>
    )
}

export default Login