import { useRouter } from "next/router";
import { usePostQuery } from "../generated/graphql";
import { useGetPostId } from "./useGetPostId";

export const useGetPostFromUrl = () => {
  const postId = useGetPostId();
  return usePostQuery({
    pause: postId === -1, //-1 won't by an id of any posts, just indication that we got bad url parameter
    variables: {
      id: postId,
    },
  });
};
