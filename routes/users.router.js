import express from 'express';

const usersRouter = express.Router(); // 라우터 객체 인스턴스를 반환

usersRouter.get('/', (request, response, next) => {
  response.status(200).send('전체 유저 목록 조회 완료');
});

usersRouter.get('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료');
});

usersRouter.put('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
});    

// 라우터 정의 .... keep going

export default usersRouter;