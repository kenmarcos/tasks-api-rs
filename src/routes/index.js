import { Database } from "../database/index.js";
import { bodyValidation } from "../middlewares/body-validation.js";
import { buildRoutePath } from "../utils/build-route-path.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (title === undefined || description === undefined) {
        const messagesError = bodyValidation(title, description);

        return res
          .writeHead(400)
          .end(JSON.stringify({ message: messagesError }));
      }

      const user = database.insert("tasks", {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      return res.writeHead(201).end(JSON.stringify(user));
    },
  },

  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },

  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const { id: taskId } = req.params;

      if (title === undefined || description === undefined) {
        const messagesError = bodyValidation(title, description);

        return res
          .writeHead(400)
          .end(JSON.stringify({ message: messagesError }));
      }

      const updatedTask = database.update("tasks", taskId, {
        title,
        description,
      });

      if (!updatedTask) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: "Task not found" }));
      }

      return res.end(JSON.stringify(updatedTask));
    },
  },

  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id: taskId } = req.params;

      const completedTask = database.completeTask("tasks", taskId);

      if (!completedTask) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: "Task not found" }));
      }

      return res.end(JSON.stringify(completedTask));
    },
  },

  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id: taskId } = req.params;

      const taskExists = database.delete("tasks", taskId);

      if (!taskExists) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: "Task not found" }));
      }

      return res.writeHead(204).end();
    },
  },
];
