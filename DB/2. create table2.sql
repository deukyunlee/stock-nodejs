CREATE TABLE IF NOT EXISTS company_info(symbol VARCHAR(10), name VARCHAR(50), kr_name VARCHAR(50), description TEXT, kr_desc TEXT, cap BIGINT, constraint company_info_PK primary key(symbol));




-- 상위 50개 종목 한글 회사명 및 회사설명

UPDATE company_info SET kr_name = '애플', kr_desc = "애플사는 가전제품, 컴퓨터 소프트웨어, 온라인 서비스를 전문으로 하는 미국의 다국적 기술 회사이다. 애플은 세계에서 가장 큰 기술 기업이며, 2021년 1월 이후로는 세계에서 가장 가치 있는 기업이다. 2021년 기준으로 애플은 세계 4위의 PC 판매 업체이자 4위의 스마트폰 제조 업체이다. 아마존, 구글, 마이크로소프트, 페이스북과 함께 미국의 5대 정보기술 기업 중 하나이다." WHERE symbol = 'aapl';

UPDATE company_info SET kr_name = '마이크로소프트', kr_desc = "마이크로소프트 코퍼레이션(Microsoft Corporation)은 컴퓨터 소프트웨어, 가전제품, 개인용 컴퓨터 및 관련 서비스를 생산하는 미국의 다국적 기술 회사이다. 가장 잘 알려진 소프트웨어 제품은 마이크로소프트 윈도우 계열 운영 체제, 마이크로소프트 오피스 제품군, 인터넷 익스플로러 및 에지 웹 브라우저이다. 이 회사의 주력 하드웨어 제품은 엑스박스 비디오 게임 콘솔과 마이크로소프트 서피스 PC 라인업이다. 마이크로소프트는 2020년 포춘지 선정 미국 최대 기업 500대 순위에서 21위를 차지했다. 구글, 애플, 아마존, 페이스북과 함께 미국 정보기술(IT) 업계의 5대 기업으로 꼽힌다." WHERE symbol = 'msft';

UPDATE company_info SET kr_name = '알파벳', kr_desc = "알파벳 주식회사()는 미국 캘리포니아주 마운틴뷰에 본사를 둔 다국적 기업이다. 2015년 10월 2일 구글의 구조조정을 통해 만들어졌으며 구글의 모회사가 되었다. 구글의 공동 창업자 두 명은 알파벳의 지배 주주, 이사회, 그리고 직원들로 남아있었다. 알파벳은 세계에서 4번째로 큰 기술 기업이자 세계에서 가장 가치 있는 기업 중 하나입니다." WHERE symbol = 'goog';

UPDATE company_info SET kr_name = '아마존', kr_desc = "Amazon.com은 전자상거래, 클라우드 컴퓨팅, 디지털 스트리밍 및 인공지능에 초점을 맞춘 미국의 다국적 기술 기업입니다. 구글, 애플, 마이크로소프트, 페이스북과 함께 미국 정보기술 산업의 5대 기업 중 하나이다. 이 회사는 세계에서 가장 영향력 있는 경제 문화 세력 중 하나이자 세계에서 가장 가치 있는 브랜드로 일컬어져 왔다." WHERE symbol = 'amzn';

UPDATE company_info SET kr_name = '테슬라', kr_desc = "테슬라(Tesla, Inc.)는 미국 캘리포니아주 팔로알토에 본사를 둔 전기 자동차 및 청정 에너지 기업이다. 테슬라의 현재 제품에는 전기자동차, 가정에서 그리드 규모까지 배터리 에너지 저장장치, 태양광 패널, 태양광 지붕 타일 등 관련 제품과 서비스가 포함된다. 테슬라는 2020년 플러그인(플러그인 하이브리드 포함) 시장의 16%, 배터리 전기(순수 전기) 시장의 23%를 점유하며 플러그인과 배터리 전기 승용차 부문에서 가장 높은 판매량을 기록했다. 자회사인 테슬라 에너지를 통해 이 회사는 미국에서 태양광 발전 시스템을 개발하고 주요 설치 업체이다. 테슬라에너지는 2020년 배터리 저장용량 3GWh가 공급될 정도로 세계 최대 배터리 에너지 저장장치 공급사 중 하나이기도 하다." WHERE symbol = 'tsla';

