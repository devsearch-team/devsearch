import {empLogIn} from '../services/authServices'
import {Link} from 'react-router-dom'
import LogIn from "../globalComponents/LogIn";
import { MiddleContainer } from "../globalStyles";

export default function EmpLogIn(){
    return(
        <MiddleContainer>
            <LogIn callback={empLogIn} header={"Employer Login"}></LogIn>
            <p style={{marginTop:"2rem"}}>Have an account? <Link to={"/employer/register"}>register</Link></p>
    </MiddleContainer>
        
    )
}