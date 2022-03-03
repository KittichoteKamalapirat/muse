import { useRouter } from "next/dist/client/router";

export const useGetPostId = () => {
  const router = useRouter();

  const postId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  return postId;
};
