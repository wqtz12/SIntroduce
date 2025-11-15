# JBS|KSH Career Experience AI Guide Document

 1. Project overview
    1) Project Name : CareerExperience&PathForTheFuture
    2) Purpose : Change company  
    3) Target : People who prepare for change company
 2. Technology stack
    1) Design Draft : "Figma"
    2) Communication : "Notion"
    3) CI/CD : "Git"
    4) API : "GraghQL"
    5) Front-end : "Next.js"
    6) Back-end : "Express.js"
    7) DataBase : "Firebase"
        "version": "2",
        "projectNumber": "743861400548",
        "projectId": "fir-101-e0467",
        "appId": "1:743861400548:web:7d707b64c48b7f1ffa8df1",
        "realtimeDatabaseInstanceUri": "https://fir-101-e0467-default-rtdb.firebaseio.com",
        "realtimeDatabaseUrl": "",
        "storageBucket": "fir-101-e0467.firebasestorage.app",
        "locationId": "",
        "apiKey": "AIzaSyCsnT5TnA0Q50K_HA_psgfzAdAGhaQgSoM",
        "authDomain": "fir-101-e0467.firebaseapp.com",
        "messagingSenderId": "743861400548",
        "measurementId": "G-DH6B8PMKZB"
    8) Styling : "Tailwind CSS"
    9)  RAG : "hybrid ( Langchain + inhouse )"
    10) LLM : "hybrid ( Gemini + Claude )"
    <!--11) MCP : "SEO MCP (keyword anlaysis)", "Context7 MCP (Latest source)", "Figma Context MCP (Figma connect),"Blender MCP ( 3D Modeling )", "windows Control MCP( windows system Remote Control )","Browser-use MCP (web scarping)", "Zaiper MCP (auto workflow automation)", "MarkItDown MCP (Mardwon management)", "Notion MCP(notion management)"-->
    11) AGENT : "Vertex AI Agent Builder"
 3. Process Flow rule 
    1) Input Data Collection & Preprocessing
     - Input: Collect text/documents such as self-introductions, career summaries, and project descriptions.
     - Preprocessing Steps:
     - Text Parsing: Convert PDF/files to text (e.g., using PyPDF2, Tesseract OCR).
     - Duplicate Removal: Identify and merge duplicates using TF-IDF or MinHashing algorithms.
     - Temporal Sorting: Extract date information and sort chronologically (e.g., via dateparser library).
    2) Database & Vector Storage Setup
     - Relational Database (SQL):
     sql
     CREATE TABLE experiences (
        id INT PRIMARY KEY,
        content TEXT,
        type ENUM('work', 'project'),
        start_date DATE,
        end_date DATE,
        keywords VARCHAR(255),
        metadata JSON
     );
     - Vector Database:
        Store text embeddings using tools like FAISS, Pinecone, or Milvus (e.g., convert text to vectors via OpenAI Embeddings).
    3) RAG Architecture Design
     - Retrieval Phase:
        Match company-specific cover letter keywords against stored career data via vector similarity search.
     - Example: For a keyword like "team project experience", retrieve relevant user experiences.
     - Generation Phase:
        Feed retrieved content to an LLM (e.g., GPT-4) to craft a cover letter aligned with the company’s values.

    4) Project Summaries & Metadata Management
     - Project Summaries:
        Generate concise summaries using models like BART or T5, stored in JSON/Markdown format.
     - json
        {
            "project_name": "E-commerce Platform",
            "duration": "2022.03 ~ 2023.02",
            "role": "Full-stack Developer",
            "tech_stack": ["React", "Node.js", "MongoDB"],
            "summary": "Developed a scalable shopping cart system..."
        }
     - Metadata Tagging: Track tags like technology stack, industry, and complexity level.
    5) Company-Specific Cover Letter Workflow
     - Company Profile Analysis: Gather company mission, values, and industry details.
     - Keyword Matching: Compare company cover letter requirements with user career data.
     - Content Selection: Retrieve relevant experiences via RAG → Use LLM to rephrase into natural sentences.
     - Value Alignment: Emphasize company values (e.g., "innovation" → "customer-centric innovative solutions").
    6) Technical Stack Example
     - NLP: "SpaCy (keyword extraction)", "Hugging Face Transformers (summarization)"
     - Vector DB: "Pinecone", "Milvus", "Google Vertex AI Matching Engine"
     - LLM: "Gemini 3.0", "Claude 2.0"
     - Databases: "PostgreSQL (relational)", "MongoDB (NoSQL)"
    7) Considerations
     - Privacy: Encrypt sensitive career information.
     - Performance: Optimize search speed via vector database caching.
     - Flexibility: Retrain models when adding new company profiles.
 4. Coding rule
    1) ESLint: Airbnb 스타일 가이드 준수 (Airbnb Style Guide)

      - 함수/변수 네이밍: 카멜케이스(camelCase), 클래스는 파스칼케이스(PascalCase).
      - 화살표 함수 사용 권장: () => {... }
      - let/const 사용 (단, var는 금지).
      - Prettier: 코드 자동 포맷팅 활성화 (참조 : https://prettier.io/docs/configuration.html).
    2) Next.js: 파일 및 컴포넌트 구조
      - 페이지 네이밍: 소문자 경로 사용 ( pages/blog/post.js -> /blog/post) 
      - 컴포넌트 네이밍: PascalCase
      - API Route: pages/api/ 디렉토리에 배치
      - Data Fetching getstaticProps/getServerSdieProps: 페이지별로 데이터 Free Fetching 구현
      - 커스텀 훅 사용: lib/useFirebaseAuth.js와 같은 재사용 가능한 훅 생성
    3) Express 규칙
      - 라우팅
         모듈화: 라우트를 /routes/ 디렉토리에 분리하여 관리.
         에러 핸들링: 에러 미들웨어로 중앙 처리.
    4) Firebase 규칙
      - 환경 설정
         환경 변수 관리: .env 파일에 Firebase 키 저장 (.gitignore에 추가).
      - Firestore 최적화
         인덱스 설정: 쿼리 필드에 인덱스 추가.
         배치 처리: 대규모 데이터는 배치 쿼리로 처리.
         인증: JWT/OAuth 활용, Firebase Auth 토큰을 JWT로 변환해 클라이언트에 전달.
    5) Tailwind CSS 규칙
      - 스타일링
         유틸리티 우선 사용: flex, bg-red-500 등 기본 클래스 활용.
         커스텀 클래스: tailwind.config.js의 extend 섹션에서 추가.
      - 글로벌 스타일: styles/globals.css에 전역 스타일 정의.
    6) 테스트 규칙
      - Jest/React Testing Library 사용:
      - 테스트 파일은 *.test.js 확장자 사용.
      - API 테스트: Firebase 모의(Mock) 라이브러리 활용.
    7) 문서화
      - JSDoc 주석: 함수/클래스에 설명 추가.
      - async function getUserData(userId) {... }
      - README.md: 설치 방법, 실행 명령어, 주요 기능 설명 필수 기재.
    8) 

 5. CI/CD rule
    1) GitHub
      - SSH: git@github.com:wqtz12/SIntroduce.git
      - 브랜치 전략: main 브랜치를 보호하고, 피처는 feature/* 브랜치에서 작업.
 6. Folder hierarchy
    1) CareerExperience&PathForTheFuture/
         ├── public/               # Static assets (images, fonts, etc.)
         ├── src/                  # Source code root
         │   ├── components/       # Reusable UI components
         │   ├── pages/            # Next.js routing-based pages
         │   │   ├── api/          # Serverless Functions (Next.js API Routes)
         │   │   ├── blog/         # Blog-related pages (e.g., `[slug]/index.js`)
         │   │   └──...           # Other pages (e.g., home, about)
         │   ├── server/           # Express server setup (optional)
         │   │   ├── index.js      # Express app initialization
         │   │   └── routes/       # Express route files
         │   ├── styles/           # Styling configurations
         │   │   ├── globals.css   # Global styles
         │   │   └── tailwind.config.js
         │   ├── utils/            # Utility functions and external service integrations
         │   │   ├── firebase.js   # Firebase initialization and services
         │   │   └──...
         │   ├── config/           # Environment variables and settings (exclude from Git via.gitignore)
         │   │   └──.env          # Firebase keys, API URLs, etc.
         │   └── lib/              # Custom Next.js hooks, type definitions, etc.
         ├──.env.example          # Example environment variables
         ├── next.config.js        # Next.js configuration
         ├── package.json
         └── scripts/              # Deployment or utility scripts

 7. Prohibitions
    1) Any 타입 사용 (unknown 또는 구체적 타입 사용)
    2) console.log를 배포 코드에 남기기
    3) API key, paswword를 코드에 하드코딩
    4) 사용자 입력을 검증 없이 사용
    5) Error를 무시하거나 empty catch 블록 사용
    6) 주석 작성 시 
      - 코드가 무엇을 하는지보다 "왜" 하는지 설명
      - 복잡한 로직에만 주석 작성
      - 주석은 한글로 작성
      - 함수는 JSDoc 형식으로 문서화
    7) Commit 메시지
      - feat: 새 기능
      - fix: 버그 수정
      - docs: 문서 변경
      - style: 코드 포맷팅
      - refactor: 리팩토링
      - test: 테스트 추가/수정
      - chore: 빌드/설정 변경