import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const categoriesOrder = ["Bedroom", "Living Room", "Bridal Room", "Kitchen"];
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const activeCategory = searchParams.get("category");

  // Fetch projects from the API, optionally filtered by category via query string.
  const fetchProjects = async () => {
    try {
      const query = activeCategory ? `?category=${encodeURIComponent(activeCategory)}` : "";
      const res = await fetch(`/api/projects${query}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to load projects");
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [activeCategory]);

  // Decide which category sections to show; if a filter is passed but unknown, fall back to all.
  const normalizedCategory = activeCategory?.toLowerCase();
  let visibleCategories = activeCategory
    ? categoriesOrder.filter((cat) => cat.toLowerCase() === normalizedCategory)
    : categoriesOrder;

  if (activeCategory && visibleCategories.length === 0) {
    visibleCategories = categoriesOrder;
  }

  const grouped = visibleCategories.map((category) => ({
    category,
    items: projects.filter(
      (project) => project.category?.toLowerCase() === category.toLowerCase()
    ),
  }));

  return (
    <main className="bg-gray-50 text-gray-800 w-full min-h-screen">
      <section className="relative isolate overflow-hidden bg-gray-900 pt-32 pb-16 text-white">
        <img
          src="/assets/projects/project1.jpg"
          alt="Featured interior project"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-900/70" />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
            Portfolio
          </p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Signature projects</h1>
          <p className="mt-4 max-w-2xl text-base text-gray-200/85">
            Explore our interior design projects crafted for modern homes, elegant living spaces, and functional interiors tailored to every lifestyle.
          </p>
          {activeCategory && (
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-200">
              <span className="rounded-full bg-white/15 px-3 py-1 font-semibold">
                Showing: {activeCategory}
              </span>
              <button
                onClick={() => navigate("/projects")}
                className="rounded-full border border-white/30 px-3 py-1 transition hover:border-white hover:bg-white/10"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {loading && <p className="text-gray-700">Loading projects...</p>}
        {error && (
          <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {!loading && projects.length === 0 && !error && (
          <p className="text-gray-600">Projects will appear here once added.</p>
        )}
        <div className="space-y-12">
          {grouped.map(({ category, items }) => (
            <div key={category} className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">{category}</h2>
                <span className="text-sm text-gray-500">
                  {items.length} project{items.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {items.length === 0 && (
                  <p className="col-span-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    Projects for this category are coming soon.
                  </p>
                )}
                {items.map((project, idx) => (
                  <article
                    key={project._id || project.title}
                    data-aos="fade-up"
                    data-aos-delay={80 + idx * 40}
                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