--brk.a는 없음

UPDATE company_info SET kr_name = '엔비디아', kr_desc = "Nvidia Corporation is an American multinational technology company incorporated in Delaware and based in Santa Clara, California. It designs graphics processing units (GPUs) for the gaming and professional markets, as well as system on a chip units (SoCs) for the mobile computing and automotive market." WHERE symbol = 'nvda';

UPDATE company_info SET kr_name = '메타', kr_desc = "페이스북(Facebook, Inc.)은 미국 캘리포니아주 멘로파크에 본사를 둔 다국적 기술 대기업이다. 그것은 세계에서 가장 가치 있는 회사 중 하나입니다. 구글, 애플, 마이크로소프트, 아마존과 함께 미국 정보기술(IT) 5대 기업으로 꼽힌다. 페이스북은 페이스북 메신저, 페이스북 워치, 페이스북 포털을 포함한 소셜 네트워킹 플랫폼 이상의 다른 제품과 서비스를 제공한다. 또한 인스타그램, 왓츠앱, 오큘러스, 기피, 마필리 등을 인수했으며 지오 플랫폼 지분 9.9%를 보유하고 있다." WHERE symbol = 'fb';

UPDATE company_info SET kr_name = '비자', kr_desc = "비자 주식회사(Visa Inc.)는 미국 캘리포니아주 포스터시티에 본사를 둔 다국적 금융 서비스 기업이다. 비자 브랜드 신용 카드, 직불 카드, 선불 카드를 통해 전 세계적으로 전자 자금 이체를 용이하게 한다. 비자는 세계에서 가장 가치 있는 회사 중 하나입니다." WHERE symbol = 'v';

UPDATE company_info SET kr_name = '제이피 모건 체이스', kr_desc = "JP모건 체이스(JP모건 체이스)는 미국 뉴욕에 본사를 둔 다국적 투자은행이자 금융 서비스 지주회사이다. JP모건 체이스는 델라웨어에 법인화되어 있다. Bulge Bracket 은행으로서, 그것은 다양한 투자 은행과 금융 서비스의 주요 공급자이다. 뱅크 오브 아메리카, 씨티그룹, 웰스 파고와 함께 미국의 4대 은행 중 하나이다. JP모건 체이스는 세계적인 은행이자 관리 은행으로 여겨진다. J.P. 모건 브랜드는 투자 은행, 자산 관리, 프라이빗 뱅킹, 프라이빗 자산 관리 및 재무 서비스 부서에서 사용합니다." WHERE symbol = 'jpm';



UPDATE company_info SET kr_name = '유나이티드 헬스 그룹', kr_desc = "유나이티드헬스(UnitedHealth)는 미국 미네소타주 미네톤카에 본사를 둔 의료 보험 회사이다. 의료 상품과 보험 서비스를 제공한다. 2020년에는 2,571억 달러의 매출로 CVS 헬스에 이어 두 번째로 큰 의료 회사였으며, 순 보험료로는 가장 큰 보험 회사였다. UnitedHealthcare 수익은 그룹 전체 수익의 80%를 차지합니다." WHERE symbol = 'unh';

UPDATE company_info SET kr_name = '존슨앤드존슨', kr_desc = "존슨앤드존슨(J&J)은 1886년에 설립된 미국의 다국적 기업이다. 이 회사의 보통주는 다우존스 산업평균지수의 구성 요소이며, 2021년 포춘지 선정 미국 최대 기업 중 36위에 올랐다. 존슨앤드존슨은 세계에서 가장 가치 있는 기업 중 하나로 미국 정부보다 신용등급이 높은 AAA를 보유한 유일한 미국계 기업 중 하나다." WHERE symbol = 'jnj';

