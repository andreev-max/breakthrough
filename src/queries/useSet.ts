import { SetWithWords } from "@/db-calls/getSet";
import { useQuery } from "@tanstack/react-query";

export const useSet = (initialData: SetWithWords) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["set", initialData?.id],
    queryFn: async () => {
      const res = await fetch(`/api/set/${initialData?.id}`);
      const set: SetWithWords = await res.json();
      console.log(set);
      return set;
    },
    initialData,
  });

  return {
    set: data,
    isSetLoading: isLoading,
    isError,
  };
};
