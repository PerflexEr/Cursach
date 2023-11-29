import { $authHost, $host } from "./index";

export const addillnes = async ({
  diagnosis,
  reason_for_medications,
  period_of_illness,
  prescribed_by,
  amount_of_pills,
  result,
  note,
  FamilyMemberId,
  MedicineId,
}) => {
  await $host.post("api/illnes/add", {
    diagnosis,
    reason_for_medications,
    period_of_illness,
    prescribed_by,
    amount_of_pills,
    result,
    note,
    FamilyMemberId,
    MedicineId,
  });
};

export const allIllneses = async () => {
  const { data } = await $host.get("api/illnes");
  return data;
};
