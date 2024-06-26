import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useData = (arr=[], url) => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: arr,
    queryFn: async () => {
      const res = await axiosPublic.get(url);
      return res?.data;
    },
  });

  return { data, isLoading, refetch, isError, error };
};

export default useData;
