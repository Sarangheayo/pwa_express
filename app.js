import express from 'express'; // express module 가져오기
import authRouter from './routes/auth.router.js'; // authRouter 모듈 가져오기
import usersRouter from './routes/users.router.js'; // usersRouter 모듈 가져오기
import { eduTest, eduUsersTest } from './app/middelwares/edu/edu.middleware.js';

const app = express(); // express 앱 생성
app.use(express.json()); // JSON으로 요청이 올 경우 파싱 처리 
app.use(eduTest); // eduTest 미들웨어 전역 등록

// 클라이언트가 '/api/hi'경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/api/hi', (request, response, next) => {
  response.status(200).send('안뇽 익스프레스 get express :)');
}); 

// 클라이언트가 '/api/hi'경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/api/hi', (request, response, next) => {
  response.status(200).send('post express :)');
}); 

// 클라이언트가 '/api/hi'경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/api/hi', (request, response, next) => {
  response.status(200).send('put express :)');
}); 

// 클라이언트가 '/api/hi'경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/api/hi', (request, response, next) => {
  response.status(200).send('delete express :)');
});

// 클라이언트가 '/api/hi'경로로 PATCH 요청을 보낼 때 실행되는 Router   
// PATCH 요청을 처리하는 Router 그러나 우리 프로젝트에서는 잘 사용하지 않음
app.patch('/api/hi', (request, response, next) => {
  response.status(200).send('patch express :)');
});

// HEAD, OPTIONS 요청을 처리하는 Router는 마련은 되어있으나 잘 사용하지 않음
app.head('/api/hi', (request, response, next) => {
  response.status(200).end();
});

app.options('/api/hi', (request, response, next) => {
  response.set('Allow', 'GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS');
  response.status(200).end();
});

// ---------------------
// 1.  Query Parameter 제어
// get 요청에서만 Query Parameter 사용 가능
// Request.query 프로퍼티를 통해 접근 가능
// 모든 값을 string 타입으로 받음
app.get('/api/posts', (request, response, next ) => {
  const params = request.query; // Query Parameter 받기
  const name = request.query.name; // 특정 Query Parameter 받기
  const age = parseInt(request.query.age); // 특정 Query Parameter 받기
  console.log(name, age);
  response.status(200).send(params);
});


// ---------------------
// 2. Segment Parameter
// 적은 양의 데이터를 URL 경로에 포함시켜 전달하는 방식
// requset 객체에 params 프로퍼티를 통해 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId));
  response.status(200).send(postId);
});

app.get('/api/hi/:test', (request, response, next) => {
  response.status(200).send('tt');
});

// 3. JSON 요청 제어
// 많은 양의 데이터를 전달할 때 주로 사용
// request 객체의 body 프로퍼티를 통해 접근 가능 express.json() 미들웨어를 사용해야 함  
// 
app.post('/api/posts', (request, response, next) => {
  const {account, password, name} = request.body; // 요청 바디에서 JSON 데이터 받기
  // const account = request.body.account;
  // const password = request.body.password;
  // const name = request.body.name;
  // const {data} = request.body; // 요청 바디에서 JSON 데이터 받기
  response.status(200).send({account, password, name});

  // response.status(200).send({
  //   password: password
  //   ,account: account
  //   ,name: name
  // });
});

// --------------------
// 라우트 그룹
// --------------------
// 라우트를 모듈로 나누고 그룹핑하여 관리하는 방법
app.use('/api', authRouter); // authRouter 모듈을 app에 등록
app.use('/api/users', eduUsersTest, usersRouter); 
 // usersRouter 모듈을 app에 등록
 // '/api/users' 경로로 들어오는 요청은 usersRouter가 처리
 // 라우터 뒤에 미들웨어도 추가 가능
 // 라우터 앞에도 미들웨어 추가 가능 

 
// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
// 정의되지 않은 경로에 대한 요청이 들어왔을 때 실행되는 Router
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01'
    ,msg: `존재하지 않는 API 입니다 미아내요ㅜㅜㅜㅜ `
  });
});

// 서버를 주어진 포트에서 시작
// app.listen(3000, () => {
//   console.log('3000포트에서 리스닝 중...');
// });

app.listen(3000);