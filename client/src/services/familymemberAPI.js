import { $authHost, $host } from "./index";

export const addFamilyMember = async ({name, age , status}) => {
  await $host.post("api/familymember/add", {
    name,
    age,
    status,
  });
};

export const allfamilymembers = async () => {
  const {data} = await $host.get("api/familymember");
  return data
};

export const deleteFamilyMember = async (id) => {
  const { data } = await $host.delete(`api/familymember/${id}`);
  return data;
};