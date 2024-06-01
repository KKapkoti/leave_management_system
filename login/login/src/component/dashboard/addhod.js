// import React from 'react'

// const AddDepartment = () => {
//     return(
//         <div className='vdmain-box'>
//             <h1 className='head'>Create Department</h1>
//             <div className='create-subdep'>
                
//                 <form className='create-dep-form'>
//                     <label htmlFor="depname" className='dept-form'>Department Name:</label>
                    
//                     <input type="text" id="depname" name="depname" />
//                     <br />
//                     <label htmlFor="depshortname" className='dept-form'>Department Short Name:</label>
                    
//                     <input type="text" id="depshortname" name="depshortname" />
//                     <br />
//                     <label htmlFor="depdetails" className='dept-form'>Department details:</label>
                    
//                     <input type="text" id="depdetails" name="depdetails" />
//                     <br />
//                     <div className='checkbox'>
//                     <input type="checkbox" id="dep-status" name="dep-status" />
//                     <label htmlFor="dep-status"> Department Status</label>
//                     </div>
//                     <input className='submit-btn' type="submit" value="Create Department" />
//                 </form>

                
//             </div>
//         </div>
//     )
// }

// export default AddDepartment;







import React, { useState, useEffect, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 


const AddHOD = () => {
    const [user, setUser] = useState({
        department: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        role: "HOD",
        gender: "",
        dateOfBirth: null,
        address: ""
    });


    // Retrieve token from localStorage
    const token = localStorage.getItem('Token');
    //Define Navigation
    const navigate = useNavigate();

    // const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    // const datePickerRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    // const handleDateChange = (date) => {
    //     setUser(prevUser => ({
    //         ...prevUser,
    //         dateOfBirth: date
    //     }));
    // };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
         }
        };


        const userData = {
            ...user,
            dateOfBirth: user.dateOfBirth.toISOString() // date is in ISO format
          };


        try {
            console.log('User data being submitted:', userData);
            await axios.post('http://localhost:8000/api/admin/add-hod', userData, config);
            alert('Student added successfully!');
            setUser({
                name: "",
                email: "",
                phone: "",
                password: "",
                gender: "",
                // dateOfBirth: "",
                dateOfBirth: new Date(),
                address: ""
            });
            navigate("/department/view");  
        } catch (err) {
            console.error('Error adding hod:', err);
            alert('Error adding hod. Please try again.');
        }
    };

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
    //             setIsDatePickerOpen(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);



    return (
        <div className='vdmain-box'>
            <h1 className='head'>Add HOD</h1>
            <div className='create-subdep'>
                <form onSubmit={handleSubmit}>
                    <div className='department-form'>
                        <div className='first-half'>
                            <label htmlFor="department">Choose Department:</label>
                            <br />
                            <select className='input' name="department" id="department" value={user.department} onChange={handleChange}>
                                <option value="select">Select</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="CSE">Computer Science</option>
                                <option value="Civil">Civil</option>
                                <option value="AI&ML">AI&ML</option>
                                <option value="Robotics & Automation">Robotics & Automation</option>
                            </select>
                            <br />
                            <label htmlFor="name" className='hod-form'>Name:</label>
                            <br />
                            <input type="text" id="depname" name="name" value={user.name} onChange={handleChange} />
                            <br />
                            <label htmlFor="phone" className='hod-form'>Mobile No:</label>
                            <br />
                            <input type="tel" id="depphone" name="phone" value={user.phone} onChange={handleChange} />
                            <br />
                            <label htmlFor="email" className='hod-form'>HOD E-mail:</label>
                            <br />
                            <input type="email" id="depemail" name="email" value={user.email} onChange={handleChange} />
                            <br />
                            <label htmlFor="password" className='hod-form'>Password:</label>
                            <br />
                            <input type="password" id="deppass" name="password" value={user.password} onChange={handleChange} />
                        </div>

                        <div className='second-half'>
                            <label htmlFor="gender">Gender:</label>
                            <br />
                            <select className='input' name="gender" id="gender" value={user.gender} onChange={handleChange}>
                                <option value="select">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <br /> <br />
                            <label htmlFor="dateOfBirth" className='hod-form'>Date of Birth:</label>
                            <br /> 
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div style={{margin: "10px 0px 0px 5px", backgroundColor: "rgb(209, 209, 209)", width: "35vh"}} >
                                    <DatePicker
                                        label="D.O.B"
                                        value={user.dateOfBirth}
                                        // onChange={handleDateChange}
                                        // onOpen={() => setIsDatePickerOpen(true)}
                                        // onClose={() => setIsDatePickerOpen(false)}
                                        // open={isDatePickerOpen}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                            </LocalizationProvider>
                            <br />
                            <label htmlFor="address" className='hod-form'>Address:</label>
                            <br />
                            <textarea rows="4" cols="50" id='address' name='address' value={user.address} onChange={handleChange}></textarea>
                            <br />
                        </div>
                    </div>
                    <br />
                    <input className='submit-btn' type="submit" value="Add HOD" />
                </form>
            </div>
        </div>
    );
}

export default AddHOD;





