-- daily 테이블과 intraday 테이블 alter 필요 --

alter table daily change name symbol VARCHAR(50);

alter table intraday change name symbol VARCHAR(50);