export const validateEmail = (email: string) => {
  const reg = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

  return reg.test(email);
};

export const validateCNPJ = (value: string) => {
  if (!value) return false;

  const isString = typeof value === "string";
  const validTypes = isString || Number.isInteger(value) || Array.isArray(value);

  if (!validTypes) return false;

  if (isString) {
    if (value.length > 18) return false;
    const digitsOnly = /^\d{14}$/.test(value);
    const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);

    if (!digitsOnly || !validFormat) {
      return false;
    }
  }

  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  if (numbers.length !== 14) return false;

  const items = [];
  if (items.length === 1) return false;

  const calc = (x: any) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);
    return result > 9 ? 0 : result;
  };

  const digits = numbers.slice(12);
  const digit0 = calc(12);
  if (digit0 !== digits[0]) return false;

  const digit1 = calc(13);
  return digit1 === digits[1];
};

export const validateCPF = (cpf: string) => {
  if (typeof cpf !== "string") return false;
  cpf = cpf.replace(/[\s.-]*/gim, "");
  if (
    !cpf ||
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  ) {
    return false;
  }
  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto == 10 || resto == 11) resto = 0;
  if (resto != parseInt(cpf.substring(10, 11))) return false;

  return true;
};
