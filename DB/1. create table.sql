CREATE TABLE IF NOT EXISTS daily (name VARCHAR(50), timestamp DATE NOT NULL, open DECIMAL(10,4) NOT NULL, high DECIMAL(10,4) NOT NULL, low DECIMAL(10,4) NOT NULL, close DECIMAL(10,4) NOT NULL, volume INT NOT NULL, constraint daily_PK primary key(name, timestamp));

CREATE TABLE IF NOT EXISTS intraday (name VARCHAR(50), timestamp timestamp NOT NULL, open DECIMAL(10,4) NOT NULL, high DECIMAL(10,4) NOT NULL, low DECIMAL(10,4) NOT NULL, close DECIMAL(10,4) NOT NULL, volume INT NOT NULL, constraint daily_PK primary key(name, timestamp));

CREATE TABLE IF NOT EXISTS company_info(name VARCHAR(50), description TEXT, cap BIGINT, constraint company_info_PK primary key(name, cap));