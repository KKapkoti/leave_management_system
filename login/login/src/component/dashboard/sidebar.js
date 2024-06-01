// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AiOutlineDashboard } from 'react-icons/ai';
// import { MdDashboard } from 'react-icons/md';
// import { IoMdPeople } from 'react-icons/io';
// import { LuLogOut } from 'react-icons/lu';
// import { IoIosArrowDropdownCircle } from 'react-icons/io';
// import { IoIosArrowDropupCircle } from 'react-icons/io';
// import { GoDiscussionOutdated } from 'react-icons/go';
// import Navbar from '../Navbar/navbar';


// const SubMenu = ({ item }) => {
//   const [subnav, setSubnav] = useState(false);

//   const showSubnav = () => setSubnav(!subnav);

//   return (
//     <>
//       <div className="link submenu-item" onClick={showSubnav}>
//         <div className="icon">{item.icon}</div>
//         <div className="link_text">{item.name}</div>
//         {subnav ? (
//           <div className="icon">{item.iconclose}</div>
//         ) : (
//           <div className="icon">{item.iconopen}</div>
//         )}
//       </div>
//       {subnav &&
//         item.submenu.map((subitem, index) => (
//           <NavLink
//             to={subitem.path}
//             key={index}
//             className="link sublink-item"
//             activeClassName="active"
//           >
//             {subitem.name}
//           </NavLink>
//         ))}
//     </>
//   );
// };

// const Sidebar = ({ children }) => {
//   const menuItem = [
//     {
//       path: '/dashboard',
//       name: 'Dashboard',
//       icon: <AiOutlineDashboard />,
//     },
//     {
//       name: 'Department',
//       icon: <MdDashboard />,
//       iconclose: <IoIosArrowDropupCircle />,
//       iconopen: <IoIosArrowDropdownCircle />,
//       submenu: [
//         {
//           path: '/department/view',
//           name: 'View Departments',
//         },
//         {
//           path: '/department/add',
//           name: 'Add Department',
//         },
//       ],
//     },
//     {
//       path: '/manage_students',
//       name: 'Manage Students',
//       icon: <IoMdPeople />,
//       iconclose: <IoIosArrowDropupCircle />,
//       iconopen: <IoIosArrowDropdownCircle />,
//       submenu: [
//         {
//           path: '/manage_students/viewstudent',
//           name: 'View Student',
//         },
//         {
//           path: '/manage_students/addstudent',
//           name: 'Add Student',
//         },
//       ],
//     },
//     {
//       path: '/leave',
//       name: 'Leaves',
//       icon: <GoDiscussionOutdated />,
//     },
//   ];

//   const logoutItem = {
//     path: '/login',
//     name: 'Log Out',
//     icon: <LuLogOut />,
//   };

//   return (
//     <div className='headnav'>
//     <div className="container">
//       <div className="top-nav">
//         <Navbar />
//           {/* <input type="text" className="search-input" placeholder="Search..." /> */}
//           {/* <button className="search-button">Search</button> */}
//         </div>
//       <div className="sidebar">
//       <br />
//         {menuItem.map((item, index) => (
//           <div key={index}>
//             {item.submenu ? (
//               // Render dropdown menu
//               <div className="dropdown">
//                 <SubMenu item={item} />
//               </div>
//             ) : (
//               // Render regular link
//               <NavLink
//                 to={item.path}
//                 className="link"
//                 activeClassName="active"
//               >
//                 <div className="icon">{item.icon}</div>
//                 <div className="link_text">{item.name}</div>
//               </NavLink>
//             )}
//           </div>
//         ))}

//           <div className="logout">
//             <NavLink
//               to={logoutItem.path}
//               className="link"
//               activeClassName="active"
//             >
//               <div className="icon">{logoutItem.icon}</div>
//               <div className="link_text">{logoutItem.name}</div>
//             </NavLink>
//           </div>

//       </div>
//       <main>
        
//         {children}
//         <div className="bottom-nav">
//           2024 &copy; copyright Leave Management System
//         </div>
//       </main>
//     </div>
//     </div>
//   );
// };

// export default Sidebar;





import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import { IoMdPeople } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { IoIosArrowDropupCircle } from 'react-icons/io';
import Navbar from '../Navbar/navbar';


const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div className="link submenu-item" onClick={showSubnav}>
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
            className="link sublink-item"
            activeClassName="active"
          >
            {subitem.name}
          </NavLink>
        ))}
    </>
  );
};

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <AiOutlineDashboard />,
    },
    {
      name: 'Department',
      icon: <MdDashboard />,
      iconclose: <IoIosArrowDropupCircle />,
      iconopen: <IoIosArrowDropdownCircle />,
      submenu: [
        {
          path: '/department/view',
          name: 'View Departments',
        },
        {
          path: '/department/add',
          name: 'Add H.O.D',
        },
      ],
    },
    {
      path: '/manage_students',
      name: 'Manage Students',
      icon: <IoMdPeople />,
      iconclose: <IoIosArrowDropupCircle />,
      iconopen: <IoIosArrowDropdownCircle />,
      submenu: [
        {
          path: '/manage_students/viewstudent',
          name: 'View Student',
        },
        {
          path: '/leave',  // /manage_students/addstudent
          name: 'View Leaves',
        },
      ],
    },
    // {
    //   path: '/leave',
    //   name: 'H.O.D',
    //   icon: <GoDiscussionOutdated />,
    // },
  ];

  const logoutItem = {
    path: '/login',
    name: 'Log Out',
    icon: <LuLogOut />,
  };

  return (
    <div className='headnav'>
    <div className="container">
      <div className="top-nav">
        <Navbar />
          {/* <input type="text" className="search-input" placeholder="Search..." /> */}
          {/* <button className="search-button">Search</button> */}
        </div>
      <div className="sidebar">
      <br />
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

          <div className="logout">
            <NavLink
              to={logoutItem.path}
              className="link"
              activeClassName="active"
            >
              <div className="icon">{logoutItem.icon}</div>
              <div className="link_text">{logoutItem.name}</div>
            </NavLink>
          </div>

      </div>
      <main>
        
        {children}
        <div className="bottom-nav">
          2024 &copy; copyright Leave Management System
        </div>
      </main>
    </div>
    </div>
  );
};

export default Sidebar;
