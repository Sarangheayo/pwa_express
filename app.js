import express from 'express'; // express module 가져오기

const app = express(); // express 앱 생성

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
// Query Parameter 제어
// Request.query 프로퍼티를 통해 접근 가능
app.get('/api/posts', (request, response, next ) => {
  const params = request.query; // Query Parameter 받기
  const name = request.query.name; // 특정 Query Parameter 받기
  const age = parseInt(request.query.age); // 특정 Query Parameter 받기
  console.log(name, age);
  response.status(200).send(params);
});

// ---------------------
// Segment Parameter
// requset 객체에 params 프로퍼티를 통해 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  console.log(typeof(postId));
  response.status(200).send(postId);
});

// 대체 라우트(모든 라우터 중에 가장 마지막에 작성)
// 정의되지 않은 경로에 대한 요청이 들어왔을 때 실행되는 Router
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01',
    msg: `존재하지 않는 API 입니다 미아내요ㅜㅜㅜㅜ `,
  });
});

// 서버를 주어진 포트에서 시작
app.listen(3000, () => {
  console.log('3000포트에서 리스닝');
});

