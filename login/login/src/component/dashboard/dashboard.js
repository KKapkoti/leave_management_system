import React, { useState , useEffect } from 'react';
import { FaRegClipboard } from "react-icons/fa";
import { BsClipboard2X } from "react-icons/bs";
import { BsClipboardCheck } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";
import axios from "axios";



const Dashboard = () => {

    const [totalLeaves, setTotalLeaves] = useState(0);
    const [departmentsData, setDepartmentsData] = useState([]);
    const [hodsData, setHodsData] = useState([]); // Corrected state setter name
    const [leaveCounts, setLeaveCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
    const token = localStorage.getItem('Token');

    useEffect(() => {
        const fetchData = async () => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const res = await axios.get('http://localhost:8000/api/admin/dashboard', config);
                const leaveRequests = res.data.leaveRequests || [];
                const departments = res.data.departments || [];
                const hods = res.data.hods || [];
                setTotalLeaves(leaveRequests.length);
                setDepartmentsData(departments);
                setHodsData(hods);

                // Calculate leave counts
                const counts = { pending: 0, approved: 0, rejected: 0 };
                leaveRequests.forEach(leave => {
                    if (leave.adminStatus === 'Pending') {
                        counts.pending++;
                    } else if (leave.adminStatus === 'Approved') {
                        counts.approved++;
                    } else if (leave.adminStatus === 'Rejected') {
                        counts.rejected++;
                    }
                });
                setLeaveCounts(counts);

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [token]);

    return(
        <>            
            <div className='second-box'>
                
                <h1 className='head'>Data Information</h1>
            
                <div className='boxes'>
                        {/* <div className='box'><FaRegClipboard size={30} />Total Leave</div> */}
                         <div className='box'>
                            <div className="box-icon"><FaRegClipboard size={45} /></div>
                         <div className="box-text"><h2>{totalLeaves}</h2>Total Leave: </div>
                        </div> 
                        <div className='box'>
                            <div className="box-icon"><BsClipboard2X size={45} /></div>
                            <div className="box-text"><h2>{leaveCounts.rejected}</h2> Rejected Leave:</div>
                        </div>
                        <div className='box'>
                            <div className="box-icon"><BsClipboardCheck size={45} /></div>
                            <div className="box-text"><h2>{leaveCounts.approved}</h2> Approved Leave:</div>
                        </div>
                        <div className='box'>
                            <div className="box-icon"><MdPendingActions size={45} /></div>
                            <div className="box-text"><h2>{leaveCounts.pending}</h2>Pending Leave: </div>
                        </div>
                    </div>
                <div className='fourth-box'>
                <div className='third-box'>
                        <h2>Department Heads</h2>
                        <table>
                            <tbody>
                                {departmentsData.map((departments, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{departments}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className='third-box'>
                        <h2>Staffs</h2>
                        <table>
                            <tbody>
                                {hodsData.map((hods, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{hods.name}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        </>        
    )
}

export default Dashboard;


