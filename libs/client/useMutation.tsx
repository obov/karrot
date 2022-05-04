import { useState } from "react";
interface UseMutationState {
  loading: boolean;
  data?: object;
  error?: object;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

const useMutaion = (url: string): UseMutationResult => {
  const [fetchStates, setFetchStates] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const mutation = (data: any) => {
    const setAState = (name: keyof UseMutationState, value: any) => {
      setFetchStates((state) => {
        return { ...state, [name]: value };
      });
    };
    setAState("loading", false);
    console.log("data : ", data);
    fetch("api/users/enter", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json().catch(() => {}))
      .then((json) => setAState("data", json))
      .catch((error) => setAState("error", error))
      .finally(() => setAState("loading", true));
  };
  return [mutation, fetchStates];
};
export default useMutaion;
