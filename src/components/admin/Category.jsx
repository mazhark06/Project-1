import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader.jsx";
import EditCategoryModal from "./EditCategoryModal";
import { formatDate } from "../../utils/formatDate.js";
import {
  RiDeleteBin5Line,
  RiEdit2Line,
  RiRefreshFill,
  RiRefreshLine,
} from "@remixicon/react";

function AddCategory() {
  const [Image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [name, setname] = useState("");
  const [Loading, setLoading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    if (Loading || uploadComplete) return;

    try {
      setError("");
      setSuccess("");
      if (!name || !Image) return setError("All Fields are Required");
      setLoading(true);
      let form = new FormData();
      form.append("image", Image);
      form.append("name", name);
      let res = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/category/add`,
        form,
      );
      setImage(null);
      setname("");
      setLoading(false);
      setUploadComplete(true);
      setSuccess(res.data.message);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      setImage(null);
      setname("");
    }
  }

  return (
    <div className="w-full h-full">
      <h1 className="text-center block text-2xl w-full text-slate-700">
        Add Category
      </h1>
      {success && (
        <div className="bg-green-100 text-center text-green-700 px-4 py-2 rounded mb-3">
          {success}
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-center text-red-700 px-4 py-2 rounded mb-3">
          {error}
        </div>
      )}
      <div className="form mx-auto mt-10 max-w-60 ">
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="mx-auto my-3 w-full">
            <input
              className="bg-neutral-200 text-black focus:border-none focus:outline-0 rounded px-4 py-2 w-full"
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
                setUploadComplete(false);
              }}
              placeholder="Category name"
            />
          </div>
          <div className="mx-auto my-3 w-full">
            <input
              className="bg-neutral-200 text-black rounded px-4 py-2 w-full"
              accept="image/*"
              type="file"
              name="image"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setUploadComplete(false);
              }}
            />
          </div>
          <div className="mx-auto my-3 w-full text-white">
            <input
              className="bg-blue-500 w-full px-4 py-2 cursor-pointer hover:bg-blue-600 rounded disabled:cursor-not-allowed disabled:opacity-60"
              disabled={Loading || uploadComplete}
              type="submit"
              value={
                Loading ? "Uploading..." : uploadComplete ? "Uploaded" : "Save"
              }
            />
          </div>
        </form>
        <div className="Loader w-fit mx-auto" aria-live="polite">
          <Loader visible={Loading} />
        </div>
      </div>
    </div>
  );
}

function ManageCategroy() {
  const [editable, setEditable] = useState(null);
  const [data, setData] = useState([]);
  const [Image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [name, setname] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  async function fetchCategory() {
    try {
      setLoading(true);
      let res = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/category`,
      );
      setLoading(false);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function removeCategory(id) {
    try {
      setLoading(true);
      let res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URI}/category/delete/${id}`,
      );
      await fetchCategory();
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      setError(error.response.data.message);
    }
  }
  return (
    <div className="w-full h-full relative">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-300 text-gray-800">
          <tr>
            <th className="w-[20%] p-2 border-r">Image</th>
            <th className="w-[25%] p-2 border-r">Title</th>
            <th className="w-[15%] p-2 border-r">Created At</th>
            <th className="w-[15%] p-2 border-r">Updated At</th>
            <th
              colSpan={2}
              className="w-[15%] p-2 text-center bg-blue-300 text-white"
            >
              <div
                onClick={fetchCategory}
                className={`w-full mx-auto flex justify-center cursor-pointer items-center ${
                  Loading && "animate-spin"
                }`}
              >
                <RiRefreshLine />
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="text-center">
          {data.map((product, index) => (
            <tr
              key={product._id + index}
              className={`  object-contain
          ${index % 2 === 0 ? "bg-blue-50" : "bg-blue-100"}
          
          transition
        `}
            >
              <td className="p-2 w-fit ">
                <img
                  className="w-[70%] mx-auto h-24 object-contain rounded"
                  src={product.image.url}
                  alt={product.name}
                />
              </td>
              <td className="p-2 font-medium">{product.name}</td>

              <td className="p-2 text-sm text-gray-600">
                {formatDate(product.createdAt)}
              </td>

              <td className="p-2 text-sm text-gray-600">
                {formatDate(product.updatedAt)}
              </td>

              <td className="p-2">
                <button
                  onClick={() => setEditable(product)}
                  className="px-3 py-1 w-full h-full cursor-pointer text-white rounded"
                >
                  <RiEdit2Line color="#62aeff" />
                </button>
              </td>

              <td className="p-2">
                <button
                  onClick={() => removeCategory(product._id)}
                  className="px-3 py-1  text-white cursor-pointer rounded"
                >
                  <RiDeleteBin5Line color="#E7000B" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editable && (
        <div className=" fixed inset-0 z-50 flex items-center justify-center left-1/6 top-20 ">
          <EditCategoryModal
            onClose={() => setEditable(null)}
            data={{ setEditable, editable }}
          />
        </div>
      )}
    </div>
  );
}

export { AddCategory, ManageCategroy };
