export const eduTest = (request, response, next) => {
  console.log('eduTest middleware invoked');
  next(); // 다음 미들웨어 또는 처리로 진행
}

export const eduUsersTest = (request, response, next) => {
  console.log('eduUsersTest middleware invoked');
  next(); // 다음 미들웨어 또는 처리로 진행
}