import { useState } from "react";
import axios from "axios"
function EditCategoryModal({ data, onClose }) {
let {editable} = data
const [image,setImage] = useState(null)
const [name,setName] = useState("")
const [success,setSuccess] = useState("")
const [error,setError] = useState("")
async function save(e) {
try {
  setError("")
  setSuccess("")
   e.preventDefault()
  let form = new FormData();

  if(!name && image == null) return setError("Aleast one field is required to make change")
  if(name) form.append("name",name);
  if(Image )form.append("image",image);

  let res = await axios.patch(`${import.meta.env.VITE_SERVER_URI}/category/edit/${editable._id}`,form);
  setSuccess(res.data.message)
 
} catch (error) {
  setError(res.response.data.message)
}
}
  return (
    <div className="bg-white w-fit sm:w-[400px] rounded-lg shadow-xl p-5 relative animate-scaleIn">
      <button
        onClick={onClose}
        className="absolute text-2xl cursor-pointer top-2 right-2 text-gray-500 hover:text-red-500"
      >
        ✕
      </button>
      <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
      {success && (
        <div className="text-green-400">{success}</div>
      )}
      {error && (
        <div className="text-red-400">{error}</div>
      )}


      <form
      onSubmit={(e)=>save(e)}
      className="w-full flex flex-col justify-center items-center">
        <div className="w-[60%]  my-3 ">
          <input
            className="w-full bg-neutral-100 rounded focus:outline-none focus:border border-green-300 px-4 py-1 "
            type="text"
            placeholder="Category Name"
            name="name"
            onChange={(e)=> (setName(e.target.value))}
          />
        </div>
        <div className="w-[60%] flex justify-center items-center my-3 ">
          <input
            className="w-full bg-neutral-100 rounded px-4 py-1 "
            type="file"
            accept="image/*"
            placeholder="Category Name" 
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="w-[60%] flex justify-center items-center my-3 ">
          <input className="w-full  bg-blue-400 text-white cursor-pointer rounded hover:bg-blue-500 border-green-300 px-4 py-1" type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
}

export default EditCategoryModal;
