import { Request, Response } from "express";
import knex from "../database/connection";
import { ExportToCsv } from "export-to-csv";
import fs from "fs";
import bcrypt from "bcrypt";

const encryptedPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

class DataController {
  async listar(request: Request, response: Response) {
    const { page } = request.params;

    const myPage: number = parseInt(page);
    const [count] = await knex("projetos").count();
    const data = await knex("projetos")
      .join("usuarios", "usuarios.id", "projetos.id_usuario")
      .select(
        "projetos.id",
        "projetos.status",
        "projetos.horas",
        "projetos.dataInicio",
        "projetos.projetoNome",
        "projetos.concluido",
        "projetos.descricao",
        "projetos.id_usuario",
        "usuarios.nome",
        "usuarios.imagem",
        "usuarios.email",
        "usuarios.sobrenome"
      )
      .limit(50)
      .offset((myPage - 1) * 5);

    return response.status(200).json({ total: count, data: data });
  }

  async exportData(request: Request, res: Response) {
    const options = {
      fieldSeparator: "|",
      quoteStrings: "",
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Dados GSW",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: [
        "Id do projeto",
        "Status do projeto",
        "Horas trabalhadas",
        "Data de início",
        "Nome do projeto",
        "Status de conlusão",
        "Descrição do projeto",
        "Id do colaborador",
        "Nome do colaborador",
        "URL da imagem",
        "Email do colaborador",
        "Sobrenome do colaborador",
      ],
    };

    const data = await knex("projetos")
      .join("usuarios", "usuarios.id", "projetos.id_usuario")
      .select(
        "projetos.id",
        "projetos.status",
        "projetos.horas",
        "projetos.dataInicio",
        "projetos.projetoNome",
        "projetos.concluido",
        "projetos.descricao",
        "projetos.id_usuario",
        "usuarios.nome",
        "usuarios.imagem",
        "usuarios.email",
        "usuarios.sobrenome"
      );

    const csvExporter = new ExportToCsv(options);
    const csvData = csvExporter.generateCsv(data, true);
    const fileName = `data-${Math.random()}.csv`;
    const file = `./tmp/${fileName}`;
    fs.writeFileSync(`./tmp/${fileName}`, csvData);

    return res.download(file);
  }
}

export default DataController;
