import { DataTypes } from "sequelize";
import dayjs from 'dayjs';

// 모델 명 
const modelName = 'Title';

// 컬럼 정의
const attributes = {
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4),
    primaryKey: true,
    allowNull: false,
    comment: '직급 코드',
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '직급명',
  },
  createdAt: {
      field: 'created_at',
      type: DataTypes.NOW,
      allowNull: false,
      comment: '작성일',
      get() {
        const val = this.getDataValue('createdAt');
        if(!val) {
          return null;
        }
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      comment: '수정일',
      get() {
        const val = this.getDataValue('updatedAt');
        if(!val) {
          return null;
        }
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: '삭제일',
      get() {
        const val = this.getDataValue('deletedAt');
        if(!val) {
          return null;
        }
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
      }
    }, 
}

// Option 설정 (테이블 관련 설정)
const options = {
  tableName: 'titles', // 실제 테이블 명(물리쪽 이름 'DB 이름 써주기')
  timestamps: true, // createdAt, updatedAt 자동 관리
  // createdAt: 'empCreatedAt', // 이렇게 정의해줘야 이름이 같게 만들어서 자동 관리 가능. 해당하는 이름을 별도 설정 가능 
  // updatedAt: false,
  paranoid: true, // soft delete 설정(deletedAt 자동 관리)
}

// model 객체 작성
const Title = {
  init: (sequelize) => {
    const defineTitle = sequelize.define(modelName, attributes, options);

    return defineTitle;
  }, 
  associate: (db) => {
      // 1:n 관계 (1개의 직급은 복수의 사원직급 정보를 가진다)
     db.Title.hasMany(db.TitleEmp, { sourceKey: 'titleCode', foreignKey: 'titleCode', as: 'titleEmps' });
      // 1인 쪽 titles 쪽에 hasMany를 써준다.
      // 부모입장에서 자식 입장을 볼 때 사용하는 alias 'TitlebelongstotitleEmps' 이렇게 적어도 ㄱㅊ
     
  },
};

export default Title;