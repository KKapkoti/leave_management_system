import React, { useState , useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"


import axios from "axios";

const ViewDepartment = () => {
    const [rows, setRows] = useState([
        // { id: 1, dep0: 'test', depst1: '16899', depst2: 'test@example.com', depst3:'01-07-2000', depst4:'1234567890', depst5:'student', depst6:'C.S.E.', depst7:'male', depst8:'India'},
        // { id: 1, dep0: 'kavita', depst1: '123678', depst2: 'kk@example.com', depst3:'24-07-2001', depst4:'7834487347', depst5:'student', depst6:'C.S.E.', depst7:'female', depst8:'lalkuan,nainital'},
        // //sample data
    ]);
    const[allData,setAllData] =useState([]);


    const navigate = useNavigate();
    const handleAddDepartmentClick = () => {
        navigate('/department/add');
    };







    const handleDeleteRow = (event, id) => {
        event.preventDefault();
        setRows(prevRows => prevRows.filter(row => row.id !== id));
    };

    const handleEditRow = (event) => {
        event.preventDefault();
        // Add your logic for handling edit here
    };
    const token = localStorage.getItem('Token');
    console.log(token);
    const handleSubmit = async() => {
    
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:8000/api/admin/dashboard', config)
          .then(res => setAllData(res.data.hods))
          .catch(err => console.error(err));
    };
    useEffect(() => {
        handleSubmit();
    
    }, [])

    
console.log("=====>",allData)

    return (
        <>
            <div className='vdmain-box'>
                <h1 className='head'>Depatrtment List</h1>
                <div className='subdep-class'>
                    <button className='add-dep' onClick={handleAddDepartmentClick}><IoIosAddCircleOutline /> Add Department</button>
                    <table className='dep-table'>

                        <tr id='top-table'>
                           <th>Department</th>
                            <th>Student name</th>
                            {/* <th>password</th> */}
                            <th>Phone</th>
                            <th>gender</th>
                            <th>Email</th>
                            <th>dateOfBirth</th>
                            <th>Address</th>              
                            <th>Role</th>                     
                            <th>Action</th>
                        </tr>

                        {allData.map(row => (
                            <tr key={row.id}>
                                <td>{row.department}</td>
                                <td>{row.name}</td>
                                <td>{row.phone}</td>
                                <td>{row.gender}</td>
                                 <td>{row.email}</td>
                                <td>{row.dateOfBirth}</td>
                                <td>{row.address}</td>
                                <td>{row.role}</td>
                                {/* <td>{row.depst8}</td> */}
                                <td>
                                    <a href='/' onClick={handleEditRow}><FaRegEdit /></a>
                                    <a href='/' onClick={(event) => handleDeleteRow(event, row.id)}><MdDelete /></a>
                                </td>
                            </tr>
                        ))}
                        
                    </table>
                </div>
            </div>
        </>
    );
}


export default ViewDepartment;
