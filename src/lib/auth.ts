import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient("mongodb://localhost:27017/database");
const db = client.db();

export const auth = betterAuth({
  user: {
    modelName: "users",
    fields: {
      email: "emailAddress",
      name: "fullName",
    },
    additionalFields: {
      is_admin: {
        type: "boolean",
        nullable: false,
      },
      compnay_name: {
        type: "string",
        nullable: false,
      },
    },
  },
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
});
