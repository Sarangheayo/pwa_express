import { body } from "express-validator";

// 아이디 필드 검증
export const account = body('account')
 .trim()
 .notEmpty()
 .withMessage('아이디는 필수 입력 항목입니다.')
 .bail()
 .matches(/^[a-zA-Z0-9]{4,8}$/) // 4~8자의 영문 대소문자, 숫자만 허용, 최소 1자 이상의 영문자 또는 숫자 포함
 .withMessage('아이디는 4~8자의 영문 대소문자, 숫자만 허용합니다.');

// 비밀번호 필드 검증
export const password = body('password')
 .trim()
 .notEmpty()
 .withMessage('비밀번호는 필수 입력 항목입니다.')
 .bail()
 .matches(/^[a-zA-Z0-9!@]{4,8}$/) // 4~8자의 영문 대소문자, 숫자만 허용, 최소 1자 이상의 영문자 또는 숫자 포함
 .withMessage('비밀번호는 4~8자의 영문 대소문자, 숫자, 특수문자만 허용합니다.');

 // 이름 필드 검증
  export const name = body('name')
 .trim()
 .notEmpty()
 .withMessage('이름은 필수 입력 항목입니다.')
 .bail()
 .matches(/^[가-힣]{2,30}$/) // 2~30자의 한글만 허용
 .withMessage('이름은 한글 2~30자를 허용합니다.');

