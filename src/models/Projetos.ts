import { Model } from "objection";
import connection from "../database/connection";
import { projeto as ProjetosType } from "../types/Projeto";

Model.knex(connection);

interface Projetos extends ProjetosType {}

class Projetos extends Model {
  static get tableName() {
    return "projetos";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "string" },
        status: { type: "string", minLength: 1, maxLength: 255 },
        horas: { type: "float", minLength: 1, maxLength: 255 },
      },
    };
  }
}

export default Projetos;
