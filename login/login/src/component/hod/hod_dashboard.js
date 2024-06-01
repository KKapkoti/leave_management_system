import React, { useState , useEffect } from 'react';
import { FaRegClipboard } from "react-icons/fa";
import { BsClipboard2X } from "react-icons/bs";
import { BsClipboardCheck } from "react-icons/bs";
import { MdPendingActions } from "react-icons/md";
import axios from "axios";

// 




const HODDashboard = () => {
    const [totalLeaves, setTotalLeaves] = useState(0);
    const [studentsData, setStudentsData] = useState([]);
    const [leaveCounts, setLeaveCounts] = useState({ pending: 0, approved: 0, rejected: 0 });

    const token = localStorage.getItem('Token');

    useEffect(() => {
        const fetchData = async () => {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                const res = await axios.get('http://localhost:8000/api/hod/dashboard', config);
                const leaveModel = res.data.leaveModel || [];
                const students = res.data.students || [];
                setTotalLeaves(leaveModel.length);
                setStudentsData(students);

                // Calculate leave counts
                const counts = { pending: 0, approved: 0, rejected: 0 };
                leaveModel.forEach(leave => {
                    if (leave.hodStatus === 'Pending') {
                        counts.pending++;
                    } else if(leave.hodStatus === 'Approved') {
                        counts.approved++;
                    } else if(leave.hodStatus === 'Rejected') {
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

    
// console.log("=====>",allData)








    return(
        <>            
            <div className='second-box'>
                
                <h1 className='head'>HOD Dashboard</h1>
            
                    <div className='boxes'>
                        {/* <div className='box'><FaRegClipboard size={30} />Total Leave</div> */}
                         <div className='box'>
                         <div className="box-icon"><FaRegClipboard size={30} /></div>
                          <div className="box-text"><h2>{totalLeaves}</h2>Total Leave:</div>
                        </div> 
                        <div className='box'>
                        <div className="box-icon"><BsClipboard2X size={30} /></div>
                           <div className="box-text"><h2>{leaveCounts.rejected}</h2> Rejected Leave:</div> 
                        </div>
                        <div className='box'>
                        <div className="box-icon"><BsClipboardCheck size={30} /></div>
                            <div className="box-text"><h2>{leaveCounts.approved}</h2>Approved Leave: </div>
                        </div>
                        <div className='box'>
                        <div className="box-icon"><MdPendingActions size={30} /></div>
                            <div className="box-text"><h2>{leaveCounts.pending}</h2>Pending Leave: </div>
                        </div>
                    </div>
                <div className='fourth-box'>
                        <div className='third-box '>
                          <h2>Department Faculty</h2>
                          <br />
                            <table className='table-das'>
                                <tbody>
                                    <tr>
                                        <td>Prof. Hardwari Lal Mandoria <b>Director</b></td>
                                    </tr>
                                    <tr>
                                        <td>Ms. Neha Bisht <b>Head of Department</b></td>
                                    </tr>
                                    <tr>
                                        <td>Mr. Lalit Mohan Joshi</td>
                                    </tr>
                                    <tr>
                                        <td>Mr. Naresh Kumar</td>
                                    </tr>
                                    <tr>
                                        <td>Ms. Rashmi Dhaundiyal</td>
                                    </tr>
                                    <tr>
                                        <td>Mrs. Priyankya Pandey</td>
                                    </tr>
                                    <tr>
                                        <td>Mr. Narendra Bishwas</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>


                    <div className='third-box'>
                        <h2>Student List</h2>
                        <br />
                            <table className='table-das'>
                                <tbody>
                                    {studentsData.map((student, index) => {
                                        console.log("Student Object:", student); // Add logging statement
                                        return (
                                            <tr key={index}>
                                                <td>{student.name}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
        </>        
    );
};


export default HODDashboard;














