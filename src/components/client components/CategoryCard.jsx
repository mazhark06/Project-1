
import { Link } from "react-router-dom";

const CategoryCard = ({ Category_name, url, image_url }) => {
  
  return (
    <div className="group w-80 h-auto rounded bg-white px-4 py-2 text-neutral-900 shadow-lg transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(230,34,41,0.18)]">
      <Link to={url}>
        <div>
          <h1 className='mb-5 text-center font-["Poppins",sans-serif] text-lg text-brand transition-colors duration-300 group-hover:text-red-700'>
            {Category_name}
          </h1>
          {/* Fixed aspect ratio wrapper */}
          <div className="w-full h-55 overflow-hidden rounded">
            <img
              className="h-full w-full object-fit transition-transform duration-500 ease-out group-hover:scale-105"
              src={image_url}
              alt={Category_name || "Category Image"}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;