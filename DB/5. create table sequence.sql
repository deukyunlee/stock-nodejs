-- 지금까지 저장된 데이터 확인용
create table sequence (id INT, t_name VARCHAR(50), symbol VARCHAR(50), constraint seq_PK primary key(symbol));

insert into sequence values("daily", "a");
