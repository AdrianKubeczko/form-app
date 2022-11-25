import { isEmpty } from "ramda";
import { PersonalData } from "../types";

export default async (
  personalData: PersonalData,
  loggedInAs: string | null | undefined
): Promise<boolean> => {
  if (isEmpty(personalData) || !loggedInAs) return false;
  await localStorage.setItem(loggedInAs, JSON.stringify(personalData));
  return true;
};
