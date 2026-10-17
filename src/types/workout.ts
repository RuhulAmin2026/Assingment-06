export type WorkoutCategory =
  | "Chest"
  | "Arms"
  | "Back"
  | "Legs"
  | "Core"
  | "Shoulders";

export interface Workout {
  id: string;
  name: string;
  category: WorkoutCategory[];
  equipment: string;
  minutes: number;
  calories: number;
  rating: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  sets: number;
  reps: string;
  description: string;
  instructions: string[];
  image?: string;
}

export interface PlanItem {
  workoutId: string;
  done: boolean;
}

export type PlanTab = "today" | "saved";