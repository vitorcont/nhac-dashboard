import * as crypto from "crypto";

export const decriptString = (data: string) => {
  try {
    const algorithm = process.env.NEXT_PUBLIC_ALGORITHM || "aes-256-cbc";
    const key = process.env.NEXT_PUBLIC_SECRET_KEY_ENCRYPT;
    const initVector = process.env.NEXT_PUBLIC_VECTOR_INITIALIZER;
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
    const algorithm = process.env.NEXT_PUBLIC_ALGORITHM || "aes-256-cbc";
    const key = process.env.NEXT_PUBLIC_SECRET_KEY_ENCRYPT;
    const initVector = process.env.NEXT_PUBLIC_VECTOR_INITIALIZER;

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
    return data;
  }
};

export const decryptDBObject = (data: any) => {
  if (typeof data === "object" && !Array.isArray(data) && Object.keys(data).length > 0) {
    const modifiedData = Object.keys(data).reduce((newValue: any, key) => {
      if (
        (Array.isArray(data[key]) || (typeof data[key] === "object" && isNaN(Number(data[key])))) &&
        !!data[key]
      ) {
        newValue[key] = decryptDBObject(data[key]);
      } else {
        newValue[key] =
          typeof data[key] === "string" ? (newValue[key] = decriptString(data[key])) : data[key];
      }

      return newValue;
    }, {});

    return modifiedData;
  }

  if (Array.isArray(data)) {
    const treatedData = data.map((item) => {
      const modifiedData = Object.keys(item).reduce((newValue: any, key) => {
        if (
          (Array.isArray(item[key]) ||
            (typeof item[key] === "object" && isNaN(Number(item[key])))) &&
          !!item[key]
        ) {
          newValue[key] = decryptDBObject(item[key]);
        } else {
          newValue[key] =
            typeof item[key] === "string" ? (newValue[key] = decriptString(item[key])) : item[key];
        }

        return newValue;
      }, {});
      return modifiedData;
    });

    return treatedData;
  }

  return null;
};

export const encryptDBObject = (data: any) => {
  if (typeof data === "object" && !Array.isArray(data)) {
    const modifiedData = Object.keys(data).reduce((newValue: any, key) => {
      if (
        (Array.isArray(data[key]) || (typeof data[key] === "object" && isNaN(Number(data[key])))) &&
        !!data[key]
      ) {
        newValue[key] = encryptDBObject(data[key]);
      } else {
        newValue[key] =
          typeof data[key] === "string" ? (newValue[key] = encryptString(data[key])) : data[key];
      }

      if (key === "createdAt" || key === "deletedAt" || key === "updatedAt" || key === "id") {
        newValue[key] = data[key];
      }

      return newValue;
    }, {});

    return modifiedData;
  }

  if (Array.isArray(data)) {
    return data.map((item) => {
      if (typeof item === "number") {
        return item;
      }
      if (typeof item === "string") {
        return encryptString(item);
      }

      const modifiedData = Object.keys(item).reduce((newValue: any, key) => {
        if (
          (Array.isArray(item[key]) ||
            (typeof item[key] === "object" && isNaN(Number(item[key])))) &&
          !!item[key]
        ) {
          newValue[key] = encryptDBObject(item[key]);
        } else {
          newValue[key] =
            typeof item[key] === "string" ? (newValue[key] = encryptString(item[key])) : item[key];
        }

        if (key === "validity" || key === "startDate") {
          newValue[key] = item[key];
        }

        return newValue;
      }, {});
      return modifiedData;
    });
  }
};
