import { SetsWithWordCount } from "@/db-calls/getSets";
import { useQuery } from "@tanstack/react-query";

export const useSet = (initialData: SetsWithWordCount) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sets"],
    queryFn: async () => {
      const res = await fetch("/api/set");
      const sets: SetsWithWordCount = await res.json();
      console.log(sets);
      return sets;
    },
    initialData,
  });

  return {
    sets: data,
    areSetsLoading: isLoading,
    isError,
  };
};
