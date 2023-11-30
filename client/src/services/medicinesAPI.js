import {  $host } from "./index";

export const addMedicine = async ({
  name,
  type,
  expiration_date,
  cost,
  amount,
  FamilyMemberId,
}) => {
  await $host.post("api/medicines/add", {
    name,
    type,
    expirationDate: expiration_date, 
    cost,
    amount,
    FamilyMemberId,
  });
};
;

export const allmedicines = async () => {
  const { data } = await $host.get("api/medicines");
  return data;
};
