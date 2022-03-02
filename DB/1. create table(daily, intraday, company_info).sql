CREATE TABLE IF NOT EXISTS daily (symbol VARCHAR(50), date DATE NOT NULL, open DECIMAL(10,4) NOT NULL, high DECIMAL(10,4) NOT NULL, low DECIMAL(10,4) NOT NULL, close DECIMAL(10,4) NOT NULL, volume INT NOT NULL, change_percent DECIMAL(5,4), change_value DECIMAL(5,4) constraint daily_PK primary key(symbol, date));

CREATE TABLE IF NOT EXISTS intraday (symbol VARCHAR(50), datetime DATETIME NOT NULL, open DECIMAL(10,4) NOT NULL, high DECIMAL(10,4) NOT NULL, low DECIMAL(10,4) NOT NULL, close DECIMAL(10,4) NOT NULL, volume INT NOT NULL, change_percent DECIMAL(5,4), change_value DECIMAL(5,4) constraint daily_PK primary key(symbol, datetime));

CREATE TABLE IF NOT EXISTS company_info(symbol VARCHAR(10), name_en VARCHAR(50), name_kr VARCHAR(50), desc_en TEXT, desc_kr TEXT, cap BIGINT, updatedAt_daily DATE, updatedAt_intraday DATETIME constraint company_info_PK primary key(symbol));

-- alter table company_info change column name name_en varchar(50);
-- 