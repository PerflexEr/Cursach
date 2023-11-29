import { $authHost, $host } from "./index";

export const addMedicine = async ({
  name,
  type,
  expirationDate,
  cost,
  FamilyMemberId,
}) => {
  await $host.post("api/medicines/add", {
    name,
    type,
    expirationDate,
    cost,
    FamilyMemberId,
  });
};

export const allfamilymembers = async () => {
  const { data } = await $host.get("api/medicines");
  return data;
};
