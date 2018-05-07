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
  function_name VARCHAR (255) NOT NULL,
  parameters VARCHAR(255) NOT NULL,
  test_cases TEXT,
  examples TEXT,
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

INSERT INTO users (username, password, name, email, role ) VALUES ('admin', 'admin', 'password', 'klingon@gmail.com', 'admin');
INSERT INTO users (username, password, name, email) VALUES ('google', 'google', 'larry', 'larry@google.com');
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('QuickSort', 'sorty', 'quickSort', 'arr', null, null, 'medium', false, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('BubbleSort', 'bubble god', 'sortBubbles', 'arr', null, null, 'medium', false, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('Two Sum', 'Find the sum...', 'twoSum', 'arr, target', null, null, 'easy', false, 2);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, initial, company_id) VALUES ('Anagram Solver', 'Find all anagrams...', 'getAnagrams', 'string', null, null, 'medium', false, 2);

/* psql < db/schema.sql */
