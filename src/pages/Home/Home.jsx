import { useState } from "react";
import AllForumCard from "./AllForumCard/AllForumCard";
import { useForm } from "react-hook-form";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [forums, setForums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const { register, handleSubmit } = useForm();

  const handlePostForm = async (data) => {
    console.log(data);
  };

  return (
    <>
      <section>
        <div className="pt-10 container mx-auto px-4">
          <div className="border p-5 rounded-lg max-w-3xl my-6 mx-auto">
            <h2 className="text-2xl font-bold mb-3">Create a post</h2>
            <form onSubmit={handleSubmit(handlePostForm)} className="space-y-1">
              <div>
                <textarea
                  {...register("description")}
                  className="bg-base-200 text-base-content w-full focus:outline-none border-2 p-4 rounded-lg focus:border-blue-300  "
                  rows={5}
                  placeholder="Write here"
                  required
                ></textarea>
              </div>
              <div>
                <input
                  type="submit"
                  className="btn btn-info btn-wide text-base-100"
                  value="Post"
                />
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-7">
            {forums?.map((forum, index) => (
              <AllForumCard key={index} />
            ))}
          </div>
        </div>

        {/* modal */}
      {isModalOpen && (
        <div className="fixed bg-black bg-opacity-70 flex top-0 items-center min-h-screen justify-center w-full  z-50">
          <div className="border p-5 rounded-lg w-full my-6 mx-auto lg:max-w-[50%] bg-white max-w-[90%]">
            <h2 className="text-2xl font-bold mb-3">Create a post</h2>
            <form onSubmit={handleSubmit(handlePostForm)} className="space-y-1">
              <div>
                <textarea
                  {...register("description")}
                  className="bg-base-200 text-base-content w-full focus:outline-none border-2 p-4 rounded-lg focus:border-blue-300  "
                  rows={5}
                  placeholder="Write here"
                  required
                ></textarea>
              </div>
              <div>
                <input
                  type="submit"
                  className="btn btn-info btn-wide text-base-100"
                  value="Post"
                />
              </div>
            </form>
          </div>
        </div>
      )}
      </section>

      
    </>
  );
};

export default Home;
