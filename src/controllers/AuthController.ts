import { Request, Response } from "express";
import generateToken from "../helpers/generateToken";
import Usuarios from "../models//Usuarios";

class Auth {
  async signIn(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const userData = await Usuarios.query().where("email", email).first();

      if (userData.senha !== senha) {
        return res.status(401).json({
          message: "Não autorizado!",
        });
      } else if (userData.senha === senha) {
        const token = await generateToken({ id: userData.id });
        /**
        await Usuarios.query().where("id", userData.id).update({
          token,
        });*/

        userData.senha = "";

        return res.status(200).json({
          user: userData,
          token,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Ocorreu um erro!",
      });
    }
  }
}

export default Auth;
