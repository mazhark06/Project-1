import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const toUrlSlug = (slug = "") => slug.replace(/'/g, "");
const categoryPath = (slug) => `/${toUrlSlug(slug)}`;
const subcategoryPath = (categorySlug, subcategorySlug) =>
  `${categoryPath(categorySlug)}/${toUrlSlug(subcategorySlug)}`;

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(`${import.meta.env.VITE_SERVER_URI}/category/selected`, {
        signal: controller.signal,
      })
      .then(({ data }) => {
        setCategories(Array.isArray(data.data) ? data.data : []);
      })
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          console.error("Failed to load product categories", requestError);
          setError(true);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { categories, loading, error };
}

function ProductStatus({ loading, error }) {
  if (loading) {
    return <p className="px-3 py-2 text-sm text-neutral-500">Loading products...</p>;
  }

  if (error) {
    return <p className="px-3 py-2 text-sm text-red-600">Products could not be loaded.</p>;
  }

  return null;
}

function Mobile() {
  const { categories, loading, error } = useCategories();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div className="relative ml-auto">
      <button
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="p-2 text-3xl text-black hover:text-red-600"
      >
        <i
          className={`ri-${menuOpen ? "close" : "menu"}-fill`}
          aria-hidden="true"
        />
      </button>

      {menuOpen && (
        <nav
          aria-label="Main navigation"
          className="absolute right-0 top-full z-50 max-h-[calc(100vh-6rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto border border-neutral-200 bg-white p-3 text-left shadow-lg"
        >
          <ul className="space-y-1">
            <li>
              <NavLink
                className="block px-3 py-2 hover:bg-neutral-100"
                onClick={() => setMenuOpen(false)}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block px-3 py-2 hover:bg-neutral-100"
                onClick={() => setMenuOpen(false)}
                to="/about-us"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                aria-expanded={productsOpen}
                onClick={() => setProductsOpen((open) => !open)}
                className="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-neutral-100"
              >
                Products <span aria-hidden="true">{productsOpen ? "−" : "+"}</span>
              </button>
              {productsOpen && (
                <ul className="ml-3 border-l border-neutral-200">
                  {loading || error ? (
                    <li><ProductStatus loading={loading} error={error} /></li>
                  ) : categories.length === 0 ? (
                    <li><p className="px-3 py-2 text-sm text-neutral-500">No products available.</p></li>
                  ) : categories.map((category) => {
                    const expanded = selectedCategoryId === category._id;
                    const subcategories = category.Subcategories ?? [];

                    return (
                      <li key={category._id}>
                        <div className="flex items-center">
                          <NavLink
                            className="min-w-0 flex-1 px-3 py-2 hover:bg-neutral-100"
                            onClick={() => setMenuOpen(false)}
                            to={categoryPath(category.slug)}
                          >
                            {category.category_name}
                          </NavLink>
                          {subcategories.length > 0 && (
                            <button
                              type="button"
                              aria-label={`${expanded ? "Collapse" : "Expand"} ${category.category_name} subcategories`}
                              aria-expanded={expanded}
                              onClick={() => setSelectedCategoryId(expanded ? null : category._id)}
                              className="px-3 py-2 hover:bg-neutral-100"
                            >
                              <span aria-hidden="true">{expanded ? "−" : "+"}</span>
                            </button>
                          )}
                        </div>
                        {expanded && (
                          <ul className="pb-1 pl-4">
                            {subcategories.map((subcategory) => (
                              <li key={subcategory._id}>
                                <NavLink
                                  className="block px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-red-600"
                                  onClick={() => setMenuOpen(false)}
                                  to={subcategoryPath(category.slug, subcategory.slug)}
                                >
                                  {subcategory.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
            <li>
              <NavLink
                className="block px-3 py-2 hover:bg-neutral-100"
                onClick={() => setMenuOpen(false)}
                to="/contact-us"
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

function Desktop() {
  const { categories, loading, error } = useCategories();
  const [productsOpen, setProductsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const selectedCategory =
    categories.find((category) => category._id === selectedCategoryId) ??
    categories.find((category) => category.Subcategories?.length > 0) ??
    null;

  const linkClass = ({ isActive }) =>
    isActive ? "font-semibold text-red-600" : "text-black hover:text-red-600";

  return (
    <nav aria-label="Main navigation" className="flex w-full items-center justify-center">
      <ul className='flex items-center gap-5 text-sm font-["Open_sans"]'>
        <li><NavLink className={linkClass} to="/">Home</NavLink></li>
        <li><NavLink className={linkClass} to="/about-us">About Us</NavLink></li>
        <li
          className="relative"
          onMouseEnter={() => setProductsOpen(true)}
          onMouseLeave={() => setProductsOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setProductsOpen(false);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setProductsOpen(false);
            }
          }}
        >
          <button
            type="button"
            aria-expanded={productsOpen}
            aria-controls="products-menu"
            onClick={() => setProductsOpen(true)}
            className="flex items-center gap-1 text-black hover:text-red-600"
          >
            Products <span aria-hidden="true">{productsOpen ? "−" : "+"}</span>
          </button>
          {productsOpen && (
            <div
              id="products-menu"
              className="absolute left-0 top-full z-50 grid w-[min(38rem,calc(100vw-2rem))] grid-cols-[minmax(11rem,0.8fr)_1.2fr] border border-neutral-200 bg-white text-black shadow-lg"
            >
              <ul aria-label="Product categories" className="border-r border-neutral-200 p-2">
                {loading || error ? (
                  <li><ProductStatus loading={loading} error={error} /></li>
                ) : categories.length === 0 ? (
                  <li><p className="px-3 py-2 text-sm text-neutral-500">No products available.</p></li>
                ) : categories.map((category) => (
                  <li
                    key={category._id}
                    onMouseEnter={() => setSelectedCategoryId(category._id)}
                  >
                    <NavLink
                      className={({ isActive }) =>
                        `block px-3 py-2 ${selectedCategory?._id === category._id ? "bg-neutral-100" : ""} ${isActive ? "font-semibold text-red-600" : "hover:bg-neutral-100"}`
                      }
                      onFocus={() => setSelectedCategoryId(category._id)}
                      onClick={() => setProductsOpen(false)}
                      to={categoryPath(category.slug)}
                    >
                      {category.category_name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="min-h-40 p-3">
                {selectedCategory ? (
                  <>
                    <h2 className="mb-2 border-b border-neutral-200 pb-2 font-semibold">
                      {selectedCategory.category_name}
                    </h2>
                    {selectedCategory.Subcategories?.length ? (
                      <ul className="space-y-1">
                        {selectedCategory.Subcategories.map((subcategory) => (
                          <li key={subcategory._id}>
                            <NavLink
                              className="block px-3 py-2 hover:bg-neutral-100 hover:text-red-600"
                              onClick={() => setProductsOpen(false)}
                              to={subcategoryPath(selectedCategory.slug, subcategory.slug)}
                            >
                              {subcategory.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-3 py-2 text-sm text-neutral-500">No subcategories</p>
                    )}
                  </>
                ) : (
                  <p className="px-3 py-2 text-sm text-neutral-500">
                    {loading ? "Loading products..." : "Select a category"}
                  </p>
                )}
              </div>
            </div>
          )}
        </li>
        <li><NavLink className={linkClass} to="/contact-us">Contact Us</NavLink></li>
      </ul>
    </nav>
  );
}

export { Mobile, Desktop };
