import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  integer,
  real,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// ─── WORKOUTS ───────────────────────────────────────────────────────────────────

export const workouts = pgTable(
  "workouts",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("workouts_user_id_idx").on(t.userId),
    index("workouts_started_at_idx").on(t.startedAt),
  ]
);

// ─── EXERCISES ──────────────────────────────────────────────────────────────────

export const exercises = pgTable(
  "exercises",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [uniqueIndex("exercises_name_idx").on(t.name)]
);

// ─── WORKOUT EXERCISES ──────────────────────────────────────────────────────────

export const workoutExercises = pgTable(
  "workout_exercises",
  {
    id: serial("id").primaryKey(),
    workoutId: integer("workout_id")
      .notNull()
      .references(() => workouts.id, { onDelete: "cascade" }),
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("we_workout_id_idx").on(t.workoutId),
    index("we_exercise_id_idx").on(t.exerciseId),
  ]
);

// ─── SETS ───────────────────────────────────────────────────────────────────────

export const sets = pgTable(
  "sets",
  {
    id: serial("id").primaryKey(),
    workoutExerciseId: integer("workout_exercise_id")
      .notNull()
      .references(() => workoutExercises.id, { onDelete: "cascade" }),
    setNumber: integer("set_number").notNull(),
    reps: integer("reps").notNull(),
    weight: real("weight").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("sets_workout_exercise_id_idx").on(t.workoutExerciseId)]
);

// ─── RELATIONS ──────────────────────────────────────────────────────────────────

export const workoutsRelations = relations(workouts, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

export const exercisesRelations = relations(exercises, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

export const workoutExercisesRelations = relations(
  workoutExercises,
  ({ one, many }) => ({
    workout: one(workouts, {
      fields: [workoutExercises.workoutId],
      references: [workouts.id],
    }),
    exercise: one(exercises, {
      fields: [workoutExercises.exerciseId],
      references: [exercises.id],
    }),
    sets: many(sets),
  })
);

export const setsRelations = relations(sets, ({ one }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [sets.workoutExerciseId],
    references: [workoutExercises.id],
  }),
}));
