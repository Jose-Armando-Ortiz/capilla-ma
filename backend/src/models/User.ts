// src/models/user.model.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/database'; // asegurate que este archivo exporte tu instancia de Sequelize

// 1. Definimos los atributos
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  nombre: string;
  create_at?: Date;
  update_at?: Date;
}

// 2. Atributos opcionales para creación
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'create_at' | 'update_at'> {}

// 3. Creamos la clase extendiendo Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public nombre!: string;
  public create_at!: Date;
  public update_at!: Date;

  // timestamps automáticos
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4. Inicializamos el modelo
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at',
  }
);

export default User;
