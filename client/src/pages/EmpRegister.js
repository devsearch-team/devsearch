import {empSignUp} from '../services/authServices'
import Register from "../globalComponents/Register";


export default function EmpRegister(){
    return(
        <>
            <Register name={"Company Name"} callback={empSignUp} header={"New Company Account"}></Register>
        </>
        
    )
}