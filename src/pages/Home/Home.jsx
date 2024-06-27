import SingleNewsCard from "./SingleNewsCard/SingleNewsCard";
import AddPost from "./../../components/unique/AddPost/AddPost";
import LoadingSpinner from "./../../components/shared/LoadingSpinner/LoadingSpinner";
import useData from "../../hooks/useData";
import ErrorElement from "./../../components/shared/ErrorElement/ErrorElement";

const Home = () => {
  const {
    data: allNews,
    isLoading,
    isError,
    error,
    refetch,
  } = useData(["all-news"], "/news");

  if (isError) {
    return <ErrorElement error={error} />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="mb-12">
        <div className="pt-10 container mx-auto px-4 ">
          <AddPost refetch={refetch} />

          <div className="flex flex-col gap-7">
            {[...allNews]?.reverse()?.map((singleNews) => (
              <SingleNewsCard
                singleNews={singleNews}
                key={singleNews._id}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
