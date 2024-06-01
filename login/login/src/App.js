import React from 'react';
import Login from './component/dashboard/login';
import Sidebar from './component/dashboard/sidebar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Dashboard from './component/dashboard/dashboard';
import AddHod from './component/dashboard/addhod';
import ViewDepartment from './component/dashboard/viewdep';
import ViewStudent from './component/dashboard/viewst';
import AddStudent from './component/dashboard/addst';
import Leave from './component/dashboard/leave';
import StDashboard from './component/student_pannel/st_dashboard';
import Stsidebar from './component/student_pannel/st_sidebar';
import StViewLeave from './component/student_pannel/stview_leave';
import StLeaveApply from './component/student_pannel/stapply_leave';
import HODSidebar from './component/hod/hod_sidebar';
import HODDashboard from './component/hod/hod_dashboard';
import HODLeavepannel from './component/hod/hod_leave_pannel';
import HODviewst from './component/hod/hod_view_student';
import HODAddSt from './component/hod/hod_add_st';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Default route for the root path */}
        {/* Login route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* Sidebar routes */}
        <Route path="/dashboard" element={<Sidebar><Dashboard /></Sidebar>} />
        <Route path="/department/view" element={<Sidebar><ViewDepartment /></Sidebar>} />
        <Route path="/department/add" element={<Sidebar><AddHod /></Sidebar>} />
        <Route path="/manage_students/viewstudent" element={<Sidebar><ViewStudent /></Sidebar>} />
        <Route path="/manage_students/addstudent" element={<Sidebar><AddStudent /></Sidebar>} />
        <Route path="/leave" element={<Sidebar><Leave /></Sidebar>} />
        
        <Route path='/stdashboard' element={<Stsidebar><StDashboard /></Stsidebar>} />
        <Route path='/stleave' element={<Stsidebar><StViewLeave /></Stsidebar>} />
        <Route path='/stapplyleave' element={<Stsidebar><StLeaveApply /></Stsidebar>} />


        {/* <Route path='/hod_dashboard' element={<HODSidebar></HODSidebar>} /> */}
        <Route path='/hod_dashboard' element={<HODSidebar><HODDashboard /></HODSidebar>} />
        <Route path='/view_st_leave' element={<HODSidebar><HODLeavepannel /></HODSidebar>} />
        <Route path="/hod_add_stdnt/view_st" element={<HODSidebar><HODviewst /></HODSidebar>} />
        <Route path="/hod_add_stdnt/add_st" element={<HODSidebar><HODAddSt /></HODSidebar>} />
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