UPDATE company_info SET kr_name = '뱅크 오브 아메리카', kr_desc = "뱅크 오브 아메리카(Bank of America)는 미국 노스캐롤라이나주 샬럿에 본사를 둔 다국적 투자은행이다. 뱅크 오브 아메리카는 1998년 네이션스뱅크가 뱅크아메리카를 인수하면서 설립되었다. JP모건체이스에 이어 미국에서 두 번째로 큰 은행이며, 세계에서 여덟 번째로 큰 은행이다. 뱅크 오브 아메리카(Bank of America)는 미국의 4대 은행 중 하나이다. JP모건체이스, 씨티그룹, 웰스파고와 직접적인 경쟁을 벌이며 미국 전체 은행 예금의 약 10%를 서비스하고 있다. 주요 금융 서비스는 상업 은행, 자산 관리, 투자 은행이다." WHERE symbol = 'bac';

UPDATE company_info SET kr_name = '프록터 앤드 갬블', kr_desc = "프록터 앤드 갬블 컴퍼니(P&G)는 1837년 윌리엄 프록터와 제임스 갬블에 의해 설립된 미국의 다국적 소비재 기업이다. 이 제품은 뷰티, 그루밍, 헬스케어, 패브릭 & 홈케어, 베이비, 페미닌, 패밀리 케어 등 여러 부문으로 구성되어 있습니다. 프링글스를 켈로그에 판매하기 전에 프링글스의 제품 포트폴리오에는 음식, 과자, 음료도 포함되어 있었다." WHERE symbol = 'pg';

UPDATE company_info SET kr_name = '마스터카드', kr_desc = "마스터카드 주식회사(Mastercard Incorporated)는 미국의 다국적 금융 서비스 기업이다. 글로벌 운영 본부는 미주리주 세인트루이스의 오팔론에 위치해 있다. 미주리주 찰스 카운티입니다 전 세계적으로 마스터카드 브랜드 직불, 신용카드, 선불카드를 사용하여 구매하는 가맹점의 은행과 카드 발급 은행 또는 구매자의 신용 조합 간의 결제를 처리하는 것이 주요 업무이다. 마스터카드 월드와이드는 2006년부터 상장된 회사이다." WHERE symbol = 'ma';

UPDATE company_info SET kr_name = '월마트', kr_desc = "월마트(Walmart)는 미국 아칸소주 벤튼빌에 본사를 둔 다국적 소매 기업이다. 또한 샘스클럽 소매 창고도 소유하고 있다." WHERE symbol = 'wmt';

UPDATE company_info SET kr_name = '홈디포', kr_desc = "홈디포(The Home Depot, Inc.)는 미국에서 가장 큰 주택 개량 소매업체로, 도구, 건설 제품 및 서비스를 공급한다. 본사는 조지아주 코브 카운티에 있으며, 주소는 애틀랜타이다." WHERE symbol = 'hd';

UPDATE company_info SET kr_name = '엑슨 모빌', kr_desc = "엑손 모빌(Exxon Mobil)은 미국 텍사스주 어빙에 본사를 둔 다국적 석유 및 가스 기업이다. 존 D.의 직계 후손 중 가장 크다. 1999년 11월 30일 엑손(옛 뉴저지의 스탠다드 오일 회사)과 모빌(옛 뉴욕의 스탠다드 오일 회사)이 합병하여 설립되었다. 엑손모빌의 주요 브랜드는 엑손, 모빌, 에소, 엑손모빌 화학이다. 엑손모빌은 뉴저지에 법인화되어 있다." WHERE symbol = 'xom';

