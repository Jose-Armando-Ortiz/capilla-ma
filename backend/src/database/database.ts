import { Sequelize } from "sequelize";

const sequelize = new Sequelize("capilla", "postgres", "root", {
  host: "localhost",
  dialect: "postgres", // Cambia según la base de datos que uses
});

async function conectarDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

conectarDB();

module.exports = sequelize;
export default sequelize;
