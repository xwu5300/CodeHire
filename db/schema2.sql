INSERT INTO users (name, username, information, logo_url, role, token) VALUES ('Admin', 'Admin', null, null, 'admin', 'oEOYD25GWuWaERtmOJOg7bCrIck2');
INSERT INTO users (name, username, information, logo_url, role, token) VALUES ('Google', 'Google', 'You know who we are.', 'https://yt3.ggpht.com/a-/AJLlDp0TFaxkKTbr1YMaEdj0KOLllMoFJcuWOIm4XA=s900-mo-c-c0xffffffff-rj-k-no', 'company', 'MeUYGnLd21cxq3brkF8ZrLb5GV73');
INSERT INTO users (name, username, information, logo_url, role, token) VALUES ('Facebook', 'Facebook', 'We make stalking easy.', 'https://en.facebookbrand.com/wp-content/uploads/2016/05/flogo_rgb_hex-brc-site-250.png', 'company', 'qm7ZaLY9hwMsg9eStLxaiH6qUDy1');
INSERT INTO users (name, username, information, logo_url, role, token) VALUES ('Airbnb', 'Airbnb', 'Homeless? We can help.', 'https://www-us.api.concursolutions.com/appcenter/api/v3/listings/550353cc99066b13221bce40/images/57e957ffb490ec6ac904e88e?lang=en-us', 'company', 'test');
INSERT INTO users (name, username, information, logo_url, role, token) VALUES ('Slack', 'Slack', 'Unfortunately your workspace doesn’t have any storage space left. To get more space, you can upgrade to a paid account', 'https://cdn-images-1.medium.com/max/1200/1*TiKyhAN2gx4PpbOsiBhYcw.png', 'company', 'qm7ZaLY9hwMsg9eStLxaiH6qUDy1');
INSERT INTO users (name, username, information, logo_url, role, token) VALUES ('Uber', 'Uber', 'Definitely not Lyft',  'https://d1a3f4spazzrp4.cloudfront.net/uber-com/1.3.8/d1a3f4spazzrp4.cloudfront.net/images/uber-serp-logo-f6e7549c89.jpg', 'company', 'test');
INSERT INTO users (name, username, information, logo_url, role, token) VALUES ('LinkedIn', 'LinkedIn', 'Cant promise well find you a job',  'https://yt3.ggpht.com/a-/AJLlDp0mRnZ39CP7Z0TUWTkjT5WckBX8fB4BTfMAMg=s900-mo-c-c0xffffffff-rj-k-no', 'company', 'test');

INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Palindrome Number', 'Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.', 'isPalindrome', 'x', '[[[]], [[]]]', '[[[]], [[]]]', '1', 'algorithms', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Valid Anagram', 'Given two strings s and t , write a function to determine if t is an anagram of s.', 'isAnagram', 'str1, str2', '[[[]], [[]]]', '[[[]], [[]]]', '4', 'data structures', false, 90, 1);
INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ('Count Primes', 'Count the number of prime numbers less than a non-negative number, n.', 'countPrimes', 'x', '[[[]], [[]]]', '[[[]], [[]]]', '2', 'system design', false, 90, 1);

INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-06-02 12:35:08', 90, 1, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-06-05 12:35:08', 90, 2, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-06-18 12:35:08', 90, 3, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-06-12 12:35:08', 90, 3, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-06-09 12:35:08', 90, 1, 3);
INSERT INTO company_schedule (time, duration, challenge_id, company_id) VALUES ('2018-06-23 12:35:08', 90, 2, 3);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 8, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 9, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 10, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 11, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 12, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-02 12:35:08', 1, 13, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 14, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-02 12:35:08', 1, 15, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 16, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 17, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 18, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-02 12:35:08', 1, 19, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-02 12:35:08', 1, 20, 1, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-02 12:35:08', 1, 21, 1, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 8, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 9, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 10, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 11, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 12, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 13, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-05 12:35:08', 2, 14, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 15, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-05 12:35:08', 2, 16, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-05 12:35:08', 2, 17, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 18, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 19, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-05 12:35:08', 2, 20, 2, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-05 12:35:08', 2, 21, 2, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 8, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 9, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 10, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 11, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 12, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 13, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 14, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-18 12:35:08', 3, 15, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 16, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 17, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 18, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-18 12:35:08', 3, 19, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 3, 20, 3, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-18 12:35:08', 3, 21, 3, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 3, 8, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 3, 9, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 3, 10, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 3, 11, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 3, 12, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 3, 13, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 3, 14, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 3, 15, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 3, 16, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 3, 17, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 3, 18, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 3, 19, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 3, 20, 4, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 3, 21, 4, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 8, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 9, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 10, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 11, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 12, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 13, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 14, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 15, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 16, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 17, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 18, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-18 12:35:08', 1, 19, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-18 12:35:08', 1, 20, 5, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-18 12:35:08', 1, 21, 5, 3, false);

INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 8, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 9, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 10, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 2, 11, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 2, 12, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 2, 13, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (true, 'function(str)', 90, '2018-06-12 12:35:08', 2, 14, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 15, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 16, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 17, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 18, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 19, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 20, 6, 3, false);
INSERT INTO results (user_passed, code, score, completed_at, challenge_id, candidate_id, company_schedule_id, company_id, is_initial) VALUES (false, 'function(str)', 90, '2018-06-12 12:35:08', 2, 21, 6, 3, false);



INSERT INTO all_challenges (title, instruction, function_name, parameters, test_cases, examples, difficulty, category, initial, duration, company_id) VALUES ("Climbing Stairs", "You are climbing a stair case. It takes n steps to reach to the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?", "climbingStairs", "arr", '[[[]], [[]]]', '[[[]], [[]]]', 1, "algorithms", false, 90, 2);
