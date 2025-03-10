import db from "@adonisjs/lucid/services/db";
import { HttpContext } from "@adonisjs/core/http";
import User from "#models/user";
import { DateTime } from "luxon";

export default class UsersController {
  index() {
    return db.query().from("users")
  }

  async create({ request, params }: HttpContext) {
    const body = request.body()
    body.created_at = DateTime.now();
    body.updated_at = DateTime.now();

    const user: User = body as User;

    try {
      await db.table("users").insert(user);
      console.log("Created");
    } catch (e) {
      console.log(e);
    }
  }

    login({ request, params }: HttpContext) {
      return request.all()
    }

  logout() {
    return "Logged out";
  }
}
