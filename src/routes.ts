import express from "express";
import DataController from "./controllers/DataController";
import ProjectsController from "./controllers/ProjectsController";
import UsersController from "./controllers/UsersController";
import AuthController from "./controllers/AuthController";
import TasksController from "./controllers/TasksController";
import auth from "./middlewares/auth";

const usersController = new UsersController();
const projectsController = new ProjectsController();
const dataController = new DataController();
const authController = new AuthController();
const tasksController = new TasksController();

const routes = express.Router();

/**
 * ROOT
 */
routes.get("/", (request, response) => {
  response.send({ message: "Server online" });
});

/**
 * PROJETO
 */
routes.get("/projects/:id", auth, projectsController.show);
routes.get("/projects", auth, projectsController.list);
routes.get("/exportData", auth, dataController.exportData);

/**
 * USER
 */
routes.get("/users", auth, usersController.index);

/**
 * AUTH
 */
routes.post("/login", authController.signIn);

/**
 * TAREFAS
 */
routes.get("/listar", auth, dataController.listar);
routes.put("/task/:id", tasksController.update);

export default routes;