UPDATE company_info SET kr_name = '알리바바 그룹', kr_desc = "알리바바 그룹 홀딩 리미티드() 또는 알리바바 그룹()은 전자상거래, 소매업, 인터넷 및 기술을 전문으로 하는 중국의 다국적 기술 기업이다. 1999년 6월 28일 저장성 항저우에서 설립된 이 회사는 웹 포털을 통해 소비자 대 소비자(C2C), 기업 대 소비자(B2C), 기업 대 기업(B2B) 판매 서비스뿐만 아니라 전자 결제 서비스, 쇼핑 검색 엔진 및 클라우드 컴퓨팅 서비스를 제공한다. 전 세계 수많은 사업 부문에서 다양한 기업 포트폴리오를 소유하고 운영하고 있다." WHERE symbol = 'baba';

UPDATE company_info SET kr_name = '월트디즈니 컴퍼니', kr_desc = "월트 디즈니 컴퍼니(Walt Disney Company)는 미국 캘리포니아주 버뱅크의 월트 디즈니 스튜디오 단지에 본사를 둔 다국적 미디어 및 엔터테인먼트 기업이다." WHERE symbol = 'dis';



UPDATE company_info SET kr_name = '화이자', kr_desc = "화이자(華이자)는 미국 뉴욕 맨해튼 42번가에 본사를 둔 다국적 제약 및 생명공학 기업이다. 회사 이름은 공동 설립자인 찰스 화이자(1824-1906)를 기념하기 위해 지어졌다. 화이저는 면역학, 종양학, 심장학, 내분비학, 신경학을 위한 의약품과 백신을 개발하고 생산한다. 이 회사는 각각 연간 10억 달러 이상의 수익을 올리는 여러 블록버스터 의약품 또는 제품을 보유하고 있다." WHERE symbol = 'pfe';

UPDATE company_info SET kr_name = '코카콜라 컴퍼니', kr_desc = "코카콜라 컴퍼니(Coca-Cola Company)는 미국 델라웨어주 애틀랜타에 본사를 둔 다국적 음료 기업이다. 코카콜라 컴퍼니는 무알코올 음료 농축액과 시럽의 제조, 소매, 마케팅에 관심을 가지고 있다." WHERE symbol = 'ko';

UPDATE company_info SET kr_name = '셰브론', kr_desc = "셰브론 주식회사()는 미국의 다국적 에너지 기업이다. 스탠더드 오일의 뒤를 잇는 회사 중 하나이며 캘리포니아 주 샌 라몬에 본사를 두고 있으며 180개 이상의 국가에서 활동하고 있다. 셰브론은 탄화수소 탐사 및 생산, 정제, 마케팅 및 운송, 화학 제조 및 판매, 발전 등 석유 및 천연가스 산업의 모든 분야에 종사하고 있다." WHERE symbol = 'cvx';

UPDATE company_info SET kr_name = '애브비', kr_desc = "애브비는 2013년 설립된 미국의 상장 바이오의약품 회사이다. 애벗 연구소의 자회사로서 시작되었다." WHERE symbol = 'abbv';

UPDATE company_info SET kr_name = '아바고 테크놀로지스', kr_desc = "브로드컴(Broadcom)은 광범위한 반도체 및 인프라 소프트웨어 제품을 공급하는 미국의 디자이너, 개발자, 제조업체이다. 브로드컴의 제품은 데이터 센터, 네트워킹, 소프트웨어, 광대역, 무선, 스토리지 및 산업 시장에 서비스를 제공합니다." WHERE symbol = 'avgo';

UPDATE company_info SET kr_name = '일라이 릴리 앤드 컴퍼니', kr_desc = "일라이 릴리 앤드 컴퍼니(Eli Lilly and Company)는 인디애나주 인디애나폴리스에 본사를 둔 미국의 제약 회사이다. 이 제품은 약 125개국에서 판매되고 있다." WHERE symbol = 'lly';

UPDATE company_info SET kr_name = '나이키', kr_desc = "나이키(Nike, Inc.)는 신발, 의류, 장비, 액세서리 및 서비스의 디자인, 개발, 제조 및 전세계 마케팅과 판매에 종사하는 미국의 다국적 기업이다. 본사는 포틀랜드 메트로폴리탄 지역 오리건주 비버튼 근처에 있다. 세계에서 가장 큰 운동화 및 의류 공급 업체이며 스포츠 용품의 주요 제조업체이다." WHERE symbol = 'nke';

