ALTER TABLE cities
DROP COLUMN longitude,
DROP COLUMN latitude;

ALTER TABLE cities
ADD COLUMN longitude numeric(30, 26),
ADD COLUMN latitude numeric(30, 26);