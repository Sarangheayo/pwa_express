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

// 이메일 필드 검증
export const email = body('email')
 .trim()
 .notEmpty()
 .withMessage('이메일은 필수 입력 항목입니다.')
 .bail()
 .isEmail()
 .withMessage('유효한 이메일 주소를 입력해주세요.');      
  
// 휴대폰 번호 필드 검증
export const phone = body('phone')
 .trim()
 .notEmpty()
 .withMessage('휴대폰 번호는 필수 입력 항목입니다.')
 .bail()
 .matches(/^01[016789]-\d{3,4}-\d{4}$/) // 한국 휴대폰 번호 형식
 .withMessage('유효한 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)');  

// 나이 필드 검증
export const age = body('age')
 .trim()  
 .notEmpty()
 .withMessage('나이는 필수 입력 항목입니다.')
 .bail()
 .isInt({ min: 0, max: 120 })
 .withMessage('나이는 0에서 120 사이의 정수여야 합니다.');

 // 주소 필드 검증
  export const address = body('address')
  .trim()
  .notEmpty()
  .withMessage('주소는 필수 입력 항목입니다.')
  .bail()
  .isLength({ min: 5, max: 100 })
  .withMessage('주소는 5자에서 100자 사이여야 합니다.');