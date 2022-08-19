import  { React, useState, useEffect} from 'react'
import { createUseStyles } from "react-jss";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';



const useStyles = createUseStyles ({
    tabletitlerow:{
        fontFamily:'Comfortaa',
        textAlign:'center',
        marginBottom:100,
        marginTop:50
      },
      accordion:{
        backgroundColor: '#eee',
        color: '#444',
        cursor: 'pointer',
        padding: 18,
        width: 500,
        border: 'none',
        textAlign: 'left',
        outline: 'none',
        fontSize: 15,
        transition: '0.4s',
      },
      panel :{
        paddingTop:0,
        paddingRight:18,
        paddingLeft:18,
        display: 'none',
        backgroundColor: 'white',
        overflow: 'hidden',
      },
      accordionheading:{
        fontFamily:'Comfortaa'
      },
      accordionpanel:{
        height:80,
        fontFamily:'Comfortaa',
        padding:2,
        marginTop:2,
        marginLeft:8
      },
      accordionwrapper:{
        marginBottom:100
      }

})


function DisplaypageHeading(){
const classes = useStyles();

    return(
        <div>
            <h2 className={classes.tabletitlerow}>Employee Hierarchical Display</h2>
        </div>
    )
}


export default function EmployeeDisplay() {

  //Whole json Data
const [data, setData] =useState([]);

// Styles
const classes = useStyles();

// Fetching data and setting whole data into a array "data" via 'useState'
  useEffect(() => {
    fetch(`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees`)
    .then(response => response.json())
    .then(result => setData(result))
    .catch(error => console.log(error));
},[]);
 
// array filtering and extracting only manager id's from the data
let managerId = data.map((value)=>{
    return value.manager_id;
});

//converting managerId array in to a set to remove duplicate values and then back to array for usage ahead
let uniquemanagerId = new Set(managerId);
let newuniquemanagerId = Array.from(uniquemanagerId);
newuniquemanagerId = newuniquemanagerId.slice(1);


//Filtering function that returns matched employee's based on the managerId as a parameter
function filterEmployees(managerid){

let employeematch = [];
data.filter((val) => {   
  return(  
  newuniquemanagerId.forEach((value) => {

  if(managerid === val.manager_id){
    employeematch.push(val.id)
  }

  }) )
    
})
//converting the newEmployeeMatch into a set to remove duplicate values from it & then converting back to Array for usage ahead
let newEmployeeMatch = new Set(employeematch);
let newUniqueEmployeeMatch = Array.from(newEmployeeMatch);

return newUniqueEmployeeMatch;

} 

// let employeematch;

// console.log("employeematch", employeematch)

return(
    <div>
     <DisplaypageHeading/>

     <Accordion allowZeroExpanded className={classes.accordionwrapper}>
        {newuniquemanagerId.map((item) => (
        <AccordionItem key={item.manager_id}>
            <AccordionItemHeading className={classes.accordionheading}>
                <AccordionItemButton  onClick={filterEmployees(item)}>
                  ManagerId :  {item}
                </AccordionItemButton>
            </AccordionItemHeading>
            {
              //Mapping the array we get return from the filter function at top 
                filterEmployees(item).map((value)=>{
                  return(
                    <AccordionItemPanel className={classes.accordionpanel}>
                    EmployeeId : {value}
                   </AccordionItemPanel>
                  )
                })
              
            }
           
        </AccordionItem>
    ))}
</Accordion>
    </div>
)

}