DROP TABLE IF EXISTS users_Jobs;
DROP TABLE IF EXISTS job_interviews;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS interviews;



CREATE TABLE jobs (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(255) NOT NULL, 
    company VARCHAR(255) NOT NULL, 
    location VARCHAR(255) NOT NULL, 
    description VARCHAR(255), 
    requirement VARCHAR(255), 
    status ENUM ('open', 'closed', 'forthcoming') DEFAULT 'open' NOT NULL, 
    position VARCHAR(255), 
    deadline DATE, 
    created_at TIMESTAMP DEFAULT NOW(), 
    CONSTRAINT CHK_JOB_STATUS_AND_DEADLINE CHECK ( (status = 'forthcoming' AND deadline > created_at) OR
   (status <> 'forthcoming' AND deadline IS NULL) )
);

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    lastName VARCHAR(255) NOT NULL, 
    firstName VARCHAR(255) NOT NULL, 
    email VARCHAR(255) UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    role ENUM ('admin', 'subscriber', 'non-subscriber') NOT NULL DEFAULT 'non-subscriber', 
    active ENUM ('true', 'false') NOT NULL DEFAULT 'true',
    created_at TIMESTAMP DEFAULT NOW() 
);

CREATE TABLE users_Jobs (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL, 
    job_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, 
    FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE
);

CREATE TABLE interviews (
	id INT AUTO_INCREMENT PRIMARY KEY,
    interviewer_name VARCHAR(255),
    interview_date TIMESTAMP,
    location VARCHAR(255),
    notes VARCHAR(255),
    results ENUM("Passed", "Failed"),
    rescheduled_date TIMESTAMP,
    reschedule_reason VARCHAR(255),
    deadline TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT CHK_INTERVIEW_DATE_AND_DEADLINE CHECK ((interview_date >= created_at) AND (deadline > created_at))
);

CREATE TABLE job_interviews (
	id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    interview_id INT NOT NULL,
    FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE,
    FOREIGN KEY (interview_id) REFERENCES interviews (id) ON DELETE CASCADE
);

