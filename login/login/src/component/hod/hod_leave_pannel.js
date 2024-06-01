import React, { useState ,useEffect} from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const HODLeavepannel = () => {
    const [rows, setRows] = useState([
        { id: 1, dep0: 'kavita', depdet0: '721620101006', depst0: 'Sick Leave' },
        { id: 2, dep0: 'priya', depdet0: '721620101090', depst0: 'Casual Leave' }
    ]);

    const[allData,setAllData] =useState([]);

    const token = localStorage.getItem('Token');
    console.log(token);

    const handleSubmit = async() => {
    
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        // axios.get('http://localhost:8000/api/hod/dashboard', config)
        //   .then(res => setAllData(res.data.leaveModel, res.data.students))
        //   .catch(err => console.error(err));

        try {
            const res = await axios.get('http://localhost:8000/api/hod/dashboard', config);
            setAllData(res.data.leaveModel); // Assuming leaveModel is the correct data
        } catch (err) {
            console.error(err);
        }
    };

    const handleApproveLeave = async (event, id) => {
        event.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            await axios.put(`http://localhost:8000/api/hod/approve-leave/${id}`, {}, config);
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
            await axios.put(`http://localhost:8000/api/hod/reject-leave/${id}`, {}, config);
            setAllData(allData.map(item => item._id === id ? { ...item, hodStatus: 'Rejected' } : item));
            window.location.reload(); // Reload the page after rejecting leave
        } catch (error) {
            console.error(error);
        }
    };






   
    useEffect(() => {
        handleSubmit();
    
    }, [])


   
    const leaveStatusHeader = allData.some(row => row.hodStatus === 'Approved') && allData.some(row => row.hodStatus === 'Rejected')
        ? 'Leave status'
        : allData.some(row => row.hodStatus === 'Approved')
            ? 'Leave status - Approved'
            : allData.some(row => row.hodStatus === 'Rejected')
                ? 'Leave status - Rejected'
                : 'Leave status';




    
    
    console.log("=====>",allData)


    return (
        <>
            <div className='vdmain-box'>
                <h1 className='head'>Students Leave List</h1>
                <div className='subdep-class'>
                    <table className='dep-table'>
                       <thead>
                        <tr id='top-table'>
                            <th>Leave ID</th>
                            {/* <th>Roll no.</th> */}
                            <th>Leave type</th>
                            <th>Leave Details</th>
                            <th>No.of Days</th>
                            <th>start Date</th>
                            <th>End Date</th>
                            <th>{leaveStatusHeader}</th>
                            <th>Edit Leave</th>
                        </tr>
                        </thead>
                    <tbody>
                        {/* {allData.map(row => ( */}
                        {allData.map(row => (
                                (row.hodStatus !== 'Approved' && row.hodStatus !== 'Rejected') && (
                                <tr key={row._id}>
                                    <td>{row._id}</td>
                                <td>{row.leaveType}</td>
                                <td>{row.leaveDetails}</td>
                                <td>{row.numOfDays}</td>
                                <td>{row.startLeaveDate}</td>
                                <td>{row.endLeaveDate}</td>
                                <td>{row.hodStatus}</td>
                                <td>
                                <div className='status'>
                                            <button onClick={(e) => handleApproveLeave(e, row._id)} style={{ color: 'green' }}>Approve</button>
                                            <button onClick={(e) => handleRejectLeave(e, row._id)} style={{ marginLeft: '10px', color: 'red' }}>Reject</button>
                                        </div>
                                </td>
                            </tr>
                            //new
                                )
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        // </>
    );
}

export default HODLeavepannel;

