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
  information VARCHAR(255) NULL,
  candidate_skills TEXT NULL,
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
  challenge_id SMALLINT REFERENCES all_challenges(id),
  candidate_id SMALLINT REFERENCES users(id),
  company_id SMALLINT REFERENCES users(id)
);


INSERT INTO users (username, password, name, email, role ) VALUES ('admin', 'password', 'admin', 'klingon@gmail.com', 'admin');
INSERT INTO users (username, password, name, email, role, information, logo_url) VALUES ('google', '$2b$10$rkynvuV5iRNEuoQ9ylWPpuFWdp9PdAPtXfOgJM37cgf3iwGW8KKue', 'google', 'larry@google.com', 'company', 'Welcome to our company page. We are like google but less good, less googly, and more likely to hire you.', 'http://icons.iconarchive.com/icons/danleech/simple/1024/google-icon.png');
INSERT INTO users (username, password, name, email, role, information, logo_url) VALUES ('amazon', '$2b$10$UFYzYH.q36vrRcWFCHVF0.QhWRzpAmWq9HK0XbVtTtCfTNo3A8aVC', 'amazon', 'rory@google.com', 'company', 'Amazon (Amazon.com) is the world’s largest online retailer and a prominent cloud services provider.', 'http://www.paymentscardsandmobile.com/wp-content/uploads/2018/03/Amazon-icon.png');


/* psql < db/schema.sql */
