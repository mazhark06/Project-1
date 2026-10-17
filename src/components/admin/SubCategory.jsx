import axios from "axios";
import { useEffect, useRef, useState } from "react";

function AddSubCategory() {
  const formRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getCategories() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/category/selected`,
          { signal: controller.signal },
        );
        if (!Array.isArray(response.data.data)) {
          throw new Error("The categories response has an invalid format.");
        }
        setCategories(response.data.data);
      } catch (requestError) {
        if (!controller.signal.aborted) {
          console.error("Failed to load categories", requestError);
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Categories could not be loaded. Please try again.",
          );
        }
      } finally {
        if (!controller.signal.aborted) setLoadingCategories(false);
      }
    }

    getCategories();
    return () => controller.abort();
  }, []);

  async function submitHandler(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!categoryId || !name.trim() || !image) {
      setError("Select a parent category and provide a name and image.");
      return;
    }

    const form = new FormData();
    form.append("name", name.trim());
    form.append("image", image);

    try {
      setSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/subcategory/add/${categoryId}`,
        form,
      );
      setSuccess(response.data.message || "Subcategory added successfully.");
      setName("");
      setCategoryId("");
      setImage(null);
      formRef.current?.reset();
    } catch (requestError) {
      console.error("Failed to add subcategory", requestError);
      setError(
        requestError.response?.data?.message ||
          "Subcategory could not be added. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-full bg-[#f2f3f5] px-4 py-6 sm:px-6">
      <h1 className="mb-5 text-2xl font-semibold text-slate-700">
        Add New Subcategory
      </h1>

      <form
        ref={formRef}
        onSubmit={submitHandler}
        className="max-w-2xl rounded-lg bg-white p-5 shadow-sm sm:p-7"
      >
        {success && (
          <p role="status" className="mb-5 rounded bg-green-100 px-4 py-3 text-green-700">
            {success}
          </p>
        )}
        {error && (
          <p role="alert" className="mb-5 rounded bg-red-100 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        <div className="mb-5">
          <label htmlFor="parent-category" className="mb-2 block font-medium">
            Parent category
          </label>
          <select
            id="parent-category"
            name="category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            disabled={loadingCategories || categories.length === 0 || submitting}
            required
            className="w-full rounded border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-blue-500 disabled:bg-neutral-100"
          >
            <option value="">
              {loadingCategories ? "Loading categories..." : "Select a category"}
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {!loadingCategories && !error && categories.length === 0 && (
            <p className="mt-2 text-sm text-neutral-500">
              Add a category before creating a subcategory.
            </p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="subcategory-name" className="mb-2 block font-medium">
            Subcategory name
          </label>
          <input
            id="subcategory-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter subcategory name"
            maxLength={100}
            required
            disabled={submitting}
            className="w-full rounded border border-neutral-300 px-3 py-2 outline-none focus:border-blue-500 disabled:bg-neutral-100"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="subcategory-image" className="mb-2 block font-medium">
            Subcategory image
          </label>
          <input
            id="subcategory-image"
            name="image"
            type="file"
            accept="image/*"
            required
            disabled={submitting}
            onChange={(event) => setImage(event.target.files?.[0] || null)}
            className="w-full rounded border border-neutral-300 px-3 py-2 file:mr-4 file:rounded file:border-0 file:bg-neutral-100 file:px-3 file:py-1"
          />
          <p className="mt-1 text-sm text-neutral-500">
            Choose an image file for this subcategory.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting || loadingCategories || categories.length === 0}
          className="rounded bg-blue-600 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Adding subcategory..." : "Add subcategory"}
        </button>
      </form>
    </div>
  );
}
function ManageSubCategroy() {
  return <div>Manage Sub Category</div>;
}

export { AddSubCategory, ManageSubCategroy };
