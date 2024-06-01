import { PieChart } from 'react-minimal-pie-chart';

const StDashboard = () => {
    const data = [
        { title: 'Pending', value: 80, color: '#F0E68C', label: 'Pending' },
        { title: 'Rejected', value: 10, color: '#FF0000', label: 'Rejected' },
        { title: 'Approved', value: 10, color: '#00FF00', label: 'Approved' },
    ];

    return (

        
        <>
            <div className='vdmain-box'>
                <h1 className='head'>Student leave List</h1>

                <div className='main_chart_box'>
                <div className='chart_box'>
                <PieChart
                    className='chart'
                    data={data}
                    label={({ dataEntry }) => dataEntry.label} // Show label for each pie segment
                    labelStyle={{
                        fontSize: '3px',
                        fontFamily: 'sans-serif',
                        fill: '#000000',
                    }}/>

                    <div className='chart_result'>
                        <div className='res_approve'><div><h2>Approved</h2></div><div><h2>0</h2></div></div>
                        <br />
                        <div className='res_reject'><div><h2>Rejected</h2></div><div><h2>0</h2></div></div>
                    </div>

                    </div>
                    </div>
            </div>
        </>
    );
}

export default StDashboard;
