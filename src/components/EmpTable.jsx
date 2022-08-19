import React, {useState, useEffect} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TableFooter} from '@mui/material';
import { createUseStyles } from "react-jss";
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';



// STYLING USING JSS
const useStyles = createUseStyles({
    wrapper: {
        marginTop:10,
  },
  tablehead: {
    padding:20,
    backgroundColor: '#00A8CC',

  },
  tableheadrow:{
    padding: 20,
  },
  tabletitlerow:{
    fontWeight:700,
    color:'white',
    fontSize:15,
    padding:25,
    fontFamily:'Comfortaa',
  },
  tablebodydata:{
    fontFamily:'Comfortaa',
  },
  idhyperlink:{
    textDecoration:'none',
    cursor:'pointer'
  },
  heading :{
    fontSize:30,
    fontFamily:'Comfortaa',
    justifyContent:'center',
    textAlign:'center',
    fontWeight:'bold',
 },
 searchbar:{
  display:'flex',
  alignItems:'center',
  marginLeft:10
 },
 searchinput:{
  border:'none !important'
 },
 topbarwrapper:{
  display:'flex',
  alignItems:'center',
  
 },
 filterone:{
    display:'flex',
    alignItems:'center',
    position:'relative',
    top:17,
    left:1050,
    marginBottom:20,

 },
 filtericon:{
  alignItems:'center',
  position:'relative',
  color:'grey',
  position:'relative',
  left:1030,
  top:10,
  cursor:'pointer'
 },
 searchicon:{
  display:'flex',
  alignItems:'center',
  position:'relative',
  top:10,
  right:20,
  color:'grey'
 },
 hieraricalpagelink:{
  fontSize:15,
  fontFamily:'Comfortaa',
  display:'flex',
  justifyContent:'center',
  textAlign:'center',
  fontWeight:'bold',
 }
  });





export default function EmpTable() {

    const classes = useStyles();
     
     //Creating a "empList"  and setting it to empty array initially.
    const [empList, setEmpList] = useState([]);

    // Search feauture Query State 
    const [query, setQuery] = useState("");

    //Filter feature State
    const [filtervalue, setFilter] = useState([]);
    
    // PAGINATION 
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    
    // FETCHING DATA FROM API 
    useEffect(() => {
        fetch('https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees')
        .then(response => response.json())
        .then(result => setEmpList(result))
        .catch(error => console.log(error));
    },[]);

    return (
    
    //   MUI TABLE COMPONENT 
    <div>
      {/* <Heading/> */}

      <h2 className={classes.heading}>Employee List</h2>
      <Link to ="/employee-hierarchical-display" className={classes.hieraricalpagelink} >Hierarchical View</Link>
      
        <TableContainer component={Paper} className={classes.wrapper}>
        
      
       {/* Search Bar  */}
       
                <div className={classes.topbarwrapper}>

                <div className={classes.searchbar}>
                <TextField id="standard-search" label="Search..." type="search" margin='normal' size="small" className={classes.searchinput} onChange={(event)=>setQuery(event.target.value)} variant="standard"/>
                <SearchIcon className={classes.searchicon}/>
                </div> 
                  <TextField id="standard-search" label="ex: 2000" type="search" margin='normal' size="small" className={classes.filterone}  variant="standard" onChange={(event)=>setFilter(event.target.value)} helperText="Filter date of joining by year..."/>
                <FilterAltIcon className={classes.filtericon}/>
               
                </div>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
         
          <TableHead className={classes.tablehead}>
          
            <TableRow className={classes.tableheadrow}>
              <TableCell className={classes.tabletitlerow} >Id</TableCell>
              <TableCell className={classes.tabletitlerow}>First Name</TableCell>
              <TableCell className={classes.tabletitlerow}>Last Name</TableCell>
              <TableCell className={classes.tabletitlerow}>Date of Birth</TableCell>
              <TableCell className={classes.tabletitlerow}>Address</TableCell>
              <TableCell className={classes.tabletitlerow}>Date of Joining</TableCell>
              <TableCell className={classes.tabletitlerow}>Salary</TableCell>
              <TableCell className={classes.tabletitlerow}>Designation</TableCell>    

            </TableRow>
          </TableHead>

          <TableBody>
            {
                empList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                //search filter by FirstName & LastName
                .filter((value) => {
                  if(query === ""){
                    return value;
                  } else if(value.first_name.toLowerCase().includes(query.toLowerCase()) || value.last_name.toLowerCase().includes(query.toLowerCase())){
                    return value;
                  }
                })
                //Filter feature by YEAR of Joining
                .filter((val) => {
                if(filtervalue === ""){
                    return val;
                  }else if(val.date_of_joining.includes(filtervalue)){
                    return val;
                  }
                }
                )
                .map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                
                <TableCell component="th" scope="row" className={classes.tablebodydata}>
                <Link to ={`/${row.id}`} className={classes.idhyperlink} >{row.id}</Link>
              
                </TableCell>
                  
                <TableCell className={classes.tablebodydata}>{row.first_name}</TableCell>
                <TableCell className={classes.tablebodydata}>{row.last_name}</TableCell>
                <TableCell className={classes.tablebodydata}>{row.date_of_birth}</TableCell>
                <TableCell className={classes.tablebodydata}>{row.address}</TableCell>
                <TableCell className={classes.tablebodydata}>{row.date_of_joining}</TableCell>
                <TableCell className={classes.tablebodydata}>{row.salary}</TableCell>
                <TableCell className={classes.tablebodydata}>{row.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
         
        <TableFooter>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={empList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
        </TableFooter>

        </Table>
      </TableContainer>   
      
      </div>
  );
    
}
