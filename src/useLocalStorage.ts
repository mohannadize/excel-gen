import { useState, useEffect } from "react";

const PREFIX = "excel-gen-";

const useLocalStorage = <T>(key: string, initialValue: any): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const prefixedKey = `${PREFIX}${key}`;
  const [value, setValue] = useState<T>(() => {
    if (typeof localStorage !== "undefined") {
      const storage = localStorage.getItem(prefixedKey);
      const savedValue = storage && JSON.parse(storage);
      if (!!savedValue) return savedValue;
    }

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
};

export const deteleLocalStorage = (key: string) => {
  const prefixedKey = `${PREFIX}${key}`;
  const keys = Object.keys(localStorage).filter((v) =>
    v.startsWith(prefixedKey)
  );
  keys.forEach((key) => localStorage.removeItem(key));
  return;
};

export const setLocalStorage = (key: string, value: any) => {
  const prefixedKey = `${PREFIX}${key}`;
  localStorage.setItem(prefixedKey, JSON.stringify(value));
  return;
};

export default useLocalStorage;