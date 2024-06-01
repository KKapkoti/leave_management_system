import React, { useState ,useEffect} from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

const Leave = () => {
    // const [rows, setRows] = useState([
    //     { id: 1, dep0: 'kavita', depdet0: '721620101006', depst0: 'Sick Leave' },
    //     { id: 2, dep0: 'priya', depdet0: '721620101090', depst0: 'Casual Leave' }
    // ]);

    const[allData,setAllData] =useState([]);



    const token = localStorage.getItem('Token');
    console.log(token);
    const handleSubmit = async() => {
    
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        axios.get('http://localhost:8000/api/admin/dashboard', config)
          .then(res => setAllData(res.data.leaveRequests))
          .catch(err => console.error(err));
    };



    const handleApproveLeave = async (event, id) => {
        event.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.put(`http://localhost:8000/api/admin/approve-leave/${id}`, {}, config);
            setAllData(allData.map(item => item._id === id ? { ...item, hodStatus: 'Approved' } : item));
            window.location.reload(); // Reload the page after approving leave
        } catch (error) {
            console.error(error);
        }
    };

    

    const handleRejectLeave = async (event, id) => {
        event.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.put(`http://localhost:8000/api/admin/reject-leave/${id}`, {}, config);
            setAllData(allData.map(item => item._id === id ? { ...item, hodStatus: 'Rejected' } : item));
            window.location.reload(); // Reload the page after rejecting leave
        } catch (error) {
            console.error(error);
        }
    };





    useEffect(() => {
        handleSubmit();
    
    }, [])
    


    const leaveStatusHeader = allData.some(row => row.adminStatus === 'Approved') && allData.some(row => row.adminStatus === 'Rejected')
    // ? 'Leave status - Approved - Rejected'
    ? 'Leave status'
    : allData.some(row => row.adminStatus === 'Approved')
        ? 'Leave status - Approved'
        : allData.some(row => row.adminStatus === 'Rejected')
            ? 'Leave status - Rejected'
            : 'Leave status';

    
    console.log("=====>",allData)


    return (
        <>
            <div className='vdmain-box'>
                <h1 className='head'>Students Leave List</h1>
                <div className='subdep-class'>
                    <table className='dep-table'>

                        <tr id='top-table'>
                            <th>Leave ID</th>
                            {/* <th>Roll no.</th> */}
                            <th>Leave type</th>
                            <th>Leave Details</th>
                            <th>No.of Days</th>
                            <th>start Date</th>
                            <th>End Date</th>
                            {/* <th>Leave status</th> */}
                            <th>{leaveStatusHeader}</th>
                            <th>Edit Leave</th>
                        </tr>

                        {allData.map(row => (
                            (row.adminStatus !== 'Approved' && row.adminStatus !== 'Rejected') && (
                            <tr key={row.id}>
                                <td>{row._id}</td>
                                <td>{row.leaveType}</td>
                                <td>{row.leaveDetails}</td>
                                <td>{row.numOfDays}</td>
                                <td>{row.startLeaveDate}</td>
                                <td>{row.endLeaveDate}</td>
                                <td>{row.adminStatus}</td>
                                <td>
                                    {/* <div className='status'>
                                    <a href='/' className='handleApproveLeave' style={{color:'green' }}>Approved</a>
                                    {/* <span className='gap'></span> Add a span with a class for spacing 
                                    <a href='/' className='handleRejectedLeave' style={{ marginLeft: '10px', color:'red' }}>Rejected</a>
                                    </div> */}
                                    <div className='status'>
                                            <button onClick={(e) => handleApproveLeave(e, row._id)} style={{ color: 'green' }}>Approve</button>
                                            <button onClick={(e) => handleRejectLeave(e, row._id)} style={{ marginLeft: '10px', color: 'red' }}>Reject</button>
                                        </div>
                                </td>
                            </tr>
                            )
                        ))}
                        
                    </table>
                </div>
            </div>
        </>
    );
}

export default Leave;
