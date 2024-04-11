# Project Information 
This app was created using Node.js and React.js. The JS/CSS files are located in the SRC directory. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## App.js and Index.js 
App.js defines the primary routes of the app and Index.js file is the main entry point of the app. 

## Login-page.js 
Login-page.js holds information relevant to the login page (also the main page) of the app. The page has a mouse-over dialog on the login button, and if the user forgets to select a name, an alert will pop up. When a user selects their name, information like doctor name, patient id etc. will be sent to the monitor-screen. Login.css is the styling sheet for this page. 

## Monitor-screen.js 
Monitor-screen.js has requirements listed under Blood Glucose Monitoring in the word document. The nav bar displays the patients name and ID number as well as a logout button. To start the questionnaire, you will need to answer the first question which is displayed. Then depending on the user’s answer, following questions may follow. This logic is handled in monitor-screen.js. At the end of all questions, the user is prompted to log out. Mouse-over dialogs are on the “yes” and “no” buttons, the submit buttons, and the prompted log-out button. “SHOW HELP” above the question box, contains information on what to do if the user is lost. Monitor.css is the styling sheet for this page. 


# HCI_HW3
