import 'dotenv/config';
import { Sequelize } from 'sequelize';
import Employee from './Employee.js';
import TitleEmp from './TitleEmp.js';
import Title from './Title.js';

const db = {}; // 생성할 db 인스턴스 저장


// Sequelize 인스턴스 생성
const sequelize = new Sequelize(
  process.env.DB_MYSQL_DB_NAME, // Database 이름
  process.env.DB_MYSQL_USER,     // DB 접속 유저
  process.env.DB_MYSQL_PASSWORD, // DB 접속 비밀번호
  {
    host: process.env.DB_MYSQL_HOST,            // 사용 DB 서버 호스트
    port: parseInt(process.env.DB_MYSQL_PORT),  // 사용 DB 서버 포트
    dialect: process.env.DB_MYSQL_DIALECT,      // 사용 DB 드라이버    
    timezone: process.env.DB_MYSQL_TIMEZONE,    // DB 시간대 설정 +9:00 = 한국 표준시
    logging: process.env.DB_MYSQL_LOG_FLG === 'true' && console.log, // 로그 출력 여부 DB Logging
    dialectOptions: {
      dateStrings: true // 문자열로 날짜를 받기위해서 사용
    },
    pool: { // connection pool 설정
      max: parseInt(process.env.DB_MYSQL_CONNECTION_COUNT_MAX), // 최대 커넥션 수
      min: parseInt(process.env.DB_MYSQL_CONNECTION_COUNT_MIN), // 최소 커넥션 수
      acquire: parseInt(process.env.DB_MYSQL_ACQUIRE_LIMIT),    // 연결 최대 대기 시간(ms)
      idle: parseInt(process.env.DB_MYSQL_IDLE_LIMIT)           // 유휴 커넥션 유지 시간(ms)
    }
  }
);

db.sequelize = sequelize; // 생성한 sequelize 인스턴스를 db에 저장

// model 초기화
db.Employee = Employee.init(sequelize);
db.TitleEmp = TitleEmp.init(sequelize);
db.Title = Title.init(sequelize);

// model 관계 설정
Employee.associate(db);
TitleEmp.assoicate(db);
Title.associate(db)


// db 내보내기
export default db;

