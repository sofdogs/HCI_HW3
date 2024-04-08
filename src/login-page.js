import React, { useState } from 'react';
import './login.css'
import { useNavigate } from "react-router-dom"; 

// users' data vars ... 
const usersData = [
    {
      name: 'Sara Norman',
      id: '5344-9709',
      doctorName: 'Dr. Jason Rosenberg',
      doctorPhone: '579-0432',
      glucoseLevels: {
        low: 80,
        high: 140
      }
    },
    {
      name: 'Gregg Norman',
      id: '1275-4307',
      doctorName: 'Dr. Nikhil Singh',
      doctorPhone: '334-2309',
      glucoseLevels: {
        low: 70,
        high: 120
      }
    }
  ];

// function used for mouse-over dialog 
// used to assit users over buttons 
function CustomTooltip({ children, tooltipText }) {
    return (
        <div className="tooltip-container">
            {children}
            <div className="tooltip-text">{tooltipText}</div>
        </div>
    );
}

// function for logging-in 
// displays components of the login page 
// and sends user's data to monitor page 
function Login({onLogin}) {

    const navigate = useNavigate(); 
    const [selectedUserId, setSelectedUserId] = useState(''); // vars for user info
    const [showHelp, setShowHelp] = useState(false);  // vars for HelpLog function 

    // selected user handler
    const handleSelectionChange = (event) => {
      setSelectedUserId(event.target.value);
    };

    // toggleHelp and HelpLog are functions that display more info to user when clicked 
    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };
    const HelpLog = () => (
        <div className="help-information1">
        <p>Help Information:</p>
        <ul>
            <li>To log in, please press the "select your name" box and click on your name. </li> 
            <li> Then press the "Login" button below. </li> 
            <li>This will redirect you to the Blood Monitor System.</li>
        </ul>
        </div>
    );
  
    // login button click handler
    const handleLoginClick = () => {
      const user = usersData.find(user => user.id === selectedUserId);
      if (user) {
        navigate('/monitor-screen', { state: { user } });
      } else {
        // help case 
        alert('Please select a user to login.');
      }
    };

    // styles for  drop down box: 
    const divStyle = {
        textAlign: 'center', 
        marginTop: '20px', 
    };
    const selectStyle = {
        width: '250px', 
        padding: '10px', 
        backgroundColor: '#f1f1f1', 
        border: '1px solid #ddd', 
        borderRadius: '5px', 
        textAlign: 'center',
    };
    
    // layout of log-in page ...
    return (
    <div className = "loginpage"> 
        <div className = "login-box"> 
            <p className = "welc-txt">Welcome</p>
            <p className = "login-to-cont">Login to continue</p>
            {/* help button for users */}
            <button className="help-btn1" onClick={toggleHelp}>
                        {showHelp ? 'Hide Help' : 'Show Help'}
            </button>
            {showHelp && <HelpLog />} 
            {/* getting user information based on the selected name */}
            <div style={divStyle}>
                <select value={selectedUserId} onChange={handleSelectionChange} style={selectStyle}>
                <option value="">Select your name</option>
                {usersData.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
                </select>
            </div>
            {/* log-in button with mouse-over dialog */}
            <CustomTooltip tooltipText="Click this button to log-in.">
            <button className="login-btn" onClick={handleLoginClick}>Login</button>
            </CustomTooltip>
        </div> 
    </div>
    );
}
export default Login; //return 

