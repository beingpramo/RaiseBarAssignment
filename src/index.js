import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import EmpDetails from './components/EmployeeDetails';
import EmployeeDisplay from './components/EmpDisplay';
// import EmployeeDisplay from './components/EmployeeDisplay';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
     <Route path="/employee-hierarchical-display" element={<EmployeeDisplay/>}/>
     <Route path="/" element={<App/>}/>
     <Route path="/:empId" element={<EmpDetails/>}/>
    </Routes>
    </BrowserRouter>
);

