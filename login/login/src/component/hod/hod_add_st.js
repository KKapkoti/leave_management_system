

import React, { useState , useEffect } from 'react';
import { DatePicker } from 'rsuite';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import 'rsuite/dist/rsuite.min.css'; 


const HODAddSt = () => {
    const [user, setUser] = useState({
        // Department: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        // dateOfBirth: "",
        dateOfBirth: new Date(),
        address: ""
    });

     // Retrieve token from localStorage
     const token = localStorage.getItem('Token');
     //Define Navigation
     const navigate = useNavigate();


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUser(prevUser => ({
    //         ...prevUser,
    //         [name]: value
    //     }));
    // };


    const handleChange = (e) => {
        if (e && e.target) { // Check if the event object and its target property are not null
            const { name, value } = e.target;
            setUser(prevUser => ({
                ...prevUser,
                [name]: value
            }));
        }
    };




    //new
    const handleDateChange = (value) => {
        setUser(prevUser => ({
            ...prevUser,
            dateOfBirth: value
        }));
    };


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
            await axios.post('http://localhost:8000/api/hod/add-students', userData, config);
            alert('Student added successfully!');
            // Optionally, we can reset the form fields after submission
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
            navigate("/hod_add_stdnt/view_st");  // Navigate to the hod_ad_student route after successful submission
        } catch (err) {
            console.error('Error adding student:', err);
            alert('Error adding student. Please try again.');
        }
    };
      
    return (
        <div className='vdmain-box'>
            <h1 className='head'>Add Students</h1>
            <div className='create-subdep'>
                <form onSubmit={handleSubmit}>
                    <div className='create-student-form'>
                        <div className='first-half'>
                            <label htmlFor="name">Name:</label>
                            <br />
                            <input className="input" type="text" id="name" name="name" value={user.name} onChange={handleChange} />
                            <br />
                            <label htmlFor="email">Student E-mail:</label>
                            <br />
                            <input className="input" type="email" id="email" name="email" value={user.email} onChange={handleChange} />
                            <br />
                            <label htmlFor="phone">Mobile No:</label>
                            <br />
                            <input className="input" type="phone" id="phone" name="phone" value={user.phone} onChange={handleChange} />
                            <br />
                            <label htmlFor="password">Password:</label>
                            <br />
                            <input className="input" type="password" id="password" name="password" value={user.password} onChange={handleChange} />
                        </div>

                        <div className='second-half'>
                            <label htmlFor="gender">Gender:</label><br />
                            <select className='input' id="gender" name="gender" value={user.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <br />
                            <label htmlFor="dateOfBirth">Date of Birth:</label>
                            <br />
                            <DatePicker id="dateOfBirth" name="dateOfBirth" value={user.dateOfBirth} onChange={handleDateChange} />
                            <br />
                            <label htmlFor="address">Address:</label>
                            <br />
                            <textarea id="address" name="address" value={user.address} onChange={handleChange} rows="4" cols="50"></textarea>
                        </div>
                    </div>
                    <br />
                    <input className='submit-btn' type="submit" value="Add Student" />
                </form>
            </div>
        </div>
    );
}

export default HODAddSt;
     

