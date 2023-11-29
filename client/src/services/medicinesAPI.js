import { $authHost, $host } from "./index";

export const addMedicine = async ({
  name,
  type,
  expiration_date,
  cost,
  FamilyMemberId,
}) => {
  await $host.post("api/medicines/add", {
    name,
    type,
    expiration_date,
    cost,
    FamilyMemberId,
  });
};

export const allmedicines = async () => {
  const { data } = await $host.get("api/medicines");
  return data;
};
