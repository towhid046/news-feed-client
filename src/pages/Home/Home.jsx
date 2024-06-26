import { useState } from "react";
import SingleNewsCard from "./SingleNewsCard/SingleNewsCard";
import AddPost from "./../../components/unique/AddPost/AddPost";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import LoadingSpinner from "./../../components/shared/LoadingSpinner/LoadingSpinner";

const Home = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: allNews,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axiosPublic.get("/news");
      return res?.data;
    },
  });

  if (isError) {
    return (
      <div className="flex items-center justify-center text-3xl font-bold italic text-gray-400">
        <h2>{error}</h2>
      </div>
    );
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="mb-12">
        <div className="pt-10 container mx-auto px-4 ">
          <AddPost />

          <div className="flex flex-col gap-7">
            {allNews?.map((singleNews, index) => (
              <SingleNewsCard singleNews={singleNews} key={singleNews._id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
