alter table daily add column chagne_percent VARCHAR(20);
alter table daily add column change DECIMAL(10,4);
alter table daily add column last_trading_day DATE;

alter table daily drop primary key;
alter table daily modify column timestamp DATE;
alter table daily add primary key (symbol, last_trading_day);
