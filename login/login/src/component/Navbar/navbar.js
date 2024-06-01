
import React, { useState, useEffect, useRef } from "react";
import logo from "../icons/logo.png";

// const DropdownProfile = () => {
//     return (
//         <div className="dropdown-profile">
//             <ul>
//                 <a href="#"><li>Menu 1</li></a>
//                 <a href="#"><li>Menu 2</li></a>
//                 <a href="#"><li>Menu 3</li></a>
//             </ul>
//         </div>
//     );
// };

const Navbar = () => {
//     const [dropdownVisible, setDropdownVisible] = useState(false);
//     const dropdownRef = useRef(null);

//     const toggleDropdown = () => {
//         setDropdownVisible(!dropdownVisible);
//     };

//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setDropdownVisible(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, []);

    return (
        <nav className="nav">
            <div className="lms">
                <img className="img" src={logo} alt="logo" />
            </div>
            <div className="nav-area">
                <h1 className="navtext">Leave Management System</h1>
                {/* <a className="profile" onClick={toggleDropdown}>
                    Profile
                </a>
                {dropdownVisible && (
                    <div ref={dropdownRef} className="dropdown-container">
                        <DropdownProfile />
                    </div>
                )} */}
            </div>
        </nav>
    );
};

export default Navbar;