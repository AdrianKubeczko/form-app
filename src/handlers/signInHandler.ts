export default async ({
  username,
  password,
}: {
  username: string | null | undefined;
  password: string | undefined;
}): Promise<boolean> => {
  if (!username || !password) {
    alert("Fill in all fileds");
    return false;
  }
  await localStorage.setItem("loggedInAs", username);
  return true;
};
