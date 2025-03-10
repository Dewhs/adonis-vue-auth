/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { Exception } from "@adonisjs/core/exceptions";
import router from "@adonisjs/core/services/router";
import { STATUS_CODES } from "http";

const UsersController = () => import("#controllers/users_controller");

router.post("/users", [UsersController, "create"]);

router.post("/login", async (c) => {
  const body = c.request.body();
  const usr = body.user;
  const mdp = body.mdp;
  if (usr == "John" && mdp == "Salut") {
    return "yoooo";
  }
});

router.post("/logout", async (c) => {
  return {
    isOk: "true",
  };
});

router.post("/test", async (c) => {
  return c.request.body().test;
});