UPDATE company_info SET kr_name = '펩시코', kr_desc = "펩시코(PepsiCo, Inc.)는 미국 뉴욕주 해리슨에 본사를 둔 다국적 식품, 스낵 및 음료 기업이다. 펩시코의 사업은 식음료 시장의 모든 측면을 아우른다. 그것은 제품의 제조, 유통, 마케팅을 감독한다." WHERE symbol = 'pep';

UPDATE company_info SET kr_name = '시스코 시스템즈', kr_desc = "시스코 시스템즈(Cisco Systems, Inc.)는 미국 캘리포니아주 산호세에 본사를 둔 다국적 기술 대기업이다. Cisco는 네트워킹 하드웨어, 소프트웨어, 통신 장비 및 기타 첨단 기술 서비스 및 제품을 개발, 제조 및 판매합니다. 시스코는 OpenDNS, Webex, Jabber, Jasper 등 수많은 자회사를 통해 사물인터넷(IoT), 도메인 보안, 에너지 관리와 같은 특정 기술 시장을 전문으로 하고 있다. 2021년 1월 25일, 시스코는 델라웨어에서 환생했다." WHERE symbol = 'csco';

UPDATE company_info SET kr_name = '코스트코', kr_desc = "코스트코 도매 코퍼레이션(Costco Salchy Corporation)은 미국의 다국적 기업으로, 회원제로만 구성된 대형마트 체인을 운영하고 있다. 2020년 기준으로 코스트코는 세계에서 5번째로 큰 소매업체이며, 2016년 기준으로 세계 최대의 선택 소매업체이며, 주요 쇠고기, 유기농 식품, 로티세리 치킨, 와인 판매업체이다." WHERE symbol = 'cost';



UPDATE company_info SET kr_name = '웰스 파고', kr_desc = "웰스 파고 앤드 컴퍼니(Wells Fargo & Company)는 미국 캘리포니아주 샌프란시스코에 본사를 두고 맨해튼에 운영본부를 두고 있는 다국적 금융 서비스 회사이다." WHERE symbol = 'wfc';

UPDATE company_info SET kr_name = '어도비', kr_desc = "어도비(Adobe)는 미국의 다국적 컴퓨터 소프트웨어 회사이다. 델라웨어에 본사를 두고 캘리포니아주 산호세에 본사를 두고 있으며 역사적으로 그래픽, 사진, 일러스트레이션, 애니메이션, 멀티미디어, 영화 및 인쇄를 포함한 다양한 콘텐츠의 제작 및 출판을 위한 소프트웨어에 전문화되어 있다. 그 회사는 디지털 마케팅 관리 소프트웨어로 영역을 확장했다. 어도비는 전 세계적으로 수백만 명의 사용자를 보유하고 있다. 주요 제품은 다음과 같습니다. 포토샵 이미지 편집 소프트웨어, Adobe Illustrator 벡터 기반 일러스트레이션 소프트웨어, Adobe Acrobat Reader 및 Portable Document Format(PDF), 그리고 주로 시청각 콘텐츠 작성, 편집 및 게시를 위한 수많은 도구." WHERE symbol = 'adbe';

UPDATE company_info SET kr_name = '버라이즌 커뮤니케이션즈', kr_desc = "버라이즌 커뮤니케이션스(Verizon Communications Inc.)는 미국의 다국적 통신 대기업으로 다우존스 산업평균지수(Dow Jones Industrial Average)의 계열사이다. 본사는 뉴욕 맨해튼 미드타운 아메리카의 1095번가에 있지만 델라웨어에 본사를 두고 있다." WHERE symbol = 'vz';

UPDATE company_info SET kr_name = '액센츄어', kr_desc = "액센츄어(Accenture)는 아일랜드에 본사를 둔 다국적 기업으로 컨설팅 및 처리 서비스를 제공한다. 2009년부터 아일랜드 더블린에 합병되었다." WHERE symbol = 'acn';

