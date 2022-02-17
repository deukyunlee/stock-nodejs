CREATE TABLE IF NOT EXISTS company_info(symbol VARCHAR(10), name VARCHAR(50), kr_name VARCHAR(50), description TEXT, kr_desc TEXT, cap BIGINT, constraint company_info_PK primary key(symbol));

--ex)






UPDATE company_info SET kr_name = '애플', kr_desc = "애플사는 가전제품, 컴퓨터 소프트웨어, 온라인 서비스를 전문으로 하는 미국의 다국적 기술 회사이다. 애플은 세계에서 가장 큰 기술 기업이며, 2021년 1월 이후로는 세계에서 가장 가치 있는 기업이다. 2021년 기준으로 애플은 세계 4위의 PC 판매 업체이자 4위의 스마트폰 제조 업체이다. 아마존, 구글, 마이크로소프트, 페이스북과 함께 미국의 5대 정보기술 기업 중 하나이다." WHERE symbol = 'aapl';

UPDATE company_info SET kr_name = '마이크로소프트', kr_desc = "마이크로소프트 코퍼레이션(Microsoft Corporation)은 컴퓨터 소프트웨어, 가전제품, 개인용 컴퓨터 및 관련 서비스를 생산하는 미국의 다국적 기술 회사이다. 가장 잘 알려진 소프트웨어 제품은 마이크로소프트 윈도우 계열 운영 체제, 마이크로소프트 오피스 제품군, 인터넷 익스플로러 및 에지 웹 브라우저이다. 이 회사의 주력 하드웨어 제품은 엑스박스 비디오 게임 콘솔과 마이크로소프트 서피스 PC 라인업이다. 마이크로소프트는 2020년 포춘지 선정 미국 최대 기업 500대 순위에서 21위를 차지했다. 구글, 애플, 아마존, 페이스북과 함께 미국 정보기술(IT) 업계의 5대 기업으로 꼽힌다." WHERE symbol = 'msft';

UPDATE company_info SET kr_name = '알파벳', kr_desc = "알파벳 주식회사()는 미국 캘리포니아주 마운틴뷰에 본사를 둔 다국적 기업이다. 2015년 10월 2일 구글의 구조조정을 통해 만들어졌으며 구글의 모회사가 되었다. 구글의 공동 창업자 두 명은 알파벳의 지배 주주, 이사회, 그리고 직원들로 남아있었다. 알파벳은 세계에서 4번째로 큰 기술 기업이자 세계에서 가장 가치 있는 기업 중 하나입니다." WHERE symbol = 'goog';

UPDATE company_info SET kr_name = '아마존', kr_desc = "Amazon.com은 전자상거래, 클라우드 컴퓨팅, 디지털 스트리밍 및 인공지능에 초점을 맞춘 미국의 다국적 기술 기업입니다. 구글, 애플, 마이크로소프트, 페이스북과 함께 미국 정보기술 산업의 5대 기업 중 하나이다. 이 회사는 세계에서 가장 영향력 있는 경제 문화 세력 중 하나이자 세계에서 가장 가치 있는 브랜드로 일컬어져 왔다." WHERE symbol = 'amzn';

UPDATE company_info SET kr_name = '테슬라', kr_desc = "테슬라(Tesla, Inc.)는 미국 캘리포니아주 팔로알토에 본사를 둔 전기 자동차 및 청정 에너지 기업이다. 테슬라의 현재 제품에는 전기자동차, 가정에서 그리드 규모까지 배터리 에너지 저장장치, 태양광 패널, 태양광 지붕 타일 등 관련 제품과 서비스가 포함된다. 테슬라는 2020년 플러그인(플러그인 하이브리드 포함) 시장의 16%, 배터리 전기(순수 전기) 시장의 23%를 점유하며 플러그인과 배터리 전기 승용차 부문에서 가장 높은 판매량을 기록했다. 자회사인 테슬라 에너지를 통해 이 회사는 미국에서 태양광 발전 시스템을 개발하고 주요 설치 업체이다. 테슬라에너지는 2020년 배터리 저장용량 3GWh가 공급될 정도로 세계 최대 배터리 에너지 저장장치 공급사 중 하나이기도 하다." WHERE symbol = 'tsla';

