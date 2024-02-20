export enum LocalStorageEnum {
  ACCESS_TOKEN = "ACCESS_TOKEN",
}

export const setLocalKey = (key: LocalStorageEnum, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getLocalKey = (key: LocalStorageEnum) => window.localStorage.getItem(key);
