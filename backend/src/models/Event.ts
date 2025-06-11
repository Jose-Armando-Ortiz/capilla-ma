// src/models/user.model.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/database'; // asegurate que este archivo exporte tu instancia de Sequelize

// 1. Definimos los atributos
interface UserAttributes {
  id: number;
  fecha: Date;
  descripcion: string;
  hora: string;
  create_at?: Date;
  update_at?: Date;
}

// 2. Atributos opcionales para creación
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'create_at' | 'update_at'> {}

// 3. Creamos la clase extendiendo Model
class Event extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  fecha!: Date;
  descripcion!: string;
  hora!: string;
  create_at?: Date | undefined;
  update_at?: Date | undefined;
  

  // timestamps automáticos
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4. Inicializamos el modelo
Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hora: {
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
    modelName: 'Event',
    tableName: 'eventos',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at',
  }
);

export default Event;
