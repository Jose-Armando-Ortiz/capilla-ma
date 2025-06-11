import sequelize from '../database/database';
import User from './User';
import Session from './Session';
import Event from './Event';
import Misa from './Misa';

// Acá podrías definir relaciones si las hubiera

const db = {
  sequelize,
  User,
  Session,
  Misa,
  Event,
};

export default db;
