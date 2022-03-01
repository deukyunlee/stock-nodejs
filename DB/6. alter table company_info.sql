alter table company_info add column id INT;
alter table company_info drop primary key;
alter table company_info add primary key (id, symbol);
ALTER TABLE company_info MODIFY ID INT AUTO_INCREMENT;
ALTER TABLE company_info add column updatedAt DATE;