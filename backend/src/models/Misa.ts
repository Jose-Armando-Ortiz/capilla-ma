// src/models/user.model.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/database'; // asegurate que este archivo exporte tu instancia de Sequelize

// 1. Definimos los atributos
interface MisaAttributes {
  id: number;
  descrpcion: string;
  fecha: Date;
  celebrante: string;
  create_at?: Date;
  update_at?: Date;
}

// 2. Atributos opcionales para creación
interface MisaCreationAttributes extends Optional<MisaAttributes, 'id' | 'create_at' | 'update_at'> {}

// 3. Creamos la clase extendiendo Model
class Misa extends Model<MisaAttributes, MisaCreationAttributes> implements MisaAttributes {
  id!: number;
  descrpcion!: string;
  fecha!: Date;
  celebrante!: string;
  create_at?: Date | undefined;
  update_at?: Date | undefined;


  // timestamps automáticos
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 4. Inicializamos el modelo
Misa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descrpcion: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    fecha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celebrante: {
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
    modelName: 'Misa',
    tableName: 'misas',
    timestamps: true,
    createdAt: 'create_at',
    updatedAt: 'update_at',
  }
);

export default Misa;
