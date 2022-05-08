import { useState } from "react";
interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

const useMutaion = <T = any>(url: string): UseMutationResult<T> => {
  const [fetchStates, setFetchStates] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const mutation = (data: any) => {
    const setAState = (name: keyof UseMutationState<T>, value: any) => {
      setFetchStates((state) => ({ ...state, [name]: value }));
    };
    setAState("loading", true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => setAState("data", json))
      .catch((error) => setAState("error", error))
      .finally(() => setAState("loading", false));
  };
  return [mutation, fetchStates];
};
export default useMutaion;