UPDATE company_info SET kr_name = '애벗 래버러토리스', kr_desc = "애벗 연구소(Abbott Laboratories)는 미국 일리노이주 애벗 파크에 본사를 둔 다국적 의료기기 및 의료 서비스 기업이다. 1888년 시카고의 의사 월러스 캘빈 애보트가 설립하여 알려진 약품을 만들었다. 2013년 리서치 기반 제약 사업을 애브비로 분리했다." WHERE symbol = 'abt';

UPDATE company_info SET kr_name = '컴캐스트', kr_desc = "컴캐스트(Comcast)는 미국 펜실베이니아주 필라델피아에 본사를 둔 통신 대기업이다. AT&T에 이어 세계에서 두 번째로 큰 방송 및 케이블 텔레비전 회사이며, 미국에서 가장 큰 케이블 TV 회사이자 가장 큰 가정용 인터넷 서비스 제공업체이다. Comcast는 40개 주와 콜롬비아 특별구의 미국 거주 및 상업 고객에게 서비스를 제공합니다. 2011년부터 국제적인 미디어 회사인 NBCUniversal의 모회사로서, 컴캐스트는 각각 연극 전시회와 공중파, 케이블 텔레비전 방송을 목적으로 하는 장편 영화와 텔레비전 프로그램의 제작자이다." WHERE symbol = 'cmcsa';

UPDATE company_info SET kr_name = '써모 피셔 사이언티픽', kr_desc = "서모 피셔 사이언티픽(Thermo Fisher Scientific)은 과학 기기, 시약, 소모품, 의료, 생명 과학 및 학계, 정부, 산업(생명공학 및 제약 분야 포함)의 기타 연구소에 소프트웨어와 서비스를 제공하는 미국의 기업이다. 매사추세츠주 월섬에 본사를 둔 서모 피셔는 2006년 서모 일렉트로닉과 피셔 사이언티픽이 합병해 90억 달러의 매출을 올린 회사를 설립했다." WHERE symbol = 'tmo';

UPDATE company_info SET kr_name = '오라클', kr_desc = "오라클(Oracle)은 미국 텍사스주 오스틴에 본사를 둔 다국적 컴퓨터 기술 기업이다. 2020년 12월 본사를 텍사스로 이전하기 전까지 캘리포니아주 레드우드 쇼어스에 본사를 두고 있었다. 이 회사는 데이터베이스 소프트웨어 및 기술, 클라우드 엔지니어링 시스템, 엔터프라이즈 소프트웨어 제품, 특히 자체 브랜드 데이터베이스 관리 시스템을 판매합니다." WHERE symbol = 'orcl';

UPDATE company_info SET kr_name = '세일즈포스닷컴', kr_desc = "Salesforce.com, Inc.는 미국 캘리포니아주 샌프란시스코에 본사를 둔 클라우드 기반 소프트웨어 회사입니다. 고객 관계 관리(CRM) 서비스를 제공하고 고객 서비스, 마케팅 자동화, 분석 및 애플리케이션 개발에 초점을 맞춘 엔터프라이즈 애플리케이션 제품군을 보완적으로 제공합니다." WHERE symbol = 'crm';

UPDATE company_info SET kr_name = '인텔', kr_desc = "인텔 코퍼레이션(Intel Corporation)은 미국 캘리포니아주 샌타클래라에 본사를 둔 다국적 기업이다. 세계에서 가장 큰 반도체 칩 제조업체이며 x86 시리즈의 마이크로프로세서를 개발하였다." WHERE symbol = 'intc';



UPDATE company_info SET kr_name = '머크앤드컴퍼니', kr_desc = "머크앤코(Merck & Co.)는 미국 뉴저지주 케닐워스에 본사를 둔 다국적 제약회사이다. 이름은 1668년 독일에서 머크 그룹을 설립한 머크 가문의 이름을 따서 지었다." WHERE symbol = 'mrk';

