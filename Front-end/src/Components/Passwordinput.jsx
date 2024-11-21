import {React,useState,UseState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye,faEyeSlash }from '@fortawesome/free-solid-svg-icons'
import { text } from '@fortawesome/fontawesome-svg-core';

const Passwordinput=({value,onChange,placeholder})=>{/*this function is the main function of this jsx page that will be exported */
const [showPass,setshowPass]=useState(false);

//to store pass value here by pasing it from parent to here ,the to share inpute current value value with parent to check  

const showPassword=()=>{
setshowPass(!showPass);
};



  return (
    <div className=' relative flex w-full items-center '>{/*flex to put icon next input , wfull is imp here for input below to take full space assigned in iput-box class*/}
<input   value={value}//is very imp with out it the login process wont complete ,its child para called with passwordinput component but whats its duty?
         onChange={onChange}//is very imp with out it the login process wont complete ,its child para called with passwordinput component but whats its duty?
       type={showPass?'text ':'password'} //very import in the function of onClick
        className='input-box  '
        placeholder='Password'/>
 { showPass? (<FontAwesomeIcon icon={faEye} //this means this show pass is turned to true ,make the text black and display crossed eye
                        className='text-black curser-pointer absolute ml-56'
                        onClick={()=>showPassword()}
     />):(   <FontAwesomeIcon icon={faEyeSlash} className='absolute ml-56' 
                                            onClick={()=>showPassword()}/>)}
         
    </div>
  )
}

export default Passwordinput