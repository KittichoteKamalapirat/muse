import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();

  const router = useRouter();

  useEffect(() => {
    // if login nothing happen
    // if not log in, do this`
    if (!fetching && !data?.me) {
      // replace => can't go back to login page
      router.replace("login?next=" + router.pathname);
    }
  }, [data, router]);
};
