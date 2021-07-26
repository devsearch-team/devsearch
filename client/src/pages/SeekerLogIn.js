import LogIn from "../globalComponents/LogIn";
import {Link} from 'react-router-dom'
import {seekerLogIn} from '../services/authServices'
import { MiddleContainer } from "../globalStyles";
export default function SeekerLogIn(){
    return(
        <MiddleContainer>
            <LogIn callback={seekerLogIn} header={"Job Seeker Login"}></LogIn>
            <p style={{marginTop:"2rem"}}>Have an account? <Link to={"/seeker/register"}>register</Link></p>
    </MiddleContainer>
        
    )
}