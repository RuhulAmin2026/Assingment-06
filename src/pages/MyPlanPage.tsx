import { ArrowDownWideNarrow, Bookmark, Check, CheckCircle2, Clock3, Flame, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useFitLog } from "../context/FitLogContext";
import { workouts } from "../data/workouts";
import type { PlanTab, Workout } from "../types/workout";
import WorkoutModal from "../components/WorkoutModal";
import "./MyPlanPage.css";

export default function MyPlanPage() {
  const { plan, savedIds, toggleDone, removeFromPlan, toggleSaved, addToPlan } = useFitLog();
  const [tab, setTab] = useState<PlanTab>("today");
  const [sort, setSort] = useState("duration");
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const currentItems = useMemo(() => {
    const ids = tab === "today" ? plan.map((item) => item.workoutId) : savedIds;
    const items = ids.map((id) => ({
      workout: workouts.find((workout) => workout.id === id),
      done: plan.find((item) => item.workoutId === id)?.done ?? false,
    })).filter((item) => item.workout !== undefined) as { workout: Workout; done: boolean }[];
    if (sort === "duration") items.sort((a, b) => a.workout.minutes - b.workout.minutes);
    if (sort === "calories") items.sort((a, b) => b.workout.calories - a.workout.calories);
    if (sort === "name") items.sort((a, b) => a.workout.name.localeCompare(b.workout.name));
    return items;
  }, [plan, savedIds, tab, sort]);

  const totalMinutes = currentItems.reduce((sum, item) => sum + item.workout.minutes, 0);
  const totalCalories = currentItems.reduce((sum, item) => sum + item.workout.calories, 0);
  const completed = plan.filter((item) => item.done).length;
  const allDone = plan.length > 0 && completed === plan.length;

  return (
    <main className="plan-page page-shell">
      <section className="plan-intro">
        <div>
          <div className="eyebrow"><span className="live-dot" /> YOUR SESSION</div>
          <h1>MY <span>PLAN.</span></h1>
          <p>Cap of five lifts for today. Finish them, then load more.</p>
        </div>
        <Link to="/" className="add-workout-link"><Plus size={16}/> Add a workout</Link>
      </section>

      <section className="plan-summary" aria-label="Workout summary">
        <div className="summary-main">
          <div className="summary-icon"><CheckCircle2 size={20}/></div>
          <div><span className="summary-label">TODAY'S PROGRESS</span><strong>{completed.toString().padStart(2, "0")} <small>/ {plan.length.toString().padStart(2, "0")} COMPLETED</small></strong></div>
          <div className="progress-track"><span style={{ width: `${plan.length ? (completed / plan.length) * 100 : 0}%` }} /></div>
        </div>
        <div className="summary-stat"><span>EXERCISES</span><b>{currentItems.length.toString().padStart(2, "0")}</b></div>
        <div className="summary-stat"><span>MINUTES</span><b>{totalMinutes.toString().padStart(2, "0")}</b></div>
        <div className="summary-stat"><span>CALORIES</span><b>{totalCalories.toString().padStart(3, "0")}</b></div>
      </section>

      {allDone && tab === "today" && <div className="success-banner"><CheckCircle2 size={18}/> Session complete. Strong work — you showed up today.</div>}

      <section className="plan-list-section">
        <div className="plan-list-toolbar">
          <div className="plan-tabs" role="tablist" aria-label="Plan sections">
            <button role="tab" aria-selected={tab === "today"} className={tab === "today" ? "plan-tab active" : "plan-tab"} onClick={() => setTab("today")}>Today's Plan <span>{plan.length}</span></button>
            <button role="tab" aria-selected={tab === "saved"} className={tab === "saved" ? "plan-tab active" : "plan-tab"} onClick={() => setTab("saved")}><Bookmark size={14}/> Saved <span>{savedIds.length}</span></button>
          </div>
          <div className="plan-sort"><ArrowDownWideNarrow size={15}/><label htmlFor="plan-sort">Sort by</label><select id="plan-sort" value={sort} onChange={(event) => setSort(event.target.value)}><option value="duration">Duration</option><option value="calories">Calories</option><option value="name">Name</option></select></div>
        </div>

        {currentItems.length === 0 ? (
          <div className="plan-empty">
            <div className="empty-mark">{tab === "today" ? <Plus size={26}/> : <Bookmark size={24}/>}</div>
            <div className="eyebrow">{tab === "today" ? "READY WHEN YOU ARE" : "YOUR SHORTLIST"}</div>
            <h2>{tab === "today" ? "NOTHING HERE YET" : "NO SAVED WORKOUTS"}</h2>
            <p>{tab === "today" ? "Browse the library and add a lift to get today moving." : "Save a workout from the library and it will show up here."}</p>
            <Link to="/" className="empty-cta">Go to workouts <Plus size={15}/></Link>
          </div>
        ) : (
          <div className="plan-items">
            {currentItems.map(({ workout, done }, index) => {
              const inPlan = plan.some((item) => item.workoutId === workout.id);
              const saved = savedIds.includes(workout.id);
              return (
                <article key={workout.id} className={`plan-item ${done && tab === "today" ? "is-done" : ""}`}>
                  <div className="plan-item__number">{(index + 1).toString().padStart(2, "0")}</div>
                  <div className="plan-item__image">
                    {workout.image ? <img src={workout.image} alt={workout.name} /> : <span>{workout.name.slice(0, 1)}</span>}
                  </div>
                  <div className="plan-item__details">
                    <div className="eyebrow">{workout.category.join(" / ")}</div>
                    <h3>{workout.name}</h3>
                    <p>{workout.equipment}</p>
                    <div className="workout-metrics"><span><Clock3 size={14}/>{workout.minutes} min</span><span><Flame size={14}/>{workout.calories} kcal</span><span className="rating">★ {workout.rating.toFixed(1)}</span></div>
                  </div>
                  <div className="plan-item__actions">
                    <button className="text-button" onClick={() => setSelectedWorkout(workout)}>View details</button>
                    {tab === "today" ? (
                      <>
                        <button className={`complete-button ${done ? "completed" : ""}`} onClick={() => toggleDone(workout.id)}>{done ? <CheckCircle2 size={15}/> : <Check size={15}/>} {done ? "Completed" : "Mark as done"}</button>
                        <button className="remove-button" onClick={() => removeFromPlan(workout.id)} aria-label={`Remove ${workout.name}`} title="Remove from plan"><Trash2 size={16}/></button>
                      </>
                    ) : (
                      <>
                        <button className="complete-button" disabled={inPlan || plan.length >= 5} onClick={() => addToPlan(workout.id)}><Plus size={15}/>{inPlan ? "In today's plan" : plan.length >= 5 ? "Plan full" : "Add to plan"}</button>
                        <button className="remove-button" onClick={() => toggleSaved(workout.id)} aria-label={`Remove ${workout.name} from saved`} title="Remove saved workout"><Trash2 size={16}/></button>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      <WorkoutModal workout={selectedWorkout} onClose={() => setSelectedWorkout(null)} />
    </main>
  );
}