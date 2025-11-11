import express, { request, response } from 'express';

const authRouter = express.Router(); // 라우터 객체 인스턴스를 반환

authRouter.post('/api/login', (request, response, next) => {
  response.status(200).send('로그인 성공');
});

// 라우터 정의 .... keep going

export default authRouter; // 모듈 내보내기


