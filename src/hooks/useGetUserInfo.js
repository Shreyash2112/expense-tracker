export function useGetUserInfo() {
  let userInfo = {};
  if (JSON.parse(localStorage.getItem("auth"))) {
    userInfo = JSON.parse(localStorage.getItem("auth"));
  }

  const { id, name, profilePhoto, isActive } = userInfo;
  return { id, name, profilePhoto, isActive };
}
