import LogIn from "../globalComponents/LogIn";
import {seekerLogIn} from '../services/authServices'
export default function SeekerLogIn(){
    return(
        <LogIn callback={seekerLogIn} header={"Job Seeker Login"} isEmployer={false}></LogIn>
    )
}