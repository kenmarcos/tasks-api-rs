import { Database } from "../database/index.js";
import { buildRoutePath } from "../utils/build-route-path.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

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
