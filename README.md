# 유효성 체크를 위한 준비
## 설치
```
npm install express-validator
```

## 유효성 체크 처리 디렉토리 구조
```
middlewares/
└─ validations/
   └─ fields/      # 각 요소들의 유효성 체크 처리 로직이 있는 디렉토리
   └─ validators/  # 필요한 field를 모아서 한 기능에서 사용하는 데이터들을 검증하는 로직이 들어가 있는 디렉토리
   └─ validationHandler.js  # 유효성 검사 통과 여부에 따른 공통 처리 미들웨어  
```

### 정상
{
  "code": "00",
  "message": "정상 처리",
  "data": [] | {}
}

### 에러
{
  "code": "E01",
  "message": "아이디나 비밀번호가 틀렸습니다.",
  "data": null | []
}

### 규칙:

목록 성격의 결과는 data를 배열로, 단일 리소스는 객체로 반환.
에러 발생 시에는 data를 null(권장)로 두거나, 일관성을 위해 빈 배열 []을 사용 가능.

### 주요 API 설계안 (RESTful)

Auth (인증)
Method	Endpoint	설명
POST	/api/auth/register	회원가입
POST	/api/auth/login	로그인 (JWT 발급)
POST	/api/auth/refresh	토큰 갱신
POST	/api/auth/logout	로그아웃
GET	/api/auth/google	Google 로그인 리다이렉트
GET	/api/auth/github	GitHub 로그인 리다이렉트

# DB 연동
## 설치
```
npm i mysql2 sequelize sequelize-cli
```

