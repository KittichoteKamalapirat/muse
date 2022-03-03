import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAdmin = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    // if admin nothing happen
    // if not, do this
    if (loading) {
      return;
    }
    if (!data?.me) {
      // replace => can't go back to login page
      router.replace("login?next=" + router.pathname);
      return;
    }
    if (!data?.me?.isAdmin) {
      router.replace("/");
      return;
    }
  }, [loading, data, router]);
};
