export type UserAuthHook = {
  isAuthenticated: boolean;
};

export default function useUserAuth(): UserAuthHook {
  return {
    isAuthenticated: true,
  };
}
