<?php

namespace FamoserOnlineOfficeBundle\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160916110652 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('CREATE TABLE addresses (id INTEGER NOT NULL, street_address CLOB DEFAULT NULL, postal_code CLOB DEFAULT NULL, address_locality CLOB DEFAULT NULL, address_country CLOB DEFAULT NULL, telefone CLOB DEFAULT NULL, description CLOB DEFAULT NULL, name CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE change_logs (id INTEGER NOT NULL, changer_id INTEGER DEFAULT NULL, changed_table CLOB DEFAULT NULL, changed_entry_id INTEGER DEFAULT NULL, content CLOB DEFAULT NULL, change_date DATETIME DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX changer_id ON change_logs (changer_id)');
        $this->addSql('CREATE TABLE comments (id INTEGER NOT NULL, author_id INTEGER DEFAULT NULL, task_id INTEGER DEFAULT NULL, is_public BOOLEAN DEFAULT NULL, content CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX task_id ON comments (task_id)');
        $this->addSql('CREATE INDEX author_id ON comments (author_id)');
        $this->addSql('CREATE TABLE conversation_participants (id INTEGER NOT NULL, person_id INTEGER DEFAULT NULL, conversion_id INTEGER DEFAULT NULL, is_admin BOOLEAN DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX conversion_id ON conversation_participants (conversion_id)');
        $this->addSql('CREATE INDEX person_id ON conversation_participants (person_id)');
        $this->addSql('CREATE TABLE conversations (id INTEGER NOT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE customers (id INTEGER NOT NULL, person_id INTEGER DEFAULT NULL, organization_id INTEGER DEFAULT NULL, primary_consultant_id INTEGER DEFAULT NULL, description CLOB DEFAULT NULL, customer_since DATETIME DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX person_id ON customers (person_id)');
        $this->addSql('CREATE INDEX organization_id ON customers (organization_id)');
        $this->addSql('CREATE INDEX primary_consultant_id ON customers (primary_consultant_id)');
        $this->addSql('CREATE TABLE employee_informations (id INTEGER NOT NULL, hour_salary_id INTEGER DEFAULT NULL, person_id INTEGER DEFAULT NULL, organization_id INTEGER DEFAULT NULL, employee_position_id INTEGER DEFAULT NULL, base_salary_id INTEGER DEFAULT NULL, can_set_salary BOOLEAN DEFAULT NULL, roles CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX person_id ON employee_informations (person_id)');
        $this->addSql('CREATE INDEX organization_id ON employee_informations (organization_id)');
        $this->addSql('CREATE INDEX employee_position_id ON employee_informations (employee_position_id)');
        $this->addSql('CREATE INDEX base_salary_id ON employee_informations (base_salary_id)');
        $this->addSql('CREATE INDEX hour_salary_id ON employee_informations (hour_salary_id)');
        $this->addSql('CREATE TABLE employee_position (id INTEGER NOT NULL, organization_id INTEGER DEFAULT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, roles CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX organization_id ON employee_position (organization_id)');
        $this->addSql('CREATE TABLE expenses (id INTEGER NOT NULL, price_specification_id INTEGER DEFAULT NULL, task_id INTEGER DEFAULT NULL, person_id INTEGER DEFAULT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, expense_date DATETIME DEFAULT NULL, is_billable BOOLEAN NOT NULL, is_accepted BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX task_id ON expenses (task_id)');
        $this->addSql('CREATE INDEX person_id ON expenses (person_id)');
        $this->addSql('CREATE INDEX price_specification_id ON expenses (price_specification_id)');
        $this->addSql('CREATE TABLE invoices (id INTEGER NOT NULL, payment_status_id INTEGER DEFAULT NULL, customer_id INTEGER DEFAULT NULL, total_payment_due_id INTEGER DEFAULT NULL, payment_due_date DATETIME DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX customer_id ON invoices (customer_id)');
        $this->addSql('CREATE INDEX total_payment_due_id ON invoices (total_payment_due_id)');
        $this->addSql('CREATE INDEX payment_status_id ON invoices (payment_status_id)');
        $this->addSql('CREATE TABLE messages (id INTEGER NOT NULL, conversation_id INTEGER DEFAULT NULL, author_id INTEGER DEFAULT NULL, content CLOB DEFAULT NULL, create_date DATETIME DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX author_id ON messages (author_id)');
        $this->addSql('CREATE INDEX conversation_id ON messages (conversation_id)');
        $this->addSql('CREATE TABLE notifications (id INTEGER NOT NULL, receiver_id INTEGER DEFAULT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, link_type CLOB DEFAULT NULL, link_arguments CLOB DEFAULT NULL, is_read BOOLEAN DEFAULT NULL, notification_date DATETIME DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_6000B0D3CD53EDB6 ON notifications (receiver_id)');
        $this->addSql('CREATE TABLE offers (id INTEGER NOT NULL, organization_id INTEGER DEFAULT NULL, product_id INTEGER DEFAULT NULL, price_specification_id INTEGER DEFAULT NULL, valid_from DATETIME DEFAULT NULL, valid_through DATETIME DEFAULT NULL, description CLOB DEFAULT NULL, offeredBy_id INTEGER DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX offeredBy_id ON offers (offeredBy_id)');
        $this->addSql('CREATE INDEX product_id ON offers (product_id)');
        $this->addSql('CREATE INDEX price_specification_id ON offers (price_specification_id)');
        $this->addSql('CREATE INDEX organization_id ON offers (organization_id)');
        $this->addSql('CREATE TABLE order_offers (id INTEGER NOT NULL, offer_id INTEGER DEFAULT NULL, order_id INTEGER DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX order_id ON order_offers (order_id)');
        $this->addSql('CREATE INDEX offer_id ON order_offers (offer_id)');
        $this->addSql('CREATE TABLE orders (id INTEGER NOT NULL, part_of_invoice_id INTEGER DEFAULT NULL, billing_address_id INTEGER DEFAULT NULL, customer_id INTEGER DEFAULT NULL, order_status_id INTEGER DEFAULT NULL, order_date DATETIME DEFAULT NULL, order_number CLOB DEFAULT NULL, payment_due_date DATETIME DEFAULT NULL, description CLOB DEFAULT NULL, discount DOUBLE PRECISION DEFAULT NULL, discount_currency INTEGER DEFAULT NULL, discount_code INTEGER DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX billing_address_id ON orders (billing_address_id)');
        $this->addSql('CREATE INDEX customer_id ON orders (customer_id)');
        $this->addSql('CREATE INDEX order_status_id ON orders (order_status_id)');
        $this->addSql('CREATE INDEX part_of_invoice_id ON orders (part_of_invoice_id)');
        $this->addSql('CREATE TABLE order_stati (id INTEGER NOT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE organizations (id INTEGER NOT NULL, address_id INTEGER DEFAULT NULL, email CLOB DEFAULT NULL, telephone CLOB DEFAULT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, legal_name CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX address_id ON organizations (address_id)');
        $this->addSql('CREATE TABLE payment_stati (id INTEGER NOT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE persons (id INTEGER NOT NULL, user_id INTEGER DEFAULT NULL, address_id INTEGER DEFAULT NULL, email CLOB DEFAULT NULL, honorific_prefix CLOB DEFAULT NULL, given_name CLOB DEFAULT NULL, family_name CLOB DEFAULT NULL, birth_date DATE DEFAULT NULL, telephone CLOB DEFAULT NULL, description CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX address_id ON persons (address_id)');
        $this->addSql('CREATE INDEX user_id ON persons (user_id)');
        $this->addSql('CREATE TABLE price_specifications (id INTEGER NOT NULL, max_price DOUBLE PRECISION DEFAULT NULL, min_price DOUBLE PRECISION DEFAULT NULL, price DOUBLE PRECISION DEFAULT NULL, price_currency CLOB DEFAULT NULL, value_added_tax_included BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE products (id INTEGER NOT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE task_entries (id INTEGER NOT NULL, price_specification_id INTEGER DEFAULT NULL, task_id INTEGER DEFAULT NULL, person_id INTEGER DEFAULT NULL, task_entry_type_id INTEGER DEFAULT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, start DATETIME DEFAULT NULL, "end" DATETIME DEFAULT NULL, is_billable BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX task_id ON task_entries (task_id)');
        $this->addSql('CREATE INDEX person_id ON task_entries (person_id)');
        $this->addSql('CREATE INDEX task_entry_type_id ON task_entries (task_entry_type_id)');
        $this->addSql('CREATE INDEX price_specification_id ON task_entries (price_specification_id)');
        $this->addSql('CREATE TABLE task_entry_types (id INTEGER NOT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE task_person (id INTEGER NOT NULL, person_id INTEGER DEFAULT NULL, task_id INTEGER DEFAULT NULL, roles CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX task_id ON task_person (task_id)');
        $this->addSql('CREATE INDEX person_id ON task_person (person_id)');
        $this->addSql('CREATE TABLE tasks (id INTEGER NOT NULL, task_status_id INTEGER DEFAULT NULL, customer_id INTEGER DEFAULT NULL, leader_id INTEGER DEFAULT NULL, parent_id INTEGER DEFAULT NULL, offer_id INTEGER DEFAULT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, estimated_start DATETIME DEFAULT NULL, estimated_end DATETIME DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX customer_id ON tasks (customer_id)');
        $this->addSql('CREATE INDEX leader_id ON tasks (leader_id)');
        $this->addSql('CREATE INDEX parent_id ON tasks (parent_id)');
        $this->addSql('CREATE INDEX offer_id ON tasks (offer_id)');
        $this->addSql('CREATE INDEX task_status_id ON tasks (task_status_id)');
        $this->addSql('CREATE TABLE task_stati (id INTEGER NOT NULL, name CLOB DEFAULT NULL, description CLOB DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE users (id INTEGER NOT NULL, username VARCHAR(180) NOT NULL, username_canonical VARCHAR(180) NOT NULL, email VARCHAR(180) NOT NULL, email_canonical VARCHAR(180) NOT NULL, enabled BOOLEAN NOT NULL, salt VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, last_login DATETIME DEFAULT NULL, locked BOOLEAN NOT NULL, expired BOOLEAN NOT NULL, expires_at DATETIME DEFAULT NULL, confirmation_token VARCHAR(255) DEFAULT NULL, password_requested_at DATETIME DEFAULT NULL, roles CLOB NOT NULL, credentials_expired BOOLEAN NOT NULL, credentials_expire_at DATETIME DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E992FC23A8 ON users (username_canonical)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E9A0D96FBF ON users (email_canonical)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'sqlite', 'Migration can only be executed safely on \'sqlite\'.');

        $this->addSql('DROP TABLE addresses');
        $this->addSql('DROP TABLE change_logs');
        $this->addSql('DROP TABLE comments');
        $this->addSql('DROP TABLE conversation_participants');
        $this->addSql('DROP TABLE conversations');
        $this->addSql('DROP TABLE customers');
        $this->addSql('DROP TABLE employee_informations');
        $this->addSql('DROP TABLE employee_position');
        $this->addSql('DROP TABLE expenses');
        $this->addSql('DROP TABLE invoices');
        $this->addSql('DROP TABLE messages');
        $this->addSql('DROP TABLE notifications');
        $this->addSql('DROP TABLE offers');
        $this->addSql('DROP TABLE order_offers');
        $this->addSql('DROP TABLE orders');
        $this->addSql('DROP TABLE order_stati');
        $this->addSql('DROP TABLE organizations');
        $this->addSql('DROP TABLE payment_stati');
        $this->addSql('DROP TABLE persons');
        $this->addSql('DROP TABLE price_specifications');
        $this->addSql('DROP TABLE products');
        $this->addSql('DROP TABLE task_entries');
        $this->addSql('DROP TABLE task_entry_types');
        $this->addSql('DROP TABLE task_person');
        $this->addSql('DROP TABLE tasks');
        $this->addSql('DROP TABLE task_stati');
        $this->addSql('DROP TABLE users');
    }
}
