import {seekerSignUp} from '../services/authServices'
import Register from "../globalComponents/Register";


export default function EmpRegister(){
    return(
        <>
            <Register name={"Name"} callback={seekerSignUp} header={"Job Seeker Account"}></Register>
        </>
        
    )
}