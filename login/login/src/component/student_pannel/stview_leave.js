import React, { useState ,useEffect} from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const StViewLeave = () => {
    // const [rows, setRows] = useState([
    //     { id: 1, dep0: 'kavita', depdet0: '721620101006', depst0: 'Sick Leave' },
    //     { id: 2, dep0: 'priya', depdet0: '721620101090', depst0: 'Casual Leave' }
    // ]);

    const navigate = useNavigate();



    const[allData,setAllData] =useState([]);



    const token = localStorage.getItem('Token');
    console.log(token);
    const handleSubmit = async() => {
    
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:8000/api/leave/status', config)
          .then(res => setAllData(res.data.leaveRequests))
          .catch(err => console.error(err));
    };
    useEffect(() => {
        // handleSubmit();
    
    }, [])



    // const handleApplyLeaveClick = () => {
    //     navigate('/stapplyleave');
    // };


    
    
    console.log("=====>",allData)


    return (
        <>
            <div className='vdmain-box'>
                <h1 className='head'>Leave List</h1>
                <div className='subdep-class'>
                    {/* <button className='add-dep' onClick={handleApplyLeaveClick}><IoIosAddCircleOutline /> Apply Leave</button> */}
                    <table className='dep-table'>

                        <tr id='top-table'>
                            <th>Leave ID</th>
                            {/* <th>Roll no.</th> */}
                            <th>Leave type</th>
                            <th>Leave Details</th>
                            <th>No.of Days</th>
                            <th>start Date</th>
                            <th>End Date</th>
                            <th>Leave status</th>
                            <th>Edit Leave</th>
                        </tr>

                        {allData.map(row => (
                            <tr key={row.id}>
                                <td>{row._id}</td>
                                <td>{row.leaveType}</td>
                                <td>{row.leaveDetails}</td>
                                <td>{row.numOfDays}</td>
                                <td>{row.startLeaveDate}</td>
                                <td>{row.endLeaveDate}</td>
                                <td>{row.hodStatus}</td>
                                {/* <td>
                                    <div className='status'>
                                    <a href='/' className='handleApproveLeave' style={{color:'green' }}>Approved</a>
                                    <a href='/' className='handleRejectedLeave' style={{ marginLeft: '10px', color:'red' }}>Rejected</a>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                        
                    </table>
                </div>
            </div>
        </>
    );
}

export default StViewLeave;
