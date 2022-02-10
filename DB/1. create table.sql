CREATE TABLE IF NOT EXISTS daily (name VARCHAR(50), timestamp DATE NOT NULL, open DECIMAL(10,4) NOT NULL, high DECIMAL(10,4) NOT NULL, low DECIMAL(10,4) NOT NULL, close DECIMAL(10,4) NOT NULL, volume INT NOT NULL, constraint daily_PK primary key(name, timestamp));