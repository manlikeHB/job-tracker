DROP TABLE IF EXISTS users_Jobs;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS users;


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
    created_at TIMESTAMP DEFAULT NOW() 
);

CREATE TABLE users_Jobs (
	id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id INT NOT NULL, 
    job_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, 
    FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE
);

INSERT INTO jobs (title, company, location, status) VALUES
	('software eng', 'microsoft', 'accra', 'open'), 
    ('chemist', 'labs', 'abuja', 'open'),
    ('backend dev', 'google', 'LA', 'closed');
    
INSERT INTO jobs (title, company, location, status, deadline) VALUES
	('barber', 'fine cut', 'kaduna', 'forthcoming', '2022-12-30'),
	('terapist', 'oaks', 'abuja', 'forthcoming', '2022-12-23'),
    ('frontend dev', 'azure', 'mexico', 'forthcoming', '2025-01-01');
    
INSERT INTO users (lastName, firstName, email, password) VALUES 
	('test', 'one', 'one@example.com', 'test1234'),
    ('test', 'two', 'two@example.com', 'test1234'),
    ('test', 'three', 'three@example.com', 'test1234');

INSERT INTO users (lastName, firstName, email, password, role) VALUES 
   ('yusuf', 'Habib', 'hb@gmail.com', 'test1234', 'admin');
   
INSERT INTO users_Jobs (user_id, job_id) VALUES 
	(1, 2), (2, 3), (3, 5), (1, 1), (3, 4), (2, 6);
