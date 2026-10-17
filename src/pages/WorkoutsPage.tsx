import { ArrowDownWideNarrow, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import WorkoutCard from "../components/WorkoutCard";
import WorkoutModal from "../components/WorkoutModal";
import { workouts } from "../data/workouts";
import type { Workout, WorkoutCategory } from "../types/workout";
import "./WorkoutsPage.css";

const categories = ["All", "Chest", "Arms", "Back", "Legs", "Core", "Shoulders"] as const;
type CategoryFilter = typeof categories[number];

export default function WorkoutsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sort, setSort] = useState("featured");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const filteredWorkouts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = workouts.filter((workout) => {
      const matchesQuery = !normalizedQuery ||
        workout.name.toLowerCase().includes(normalizedQuery) ||
        workout.equipment.toLowerCase().includes(normalizedQuery) ||
        workout.category.some((item) => item.toLowerCase().includes(normalizedQuery));
      const matchesCategory = category === "All" || workout.category.includes(category as WorkoutCategory);
      return matchesQuery && matchesCategory;
    });
    if (sort === "duration") return [...result].sort((a, b) => a.minutes - b.minutes);
    if (sort === "calories") return [...result].sort((a, b) => b.calories - a.calories);
    if (sort === "rating") return [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [query, category, sort]);

  return (
    <main>
      <section className="hero-section page-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> YOUR TRAINING, TRACKED</div>
          <h1>TRAIN WITH<br />INTENT. <span>LOG</span><br />EVERY SET.</h1>
          <p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.</p>
          <a className="hero-cta" href="#library">Browse workouts <ArrowRight size={16} /></a>
          <div className="hero-proof"><span>12</span> MOVEMENTS <i /> <span>6</span> MUSCLE GROUPS <i /> BUILT FOR CONSISTENCY</div>
        </div>
        <div className="hero-art" aria-label="Hero image placeholder">
          {/* HERO IMAGE PLACEHOLDER: import your image and render it here later. */}
          <div className="hero-art__frame">
            <div className="hero-art__top"><span>FIG. 001 / TRAINING LOG</span><span>EST. 2026</span></div>
            <div className="hero-art__image-wrap">
              <img src="/images/hero/fitlog-hero.png" alt="Gym strength training illustration" className="hero-art__image" />
            </div>
            <div className="hero-art__bottom"><span>STRENGTH / DISCIPLINE / PROGRESS</span><span>01 — 12</span></div>
          </div>
          <div className="hero-stamp"><b>01</b><span>SHOW UP.<br/>DO THE WORK.</span></div>
        </div>
      </section>

      <section id="library" className="library-section page-shell">
        <div className="section-heading">
          <div><div className="eyebrow">THE LIBRARY</div><h2>Find your next <span>PR.</span></h2><p>Twelve lifts covering every major muscle group.</p></div>
          <div className="library-count"><b>{filteredWorkouts.length.toString().padStart(2, "0")}</b><span>EXERCISES</span></div>
        </div>
        <div className="library-toolbar">
          <div className="search-field"><Search size={17}/><input aria-label="Search workouts" placeholder="Search movements, equipment..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></div>
          <div className="sort-field"><ArrowDownWideNarrow size={16}/><label htmlFor="sort-workouts">Sort by</label><select id="sort-workouts" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="duration">Duration</option><option value="calories">Calories</option><option value="rating">Rating</option></select></div>
        </div>
        <div className="category-filters" aria-label="Filter workouts by category">
          <SlidersHorizontal size={15} />
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "filter-chip selected" : "filter-chip"}>{item}</button>)}
        </div>
        {filteredWorkouts.length > 0 ? (
          <div className="workout-grid">{filteredWorkouts.map((workout) => <WorkoutCard key={workout.id} workout={workout} onOpen={setSelectedWorkout} />)}</div>
        ) : (
          <div className="empty-search"><Search size={28}/><h3>No movements found</h3><p>Try another search term or muscle group.</p><button onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>
        )}
      </section>
      <WorkoutModal workout={selectedWorkout} onClose={() => setSelectedWorkout(null)} />
    </main>
  );
}