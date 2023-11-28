import { $authHost, $host } from "./index";

export const addillnes = async (name, age, status) => {
  await $host.post("api/medicines/add", {
    diagnosis,
    reason_for_medications,
    period_of_illness,
    medications,
    prescribed_by,
    amount_of_prescriptions,
    result,
    note,
    FamilyMemberId,
    MedicineUsageId,
  });
};

export const allfamilymembers = async () => {
  const { data } = await $host.get("api/illnes");
  return data;
};
