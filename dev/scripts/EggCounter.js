import React from "react";


const EggCounter = (props) => {
    // debugger;
     return(
         <div>
         <li>{props.data.eggInput}</li>
         <li>{props.data.timezone}</li>
         </div>
    )
}; 

export default EggCounter