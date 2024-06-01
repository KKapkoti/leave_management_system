import { DatePicker } from 'rsuite';
import React, { useState , useEffect } from 'react';
// import { DatePicker } from 'rsuite';
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import 'rsuite/dist/rsuite.min.css'; 

const StLeaveApply = () => {
        const [user, setUser] = useState({
            // Department: "",
            leaveType: "",
            startLeaveDate: "",
            endLeaveDate: "",
            leaveDetails: "",
            numOfDays: "",
        });
    
         // Retrieve token from localStorage
         const token = localStorage.getItem('Token');
         //Define Navigation
         const navigate = useNavigate();

    
        const handleChange = (e) => {
            if (e && e.target) { // Check if the event object and its target property are not null
                const { name, value } = e.target;
                setUser(prevUser => ({
                    ...prevUser,
                    [name]: value
                }));
            }
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
                await axios.post('http://localhost:8000/api/leave/apply', userData, config);
                alert('Leave added successfully!');
                // Optionally, we can reset the form fields after submission
                setUser({
                    leaveType: "",
                    startLeaveDate: "",
                    endLeaveDate: "",
                    leaveDetails: "",
                    numOfDays: "",
                });
                navigate("/stleave");  // Navigate to the hod_ad_student route after successful submission
            } catch (err) {
                console.error('Error adding leave:', err);
                alert('Error adding leave. Please try again.');
            }
        };
    return(
        <div className='vdmain-box'>
            <h1 className='head'>Apply Student Leave</h1>
            <div className='create-subdep'>
                <form>
                    <div className='create-student-form'>
                    <div className='first-half'>
                    <br />
                    <label htmlFor="depname" className='student-form'>Leave Type</label>
                    <br />
                    <select name="dep" className='select_dep' id="dep">
                          <option value="select">Select</option>
                          <option value="select">Sick Leave</option>
                          <option value="select">Casual Leave</option>
                          <option value="select">Medical Leave</option>
                          <option value="select">Other</option>
                        </select>                    
                    <br />
                    <label htmlFor="depshortname" className='student-form'>Start Leave Date</label>
                    <br />
                    <DatePicker />
                    <br />
                    
                    </div>
                    

                    <div className='second-half'>
                    <label htmlFor="depname" className='student-form'>Number Of days:</label>
                    <br />
                    <input type="number" id="depname" name="depname" />
                    <br />
                    <label htmlFor="depshortname" className='student-form'>End Leave Date:</label>
                    <br />
                    <DatePicker />
                    <br />
                    </div>
                    </div>
                    <label htmlFor="depdetails" className='student-form'>Leave Details:</label>
                    <br />
                    <textarea rows="4" cols="50" id='address'></textarea>
                    <br />
                    <br />
                    <input className='submit-btn' type="submit" value="Add Student" />
                </form>
            </div>
        </div>
    )
}

export default StLeaveApply;