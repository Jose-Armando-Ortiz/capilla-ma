import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/database'; 

interface SessionAttributes {
  sid: string;
  sess: object; 
  expire: Date;
}

class Session extends Model<SessionAttributes> implements SessionAttributes {
  public sid!: string;
  public sess!: object;
  public expire!: Date;
}

Session.init(
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    sess: {
      type: DataTypes.JSON, 
      allowNull: false,
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Session',
    tableName: 'session',
    timestamps: false,
  }
);

export default Session;
