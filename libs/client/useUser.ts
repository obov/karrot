import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
const USER_API_URL = "/api/users/me";
interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export const useProtect = () => {
  const { data, error } = useSWR(USER_API_URL);
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok && router.pathname !== "/enter") {
      router.replace("/enter");
    }
  }, [data, router]);
};

const useUser = () => {
  const { data, error } = useSWR<ProfileResponse>(USER_API_URL);
  return { user: data?.profile, isLoading: !data && !error };
};
export default useUser;