--brk.a는 없음

UPDATE company_info SET kr_name = '엔비디아', kr_desc = "Nvidia Corporation is an American multinational technology company incorporated in Delaware and based in Santa Clara, California. It designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market." WHERE symbol = 'nvda';

UPDATE company_info SET kr_name = '메타', kr_desc = "페이스북(Facebook, Inc.)은 미국 캘리포니아주 멘로파크에 본사를 둔 다국적 기술 대기업이다. 그것은 세계에서 가장 가치 있는 회사 중 하나입니다. 구글, 애플, 마이크로소프트, 아마존과 함께 미국 정보기술(IT) 5대 기업으로 꼽힌다. 페이스북은 페이스북 메신저, 페이스북 워치, 페이스북 포털을 포함한 소셜 네트워킹 플랫폼 이상의 다른 제품과 서비스를 제공한다. 또한 인스타그램, 왓츠앱, 오큘러스, 기피, 마필리 등을 인수했으며 지오 플랫폼 지분 9.9%를 보유하고 있다." WHERE symbol = 'fb';

UPDATE company_info SET kr_name = '비자', kr_desc = "비자 주식회사(Visa Inc.)는 미국 캘리포니아주 포스터시티에 본사를 둔 다국적 금융 서비스 기업이다. 비자 브랜드 신용 카드, 직불 카드, 선불 카드를 통해 전 세계적으로 전자 자금 이체를 용이하게 한다. 비자는 세계에서 가장 가치 있는 회사 중 하나입니다." WHERE symbol = 'v';

UPDATE company_info SET kr_name = '제이피모건체이스', kr_desc = "JP모건 체이스(JP모건 체이스)는 미국 뉴욕에 본사를 둔 다국적 투자은행이자 금융 서비스 지주회사이다. JP모건 체이스는 델라웨어에 법인화되어 있다. Bulge Bracket 은행으로서, 그것은 다양한 투자 은행과 금융 서비스의 주요 공급자이다. 뱅크 오브 아메리카, 씨티그룹, 웰스 파고와 함께 미국의 4대 은행 중 하나이다. JP모건 체이스는 세계적인 은행이자 관리 은행으로 여겨진다. J.P. 모건 브랜드는 투자 은행, 자산 관리, 프라이빗 뱅킹, 프라이빗 자산 관리 및 재무 서비스 부서에서 사용합니다." WHERE symbol = 'jpm';



UPDATE company_info SET kr_name = '유나이티드헬스그룹', kr_desc = "유나이티드헬스(UnitedHealth)는 미국 미네소타주 미네톤카에 본사를 둔 의료 보험 회사이다. 의료 상품과 보험 서비스를 제공한다. 2020년에는 2,571억 달러의 매출로 CVS 헬스에 이어 두 번째로 큰 의료 회사였으며, 순 보험료로는 가장 큰 보험 회사였다. UnitedHealthcare 수익은 그룹 전체 수익의 80%를 차지합니다." WHERE symbol = 'unh';

UPDATE company_info SET kr_name = '존슨앤드존슨', kr_desc = "존슨앤드존슨(J&J)은 1886년에 설립된 미국의 다국적 기업이다. 이 회사의 보통주는 다우존스 산업평균지수의 구성 요소이며, 2021년 포춘지 선정 미국 최대 기업 중 36위에 올랐다. 존슨앤드존슨은 세계에서 가장 가치 있는 기업 중 하나로 미국 정부보다 신용등급이 높은 AAA를 보유한 유일한 미국계 기업 중 하나다." WHERE symbol = 'jnj';

UPDATE company_info SET kr_name = '뱅크오브아메리카', kr_desc = "뱅크 오브 아메리카(Bank of America)는 미국 노스캐롤라이나주 샬럿에 본사를 둔 다국적 투자은행이다. 뱅크 오브 아메리카는 1998년 네이션스뱅크가 뱅크아메리카를 인수하면서 설립되었다. JP모건체이스에 이어 미국에서 두 번째로 큰 은행이며, 세계에서 여덟 번째로 큰 은행이다. 뱅크 오브 아메리카(Bank of America)는 미국의 4대 은행 중 하나이다. JP모건체이스, 씨티그룹, 웰스파고와 직접적인 경쟁을 벌이며 미국 전체 은행 예금의 약 10%를 서비스하고 있다. 주요 금융 서비스는 상업 은행, 자산 관리, 투자 은행이다." WHERE symbol = 'bac';

