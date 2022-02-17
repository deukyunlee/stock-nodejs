CREATE TABLE IF NOT EXISTS company_info(symbol VARCHAR(10), name VARCHAR(50), kr_name VARCHAR(50), description TEXT, kr_desc TEXT, cap BIGINT, constraint company_info_PK primary key(symbol));

--ex)
UPDATE company_info SET kr_name = '애플', kr_desc = "애플사는 가전제품, 컴퓨터 소프트웨어, 온라인 서비스를 전문으로 하는 미국의 다국적 기술 회사이다. 애플은 세계에서 가장 큰 기술 기업이며, 2021년 1월 이후로는 세계에서 가장 가치 있는 기업이다. 2021년 기준으로 애플은 세계 4위의 PC 판매 업체이자 4위의 스마트폰 제조 업체이다. 아마존, 구글, 마이크로소프트, 페이스북과 함께 미국의 5대 정보기술 기업 중 하나이다." WHERE symbol = 'aapl';