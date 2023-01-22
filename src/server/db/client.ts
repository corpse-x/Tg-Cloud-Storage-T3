import PocketBase from "pocketbase";
import { env } from "../../env/server.mjs";

export const pb = new PocketBase(env.POCKETBASE_URL);
