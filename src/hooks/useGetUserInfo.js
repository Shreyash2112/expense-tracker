export function useGetUserInfo() {
  const { id, name, profilePhoto, isActive } = JSON.parse(
    localStorage.getItem("auth")
  );

  return { id, name, profilePhoto, isActive };
}
