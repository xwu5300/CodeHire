DROP DATABASE IF EXISTS code_hire;

CREATE DATABASE code_hire;

\c code_hire;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS company_schedule CASCADE;
DROP TABLE IF EXISTS user_schedule CASCADE;
DROP TABLE IF EXISTS all_challenges CASCADE;
DROP TABLE IF EXISTS results CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR (200) NOT NULL,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NULL,
  phone VARCHAR(20) NULL,
  information VARCHAR(255) NULL,
  logo_url VARCHAR(255) NULL,
  role VARCHAR(30) NULL
);

CREATE TABLE all_challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  instruction TEXT NOT NULL,
  test_cases TEXT,
  timelimit VARCHAR(30),
  difficulty VARCHAR(30),
  initial BOOLEAN NOT NULL,
  company_id SMALLINT REFERENCES users(id)
);

CREATE TABLE company_schedule (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  challenge_id SMALLINT REFERENCES all_challenges(id),
  company_id SMALLINT REFERENCES users(id)
);

CREATE TABLE user_schedule (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL,
  candidate_id SMALLINT REFERENCES users(id),
  challenge_id SMALLINT REFERENCES all_challenges(id),
  company_id SMALLINT REFERENCES users(id)
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  user_passed BOOLEAN NOT NULL,
  code TEXT,
  score SMALLINT,
  completed_at TIMESTAMP NOT NULL,
  challenge_id SMALLINT REFERENCES all_challenges(id),
  candidate_id SMALLINT REFERENCES users(id),
  company_id SMALLINT REFERENCES users(id)
);

INSERT INTO users (username, password, name, email, role ) VALUES ('admin', 'password', 'admin', 'klingon@gmail.com', 'admin');
INSERT INTO users (username, password, name, email, role, information) VALUES ('google', 'google', 'google', 'larry@google.com', 'company', 'Welcome to our company page. We are like google but less good, less googly, and more likely to hire you.');
INSERT INTO users (username, password, name, email, role, information) VALUES ('amazon', 'amazon', 'amazon', 'rory@google.com', 'company', 'Amazon (Amazon.com) is the world’s largest online retailer and a prominent cloud services provider. ');
INSERT INTO users (username, password, name, email, role) VALUES ('engineer', 'engineer', 'eric', 'eric@gmail.com', 'candidate');
INSERT INTO all_challenges (title, instruction, test_cases, timelimit, difficulty, initial, company_id) VALUES ('QuickSort', 'sorty', 'test1...\ntest2...\ntest3', '30 minutes', 'hard', false, 1);
INSERT INTO all_challenges (title, instruction, test_cases, timelimit, difficulty, initial, company_id) VALUES ('BubbleSort', 'bubble god', 'test1...\ntest2...\ntest3', '30 minutes', 'hard', false, 1);
INSERT INTO all_challenges (title, instruction, test_cases, timelimit, difficulty, initial, company_id) VALUES ('Two Sum', 'Find the sum...', null, null, null, false, 2);
INSERT INTO all_challenges (title, instruction, test_cases, timelimit, difficulty, initial, company_id) VALUES ('Anagram Solver', 'Find all anagrams...', null, null, null, false, 2);
INSERT INTO all_challenges (title, instruction, test_cases, timelimit, difficulty, initial, company_id) VALUES ('isSubArray', 'return boolean', null, null, null, false, 3);
INSERT INTO all_challenges (title, instruction, test_cases, timelimit, difficulty, initial, company_id) VALUES ('Permutation', 'Find all ...', 'test1...\ntest2...\ntest3', '1 hour', 'hard' , true, 2);
INSERT INTO all_challenges (title, instruction, test_cases, timelimit, difficulty, initial, company_id) VALUES ('Permute', 'Find all ...', 'test1...\ntest2...\ntest3', '1 hour', 'medium', true, 3);
INSERT INTO company_schedule (created_at, challenge_id, company_id) VALUES ('2018-5-19 11:00:00', 2, 2);
INSERT INTO company_schedule (created_at, challenge_id, company_id) VALUES ('2018-5-19 10:00:00', 3, 2);
INSERT INTO company_schedule (created_at, challenge_id, company_id) VALUES ('2018-5-19 12:00:00', 5, 3);

/* psql < db/schema.sql */
