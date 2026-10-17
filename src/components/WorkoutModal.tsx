import { Bookmark, Check, Clock3, Flame, Plus, X } from "lucide-react";
import type { Workout } from "../types/workout";
import { useFitLog } from "../context/FitLogContext";
import "./WorkoutModal.css";

interface WorkoutModalProps {
  workout: Workout | null;
  onClose: () => void;
}

export default function WorkoutModal({ workout, onClose }: WorkoutModalProps) {
  const { addToPlan, toggleSaved, isInPlan, isSaved, plan } = useFitLog();
  if (!workout) return null;
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="workout-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Close details"><X size={19} /></button>
        <div className="modal-visual">
          {workout.image ? (
            <img src={workout.image} alt={workout.name} className="modal-visual__image" />
          ) : (
            <>
              <span>WORKOUT IMAGE PLACEHOLDER</span>
              <strong>{workout.name.slice(0, 1)}</strong>
            </>
          )}
        </div>
        <div className="modal-content">
          <div className="eyebrow">{workout.category.join(" / ")}</div>
          <h2 id="modal-title">{workout.name}</h2>
          <p className="modal-description">{workout.description}</p>
          <div className="detail-stats">
            <div><span>Equipment</span><b>{workout.equipment}</b></div>
            <div><span>Difficulty</span><b>{workout.difficulty}</b></div>
            <div><span>Sets</span><b>{workout.sets}</b></div>
            <div><span>Reps</span><b>{workout.reps}</b></div>
            <div><span>Duration</span><b>{workout.minutes} min</b></div>
            <div><span>Calories</span><b>{workout.calories} kcal</b></div>
          </div>
          <h3 className="instructions-title">Instructions</h3>
          <ol className="instruction-list">
            {workout.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
          </ol>
          <div className="modal-actions">
            <button className="primary-button" disabled={inPlan || (plan.length >= 5)} onClick={() => addToPlan(workout.id)}>
              {inPlan ? <Check size={16} /> : <Plus size={16} />}
              {inPlan ? "Added to today's plan" : plan.length >= 5 ? "Plan is full" : "Add to today's plan"}
            </button>
            <button className={`secondary-button ${saved ? "saved" : ""}`} onClick={() => toggleSaved(workout.id)}>
              <Bookmark size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save for later"}
            </button>
          </div>
          <div className="modal-mini-metrics"><span><Clock3 size={14}/>{workout.minutes} min</span><span><Flame size={14}/>{workout.calories} kcal</span><span>★ {workout.rating.toFixed(1)}</span></div>
        </div>
      </section>
    </div>
  );
}