import { NextPage } from "next";
import { FieldValues, useForm } from "react-hook-form";
import RegisterTemplate from "~/modules/account/templates/register-template";



const Register:NextPage = () => {
   
    return(
        <div><RegisterTemplate/></div>
    )
}
export default Register;