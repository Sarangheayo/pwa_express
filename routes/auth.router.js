import express, { request, response } from 'express';
import loginValidator from '../app/middelwares/validations/validators/login.validator.js';
import validatorHandler from '../app/middelwares/validations/validations-handler.js';
import registrationValidator from '../app/middelwares/validations/validators/registration.validator.js';

const authRouter = express.Router(); // 라우터 객체 인스턴스를 반환

authRouter.post('/login', loginValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('로그인 성공');
});

authRouter.post('/registration', registrationValidator, validatorHandler, (request, response, next) => {
  response.status(200).send('회원가입 성공');
});

// 라우터 정의 .... keep going

export default authRouter; // 모듈 내보내기