DROP DATABASE IF EXISTS code_hire;

CREATE DATABASE code_hire;

\c code_hire;

DROP TABLE IF EXISTS results CASCADE;
DROP TABLE IF EXISTS company_schedule CASCADE;
DROP TABLE IF EXISTS user_schedule CASCADE;
DROP TABLE IF EXISTS all_challenges CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR (200) NOT NULL,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NULL,
  phone VARCHAR(20) NULL,
  candidate_skills TEXT[] NULL,
  github_url VARCHAR(255) NULL,
  logo_url VARCHAR(255) NULL,
  role VARCHAR(30) NULL
);

CREATE TABLE all_challenges (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  instruction TEXT NOT NULL,
  function_name VARCHAR (255) NOT NULL,
  parameters VARCHAR(255) NOT NULL,
  test_cases TEXT,
  examples TEXT,
  difficulty VARCHAR(30),
  initial BOOLEAN NOT NULL,
  duration SMALLINT NULL,
  company_id SMALLINT REFERENCES users(id)
);

CREATE TABLE company_schedule (
  id SERIAL PRIMARY KEY,
  time TIMESTAMPTZ NOT NULL,
  duration SMALLINT NOT NULL,
  challenge_id SMALLINT REFERENCES all_challenges(id) ON DELETE CASCADE,
  company_id SMALLINT REFERENCES users(id)
);

CREATE TABLE user_schedule (
  id SERIAL PRIMARY KEY,
  candidate_id SMALLINT REFERENCES users(id),
  company_schedule_id SMALLINT REFERENCES company_schedule(id) ON DELETE CASCADE
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY,
  user_passed BOOLEAN NOT NULL,
  code TEXT,
  score SMALLINT,
  completed_at TIMESTAMP NOT NULL,
  challenge_id SMALLINT REFERENCES all_challenges(id) ON DELETE CASCADE,
  candidate_id SMALLINT REFERENCES users(id),
  company_id SMALLINT REFERENCES users(id),
  initial BOOLEAN NOT NULL
);


INSERT INTO users (username, password, name, email, role ) VALUES ('admin', 'password', 'admin', 'klingon@gmail.com', 'admin');
INSERT INTO users (username, password, name, email, role, information, logo_url) VALUES ('google', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue', 'google', 'larry@google.com', 'company', 'Welcome to our company page. We are like google but less good, less googly, and more likely to hire you.', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png');
INSERT INTO users (username, password, name, email, role, information, logo_url) VALUES ('amazon', '$2b$10$UFYzYH.q36vrRcWFCHVF0.QhWRzpAmWq9HK0XbVtTtCfTNo3A8aVC', 'amazon', 'rory@google.com', 'company', 'Amazon (Amazon.com) is the world’s largest online retailer and a prominent cloud services provider.', 'http://www.paymentscardsandmobile.com/wp-content/uploads/2018/03/Amazon-icon.png');
INSERT INTO users (username, password, name, email, role) VALUES ('engineer', 'engineer', 'eric', 'eric@gmail.com', 'candidate');
-- INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('QuickSort', 'sorty', 'quickSort', 'arr', '[]', '[]', 'medium', false, 1);
-- INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('BubbleSort', 'bubble god', 'sortBubbles', 'arr', '[]', '[]', 'medium', false, 3);
-- INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('Two Sum', 'Find the sum...', 'twoSum', 'arr, target', '[]', '[]', 'easy', false, 3);
-- INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('Anagram Solver', 'Find all anagrams...', 'getAnagrams', 'string', '[]', '[]', 'medium', false, 2);

-- INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('isSubArray', 'return boolean', 'isSubArray', 'arr', '[1, 2, 3]', '[]', 'medium', false, 3);
-- INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, duration, company_id) VALUES ('Permutation', 'recursion', 'Permutation', 'arr', '[]', '[]', 'medium', true, 30, 2);
-- INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('Permute', 'Find the sum...', 'Permute', 'arr, target', '[]', '[]', 'easy', true, 3);

-- INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-8-20 11:00am', 30, 2, 1);
-- INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-5-19 5:30pm', 60, 3, 2);
-- INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-11-9 12:00pm', 60, 4, 3);


/* psql < db/schema.sql */
