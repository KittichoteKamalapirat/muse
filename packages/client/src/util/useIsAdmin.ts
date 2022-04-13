import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAdmin = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      return;
    }

    // case: not logged in
    if (!data?.me) {
      router.replace("login?next=" + router.pathname);
      return;
    }

    // case: not admin
    if (!data?.me?.isAdmin) {
      router.replace("/");
      return;
    }

    // case: admin, then do nothing
  }, [loading, data, router]);
};
