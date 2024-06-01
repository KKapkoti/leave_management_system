import React from 'react'
import { useState } from 'react';
import DatePicker from 'react-date-picker';



const AddStudent = () => {
    
    const [value, onChange] = useState(new Date());    

    return(
        
        <div className='vdmain-box'>
            <h1 className='head'>Add Students</h1>
            <div className='create-subdep'>
                <form>
                    <div className='create-student-form'>
                    <div className='first-half'>
                    <label htmlFor="depid">Choose Department:</label>
                    <br />
                        <select className='input' name="dep" id="dep">
                          <option value="select">Select</option>
                          <option value="cse">Computer Science</option>
                        </select>
                    <br />
                    <label htmlFor="depname" className='stdnt-form'>First Name:</label>
                    <br />
                    <input type="text" id="depname" name="depname" />
                    <br />
                    <label htmlFor="depshortname" className='stdnt-form'>Second Name:</label>
                    <br />
                    <input type="text" id="depshortname" name="depshortname" />
                    <br />
                    <label htmlFor="depdetails" className='student-form'>Mobile No:</label>
                    <br />
                    <input type="number" id="depdetails" name="depdetails" />
                    <br />
                    <label htmlFor="depdetails" className='student-form'>Password:</label>
                    <br />
                    <input type="password" id="depdetails" name="depdetails" />
                    
                    </div>
                    

                    <div className='second-half'>
                    <label htmlFor="depid">Gender:</label><br />
                        <select className='input' name="dep" id="dep">
                          <option value="select">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                    <br />
                    <label htmlFor="depname" className='student-form'>Student E-mail:</label>
                    <br />
                    <input type="email" id="depname" name="depname" />
                    <br />
                    <label htmlFor="depshortname" className='student-form'>Student Short Name:</label>
                    <br />
                    <input type="text" id="depshortname" name="depshortname" />
                    <br />
                    <label htmlFor="depdetails" className='student-form'>Address:</label>
                    <br />
                    <textarea rows="4" cols="50" id='address'></textarea>
                    <br />
                    </div>
                    </div>
                    <br />
                    <input className='submit-btn' type="submit" value="Add Student" />
                </form>
            </div>
        </div>
    )
}

export default AddStudent;