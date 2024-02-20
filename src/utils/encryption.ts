import * as crypto from "crypto";

/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require("bcryptjs");

export const hashPassword = (data: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data, salt);

  return hash;
};

export const comparePassword = async (value: string, hashed: string) => {
  const result = new Promise((resolve) => {
    bcrypt.compare(value, hashed, (err: any, res: boolean) => {
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }).then((value) => value);

  return await result;
};

export const decriptString = (data: string) => {
  try {
    const algorithm = process.env.ALGORITHM || "aes-256-cbc";
    const key = process.env.SECRET_KEY_ENCRYPT;
    const initVector = process.env.VECTOR_INITIALIZER;
    const encryptedText = Buffer.from(data, "hex");

    if (
      typeof key !== "string" ||
      typeof initVector !== "string" ||
      key === "" ||
      initVector === ""
    ) {
      throw new Error("Chave ou vetor de inicialização inválidos");
    }

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), initVector);

    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    return data;
  }
};

export const encryptString = (data: string) => {
  try {
    const algorithm = process.env.ALGORITHM;
    const key = process.env.SECRET_KEY_ENCRYPT;
    const initVector = process.env.VECTOR_INITIALIZER;

    if (
      typeof key !== "string" ||
      typeof initVector !== "string" ||
      key === "" ||
      initVector === ""
    ) {
      throw new Error("Chave ou vetor de inicialização inválidos");
    }

    const cipher = crypto.createCipheriv(algorithm, key, Buffer.from(initVector, "utf8"));
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  } catch (err) {
    console.error(err);
    return data;
  }
};
