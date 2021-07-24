import {empLogIn} from '../services/authServices'
import LogIn from "../globalComponents/LogIn";

export default function EmpLogIn(){
    return(
        <LogIn callback={empLogIn} isEmployer={true}></LogIn>
    )
}