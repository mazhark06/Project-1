import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { category, subcategory } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState(subcategory || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getSubcategories() {
      setLoading(true);
      setError("");
      setSubCategories([]);
      setSelectedSlug(subcategory || "");

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URI}/category/${category}`,
          { signal: controller.signal },
        );
        const subcategories = Array.isArray(response.data) ? response.data : [];
        setSubCategories(subcategories);
        setSelectedSlug(
          subcategories.some((item) => item.slug === subcategory)
            ? subcategory
            : subcategories[0]?.slug || "",
        );
      } catch (requestError) {
        if (!controller.signal.aborted) {
          console.error("Failed to load subcategories", requestError);
          setError("Subcategories could not be loaded. Please try again later.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getSubcategories();
    return () => controller.abort();
  }, [category, subcategory]);

  const selectedSubcategory =
    subCategories.find((item) => item.slug === selectedSlug) || null;

  return (
    <main className="min-h-screen bg-neutral-50 pb-12 font-['Open_sans',sans-serif]">
      <header className="bg-brand px-4 py-10 text-center text-white sm:py-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
          Explore our range
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">Subcategories</h1>
      </header>

      <div className="mx-auto mt-8 grid w-[min(1200px,calc(100%-2rem))] gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="h-fit overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm lg:sticky lg:top-6">
          <div className="border-b border-neutral-200 px-5 py-4">
            <h2 className="text-lg font-semibold text-neutral-900">
              Browse subcategories
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {loading
                ? "Loading categories..."
                : `${subCategories.length} ${subCategories.length === 1 ? "category" : "categories"}`}
            </p>
          </div>

          {loading ? (
            <ul className="space-y-3 p-4" aria-label="Loading subcategories">
              {Array.from({ length: 3 }, (_, index) => (
                <li key={index} className="flex animate-pulse items-center gap-3">
                  <div className="h-14 w-14 shrink-0 rounded-lg bg-neutral-200" />
                  <div className="h-4 w-2/3 rounded bg-neutral-200" />
                </li>
              ))}
            </ul>
          ) : error ? (
            <p role="alert" className="px-5 py-6 text-sm text-red-600">
              {error}
            </p>
          ) : subCategories.length === 0 ? (
            <p className="px-5 py-6 text-sm text-neutral-500">
              No subcategories are available in this category yet.
            </p>
          ) : (
            <ul className="grid max-h-[65vh] grid-cols-2 gap-3 overflow-y-auto p-3 sm:grid-cols-3 lg:grid-cols-1">
              {subCategories.map((item) => {
                const isSelected = item.slug === selectedSubcategory?.slug;

                return (
                  <li key={item._id}>
                    <button
                      type="button"
                      onClick={() => setSelectedSlug(item.slug)}
                      aria-current={isSelected ? "true" : undefined}
                      className={`flex w-full flex-col items-stretch gap-2 rounded-lg p-2 text-left transition-colors ${
                        isSelected
                          ? "bg-red-50 text-brand"
                          : "text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      <div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-neutral-100">
                        {item.subCategory_image?.url ? (
                          <img
                            src={item.subCategory_image.url}
                            alt=""
                            className="block h-full w-full object-cover"
                          />
                        ) : (
                          <span className="flex h-full items-center justify-center text-xs text-neutral-400">
                            Image
                          </span>
                        )}
                      </div>
                      <span className="w-full wrap-break-word px-1 py-1 font-medium">
                        {item.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        <section
          aria-label="Products"
          className="min-h-[420px] rounded-xl border border-neutral-200 bg-white shadow-sm"
        >
          {selectedSubcategory ? (
            <>
              <div className="flex flex-col gap-4 border-b border-neutral-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    Subcategory
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-neutral-900">
                    {selectedSubcategory.name}
                  </h2>
                </div>
                <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-600">
                  Products
                </span>
              </div>

              <div className="flex min-h-[340px] flex-col items-center justify-center px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-brand">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-8 w-8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.5 12 4l9 4.5v10L12 23l-9-4.5v-10ZM3 8.5l9 4.5m0 0 9-4.5m-9 4.5V23m-4.5-16.75 9 4.5"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  Products are coming soon
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
                  We’re preparing the products for {selectedSubcategory.name}.
                  Please check back soon.
                </p>
              </div>
            </>
          ) : (
            <div className="flex min-h-[420px] items-center justify-center px-6 text-center">
              <p className="max-w-md text-sm leading-6 text-neutral-500">
                {loading
                  ? "Loading subcategories..."
                  : error
                    ? "Product listings will appear here once the subcategory list loads."
                    : "Choose a subcategory to see its products here."}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
