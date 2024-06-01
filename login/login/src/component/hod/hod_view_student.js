// import React, { useState , useEffect } from 'react';
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// const HODviewst = () => {
//     const [rows, setRows] = useState([
//         { id: 1, dep0: 'test', depst1: '16899', depst2: 'test@example.com', depst3:'01-07-2000', depst4:'1234567890', depst5:'student', depst6:'C.S.E.', depst7:'male', depst8:'India'},
//         { id: 1, dep0: 'kavita', depst1: '123678', depst2: 'kk@example.com', depst3:'24-07-2001', depst4:'7834487347', depst5:'student', depst6:'C.S.E.', depst7:'female', depst8:'lalkuan,nainital'},
//         //sample data
//     ]);

//     const navigate = useNavigate();
//     const handleAddStudentClick = () => {
//         navigate('/hod_add_stdnt/add_st');
//     };


//     const[allData,setAllData] =useState([]);


//     const handleDeleteRow = (event, id) => {
//         event.preventDefault();
//         setRows(prevRows => prevRows.filter(row => row.id !== id));
//     };

//     const handleEditRow = (event) => {
//         event.preventDefault();
//         // Add your logic for handling edit here
//     };
//     const token = localStorage.getItem('Token');
//     console.log(token);
//     const handleSubmit = async() => {
    
//         const config = {
//           headers: { Authorization: `Bearer ${token}` }
//         };
//         axios.get('http://localhost:8000/api/hod/students', config)
//           .then(res => setAllData(res.data.students))
//           .catch(err => console.error(err));
//     };
//     useEffect(() => {
//         handleSubmit();
    
//     }, [])

    
// console.log("=====>",allData)

//     return (
//         <>
//             <div className='vdmain-box'>
//                 <h1 className='head'>Student List</h1>
//                 <div className='subdep-class'>
//                     <button className='add-dep' onClick={handleAddStudentClick}><IoIosAddCircleOutline /> Add Student</button>
//                     <table className='dep-table'>

//                         <tr id='top-table'>
//                            <th>Department</th>
//                             <th>Student name</th>
//                             {/* <th>password</th> */}
//                             <th>Phone</th>
//                             <th>gender</th>
//                             <th>Email</th>
//                             <th>dateOfBirth</th>
//                             <th>Address</th>              
//                             <th>Role</th>                     
//                             <th>Action</th>
//                         </tr>

//                         {allData.map(row => (
//                             <tr key={row.id}>
//                                 <td>{row.department}</td>
//                                 <td>{row.name}</td>
//                                 <td>{row.phone}</td>
//                                 <td>{row.gender}</td>
//                                  <td>{row.email}</td>
//                                 <td>{row.dateOfBirth}</td>
//                                 <td>{row.address}</td>
//                                 <td>{row.role}</td>
//                                 {/* <td>{row.depst8}</td> */}
//                                 <td>
//                                     <a href='/' onClick={handleEditRow}><FaRegEdit /></a>
//                                     <a href='/' onClick={(event) => handleDeleteRow(event, row.id)}><MdDelete /></a>
//                                 </td>
//                             </tr>
//                         ))}
                        
//                     </table>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default HODviewst;




import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const HODviewst = () => {
    const [allData, setAllData] = useState([]);
    const navigate = useNavigate();

    const handleAddStudentClick = () => {
        navigate('/hod_add_stdnt/add_st');
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('Token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get('http://localhost:8000/api/hod/students', config);
            setAllData(res.data.students);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteRow = async (id) => {
        try {
            const token = localStorage.getItem('Token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`http://localhost:8000/api/hod/delete-student/${id}`, config);
            setAllData(prevData => prevData.filter(row => row.id !== id));  
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditRow = (id) => {
        navigate(`/edit-student/${id}`);
    };

    return (
        <>
            <div className='vdmain-box'>
                <h1 className='head'>Student List</h1>
                <div className='subdep-class'>
                    <button className='add-dep' onClick={handleAddStudentClick}><IoIosAddCircleOutline /> Add Student</button>
                    <table className='dep-table'>
                        <thead>
                            <tr id='top-table'>
                                <th>Department</th>
                                <th>Student name</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
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
                                    <td>
                                        <a href='/' onClick={() => handleEditRow(row.id)}><FaRegEdit /></a>
                                        <a href='/' onClick={() => handleDeleteRow(row.id)}><MdDelete /></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default HODviewst;
