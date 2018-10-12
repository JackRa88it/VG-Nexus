USE VG_Nexus_db;

INSERT INTO Users (username, email, password, postBanner, bio, createdAt, updatedAt) VALUES
("holfman", "haffedmcnair@test.com", "test", "pretty picture", "just a fake dude", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("bootlicker", "bootsntoots@test.com", "heel", "ugly picture", "A boot maker", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("tacobell", "causesacidreflux@darknet.net", "hacked", "picture of burrito", "forgotten bio", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO Tags (name,  createdAt, updatedAt) VALUES
("Action", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Arcade", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Shooter", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Role Playing", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO Forums (title, description, createdAt, updatedAt) VALUES
("General", "The place to discuss anything and everything about this site", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Games", "For discussing specific games", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Technical issues", "If it's broken, let's fix it: game help, site bugs and feedback", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Free for all", "The place for off-topic threads", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Forum rules/FAQ", "Beginners, look here", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Threads (title, pinned, ForumId, UserId, createdAt, updatedAt) VALUES
("Website Announcements", true, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("My first game thread", false, 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("This site is breaking my computer", false, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Jokes megathread", true, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Posting rules (Sticky)", true, 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Posts (text, ThreadId, UserId, createdAt, updatedAt) VALUES
("Man, I'm sorry, I honestly can't think of any announcements at this point. We'll see...", 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("bump", 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("dude, don't bump announcement threads.", 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

("I made a game! blah blah blah blah blah...", 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("nice", 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("nice", 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("I cannot believe how unprofessional this website is. I loaded it up and now my computer has a million viruses on1 n23i it i 1234c acant 2324234halp34234halp please1231111", 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("nice", 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("excuse me?", 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

("I made a game! blah blah blah blah blah...", 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("nice", 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("nice", 2, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

("I cannot believe how unprofessional this website is. I loaded it up and now my computer has a million viruses on1 n23i it i 1234c acant 2324234halp34234halp please1231111", 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("nice", 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("excuse me?", 3, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

("Where can you get gas for $1.49?", 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("where", 4, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("taco bell", 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("lol", 4, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

("Rule #1: don't talk aobut VG Nexus. Rule #2: a cheeseburger a day keeps the doctor away. Rule #3: guess I'll just die then?", 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("absolute shitpost", 5, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("nice", 5, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
