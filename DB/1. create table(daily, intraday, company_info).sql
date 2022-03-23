CREATE TABLE IF NOT EXISTS daily (symbol VARCHAR(50), timestamp DATE NOT NULL, open DECIMAL(10,4) NOT NULL, high DECIMAL(10,4) NOT NULL, low DECIMAL(10,4) NOT NULL, close DECIMAL(10,4) NOT NULL, volume INT NOT NULL, change_percent DECIMAL(10,4), change_value DECIMAL(10,4), cap INT, constraint daily_PK primary key(symbol, timestamp));

CREATE TABLE IF NOT EXISTS intraday (symbol VARCHAR(50), timestamp DATETIME NOT NULL, open DECIMAL(10,4) NOT NULL, high DECIMAL(10,4) NOT NULL, low DECIMAL(10,4) NOT NULL, close DECIMAL(10,4) NOT NULL, volume INT NOT NULL, constraint daily_PK primary key(symbol, timestamp));

CREATE TABLE IF NOT EXISTS company_info(symbol VARCHAR(10), id INT AUTO_INCREMENT, name_en VARCHAR(50), name_kr VARCHAR(50), desc_en TEXT, desc_kr TEXT, updatedAt_daily DATE, updatedAt_intraday DATETIME, imgurl BLOB, constraint company_info_PK primary key(id, symbol));


-- daily, intraday 내의 change_value, change_percent 컬럼 decimal(10,4)로 변경

CREATE TABLE IF NOT EXISTS user(provider VARCHAR(50), refresh_token VARCHAR(100), email VARCHAR(50), constraint user_pk primary key(provider, email));