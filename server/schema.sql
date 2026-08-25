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

CREATE TABLE IF NOT EXISTS doctors (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  short_name VARCHAR(60) NOT NULL,
  role VARCHAR(120) NOT NULL,
  book_department VARCHAR(80) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY doctors_name_idx (name)
);

-- One row per continuous OPD block. day_of_week: 0=Sun ... 6=Sat.
-- start_minute/end_minute are minutes from midnight (e.g. 600 = 10:00am), end exclusive.
CREATE TABLE IF NOT EXISTS doctor_schedules (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  doctor_id INT UNSIGNED NOT NULL,
  day_of_week TINYINT UNSIGNED NOT NULL,
  start_minute SMALLINT UNSIGNED NOT NULL,
  end_minute SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  INDEX doctor_schedules_doctor_day_idx (doctor_id, day_of_week),
  CONSTRAINT doctor_schedules_doctor_fk FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE,
  CONSTRAINT doctor_schedules_range_chk CHECK (end_minute > start_minute),
  CONSTRAINT doctor_schedules_day_chk CHECK (day_of_week BETWEEN 0 AND 6)
);

-- Seed data below is safe to re-run: doctors upsert by name, and each doctor's
-- schedule rows are fully replaced rather than duplicated.
INSERT INTO doctors (name, short_name, role, book_department) VALUES
  ('Dr. Apeksha Sahu', 'Dr. Apeksha', 'Obstetrician & Gynaecologist', 'Obs & Gynaecology'),
  ('Dr. Rishi Raj', 'Dr. Rishi', 'Orthopaedic Surgeon', 'Orthopaedics')
ON DUPLICATE KEY UPDATE short_name = VALUES(short_name), role = VALUES(role), book_department = VALUES(book_department);

DELETE ds FROM doctor_schedules ds
  JOIN doctors d ON d.id = ds.doctor_id
  WHERE d.name IN ('Dr. Apeksha Sahu', 'Dr. Rishi Raj');

INSERT INTO doctor_schedules (doctor_id, day_of_week, start_minute, end_minute)
SELECT d.id, x.day_of_week, x.start_minute, x.end_minute
FROM doctors d
JOIN (
  SELECT 'Dr. Apeksha Sahu' AS doctor_name, 1 AS day_of_week, 600 AS start_minute, 840 AS end_minute
  UNION ALL SELECT 'Dr. Apeksha Sahu', 1, 1020, 1200
  UNION ALL SELECT 'Dr. Apeksha Sahu', 2, 600, 840
  UNION ALL SELECT 'Dr. Apeksha Sahu', 2, 1020, 1200
  UNION ALL SELECT 'Dr. Apeksha Sahu', 3, 600, 840
  UNION ALL SELECT 'Dr. Apeksha Sahu', 3, 1020, 1200
  UNION ALL SELECT 'Dr. Apeksha Sahu', 4, 600, 840
  UNION ALL SELECT 'Dr. Apeksha Sahu', 4, 1020, 1200
  UNION ALL SELECT 'Dr. Apeksha Sahu', 5, 600, 840
  UNION ALL SELECT 'Dr. Apeksha Sahu', 5, 1020, 1200
  UNION ALL SELECT 'Dr. Apeksha Sahu', 6, 600, 780
  UNION ALL SELECT 'Dr. Rishi Raj', 1, 660, 840
  UNION ALL SELECT 'Dr. Rishi Raj', 1, 1080, 1200
  UNION ALL SELECT 'Dr. Rishi Raj', 3, 660, 840
  UNION ALL SELECT 'Dr. Rishi Raj', 3, 1080, 1200
  UNION ALL SELECT 'Dr. Rishi Raj', 5, 660, 840
  UNION ALL SELECT 'Dr. Rishi Raj', 5, 1080, 1200
  UNION ALL SELECT 'Dr. Rishi Raj', 6, 660, 840
) x ON x.doctor_name = d.name;