UPDATE company_info SET kr_name = '퀄컴', kr_desc = "퀄컴(Qualcomm)은 미국 캘리포니아주 샌디에고에 본사를 둔 다국적 기업이다. 그것은 무선 기술과 관련된 반도체, 소프트웨어, 서비스를 만듭니다. 5G, 4G, CDMA2000, TD-SCDMA, WCDMA 모바일 통신 표준에 중요한 특허를 소유하고 있다." WHERE symbol = 'qcom';

UPDATE company_info SET kr_name = '어드밴스트 마이크로 디바이시스', kr_desc = "어드밴스트 마이크로 디바이스스(AMD, Advanced Micro Devices, Inc.)는 미국 캘리포니아주 산타클라라에 본사를 둔 다국적 반도체 회사로, 비즈니스 및 소비자 시장을 위한 컴퓨터 프로세서와 관련 기술을 개발하고 있다. AMD의 주요 제품에는 마이크로프로세서, 마더보드 칩셋, 서버, 워크스테이션, 개인용 컴퓨터, 임베디드 시스템 응용 프로그램용 임베디드 프로세서 및 그래픽 프로세서가 포함된다." WHERE symbol = 'amd';

UPDATE company_info SET kr_name = 'DHR인터내셔널', kr_desc = "데이나허(Danaher)는 미국 워싱턴 D.C.에 본사를 둔 글로벌 다변화 기업이다. 이 회사는 전문, 의료, 산업 및 상업 제품과 서비스를 설계, 제조 및 마케팅합니다. 이 회사의 3가지 플랫폼은 생명과학, 진단, 환경 및 응용 솔루션입니다." WHERE symbol = 'dhr';

UPDATE company_info SET kr_name = '맥도날드', kr_desc = "맥도날드(McDonald's Corporation)는 1940년 미국 캘리포니아주 샌버너디노에서 리처드 맥도널드와 모리스 맥도널드가 운영하는 식당으로 설립된 미국의 패스트푸드 회사이다. 1953년 애리조나주 피닉스에 골든 아치스 로고가 도입되면서 햄버거 판매대로 사업을 재개했고, 이후 회사를 프랜차이즈로 바꾸었다." WHERE symbol = 'mcd';

UPDATE company_info SET kr_name = '유피에스', kr_desc = "유나이티드 패키지 서비스(United Parcel Service)는 1907년에 설립된 미국의 다국적 해운 및 수신 및 공급망 관리 회사이다." WHERE symbol = 'ups';

UPDATE company_info SET kr_name = '모건 스탠리', kr_desc = "모건 스탠리(Morgan Stanley)는 미국의 다국적 투자 은행이자 금융 서비스 회사이다." WHERE symbol = 'ms';

UPDATE company_info SET kr_name = '넷플릭스', kr_desc = "넷플릭스(Netflix, Inc.)는 미국 캘리포니아주 로스 개토스에 본사를 둔 콘텐츠 플랫폼 및 제작 회사이다. 넷플릭스는 리드 헤이스팅스와 마크 랜돌프에 의해 1997년 캘리포니아 스코츠 밸리에서 설립되었다. 이 회사의 주요 사업은 사내 영화 및 텔레비전 시리즈 라이브러리에서 온라인 스트리밍을 제공하는 구독 기반 스트리밍 서비스이다." WHERE symbol = 'nflx';

UPDATE company_info SET kr_name = '필립 모리스 인터내셔널', kr_desc = "필립 모리스 인터내셔널(PMI)은 스위스계 미국인 다국적 담배 및 담배 제조 회사로 180여 개국에 판매되고 있다. 그 회사의 가장 인정받고 가장 잘 팔리는 제품은 말보로이다." WHERE symbol = 'pm';

UPDATE company_info SET kr_name = 'AT&T', kr_desc = "AT&T는 미국 델라웨어주의 다국적 지주회사이다. 세계에서 가장 큰 통신 회사이며, 휴대 전화 서비스 제공 업체 중 두 번째로 크다." WHERE symbol = 't';
