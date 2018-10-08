USE project3_db;

INSERT INTO Users (username, email, password, postBanner, bio, createdAt, updatedAt) VALUES
("holfman", "haffedmcnair@test.com", "test", "pretty picture", "just a fake dude", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("bootlicker", "bootsntoots@test.com", "heel", "ugly picture", "A boot maker", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("tacobell", "causesacidreflux@darknet.net", "hacked", "picture of burrito", "forgotten bio", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Games (name, description, UserId, createdAt, updatedAt) VALUES
("Sonic", 'Gotto go fast', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pokemon', 'Catch em all', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Runescape', 'hd new age game', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO tags (name,  createdAt, updatedAt) VALUES
("Action", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Arcade", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Shooter", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Role Playing", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Forums (title, description, createdAt, updatedAt) VALUES
("Games", "the main forum, a place for discussing games", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Help", "the place to ask and answer specific issues with games or our site", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("Random", "if it is not about games or the website, it goes here", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Threads (title, pinned, ForumId, UserId, createdAt, updatedAt) VALUES
("Posting rules (Sticky)", true, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("My first game thread", false, 1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Posts (text, UserId, ThreadId, GameId, createdAt, updatedAt) VALUES
("this is the rules post for this forum", 1, 1, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("post for my game, blah blah blah.", 2, 2, null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("test comment on a game", 1, null, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