UPDATE company_info SET kr_name = '프록터앤드갬블', kr_desc = "프록터 앤드 갬블 컴퍼니(P&G)는 1837년 윌리엄 프록터와 제임스 갬블에 의해 설립된 미국의 다국적 소비재 기업이다. 이 제품은 뷰티, 그루밍, 헬스케어, 패브릭 & 홈케어, 베이비, 페미닌, 패밀리 케어 등 여러 부문으로 구성되어 있습니다. 프링글스를 켈로그에 판매하기 전에 프링글스의 제품 포트폴리오에는 음식, 과자, 음료도 포함되어 있었다." WHERE symbol = 'pg';

UPDATE company_info SET kr_name = '마스터카드', kr_desc = "마스터카드 주식회사(Mastercard Incorporated)는 미국의 다국적 금융 서비스 기업이다. 글로벌 운영 본부는 미주리주 세인트루이스의 오팔론에 위치해 있다. 미주리주 찰스 카운티입니다 전 세계적으로 마스터카드 브랜드 직불, 신용카드, 선불카드를 사용하여 구매하는 가맹점의 은행과 카드 발급 은행 또는 구매자의 신용 조합 간의 결제를 처리하는 것이 주요 업무이다. 마스터카드 월드와이드는 2006년부터 상장된 회사이다." WHERE symbol = 'ma';

UPDATE company_info SET kr_name = '월마트', kr_desc = "월마트(Walmart)는 미국 아칸소주 벤튼빌에 본사를 둔 다국적 소매 기업이다. 또한 샘스클럽 소매 창고도 소유하고 있다." WHERE symbol = 'wmt';

UPDATE company_info SET kr_name = '홈디포', kr_desc = "The Home Depot, Inc., commonly known as Home Depot, is the largest home improvement retailer in the United States, supplying tools, construction products, and services. The company is headquartered in incorporated Cobb County, Georgia, with an Atlanta mailing address." WHERE symbol = 'hd';

UPDATE company_info SET kr_name = '엑슨모빌', kr_desc = "엑손 모빌(Exxon Mobil)은 미국 텍사스주 어빙에 본사를 둔 다국적 석유 및 가스 기업이다. 존 D.의 직계 후손 중 가장 크다. 1999년 11월 30일 엑손(옛 뉴저지의 스탠다드 오일 회사)과 모빌(옛 뉴욕의 스탠다드 오일 회사)이 합병하여 설립되었다. 엑손모빌의 주요 브랜드는 엑손, 모빌, 에소, 엑손모빌 화학이다. 엑손모빌은 뉴저지에 법인화되어 있다." WHERE symbol = 'xom';

UPDATE company_info SET kr_name = '알리바바그룹', kr_desc = "알리바바 그룹 홀딩 리미티드() 또는 알리바바 그룹()은 전자상거래, 소매업, 인터넷 및 기술을 전문으로 하는 중국의 다국적 기술 기업이다. 1999년 6월 28일 저장성 항저우에서 설립된 이 회사는 웹 포털을 통해 소비자 대 소비자(C2C), 기업 대 소비자(B2C), 기업 대 기업(B2B) 판매 서비스뿐만 아니라 전자 결제 서비스, 쇼핑 검색 엔진 및 클라우드 컴퓨팅 서비스를 제공한다. 전 세계 수많은 사업 부문에서 다양한 기업 포트폴리오를 소유하고 운영하고 있다." WHERE symbol = 'baba';

UPDATE company_info SET kr_name = '마이크로소프트', kr_desc = "월트 디즈니 컴퍼니(Walt Disney Company)는 미국 캘리포니아주 버뱅크의 월트 디즈니 스튜디오 단지에 본사를 둔 다국적 미디어 및 엔터테인먼트 기업이다." WHERE symbol = 'dis';
