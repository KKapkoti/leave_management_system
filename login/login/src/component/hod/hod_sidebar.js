import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { IoMdPeople } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { IoIosArrowDropupCircle } from "react-icons/io";
import { GoDiscussionOutdated } from "react-icons/go";
import Navbar from '../Navbar/navbar';


const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);


  return (
    <>
      <div className="link" onClick={showSubnav}>
        <div className="icon">{item.icon}</div>
        <div className="link_text">{item.name}</div>
        {subnav ? (
                    <div className="icon">{item.iconclose}</div>
        ) : (
            <div className="icon">{item.iconopen}</div>
        )}

      </div>
      {subnav &&
        item.submenu.map((subitem, index) => (
          <NavLink
            to={subitem.path}
            key={index}
            className="link"
            activeClassName="active"
            
          >
            {subitem.name}
          </NavLink>
        ))}
    </>
  );
};

const HODSidebar = ({ children }) => {
  const menuItem = [
    {
      path: '/hod_dashboard',
      name: 'Dashboard',
      icon: <AiOutlineDashboard />,
    },
    {
      path: '/view_st_leave',
      name: 'Leaves',
      icon: <GoDiscussionOutdated />,
    },
    {
      name: 'Student Pannel',
      icon: <GoDiscussionOutdated />,
      iconclose: <IoIosArrowDropupCircle />,
      iconopen: <IoIosArrowDropdownCircle />,
      submenu: [
        {
          path: '/hod_add_stdnt/view_st',
          name: 'View Student',
        },
        {
          path: '/hod_add_stdnt/add_st',
          name: 'Add Student',
        },
      ],
    },
    {
      path: '/login',
      name: 'Log Out',
      icon: <LuLogOut />,
    },
  ];
  
  return (
    <div className="container">
      <Navbar />
      <div className="sidebar">
        <div className="top_section">
        </div>
        {menuItem.map((item, index) => (
          <div key={index}>
            {item.submenu ? (
              // Render dropdown menu
              <div className="dropdown">
                <SubMenu item={item} />
              </div>
            ) : (
              // Render regular link
              <NavLink
                to={item.path}
                className="link"
                activeClassName="active"
              >
                <div className="icon">{item.icon}</div>
                <div className="link_text">{item.name}</div>
              </NavLink>
            )}
          </div>
        ))}
      </div>
      <main>
        {children}
      <div className='bottom-nav'>2024 &copy; copyright Leave Management System</div>
</main>
    </div>
  );
};

export default HODSidebar;