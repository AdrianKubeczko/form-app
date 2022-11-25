export default async (): Promise<boolean> => {
    await localStorage.removeItem("loggedInAs")
  return true;
};
