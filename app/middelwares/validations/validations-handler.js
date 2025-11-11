import express from "express";
import { validationResult } from "express-validator";

export default function validatorHandler(request, response, next) {
  // validationResult :request에 담긴 유효성 검사결과 중, 에러를 모아서 배열로 반환
  const errors = validationResult(request);

  if(!errors.isEmpty()) {
    const customErrors = errors.formatWith((error) => `${error.path}: ${error.msg}`);
    return response.status(400).send(customErrors.array());
  }
   
  next();
  }