import express, { request, response } from 'express';
import db from '../app/models/index.js'
import { Op } from 'sequelize';
const { sequelize, Employee } = db; 
import dayjs from 'dayjs';

const eduRouter = express.Router();

eduRouter.get('/api/edu', async(request, response, next) => {
try {
  const fireDate = request.query.date;

  let result = null;

  // 평문으로 쿼리를 실행하고 싶을 경우 꼭 값에 '?' prepared statement 
  // const sql = `SELECT * FROM employees WHERE fire_at >= ?`;
  // result = await sequelize.query(
  //   sql,
  //   {
  //     replacements: [fireDate],
  //     type: sequelize.QueryTypes.SELECT // 우리가 만든 시퀄라이즈(커넥션 풀이 담겨있는) 써줘도됨. 
  //   }
  // );
  
  // ----------------
  // Model method
  // ----------------
  // 전체 조회(조건 설정 가능)
  //SELECT * FROM employees;
  // SELECT emp_id, name, birth FROM employees WHERE emp_id BETWEEN 50 AND 100;
  // result = await Employee.findAll({
  //   attributes: ['empId','name','birth'], // 조회할 컬럼 지정(SELECT 절)
  //   where: {
  //     empId: {
  //       // [Op.lte]: 100,
  //       [Op.between]: [3, 14]
  //     }
  //   }
  // });

  // findByPk(id, options) : PK 기준 단일 레코드 조회
  // SELECT 
  // 	emp_id
  // FROM employees
  // WHERE
	//   emp_id = '1000';

  // result = await Employee.findByPk(100000, {
  //   attributes: ['empId', 'name'],
  // });

  // findOne(): 조건에 맞는 첫번째 레코드 조회 : 예시 : 로그인 시 user id로 조회.  user id = unique 한 값.   
  // result = await Employee.findOne({
  //   attributes: ['empId','name','birth'], // 조회할 컬럼 지정(SELECT 절)
  //   where: {
  //     empId: {
  //       [Op.between]: [5, 14]
  //     }
  //   }
  // });

  // count(options), sum(field, options), max(field, options), min(field, options), avg(field, options)
  // SELECT COOUNT(*) FROM employees WHERE deleted_at IS NULL; 
  // result = await Employee.count({
  //   paranoid: false, // delete soft model 자체를 가져오는 것을 빼줌, 보통 select 할 때 사용
  // });
  // result = await Employee.min('empId');

  // // create(values, options) : 새 레코드 생성
  // result = await Employee.create({
  //   name: '테스트',
  //   birth: '2000-01-01',
  //   hireAt: dayjs().format('YYYY-MM-DD'),
  //   gender: 'F',
  // });

  // // update(values, options) : 기존 레코드 수정 (영향 받은 레코드 수 반환)
  // user가 사용하는 기능에서는 보통 save를 많이 사용함 
  // UPDATE employees SET name = '최설앙' WHERE emp_id >= 100000;
  // result = await Employee.update(
  //   {
  //     name: '최설앙'
  //   }
  //   ,{
  //     where: {
  //       empId: {
  //       [Op.gte]: 100000
  //     }
  //    }
  //   }
  // ); 


  // // save() : 상황에 따라 수정, 생성 가능/ '모델 인스턴스를 기반'으로 레코드 생성 및 수정
  // const employee = await Employee.findByPk(100000);
  // employee.name = '최설아';
  // employee.birth = '2001-01-18';
  // result = await employee.save();

  // // save()를 이용한 새로운 데이터 생성
  // const employee = Employee.build(); // 빈 모델 객체 인스턴스
  // employee.name = '치즈냥';
  // employee.birth = '0001-09-01';
  // employee.gender = 'F';
  // employee.hireAt = dayjs().format('YYYY-MM-DD');
  // result = await employee.save();

  //  // // delete= destroy(values, options) : 기존 레코드 삭제 (영향 받은 레코드 수 반환)
  //  result = await Employee.destroy({
  //   where: {
  //     empId: 100028
  //  },
  //  force: true // 모델에 'paranoid: true'일 경우에도, 물리적 삭제를 위한 옵션     
  //  });

  //restore(options) : soft delete된 레코드를 복원
  // result = await Employee.restore({
  //   where: {
  //     empId: 100029
  //   }
  // });


  // 이름이 '강가람'이고, 성별이 여자인 사원 정보 조회
  result = await Employee.findAll({
    attributes: ['empId', 'name', 'gender'],
    where: {
      name: '강가람', 
      gender: 'F',
    }
  });

  // 이름이 '강가람' 또는 '신서연'인 사원 조회
   result = await Employee.findAll({
    attributes: ['empId', 'name', 'gender'],
    where: {
      [Op.or]: [
        { name: '강가람' },
        { name: '신서연' }
      ], 
    }
   });

   // 이름이 '강가람' 또는 '신서연'이면서 성별이 'F'인 사원 조회
    //  result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'gender'],
    //   where: {
    //     gender: 'F',
    //         [Op.or]: [
    //          { name: '강가람' },
    //          { name: '신서연' },
    //         ]
    //   }
    //  });
   
    // LIMIT AND OFFSET
    //  result = await Employee.findAll({
    //   where: {
    //   //   empId: {
    //   //     [Op.notBetween]: [1, 2, 3]
    //   //   },
    //   name: {
    //     [Op.like]: '%가람' // 대소문자 체크해서 가져옴
    //     // [Op.like]: '%가람' // 대소문자 무시하고 가져옴
    //   },
    //     fireAt: {
    //       // null 조건
    //       // [Op.not]: null
    //       [Op.is]: null
    //       // 
    //     }
    //   }
    //  });

    // ORDER BY 
    // result = await Employee.findAll({
    //   where: {
    //     empId: {
    //       [Op.gte]: 10000
    //     }
    //   },
    //   limit: 10,
    //   offset: 10
    // });

    //     result = await Employee.findAll({
    //   where: {
    //     empId: {
    //       [Op.gte]: 10000
    //     }
    //   },
    //   order: [
    //      ['name', 'ASC'],
    //      ['birth', 'DESC'],
    //   ],
    //   limit: 10,
    //   offset: 10,
    // });

    // GROUP BY, having
    // DB에 있는 카운트 함수 호출해야 함 
   result = await Employee.findAll({
    attributes: [
    'gender',                                                      // GROUP BY 기준 컬럼
    [sequelize.fn('COUNT', sequelize.col('*')), 'cnt_gender'],     // COUNT(*) AS cnt_gender
  ],
  group: ['gender'],
  having: sequelize.literal('cnt_gender <= 40000'),
});

  return response.status(200).send({
    msg: '정상처리',
    data: result  
  }); 
 } catch(error) {
  next(error);
 }
});

export default eduRouter;