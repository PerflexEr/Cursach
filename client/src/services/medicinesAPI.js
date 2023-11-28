import { $authHost, $host } from "./index";

export const addMedicine = async (name, type, expirationDate, cost) => {
  await $host.post("api/medicines/add", {
    name,
    type,
    expirationDate,
    cost,
  });
};

export const allfamilymembers = async () => {
  const { data } = await $host.get("api/medicines");
  return data;
};
