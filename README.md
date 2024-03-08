# JobTracker

## Overview

JobTracker is a server-side rendered application designed to assist users in tracking their job applications and associated interview processes. This README provides an overview of the application, its features, architecture, and setup instructions.

## Features

- **Job Tracking**: Users can add, edit, and delete job applications.
- **Interview Management**: Keep track of interviews associated with each job application.
- **Security Measures**: Implemented encryption and authentication mechanisms to protect sensitive data.
- **AWS S3 Integration**: Utilizes AWS S3 bucket to store user profile photos securely.
- **Responsive Design**: Ensures seamless user experience across various devices, including mobile devices.
- **Notifications (Planned)**: Future enhancement to incorporate a notification system for users.

## Technologies Used

- **Backend**: Node.js, ExpressJs
- **Database**: MySQL
- **Frontend**: Server-side rendered (HTML, CSS, JavaScript, Pug)
- **AWS Services**: S3 Bucket
- **Hosting**: Render

## Architecture

- **Backend**: Node.js server handles HTTP requests, interacts with the MySQL database, and implements security measures.
- **Database Architecture**: Designed and implemented MySQL database architecture to store user data, job applications, interviews, etc.
- **Security**: Utilized encryption techniques and authentication mechanisms to ensure data security and user privacy.
- **Integration**: Integrated AWS S3 bucket for storing user profile photos securely.
- **Hosting**: The application is currently hosted on Render, providing scalability and reliability.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/manlikeHB/job-tracker.git`
2. Install dependencies: `npm install`
3. Set up MySQL database: Create necessary tables `models/jobTrackerDB.sql` and configure database connection in `db.js`.
4. Configure AWS S3: Set up an S3 bucket and configure access credentials in the application.
5. Start the server: `npm start`
6. Access the application: Open your web browser and navigate to the hosted URL: [https://job-tracker-wb9m.onrender.com](https://job-tracker-wb9m.onrender.com)

## Future Enhancements

- **Notifications System**: Implement a notifications system to alert users about updates on their job applications and interviews.

## Support

For any inquiries or issues, please contact [hbyusuf40@gmail.com](mailto:hbyusuf40@gmail.com).
