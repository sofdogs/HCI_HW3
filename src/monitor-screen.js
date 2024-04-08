import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './monitor.css'
import profLogo from './account.png'

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

// function for the blood glucose monitor page 
// displays components 
// and asks users questions
function HomePage(){ 
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.user; 

    //for user input vals ... 
    const [inputValue, setInputValue] = useState(""); // used for # input
    const [currentQuestion, setCurrentQuestion] = useState(1); // vars to move to each questions
    const [answers, setAnswers] = useState([]); // array for yes/no answers 
    const [reason, setReason] = useState(''); // used for abnormal text input
    const [showHelp, setShowHelp] = useState(false); // vars for HelpLog function 

    // toggleHelp and HelpLog are functions that display more info to user when clicked 
    const toggleHelp = () => {
        setShowHelp(!showHelp);
    };
    const HelpInformation = () => (
        <div className="help-information">
        <p>Help Information:</p>
        <ul>
            <li>Enter your glucose level in the input box provided.</li>
            <li>Click submit to save your glucose level.</li>
            <li>If your reading is abnormal, provide a reason in the text area that appears.</li>
            <li>Use the logout button to safely end your session.</li>
        </ul>
        </div>
    );

    // handleYes and handleNo are handler for yes/no submits
    // they update the answer and move on to next question 
    const handleYes = () => {
        const newAnswers = [...answers, 'yes']; 
        setAnswers(newAnswers); // Update 
        setCurrentQuestion(currentQuestion + 1);
    };
    const handleNo = () => {
        const newAnswers = [...answers, 'no']; 
        setAnswers(newAnswers); // Update 
        setCurrentQuestion(currentQuestion + 1);
    };

    // handler for abnormal value answer (handleChange funct wouldnt work)
    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    // handleChange and handleSubmit are handlers for form divs 
    const handleChange = (event) => {
      setInputValue(event.target.value); 
    };
    const handleSubmit = (event) => {
      event.preventDefault(); 
      console.log("Submitted value:", inputValue); 
    };

    // submit button handler
    const handleGSubmit = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    // for the last questions submit button
    // sends user to "please logout..."
    const handleLastSubmit = () => { 
        setCurrentQuestion(4);
    }

    //handler to take back to login page
    const handleLogout = () => {
        navigate('/');
    };

    // function to render each question based on user inputs ... 
    // 4 questions in total 
    // question 2 is dependent on question 1 
    // question 3 is dependent on question 2 
    // question 4 is really asking the user to logout 
    const renderQuestion = () => {
        // first question 
        if (currentQuestion === 1) {
            return (
                <div className="littleqbox">
                    <p className="question">Have you taken your blood sugar reading today?</p>
                    <CustomTooltip tooltipText="Click this button to say yes.">
                    <button className="yes-btn" onClick={handleYes}>Yes</button>
                    </CustomTooltip>
                    <CustomTooltip tooltipText="Click this button to say no.">
                    <button className="no-btn" onClick={handleNo}>No</button>
                    </CustomTooltip>
                </div>
            );
        } else if (currentQuestion === 2 && answers[0] === 'no') { // second question to "no" 
            return (
                <div className="littleqbox">
                    <p className="question">Can you please take your blood sugar reading now, and enter it below?</p>
                    <form onSubmit={handleSubmit}>
                            <label htmlFor="textInput">Enter Blood Sugar Level(0-999):</label>
                            <input
                                type="text"
                                id="textInput"
                                value={inputValue}
                                onChange={handleChange}
                            />
                            <CustomTooltip tooltipText="Click this button to submit your answer.">
                            <button className  = "submit-btn" onClick={handleGSubmit}>Submit</button>
                            </CustomTooltip>
                    </form>
                </div>
            );
        } else if (currentQuestion === 2 && answers[0] === 'yes') { // second question to "yes" 
            return (
                <div className="littleqbox">
                    <p className="question">Please enter your reading below.</p>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="textInput">Enter Blood Sugar Level(0-999):</label>
                        <input
                            type="text"
                            id="textInput"
                            value={inputValue}
                            onChange={handleChange}
                        />
                        <CustomTooltip tooltipText="Click this button to submit your answer.">
                        <button className  = "submit-btn" onClick={handleGSubmit}>Submit</button>
                        </CustomTooltip>
                    </form>
                </div>
            );
        } else if(currentQuestion === 3 && (inputValue > 200 || inputValue < 30)) {  // third question with an abnormal value
            return (
                <div className="littleqbox">
                    <p className="question">This reading is abnormal. Why do you feel like your reading isn't normal?</p>
                    <p className="q-description">Example reasons can be, Drank soda, Has the flu, Ate a big lunch, etc</p>
                    <textarea
                        id="reasonInput"
                        value={reason}
                        onChange={handleReasonChange}
                        rows="4" 
                        cols="50" 
                    />
                    <CustomTooltip tooltipText="Click this button to submit your answer.">
                    <button className  = "submit-btn" onClick={handleLastSubmit}>Submit</button>
                    </CustomTooltip>
                </div>
            );
        }else if(currentQuestion === 3 && inputValue < user.glucoseLevels.low){  // third question with a low value 
            return (
                <div className="littleqbox">
                    <p className="question">This is a low reading. Eat sugar, meals, and snacks as described by {user.doctorName}.</p>
                    <CustomTooltip tooltipText="Click this button to logout.">
                    <button className="logout" onClick={handleLogout}>Log out</button>
                    </CustomTooltip>
                </div>
            );
        }else if(currentQuestion === 3 && inputValue > user.glucoseLevels.high){ // third question with a high value 
            return (
                <div className="littleqbox">
                    <p className="question">This is a high reading. Call {user.doctorName} immediately. Phone Number: {user.doctorPhone}.</p>
                    <CustomTooltip tooltipText="Click this button to logout.">
                    <button className="logout" onClick={handleLogout}>Log out</button>
                    </CustomTooltip>
                </div>
            );
        }else if(currentQuestion === 3){  // third question with a normal value 
            return (
                <div className="littleqbox">
                    <p className="question"> Your reading is in a normal range.</p>
                    <CustomTooltip tooltipText="Click this button to logout.">
                    <button className="logout" onClick={handleLogout}>Log out</button>
                    </CustomTooltip>
                </div>
            );
        } else if(currentQuestion === 4){ // when all questions are finished, asks users to logout 
            return (
                <div className="littleqbox">
                    <p className="question"> Please log out by pressing the log-out button below.</p>
                    <CustomTooltip tooltipText="Click this button to logout.">
                    <button className="logout" onClick={handleLogout}>Log out</button>
                    </CustomTooltip>
                </div>
            );
        }
    };
    // layout of monitor-screen page ...
    return (
        <div>
            {/* navigation bar components */}
            <header> 
                <nav className = "navBar"> 
                    <div className = "nav-cont"> 
                        <div className = "nav-elements"> 
                            <ul> 
                                <li> 
                                    <img className ="profileIcon"style={{width: 70, height: 70}}src = {profLogo}/> 
                                </li> 
                                <li> 
                                    {/* getting name and id of user */}
                                    <div className = "Name">{user.name}</div> 
                                    <div className = "ID">ID: {user.id}</div>
                                </li>
                                <li> 
                                    <button className = "logout" onClick={handleLogout}>Log out</button>
                                </li> 
                            </ul> 
                        </div>  
                    </div>
                </nav>
            </header>
            {/* question section of page */}
            <div className = "monitorpage"> 
                <div className = "q-container">
                    <p className = "title">Blood Glucose Monitoring</p>
                    <p className = "lil-title">Please answer the following question(s).</p>
                    {/* help button for users */}
                    <button className="help-btn" onClick={toggleHelp}>
                        {showHelp ? 'Hide Help' : 'Show Help'}
                    </button>
                    {showHelp && <HelpInformation />}
                    {/* call function to start questions */}
                    {renderQuestion()}
                </div>
            </div> 
        </div>

    );
}
export default HomePage; //return 