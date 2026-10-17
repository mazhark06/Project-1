import React, { useEffect, useState } from "react";
import ImageSlider from "../components/client components/ImageSlider";
import axios from "axios";
import CategoryCard from "../components/client components/CategoryCard";

function Home() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function getCategory() {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/category/selected`,
      );
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
      setError("Products could not be loaded. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-full font-['Open_sans',sans-serif] h-full">
      <div className="Imageslider w-full">
        <ImageSlider />
      </div>
      <div className='bg-[#f8f9fa] category-list font-["Open_sans",sans-serif] font-bold mt-12 pt-8 pb-4'>
        <h1 className="text-4xl text-center">Our Products</h1>

        <div className="line bg-brand w-20 rounded-2xl pt-1 mt-6 mb-12 h-1 mx-auto"></div>

        <div className="sentences">
          <div className="font-semibold font-['Open_sans']  text-lg mx-auto text-center my-4">
            Trusted Healthcare Solutions Designed for Health, Safety, and
            Comfort
          </div>
        </div>

        <div className='w-[80%] mx-auto font-["Open_sans"] text-center'>
          <span className="text-neutral-500 text-sm ">
            Invest in reliable equipment built to support both patients and
            healthcare providers. From rehabilitation furniture to everyday
            medical accessories, each category below features rigorously tested
            products designed to meet highest safety guidelines. Choose a
            category to begin exploring.
          </span>
        </div>

        {/* categoryList */}
        <div className="w-[80vw] flex-wrap flex shrink-0 justify-start gap-10 mx-auto mt-9">
          {loading
            ? Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  aria-hidden="true"
                  className="w-80 h-auto rounded bg-white px-4 py-2 shadow-lg animate-pulse"
                >
                  <div className="h-7 w-3/4 mx-auto mb-5 rounded bg-neutral-200" />
                  <div className="h-55 w-full rounded bg-neutral-200" />
                </div>
              ))
            : error
              ? <p role="alert" className="w-full text-center text-red-600">{error}</p>
              : category.map((indi_category) => (
              <CategoryCard
                key={indi_category._id}
                Category_name={indi_category.category_name}
                url={indi_category.slug}
                image_url={indi_category.image.url}
              />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
