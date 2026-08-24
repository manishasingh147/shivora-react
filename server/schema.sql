CREATE DATABASE IF NOT EXISTS shivora;
USE shivora;

CREATE TABLE IF NOT EXISTS appointments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  department VARCHAR(80) NOT NULL,
  preferred_datetime VARCHAR(120) NOT NULL,
  message TEXT NULL,
  status ENUM('new', 'contacted', 'confirmed', 'cancelled') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX appointments_status_created_idx (status, created_at)
);
