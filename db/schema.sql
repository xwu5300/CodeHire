DROP DATABASE IF EXISTS code_hire;

CREATE DATABASE code_hire;

\c code_hire;

DROP TABLE IF EXISTS results CASCADE;
DROP TABLE IF EXISTS all_challenges CASCADE;
DROP TABLE IF EXISTS company_schedule CASCADE;
DROP TABLE IF EXISTS user_schedule CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS company_user CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  username VARCHAR(30) NOT NULL,
  phone VARCHAR(20) NULL,
  information VARCHAR(255) NULL,
  candidate_skills TEXT[] NULL,
  github_url VARCHAR(255) NULL,
  logo_url VARCHAR(255) NULL,
  role VARCHAR(30) NULL,
  token TEXT NOT NULL,
  resume_url TEXT NULL,
  resume_name VARCHAR(255) NULL,
  profile_photo TEXT NULL
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
  category VARCHAR(255),
  initial BOOLEAN NOT NULL,
  duration SMALLINT NULL,
  company_id SMALLINT REFERENCES users(id)
);

CREATE TABLE company_schedule (
  id SERIAL PRIMARY KEY,
  time TIMESTAMPTZ,
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
  company_schedule_id SMALLINT REFERENCES company_schedule(id) ON DELETE CASCADE,
  company_id SMALLINT REFERENCES users(id),
  is_initial BOOLEAN NOT NULL
);

CREATE TABLE company_user (
  id SERIAL PRIMARY KEY,
  company_id SMALLINT REFERENCES users(id),
  user_id SMALLINT REFERENCES users(id)
);

INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('admin', 'admin', null, null, null,  null, 'company', 'oEOYD25GWuWaERtmOJOg7bCrIck2');

INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('admin2', 'admin2', null, null, null,  null, 'company', '4ripTTcEZtQ1EAHXGpIDM4XFbz32');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('admin3', 'admin3', null, null, null,  null, 'company', 'qiRrCg4hnFZcOpfe4lH4bSxsDgg1');

INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user1', 'user1', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user2', 'user2', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user3', 'user3', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user4', 'user4', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user5', 'user5', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user6', 'user6', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user7', 'user7', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user8', 'user8', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user9', 'user9', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user10', 'user10', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user11', 'user11', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');
INSERT INTO users (name, username, phone, information, github_url, logo_url, role, token) VALUES ('user12', 'user12', '123-456-7890', 'about me', 'www.github.com/github', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png', 'candidate', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue');


INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('One Sum', 'Find the sum...', 'oneSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '1', 'algorithms', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Two Sum', 'Find the sum...', 'twoSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '2', 'data structures', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Three Sum', 'Find the sum...', 'threeSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '3', 'algorithms', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Four Sum', 'Find the sum...', 'fourSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '4', 'system design', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Five Sum', 'Find the sum...', 'fiveSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '5', 'algorithms', false, 90, 1);

INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-16 12:35:08', 90, 1, 1);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-26 12:35:08', 90, 1, 1);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-18 12:35:08', 90, 2, 1);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-25 12:35:08', 90, 3, 1);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-04 12:35:08', 90, 4, 1);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-23 12:35:08', 90, 5, 1);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 4, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 5, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 6, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 7, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 8, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 9, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 10, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 1, 11, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 12, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 13, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 14, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 1, 15, 1, 1, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 4, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 5, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 6, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 7, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 8, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 9, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 10, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-26 12:35:08', 1, 11, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 12, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 13, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 14, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-26 12:35:08', 1, 15, 2, 1, false);


INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-18 12:35:08', 2, 4, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-18 12:35:08', 2, 5, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-18 12:35:08', 2, 6, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-18 12:35:08', 2, 7, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-18 12:35:08', 2, 8, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-18 12:35:08', 2, 9, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-18 12:35:08', 2, 10, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-18 12:35:08', 2, 11, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-18 12:35:08', 2, 12, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-18 12:35:08', 2, 13, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-18 12:35:08', 2, 14, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-18 12:35:08', 2, 15, 3, 1, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 3, 4, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 3, 5, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 3, 6, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 3, 7, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 3, 8, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 3, 9, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 3, 10, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 3, 11, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 3, 12, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 3, 13, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 3, 14, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 3, 15, 4, 1, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-04 12:35:08', 4, 4, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-04 12:35:08', 4, 5, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-04 12:35:08', 4, 6, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-04 12:35:08', 4, 7, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-04 12:35:08', 4, 8, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-04 12:35:08', 4, 9, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-04 12:35:08', 4, 10, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-04 12:35:08', 4, 11, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-04 12:35:08', 4, 12, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-04 12:35:08', 4, 13, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-04 12:35:08', 4, 14, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-04 12:35:08', 4, 15, 5, 1, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 5, 4, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 5, 5, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 6, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 7, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 8, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 9, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 10, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 11, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 5, 12, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 13, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 14, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 5, 15, 6, 1, false);





INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('One Sum', 'Find the sum...', 'oneSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '1', 'algorithms', false, 60, 2);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Two Sum', 'Find the sum...', 'twoSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '2', 'data structures', false, 60, 2);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Three Sum', 'Find the sum...', 'threeSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '3', 'algorithms', false, 60, 2);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Four Sum', 'Find the sum...', 'fourSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '4', 'system design', false, 90, 2);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Five Sum', 'Find the sum...', 'fiveSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '5', 'algorithms', false, 60, 2);

INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-14 12:35:08', 60, 6, 2);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-28 12:35:08', 60, 6, 2);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-13 12:35:08', 60, 7, 2);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-23 12:35:08', 60, 8, 2);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-06 12:35:08', 90, 9, 2);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-25 12:35:08', 60, 10, 2);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-14 12:35:08', 6, 4, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-14 12:35:08', 6, 5, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-14 12:35:08', 6, 6, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-14 12:35:08', 6, 7, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-14 12:35:08', 6, 8, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-14 12:35:08', 6, 9, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-14 12:35:08', 6, 10, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-14 12:35:08', 6, 11, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-14 12:35:08', 6, 12, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-14 12:35:08', 6, 13, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-14 12:35:08', 6, 14, 7, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-14 12:35:08', 6, 15, 7, 2, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-28 12:35:08', 6, 4, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-28 12:35:08', 6, 5, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-28 12:35:08', 6, 6, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-28 12:35:08', 6, 7, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-28 12:35:08', 6, 8, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-28 12:35:08', 6, 9, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-28 12:35:08', 6, 10, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-28 12:35:08', 6, 11, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-28 12:35:08', 6, 12, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-28 12:35:08', 6, 13, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-28 12:35:08', 6, 14, 8, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-28 12:35:08', 6, 15, 8, 2, false);


INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-13 12:35:08', 7, 4, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-13 12:35:08', 7, 5, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-13 12:35:08', 7, 6, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-13 12:35:08', 7, 7, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-13 12:35:08', 7, 8, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-13 12:35:08', 7, 9, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-13 12:35:08', 7, 10, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-13 12:35:08', 7, 11, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-13 12:35:08', 7, 12, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-13 12:35:08', 7, 13, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-13 12:35:08', 7, 14, 9, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-13 12:35:08', 7, 15, 9, 2, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 8, 4, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 8, 5, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 8, 6, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 8, 7, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 8, 8, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 8, 9, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 8, 10, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 8, 11, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 8, 12, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 8, 13, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-23 12:35:08', 8, 14, 10, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-23 12:35:08', 8, 15, 10, 2, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-06 12:35:08', 9, 4, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-06 12:35:08', 9, 5, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-06 12:35:08', 9, 6, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-06 12:35:08', 9, 7, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-06 12:35:08', 9, 8, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-06 12:35:08', 9, 9, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-06 12:35:08', 9, 10, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-06 12:35:08', 9, 11, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-06 12:35:08', 9, 12, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-06 12:35:08', 9, 13, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-06 12:35:08', 9, 14, 11, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-06 12:35:08', 9, 15, 11, 2, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 10, 4, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 10, 5, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 10, 6, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 10, 7, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 10, 8, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 10, 9, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 10, 10, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 10, 11, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-25 12:35:08', 10, 12, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 10, 13, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 10, 14, 12, 2, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-25 12:35:08', 10, 15, 12, 2, false);



INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('One Sum', 'Find the sum...', 'oneSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '1', 'algorithms', false, 60, 3);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Two Sum', 'Find the sum...', 'twoSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '2', 'data structures', false, 60, 3);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Three Sum', 'Find the sum...', 'threeSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '3', 'algorithms', false, 60, 3);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Four Sum', 'Find the sum...', 'fourSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '4', 'system design', false, 90, 3);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Five Sum', 'Find the sum...', 'fiveSum', 'arr, target', '[[[]], [[]]]', '[[[]], [[]]]', '5', 'algorithms', false, 60, 3);

INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-17 12:35:08', 60, 11, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-27 12:35:08', 60, 11, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-12 12:35:08', 60, 12, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-02 12:35:08', 60, 13, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-30 12:35:08', 90, 14, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-05-16 12:35:08', 60, 15, 3);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-17 12:35:08', 11, 4, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-17 12:35:08', 11, 5, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-17 12:35:08', 11, 6, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-17 12:35:08', 11, 7, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-17 12:35:08', 11, 8, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-17 12:35:08', 11, 9, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-17 12:35:08', 11, 10, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-17 12:35:08', 11, 11, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-17 12:35:08', 11, 12, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-17 12:35:08', 11, 13, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-17 12:35:08', 11, 14, 13, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-17 12:35:08', 11, 15, 13, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-27 12:35:08', 11, 4, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-27 12:35:08', 11, 5, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-27 12:35:08', 11, 6, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-27 12:35:08', 11, 7, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-27 12:35:08', 11, 8, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-27 12:35:08', 11, 9, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-27 12:35:08', 11, 10, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-27 12:35:08', 11, 11, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-27 12:35:08', 11, 12, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-27 12:35:08', 11, 13, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-27 12:35:08', 11, 14, 14, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-27 12:35:08', 11, 15, 14, 3, false);


INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-12 12:35:08', 12, 4, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-12 12:35:08', 12, 5, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-12 12:35:08', 12, 6, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-12 12:35:08', 12, 7, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-12 12:35:08', 12, 8, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-12 12:35:08', 12, 9, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-12 12:35:08', 12, 10, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-12 12:35:08', 12, 11, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-12 12:35:08', 12, 12, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-12 12:35:08', 12, 13, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-12 12:35:08', 12, 14, 15, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-12 12:35:08', 12, 15, 15, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-02 12:35:08', 13, 4, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-02 12:35:08', 13, 5, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-02 12:35:08', 13, 6, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-02 12:35:08', 13, 7, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-02 12:35:08', 13, 8, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-02 12:35:08', 13, 9, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-02 12:35:08', 13, 10, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-02 12:35:08', 13, 11, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-02 12:35:08', 13, 12, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-02 12:35:08', 13, 13, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-02 12:35:08', 13, 14, 16, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-02 12:35:08', 13, 15, 16, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-30 12:35:08', 14, 4, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-30 12:35:08', 14, 5, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-30 12:35:08', 14, 6, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-30 12:35:08', 14, 7, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-30 12:35:08', 14, 8, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-30 12:35:08', 14, 9, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-30 12:35:08', 14, 10, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-30 12:35:08', 14, 11, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-30 12:35:08', 14, 12, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-30 12:35:08', 14, 13, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-30 12:35:08', 14, 14, 17, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-30 12:35:08', 14, 15, 17, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 15, 4, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 15, 5, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 15, 6, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 15, 7, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 15, 8, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 15, 9, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 15, 10, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 15, 11, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 15, 12, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 15, 13, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 15, 14, 18, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial)  VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 15, 15, 18, 3, false);


INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('One Sum', 'Find the sum...', 'oneSum', 'arr, target', '[[]]]', '[[[]]]', '1', 'algorithms', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Two Sum', 'Find the sum...', 'twoSum', 'arr, target', '[[[]]]', '[[]]', '2', 'data structures', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Three Sum', 'Find the sum...', 'threeSum', 'arr, target', '[[]]', '[[]]', '3', 'algorithms', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Four Sum', 'Find the sum...', 'fourSum', 'arr, target', '[[]]', '[[]]', '4', 'system design', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Five Sum', 'Find the sum...', 'fiveSum', 'arr, target', '[[]]', '[[]]', '5', 'algorithms', false, 90, 1);


INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 7, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 1, 8, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 9, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 10, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 1, 11, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 1, 12, 1, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 7, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-26 12:35:08', 1, 8, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 9, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 10, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-26 12:35:08', 1, 11, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-26 12:35:08', 1, 12, 1, false);


INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 2, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 2, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 2, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 2, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 2, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 2, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 2, 7, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 2, 8, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 2, 9, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 2, 10, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 2, 11, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 2, 12, 1, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 3, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 3, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 3, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 3, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 3, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 3, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 3, 7, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 3, 8, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 3, 9, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 3, 10, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 3, 11, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 3, 12, 1, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 4, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 4, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 4, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 4, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 4, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 4, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 4, 7, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 4, 8, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 4, 9, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 4, 10, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 4, 11, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 4, 12, 1, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 5, 1, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 5, 2, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 3, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 4, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 5, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 6, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 7, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 8, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('T', 'function(str)', 90, '2018-05-16 12:35:08', 5, 9, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 10, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 11, 1, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_id, is_initial) VALUES ('F', 'function(str)', 90, '2018-05-16 12:35:08', 5, 12, 1, false);
