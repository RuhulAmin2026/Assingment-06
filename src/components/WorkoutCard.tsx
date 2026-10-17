import { Bookmark, Check, Clock3, Flame, Plus } from "lucide-react";
import type { Workout } from "../types/workout";
import { useFitLog } from "../context/FitLogContext";
import "./WorkoutCard.css";

interface WorkoutCardProps {
  workout: Workout;
  onOpen: (workout: Workout) => void;
}

export default function WorkoutCard({ workout, onOpen }: WorkoutCardProps) {
  const { addToPlan, toggleSaved, isInPlan, isSaved, plan } = useFitLog();
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const capReached = plan.length >= 5;

  return (
    <article className="workout-card">
      <button className="workout-card__visual" onClick={() => onOpen(workout)} aria-label={`View ${workout.name}`}>
        {workout.image ? (
          <div className="image-placeholder image-placeholder--with-image">
            <img src={workout.image} alt={workout.name} />
          </div>
        ) : (
          <div className="image-placeholder">
            <span className="image-placeholder__label">WORKOUT IMAGE</span>
            <span className="image-placeholder__initial">{workout.name.slice(0, 1)}</span>
          </div>
        )}
        <span className="visual-category">{workout.category[0]}</span>
      </button>
      <div className="workout-card__body">
        <div className="workout-card__top">
          <div>
            <h3>{workout.name}</h3>
            <p className="equipment">{workout.equipment}</p>
          </div>
          <button className={`icon-button ${saved ? "is-saved" : ""}`} onClick={() => toggleSaved(workout.id)} aria-label={saved ? "Unsave workout" : "Save workout"}>
            <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="tag-row">
          {workout.category.map((category) => <span key={category} className="tag">{category}</span>)}
        </div>
        <div className="workout-metrics">
          <span><Clock3 size={14} /> {workout.minutes} min</span>
          <span><Flame size={14} /> {workout.calories} kcal</span>
          <span className="rating">★ {workout.rating.toFixed(1)}</span>
        </div>
        <div className="workout-card__actions">
          <button className="text-button" onClick={() => onOpen(workout)}>View details</button>
          <button className={`small-action ${inPlan ? "added" : ""}`} onClick={() => addToPlan(workout.id)} disabled={inPlan || capReached}>
            {inPlan ? <Check size={15} /> : <Plus size={15} />} {inPlan ? "Added" : capReached ? "Plan full" : "Add to plan"}
          </button>
        </div>
      </div>
    </article>
  );
}