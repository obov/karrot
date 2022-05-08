import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
const USER_API_URL = "/api/users/me";

const useUser = () => {
  const { data, error } = useSWR(USER_API_URL);
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
};
export default useUser;
