import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PlanItem } from "../types/workout";

interface FitLogContextValue {
  plan: PlanItem[];
  savedIds: string[];
  addToPlan: (workoutId: string) => void;
  removeFromPlan: (workoutId: string) => void;
  toggleDone: (workoutId: string) => void;
  toggleSaved: (workoutId: string) => void;
  isInPlan: (workoutId: string) => boolean;
  isSaved: (workoutId: string) => boolean;
}

const FitLogContext = createContext<FitLogContextValue | undefined>(undefined);
const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>(() => readStored(PLAN_KEY, []));
  const [savedIds, setSavedIds] = useState<string[]>(() => readStored(SAVED_KEY, []));

  useEffect(() => localStorage.setItem(PLAN_KEY, JSON.stringify(plan)), [plan]);
  useEffect(() => localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds)), [savedIds]);

  const value = useMemo<FitLogContextValue>(
    () => ({
      plan,
      savedIds,
      addToPlan: (workoutId) =>
        setPlan((current) =>
          current.length >= 5 || current.some((item) => item.workoutId === workoutId)
            ? current
            : [...current, { workoutId, done: false }],
        ),
      removeFromPlan: (workoutId) =>
        setPlan((current) => current.filter((item) => item.workoutId !== workoutId)),
      toggleDone: (workoutId) =>
        setPlan((current) =>
          current.map((item) =>
            item.workoutId === workoutId ? { ...item, done: !item.done } : item,
          ),
        ),
      toggleSaved: (workoutId) =>
        setSavedIds((current) =>
          current.includes(workoutId)
            ? current.filter((id) => id !== workoutId)
            : [...current, workoutId],
        ),
      isInPlan: (workoutId) => plan.some((item) => item.workoutId === workoutId),
      isSaved: (workoutId) => savedIds.includes(workoutId),
    }),
    [plan, savedIds],
  );

  return <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>;
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) throw new Error("useFitLog must be used inside FitLogProvider");
  return context;
}