-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'persons'
-- a person
-- ---

DROP TABLE IF EXISTS `persons`;

CREATE TABLE `persons` (
  `id`               INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `address_id`       INTEGER    NULL DEFAULT NULL,
  `user_id`          INTEGER    NULL DEFAULT NULL,
  `email`            MEDIUMTEXT NULL DEFAULT NULL,
  `honorific_prefix` MEDIUMTEXT NULL DEFAULT NULL
  COMMENT 'An honorific prefix preceding a Person''s name such as Dr/Mrs',
  `given_name`       MEDIUMTEXT NULL DEFAULT NULL,
  `family_name`      MEDIUMTEXT NULL DEFAULT NULL,
  `birth_date`       DATE       NULL DEFAULT NULL,
  `telephone`        MEDIUMTEXT NULL DEFAULT NULL,
  `description`      MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  COMMENT 'a person';

-- ---
-- Table 'addresses'
--
-- ---

DROP TABLE IF EXISTS `addresses`;

CREATE TABLE `addresses` (
  `id`               INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `street_address`   MEDIUMTEXT NULL DEFAULT NULL,
  `postal_code`      MEDIUMTEXT NULL DEFAULT NULL,
  `address_locality` MEDIUMTEXT NULL DEFAULT NULL
  COMMENT 'z. B. Basel',
  `address_country`  MEDIUMTEXT NULL DEFAULT NULL
  COMMENT 'https://en.wikipedia.org/wiki/ISO_3166-1 code',
  `telefone`         MEDIUMTEXT NULL DEFAULT NULL,
  `description`      MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'orders'
--
-- ---

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id`                 INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `billing_address_id` INTEGER    NULL DEFAULT NULL,
  `customer_id`        INTEGER    NULL DEFAULT NULL,
  `order_status_id`    INTEGER    NULL DEFAULT NULL,
  `part_of_invoice_id` INTEGER    NULL DEFAULT NULL,
  `order_date`         DATETIME   NULL DEFAULT NULL,
  `order_number`       MEDIUMTEXT NULL DEFAULT NULL,
  `payment_due_date`   DATETIME   NULL DEFAULT NULL,
  `description`        MEDIUMTEXT NULL DEFAULT NULL,
  `discount`           FLOAT      NULL DEFAULT NULL,
  `discount_currency`  INTEGER    NULL DEFAULT NULL,
  `discount_code`      INTEGER    NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'offers'
--
-- ---

DROP TABLE IF EXISTS `offers`;

CREATE TABLE `offers` (
  `id`                     INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `offeredBy_id`           INT        NULL DEFAULT NULL,
  `product_id`             INTEGER    NULL DEFAULT NULL,
  `price_specification_id` INTEGER    NULL DEFAULT NULL,
  `organization_id`        INTEGER    NULL DEFAULT NULL,
  `valid_from`             DATETIME   NULL DEFAULT NULL,
  `valid_through`          DATETIME   NULL DEFAULT NULL,
  `description`            MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'order_offers'
--
-- ---

DROP TABLE IF EXISTS `order_offers`;

CREATE TABLE `order_offers` (
  `id`       INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `order_id` INTEGER NULL DEFAULT NULL,
  `offer_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id`          INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `name`        MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'invoices'
--
-- ---

DROP TABLE IF EXISTS `invoices`;

CREATE TABLE `invoices` (
  `id`                   INTEGER  NULL AUTO_INCREMENT DEFAULT NULL,
  `customer_id`          INTEGER  NULL DEFAULT NULL,
  `total_payment_due_id` INTEGER  NULL DEFAULT NULL,
  `payment_status_id`    INTEGER  NULL DEFAULT NULL,
  `payment_due_date`     DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'order_stati'
-- possible types: ordered, payed, completed
-- ---

DROP TABLE IF EXISTS `order_stati`;

CREATE TABLE `order_stati` (
  `id`          INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `name`        MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  COMMENT 'possible types: ordered, payed, completed';

-- ---
-- Table 'payment_stati'
-- possible: not paid (open / closed), paid in parts (open / closed), fully paid

-- ---

DROP TABLE IF EXISTS `payment_stati`;

CREATE TABLE `payment_stati` (
  `id`          INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `name`        MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  COMMENT 'possible: not paid (open / closed), paid in parts (open / cl';

-- ---
-- Table 'price_specifications'
-- specifies a price
-- ---

DROP TABLE IF EXISTS `price_specifications`;

CREATE TABLE `price_specifications` (
  `id`                       INTEGER    NULL     AUTO_INCREMENT DEFAULT NULL,
  `max_price`                FLOAT      NULL     DEFAULT NULL,
  `min_price`                FLOAT      NULL     DEFAULT NULL,
  `price`                    FLOAT      NULL     DEFAULT NULL,
  `price_currency`           MEDIUMTEXT NULL     DEFAULT NULL
  COMMENT 'ISO 4217 format',
  `value_added_tax_included` TINYINT    NOT NULL DEFAULT 1
  COMMENT 'if true: tax included, if false: tax not included',
  PRIMARY KEY (`id`)
)
  COMMENT 'specifies a price';

-- ---
-- Table 'tasks'
--
-- ---

DROP TABLE IF EXISTS `tasks`;

CREATE TABLE `tasks` (
  `id`              INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `customer_id`     INTEGER    NULL DEFAULT NULL,
  `leader_id`       INTEGER    NULL DEFAULT NULL,
  `parent_id`       INTEGER    NULL DEFAULT NULL,
  `offer_id`        INTEGER    NULL DEFAULT NULL,
  `task_status_id`  INTEGER    NULL DEFAULT NULL,
  `name`            MEDIUMTEXT NULL DEFAULT NULL,
  `description`     MEDIUMTEXT NULL DEFAULT NULL,
  `estimated_start` DATETIME   NULL DEFAULT NULL,
  `estimated_end`   DATETIME   NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'task_entries'
--
-- ---

DROP TABLE IF EXISTS `task_entries`;

CREATE TABLE `task_entries` (
  `id`                     INTEGER    NULL     AUTO_INCREMENT DEFAULT NULL,
  `task_id`                INTEGER    NULL     DEFAULT NULL,
  `person_id`              INTEGER    NULL     DEFAULT NULL,
  `task_entry_type_id`     INTEGER    NULL     DEFAULT NULL,
  `price_specification_id` INTEGER    NULL     DEFAULT NULL,
  `name`                   MEDIUMTEXT NULL     DEFAULT NULL,
  `description`            MEDIUMTEXT NULL     DEFAULT NULL,
  `start`                  DATETIME   NULL     DEFAULT NULL,
  `end`                    DATETIME   NULL     DEFAULT NULL,
  `is_billable`            TINYINT    NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'task_entry_types'
--
-- ---

DROP TABLE IF EXISTS `task_entry_types`;

CREATE TABLE `task_entry_types` (
  `id`          INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `name`        MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'task_stati'
-- pending, in progress, in review, completed
-- ---

DROP TABLE IF EXISTS `task_stati`;

CREATE TABLE `task_stati` (
  `id`          INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `name`        MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  COMMENT 'pending, in progress, in review, completed';

-- ---
-- Table 'messages'
--
-- ---

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `id`              INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `author_id`       INTEGER    NULL DEFAULT NULL,
  `conversation_id` INTEGER    NULL DEFAULT NULL,
  `content`         MEDIUMTEXT NULL DEFAULT NULL,
  `create_date`     DATETIME   NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'organizations'
-- a organisational unit
-- ---

DROP TABLE IF EXISTS `organizations`;

CREATE TABLE `organizations` (
  `id`          INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `address_id`  INTEGER    NULL DEFAULT NULL,
  `email`       MEDIUMTEXT NULL DEFAULT NULL,
  `telephone`   MEDIUMTEXT NULL DEFAULT NULL,
  `name`        MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  `legal_name`  MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
)
  COMMENT 'a organisational unit';

-- ---
-- Table 'employee_position'
--
-- ---

DROP TABLE IF EXISTS `employee_position`;

CREATE TABLE `employee_position` (
  `id`              INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `organisation_id` INTEGER    NULL DEFAULT NULL,
  `name`            MEDIUMTEXT NULL DEFAULT NULL,
  `description`     MEDIUMTEXT NULL DEFAULT NULL,
  `roles`           MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'change_logs'
--
-- ---

DROP TABLE IF EXISTS `change_logs`;

CREATE TABLE `change_logs` (
  `id`               INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `changer_id`       INTEGER    NULL DEFAULT NULL,
  `changed_table`    MEDIUMTEXT NULL DEFAULT NULL,
  `changed_entry_id` INTEGER    NULL DEFAULT NULL,
  `content`          MEDIUMTEXT NULL DEFAULT NULL,
  `change_date`      DATETIME   NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'conversations'
--
-- ---

DROP TABLE IF EXISTS `conversations`;

CREATE TABLE `conversations` (
  `id`          INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `name`        MEDIUMTEXT NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'task_person'
--
-- ---

DROP TABLE IF EXISTS `task_person`;

CREATE TABLE `task_person` (
  `id`        INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `task_id`   INTEGER    NULL DEFAULT NULL,
  `person_id` INTEGER    NULL DEFAULT NULL,
  `roles`     MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'employee_informations'
--
-- ---

DROP TABLE IF EXISTS `employee_informations`;

CREATE TABLE `employee_informations` (
  `id`                   INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `person_id`            INTEGER    NULL DEFAULT NULL,
  `organisation_id`      INTEGER    NULL DEFAULT NULL,
  `employee_position_id` INTEGER    NULL DEFAULT NULL,
  `base_salary_id`       INTEGER    NULL DEFAULT NULL,
  `hour_salary_id`       INTEGER    NULL DEFAULT NULL,
  `can_set_salary`       TINYINT    NULL DEFAULT NULL,
  `roles`                MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id`        INTEGER    NULL AUTO_INCREMENT DEFAULT NULL,
  `task_id`   INTEGER    NULL DEFAULT NULL,
  `author_id` INTEGER    NULL DEFAULT NULL,
  `is_public` TINYINT    NULL DEFAULT NULL,
  `content`   MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'conversation_participants'
--
-- ---

DROP TABLE IF EXISTS `conversation_participants`;

CREATE TABLE `conversation_participants` (
  `id`            INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `conversion_id` INTEGER NULL DEFAULT NULL,
  `person_id`     INTEGER NULL DEFAULT NULL,
  `is_admin`      TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `persons`
  ADD FOREIGN KEY (address_id) REFERENCES `addresses` (`id`);
ALTER TABLE `persons`
  ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `orders`
  ADD FOREIGN KEY (billing_address_id) REFERENCES `addresses` (`id`);
ALTER TABLE `orders`
  ADD FOREIGN KEY (customer_id) REFERENCES `persons` (`id`);
ALTER TABLE `orders`
  ADD FOREIGN KEY (order_status_id) REFERENCES `order_stati` (`id`);
ALTER TABLE `orders`
  ADD FOREIGN KEY (part_of_invoice_id) REFERENCES `invoices` (`id`);
ALTER TABLE `offers`
  ADD FOREIGN KEY (offeredBy_id) REFERENCES `persons` (`id`);
ALTER TABLE `offers`
  ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
ALTER TABLE `offers`
  ADD FOREIGN KEY (price_specification_id) REFERENCES `price_specifications` (`id`);
ALTER TABLE `offers`
  ADD FOREIGN KEY (organization_id) REFERENCES `organizations` (`id`);
ALTER TABLE `order_offers`
  ADD FOREIGN KEY (order_id) REFERENCES `orders` (`id`);
ALTER TABLE `order_offers`
  ADD FOREIGN KEY (offer_id) REFERENCES `offers` (`id`);
ALTER TABLE `invoices`
  ADD FOREIGN KEY (customer_id) REFERENCES `persons` (`id`);
ALTER TABLE `invoices`
  ADD FOREIGN KEY (total_payment_due_id) REFERENCES `price_specifications` (`id`);
ALTER TABLE `invoices`
  ADD FOREIGN KEY (payment_status_id) REFERENCES `payment_stati` (`id`);
ALTER TABLE `tasks`
  ADD FOREIGN KEY (customer_id) REFERENCES `persons` (`id`);
ALTER TABLE `tasks`
  ADD FOREIGN KEY (leader_id) REFERENCES `persons` (`id`);
ALTER TABLE `tasks`
  ADD FOREIGN KEY (parent_id) REFERENCES `tasks` (`id`);
ALTER TABLE `tasks`
  ADD FOREIGN KEY (offer_id) REFERENCES `offers` (`id`);
ALTER TABLE `tasks`
  ADD FOREIGN KEY (task_status_id) REFERENCES `task_stati` (`id`);
ALTER TABLE `task_entries`
  ADD FOREIGN KEY (task_id) REFERENCES `tasks` (`id`);
ALTER TABLE `task_entries`
  ADD FOREIGN KEY (person_id) REFERENCES `persons` (`id`);
ALTER TABLE `task_entries`
  ADD FOREIGN KEY (task_entry_type_id) REFERENCES `task_entry_types` (`id`);
ALTER TABLE `task_entries`
  ADD FOREIGN KEY (price_specification_id) REFERENCES `price_specifications` (`id`);
ALTER TABLE `messages`
  ADD FOREIGN KEY (author_id) REFERENCES `persons` (`id`);
ALTER TABLE `messages`
  ADD FOREIGN KEY (conversation_id) REFERENCES `conversations` (`id`);
ALTER TABLE `organizations`
  ADD FOREIGN KEY (address_id) REFERENCES `addresses` (`id`);
ALTER TABLE `employee_position`
  ADD FOREIGN KEY (organisation_id) REFERENCES `organizations` (`id`);
ALTER TABLE `change_logs`
  ADD FOREIGN KEY (changer_id) REFERENCES `users` (`id`);
ALTER TABLE `task_person`
  ADD FOREIGN KEY (task_id) REFERENCES `tasks` (`id`);
ALTER TABLE `task_person`
  ADD FOREIGN KEY (person_id) REFERENCES `persons` (`id`);
ALTER TABLE `employee_informations`
  ADD FOREIGN KEY (person_id) REFERENCES `persons` (`id`);
ALTER TABLE `employee_informations`
  ADD FOREIGN KEY (organisation_id) REFERENCES `organizations` (`id`);
ALTER TABLE `employee_informations`
  ADD FOREIGN KEY (employee_position_id) REFERENCES `employee_position` (`id`);
ALTER TABLE `employee_informations`
  ADD FOREIGN KEY (base_salary_id) REFERENCES `price_specifications` (`id`);
ALTER TABLE `employee_informations`
  ADD FOREIGN KEY (hour_salary_id) REFERENCES `price_specifications` (`id`);
ALTER TABLE `comments`
  ADD FOREIGN KEY (task_id) REFERENCES `tasks` (`id`);
ALTER TABLE `comments`
  ADD FOREIGN KEY (author_id) REFERENCES `persons` (`id`);
ALTER TABLE `conversation_participants`
  ADD FOREIGN KEY (conversion_id) REFERENCES `conversations` (`id`);
ALTER TABLE `conversation_participants`
  ADD FOREIGN KEY (person_id) REFERENCES `persons` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `persons` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `addresses` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `orders` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `offers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `order_offers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `invoices` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `order_stati` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `payment_stati` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `price_specifications` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `tasks` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `task_entries` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `task_entry_types` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `task_stati` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `organizations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `employee_position` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `change_logs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `conversations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `task_person` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `employee_informations` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `comments` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `conversation_participants` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `persons` (`id`,`address_id`,`user_id`,`email`,`honorific_prefix`,`given_name`,`family_name`,`birth_date`,`telephone`,`description`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `addresses` (`id`,`street_address`,`postal_code`,`address_locality`,`address_country`,`telefone`,`description`) VALUES
-- ('','','','','','','');
-- INSERT INTO `orders` (`id`,`billing_address_id`,`customer_id`,`order_status_id`,`part_of_invoice_id`,`order_date`,`order_number`,`payment_due_date`,`description`,`discount`,`discount_currency`,`discount_code`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `offers` (`id`,`offeredBy_id`,`product_id`,`price_specification_id`,`organization_id`,`valid_from`,`valid_through`,`description`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `order_offers` (`id`,`order_id`,`offer_id`) VALUES
-- ('','','');
-- INSERT INTO `products` (`id`,`name`,`description`) VALUES
-- ('','','');
-- INSERT INTO `invoices` (`id`,`customer_id`,`total_payment_due_id`,`payment_status_id`,`payment_due_date`) VALUES
-- ('','','','','');
-- INSERT INTO `order_stati` (`id`,`name`,`description`) VALUES
-- ('','','');
-- INSERT INTO `payment_stati` (`id`,`name`,`description`) VALUES
-- ('','','');
-- INSERT INTO `price_specifications` (`id`,`max_price`,`min_price`,`price`,`price_currency`,`value_added_tax_included`) VALUES
-- ('','','','','','');
-- INSERT INTO `tasks` (`id`,`customer_id`,`leader_id`,`parent_id`,`offer_id`,`task_status_id`,`name`,`description`,`estimated_start`,`estimated_end`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `task_entries` (`id`,`task_id`,`person_id`,`task_entry_type_id`,`price_specification_id`,`name`,`description`,`start`,`end`,`is_billable`) VALUES
-- ('','','','','','','','','','');
-- INSERT INTO `task_entry_types` (`id`,`name`,`description`) VALUES
-- ('','','');
-- INSERT INTO `task_stati` (`id`,`name`,`description`) VALUES
-- ('','','');
-- INSERT INTO `messages` (`id`,`author_id`,`conversation_id`,`content`,`create_date`) VALUES
-- ('','','','','');
-- INSERT INTO `organizations` (`id`,`address_id`,`email`,`telephone`,`name`,`description`,`legal_name`) VALUES
-- ('','','','','','','');
-- INSERT INTO `employee_position` (`id`,`organisation_id`,`name`,`description`,`roles`) VALUES
-- ('','','','','');
-- INSERT INTO `users` (`id`) VALUES
-- ('');
-- INSERT INTO `change_logs` (`id`,`changer_id`,`changed_table`,`changed_entry_id`,`content`,`change_date`) VALUES
-- ('','','','','','');
-- INSERT INTO `conversations` (`id`,`name`,`description`) VALUES
-- ('','','');
-- INSERT INTO `task_person` (`id`,`task_id`,`person_id`,`roles`) VALUES
-- ('','','','');
-- INSERT INTO `employee_informations` (`id`,`person_id`,`organisation_id`,`employee_position_id`,`base_salary_id`,`hour_salary_id`,`can_set_salary`,`roles`) VALUES
-- ('','','','','','','','');
-- INSERT INTO `comments` (`id`,`task_id`,`author_id`,`is_public`,`content`) VALUES
-- ('','','','','');
-- INSERT INTO `conversation_participants` (`id`,`conversion_id`,`person_id`,`is_admin`) VALUES
-- ('','','','');