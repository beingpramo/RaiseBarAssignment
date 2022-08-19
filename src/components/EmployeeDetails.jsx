import {React, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { createUseStyles } from "react-jss";



const useStyles = createUseStyles({
  heading :{
     fontSize:30,
     fontFamily:'Comfortaa',
     textAlign:'center',
     fontWeight:'bold',
     position:'relative',
     top:100
  },
  tablewrapper:{
    marginTop:150,
    marginLeft:550,
    borderCollapse:'collapse',
    minWidth: 400
    
    // padding:30
  },
  th:{
    padding:15,
    textAlign:'left',
    // border:'1px solid #ddd',
    backgroundColor:'#00A8CC',
    color:'white',
    fontFamily:'Comfortaa',
    borderRadius:5
  },
  td:{
    padding:8,
    textAlign:'left',
    border:'1px solid #ddd',
    fontFamily:'Comfortaa',
   

  }

})



function Heading(){
const classes = useStyles();

 return(
  <div>
  <h3 className={classes.heading}>Employee Details</h3>
    
  </div>
 ) 
}

export default function EmpDetails() {
  var {empId} = useParams();

   // FETCHING DATA FROM API 
   const [empDetails, SetempDetails] = useState([]);
    

   useEffect(() => {
    fetch(`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees`)
    .then(response => response.json())
    .then(result => SetempDetails(result))
    .catch(error => console.log(error));
},[]);

// Filtering Array Based on Employee Id as a Parameter and assigning it to a new Array
const newempDetails = empDetails.filter(empDetails => {
  return empDetails.id === `${empId}`;
});



const classes = useStyles();

  return ( 
    <div>
    <Heading />


    {
      newempDetails.map((item)=>(
        <table className={classes.tablewrapper}>
      <tbody>

        <tr>
          <th className={classes.th}>Field</th>
          <th className={classes.th}>Value</th>
        </tr>
       
        <tr>
          <td className={classes.td}>First Name</td>
          <td className={classes.td}>{item.first_name}</td>
        </tr>
        <tr>
          <td className={classes.td}>Last Name</td>
          <td className={classes.td}>{item.last_name}</td>

        </tr>
        <tr>
          <td className={classes.td}>Date of Birth</td>
          <td className={classes.td}>{item.date_of_birth}</td>

        </tr>
        <tr>
          <td className={classes.td}>Address</td>
          <td className={classes.td}>{item.address}</td>

        </tr>
        <tr>
          <td className={classes.td}>Date of joining</td>
          <td className={classes.td}>{item.date_of_joining}</td>

        </tr>
        <tr>
          <td className={classes.td}>Salary</td>
          <td className={classes.td}>{item.salary}</td>

        </tr>
        <tr>
          <td className={classes.td}>Designation</td>
          <td className={classes.td}>{item.designation}</td>

        </tr>

      </tbody>
    </table>

      ))
    }

    </div>
    

    
  )
}
