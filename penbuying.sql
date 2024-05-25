drop schema penbuying;

CREATE SCHEMA `penbuying` DEFAULT CHARACTER SET utf8 ;

use penbuying;

CREATE TABLE `user` (
    `user_id` VARCHAR(255) NOT NULL,
    `user_pw` VARCHAR(255) NULL,
    `user_access` INT UNSIGNED NULL,
    `user_name` VARCHAR(255) NULL,
    `user_phone_number` VARCHAR(255) NULL,
    `user_email` VARCHAR(255) NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `user_oauth` (
    `oauth_no` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `oauth_type` VARCHAR(255) NULL,
    `oauth_user_id` VARCHAR(255) NULL,
    `oauth_access_token` VARCHAR(255) NULL,
    PRIMARY KEY (`oauth_no`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `profile` (
    `user_id` VARCHAR(255) NOT NULL,
    `profile_nickname` VARCHAR(255) NULL,
    `field` VARCHAR(255) NULL,
    PRIMARY KEY (`user_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `share_pension` (
    `article_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `pension_id` INT UNSIGNED NOT NULL,
    `article_title` VARCHAR(255) NULL,
    `article_contents` TEXT NULL,
    `pension_img` VARCHAR(255) NULL,
    `article_active` BOOLEAN NULL,
    `current_investment_amount` INT UNSIGNED NULL,
    `total_investment_amount` INT UNSIGNED NULL,
    `minimum_investment_amount` INT UNSIGNED NULL,
    `number_of_participants` INT UNSIGNED NULL,
    `maximum_of_participants` INT UNSIGNED NULL,
    `deadline_date` DATE NULL,
    PRIMARY KEY (`article_id`)
);

CREATE TABLE `own` (
    `own_no` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(255) NOT NULL,
    `pension_id` INT UNSIGNED NOT NULL,
    `own_percent` DOUBLE NULL,
    `investment_amount` INT UNSIGNED NULL,
    PRIMARY KEY (`own_no`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `chat` (
    `chat_no` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `chat_id` INT UNSIGNED NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `chat_contents` TEXT NULL,
    `chat_date` DATETIME NULL,
    PRIMARY KEY (`chat_no`)
);

CREATE TABLE `chat_room` (
    `chat_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `chat_title` VARCHAR(255) NULL,
    `chat_number_of_participants` INT UNSIGNED NULL,
    PRIMARY KEY (`chat_id`)
);

CREATE TABLE `chat_participants` (
    `chat_id` INT UNSIGNED NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `participant_date` DATETIME NULL,
    PRIMARY KEY (`chat_id`, `user_id`),
    FOREIGN KEY (`chat_id`) REFERENCES `chat_room` (`chat_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `chat_seen` (
    `chat_no` INT UNSIGNED NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `seen` BOOLEAN NULL,
    PRIMARY KEY (`chat_no`, `user_id`),
    FOREIGN KEY (`chat_no`) REFERENCES `chat` (`chat_no`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

CREATE TABLE `pension_info` (
    `pension_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `pension_name` VARCHAR(255) NULL,
    `postal_code` VARCHAR(20) NULL,
    `state_province` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `address_line1` VARCHAR(255) NULL,
    `address_line2` VARCHAR(255) NULL,
    PRIMARY KEY (`pension_id`)
);

CREATE TABLE `agenda` (
    `agenda_no` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `pension_id` INT UNSIGNED NOT NULL,
    `agenda_title` VARCHAR(255) NULL,
    `agenda_contents` TEXT NULL,
    `voting_type` VARCHAR(255) NULL,
    `deadline_date` DATE NULL,
    PRIMARY KEY (`agenda_no`)
);

CREATE TABLE `agenda_vote` (
    `agenda_no` INT UNSIGNED NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `participate_vote` BOOLEAN NULL,
    `vote` VARCHAR(255) NULL,
    PRIMARY KEY (`agenda_no`, `user_id`),
    FOREIGN KEY (`agenda_no`) REFERENCES `agenda` (`agenda_no`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);




################ Dummy insert
INSERT INTO `user` (
    `user_id`,
    `user_pw`,
    `user_access`,
    `user_name`,
    `user_phone_number`,
    `user_email`
) VALUES (
    '1234',  -- user_id
    '1234',  -- user_pw
    0,  -- user_access
    '홍길동',  -- user_name
    '010-1234-5678',      -- article_active
    'redRoad@example.com' -- user_email
);

INSERT INTO `user` (
    `user_id`,
    `user_pw`,
    `user_access`,
    `user_name`,
    `user_phone_number`,
    `user_email`
) VALUES (
    '12345',  -- user_id
    '12345',  -- user_pw
    0,  -- user_access
    '김철수',  -- user_name
    '010-1234-5678',      -- article_active
    'kimcs@example.com' -- user_email
);

INSERT INTO `share_pension` (
    `pension_id`,
    `article_title`,
    `article_contents`,
    `pension_img`,
    `article_active`,
    `current_investment_amount`,
    `total_investment_amount`,
    `minimum_investment_amount`,
    `number_of_participants`,
    `maximum_of_participants`,
    `deadline_date`
) VALUES (
    1,  -- pension_id
    '[제주] 서귀포 대정 자연 펜션',  -- article_title
    '서귀포에 위치한 아름다운 펜션입니다.',  -- article_contents
    '../imgs/pension1.png',  -- pension_img
    true,  -- article_active
    500000000, -- current_investment_amount
    600000000,  -- total_investment_amount
    50000000,  -- minimum_investment_amount
    8,  -- number_of_participants
    10,  -- maximum_of_participants
    '2024-12-31'  -- deadline_date
);

INSERT INTO `share_pension` (
    `pension_id`,
    `article_title`,
    `article_contents`,
    `pension_img`,
    `article_active`,
    `current_investment_amount`,
    `total_investment_amount`,
    `minimum_investment_amount`,
    `number_of_participants`,
    `maximum_of_participants`,
    `deadline_date`
) VALUES (
    2,  -- pension_id
    '[제주] 서귀포 펜션 102호',  -- article_title
    '서귀포에 위치한 아름다운 펜션입니다.',  -- article_contents
    '../imgs/pension2.png',  -- pension_img
    true,  -- article_active
    600000000, -- current_investment_amount
    800000000,  -- total_investment_amount
    50000000,  -- minimum_investment_amount
    3,  -- number_of_participants
    5,  -- maximum_of_participants
    '2024-12-31'  -- deadline_date
);
INSERT INTO `share_pension` (
    `pension_id`,
    `article_title`,
    `article_contents`,
    `pension_img`,
    `article_active`,
    `current_investment_amount`,
    `total_investment_amount`,
    `minimum_investment_amount`,
    `number_of_participants`,
    `maximum_of_participants`,
    `deadline_date`
) VALUES (
    3,  -- pension_id
    '[제주] 서귀포 펜션 101호',  -- article_title
    '서귀포에 위치한 아름다운 펜션입니다.',  -- article_contents
    '../imgs/pension2.png',  -- pension_img
    false,  -- article_active
    800000000, -- current_investment_amount
    800000000,  -- total_investment_amount
    50000000,  -- minimum_investment_amount
    4,  -- number_of_participants
    5,  -- maximum_of_participants
    '2024-05-22'  -- deadline_date
);

INSERT INTO `own` (
    `user_id`,
    `pension_id`,
    `own_percent`,
    `investment_amount`
) VALUES (
    '1234',  -- user_id
    3,       -- pension_id
    25,      -- own_percent
    200000000 -- investment_amount
);

INSERT INTO `own` (
    `user_id`,
    `pension_id`,
    `own_percent`,
    `investment_amount`
) VALUES (
    '12345',  -- user_id
    3,       -- pension_id
    25,      -- own_percent
    200000000 -- investment_amount
);



################ Dummy insert
INSERT INTO chat_room (chat_title, chat_number_of_participants) 
VALUES ('[제주] 서귀포 토평 펜션 101호', 2);

SET @chat_id = LAST_INSERT_ID();

INSERT INTO chat_participants (chat_id, user_id, participant_date) 
VALUES 
(@chat_id, '12345', now()), 
(@chat_id, '1234', now());

INSERT INTO chat (chat_id, user_id, chat_contents, chat_date) 
VALUES 
(@chat_id, '1234', '문의 사항이 있어 연락드립니다', now()), 
(@chat_id, '12345', '네, 무슨일이죠?', now());

####### Chat init
DELETE FROM chat WHERE chat_no >= 3;
ALTER TABLE chat AUTO_INCREMENT = 3;
select * from chat;