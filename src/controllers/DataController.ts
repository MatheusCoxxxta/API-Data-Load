import { Request, Response } from "express";
import Projetos from "../models/Projetos";
import UserType from "../types";
import Jira from "../../mocks/data/jira";
import Trello from "../../mocks/data/trello";
import { unificados } from "../types/unificados";

class DataController {
  async SaveJira(req: Request, response: Response) {
    let dadosJira: any = [];

    Jira.forEach(async (dado: any) => {
      let myJson: unificados = {
        id: "",
        status: "",
        horas: 0,
      };

      myJson.id = dado.id;
      myJson.status = dado.status;
      myJson.horas = dado.amountHours || 0;

      dadosJira = [...dadosJira, myJson];

      const jira = await Projetos.query().insert(myJson);
    });

    return response.send("Ok.");
  }

  async SaveTrello(req: Request, response: Response) {
    let dadosTrello: any = [];

    Trello.forEach(async (dado: any) => {
      let myJson: unificados = {
        id: "",
        status: "",
        horas: 0,
      };

      myJson.id = dado._id;
      myJson.status = dado.status;
      myJson.horas = dado.hours || 0;

      dadosTrello = [...dadosTrello, myJson];

      const trello = await Projetos.query().insert(myJson);
    });

    return response.send({ trello: dadosTrello });
  }

  async listar(req: Request, response: Response) {
    const projetos = await Projetos.query().select("*");

    return response.status(200).send(projetos);
  }
}

export default DataController;
