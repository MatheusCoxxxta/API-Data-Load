import { Request, Response } from "express";
import Projetos from "../models/Projetos";
import Jira from "../../mocks/data/jira";
import Trello from "../../mocks/data/trello";
import { projeto } from "../types/Projeto";
import Usuarios from "../models/Usuarios";
import { usuario } from "../types/Usuarios";

class DataController {
  async SaveJira(req: Request, response: Response) {
    Jira.forEach(async (dado: any) => {
      let myProjects: projeto = {
        id: "",
        status: "",
        horas: 0,
        id_usuario: "",
        dataInicio: "",
        projetoNome: "",
        concluido: false,
        descricao: "",
      };

      let myUser: usuario = {
        id: "",
        imagem: "",
        nome: "",
        sobrenome: "",
        email: "",
      };

      myProjects.id = dado.id;
      myProjects.status = dado.status;
      myProjects.horas = dado.amountHours || 0;
      myProjects.dataInicio = dado.startedAt;
      myProjects.projetoNome = dado.project;
      myProjects.concluido = dado.finished ? true : false;
      myProjects.descricao = dado.cardDescription;

      myUser.id = dado.user.id;
      myUser.imagem = dado.user.avatar;
      myUser.nome = dado.user.first_name;
      myUser.sobrenome = dado.user.last_name;
      myUser.email = dado.user.email;

      myProjects.id_usuario = dado.user.id;

      await Usuarios.query().insert(myUser);
      await Projetos.query().insert(myProjects);
    });

    return response.status(201).send("Ok.");
  }

  async SaveTrello(req: Request, response: Response) {
    Trello.forEach(async (dado: any) => {
      let myProjects: projeto = {
        id: "",
        status: "",
        horas: 0,
        id_usuario: "",
        dataInicio: "",
        projetoNome: "",
        concluido: false,
        descricao: "",
      };

      let myUser: usuario = {
        id: "",
        imagem: "",
        nome: "",
        sobrenome: "",
        email: "",
      };

      myProjects.id = dado._id;
      myProjects.status = dado.status;
      myProjects.horas = dado.hours || 0;

      myProjects.dataInicio = dado.startedAt;
      myProjects.projetoNome = dado.project;
      myProjects.concluido = dado.isFinished ? true : false;
      myProjects.descricao = dado.cardDescription;

      myUser.id = dado.user._id;
      myUser.imagem = dado.user.avatar;
      myUser.nome = dado.user.userName;
      myUser.sobrenome = dado.user.userLastName;
      myUser.email = dado.user.userEmail;

      myProjects.id_usuario = dado.user._id;

      await Usuarios.query().insert(myUser);
      await Projetos.query().insert(myProjects);
    });

    return response.status(201).send("Ok.");
  }

  async listar(req: Request, response: Response) {
    const { page } = req.params;

    const myPage: number = parseInt(page);

    const projetos = await Projetos.query()
      .select("*")
      .joinRelated("users")
      .page(myPage, 100);

    return response.status(200).send(projetos.results);
  }
}

export default DataController;
