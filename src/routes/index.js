import { buildRoutePath } from "../utils/build-route-path.js";

export const routes = [
  {
    method: "POST",
    path: "/tasks",
    handler: (req, res) => {},
  },

  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      res.end("Hello World");
    },
  },
];
