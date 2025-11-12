import express from 'express';
// import Employee from '../app/models/Employee';
import db from '../app/models/index.js';
const { sequelize, Employee } = db;
// import pool from '../db/my-db.js';

const usersRouter = express.Router(); // 라우터 객체 인스턴스를 반환

usersRouter.get('/', (request, response, next) => {
  return response.status(200).send('전체 유저 목록 조회 완료');
 // 후속처리가 있다면? next();
 // 없다면? return response.... 
});

usersRouter.get('/:id', async(request, response, next) => {
  try {
  // --------------
  // sequelize로 DB연동
  // --------------
    const id = parseInt(request.params.id);
    const result = await Employee.findByPk(id);
    return response.status(200).send(result);
  } catch(error) {
    next(error);
  }

  // ------------------
  // my sql2로 DB연동
  // ------------------
  // //  QUERY 작성
  // const sql = `
  //   SELECT *
  //   FROM employees
  //   WHERE
  //     emp_id = ?
  //   `;
  //   // prepared statement
  //   const [result] = await pool.execute(sql, [id]);
  //  return response.status(200).send(result);
  
//  } catch (error) {
//    next(error);
//  }
});

usersRouter.put('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료');
});    

// 라우터 정의 .... keep going

export default usersRouter;

