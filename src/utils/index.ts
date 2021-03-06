// utils/index.ts
import { SHA3 } from "crypto-js";

export const testMongoURL = "mongodb://localhost:27017/test";
export const mongoURL = "mongodb://localhost:27017/rwa";

export const encrypt = (text: string) => SHA3(text).toString();
