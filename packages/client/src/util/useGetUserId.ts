import { useRouter } from "next/dist/client/router";

export const useGetUserId = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  return userId;
};
