import { useNavigate } from "react-router-dom";

function Contact()
{    
    const navigage = useNavigate();

    function buttonClick()
    {
        navigage("/");
    }

    return <div style={{backgroundColor:'LightBlue', padding: '10px'}}>
    <h1>Contact Page</h1>  
    <p>This page provides contact details of compnay. This page provides contact details of compnay.This page provides contact details of compnay.This page provides contact details of compnay.This page provides contact details of compnay. </p>
    <p>This page provides contact details of compnay. This page provides contact details of compnay.This page provides contact details of compnay.This page provides contact details of compnay.This page provides contact details of compnay. </p>
    
    
    <hr/>
    <button onClick={buttonClick}>Go to Home</button>
    </div> 
    
}  

export default Contact;

 