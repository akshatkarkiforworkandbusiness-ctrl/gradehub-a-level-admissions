"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2, Trash2, Sparkles, BookOpen, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getStoredProfile, StudentProfile } from "@/lib/profile-store";

interface TaskItem {
  id: string;
  title: string;
  category: 'Exam' | 'Application' | 'Activity' | 'Essay';
  dueDate: string;
  completed: boolean;
}

const DEFAULT_AS_TASKS: TaskItem[] = [
  { id: "1", title: "Complete AS Physics / Maths Mock Exams", category: "Exam", dueDate: "2026-05-15", completed: false },
  { id: "2", title: "Finalize CREST Gold / Open-Source Project", category: "Activity", dueDate: "2026-06-30", completed: false },
  { id: "3", title: "Attend Summer Medical Shadowing / Internship", category: "Activity", dueDate: "2026-07-20", completed: false },
  { id: "4", title: "First Draft of UCAS Personal Statement", category: "Essay", dueDate: "2026-08-15", completed: false }
];

const DEFAULT_A2_TASKS: TaskItem[] = [
  { id: "1", title: "Submit Early UCAS (Oxbridge / Med) / Early Decision", category: "Application", dueDate: "2026-10-15", completed: false },
  { id: "2", title: "UCAT / BMAT / MAT Admissions Exam", category: "Exam", dueDate: "2026-10-30", completed: false },
  { id: "3", title: "Submit Main UCAS & Common App Applications", category: "Application", dueDate: "2026-01-25", completed: false },
  { id: "4", title: "Final A2 Level Board Examinations", category: "Exam", dueDate: "2026-05-15", completed: false }
];

export default function ActionPlanPage() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<TaskItem['category']>("Exam");
  const [newDate, setNewDate] = useState("2026-05-15");

  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);

    const saved = localStorage.getItem("gradehub_action_plan_tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        setTasks(prof.level === 'AS-Level' ? DEFAULT_AS_TASKS : DEFAULT_A2_TASKS);
      }
    } else {
      setTasks(prof.level === 'AS-Level' ? DEFAULT_AS_TASKS : DEFAULT_A2_TASKS);
    }
  }, []);

  const saveTasks = (newTasks: TaskItem[]) => {
    setTasks(newTasks);
    localStorage.setItem("gradehub_action_plan_tasks", JSON.stringify(newTasks));
  };

  const toggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks(updated);
  };

  const addTask = () => {
    if (!newTitle.trim()) return;
    const item: TaskItem = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      dueDate: newDate,
      completed: false
    };
    saveTasks([...tasks, item]);
    setNewTitle("");
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const calculateDaysLeft = (targetDateStr: string): number => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysUntilExam = calculateDaysLeft(profile.examTargetDate || "2026-05-15");

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-3">
          <CalendarIcon size={14} /> Admissions & Exam Action Planner
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">Admissions & Exam Action Plan</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Tailored roadmap for <strong>{profile.level}</strong> students targeting <strong>{profile.courseInterest}</strong>. Set target exam dates and track application deadlines.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Countdown & Add Task */}
        <div className="space-y-6">
          {/* Target Exam Countdown Banner */}
          <Card className="p-6 border-border shadow-md bg-slate-900 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                <Clock size={14} /> Target Exam Countdown
              </span>
              <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded font-bold">{profile.level}</span>
            </div>

            <div className="text-5xl font-serif font-bold mb-2">
              {daysUntilExam > 0 ? daysUntilExam : 0} <span className="text-base font-sans font-normal opacity-80">Days Remaining</span>
            </div>
            <p className="text-xs text-slate-400">Target Date: <strong className="text-white">{profile.examTargetDate || "May 15, 2026"}</strong></p>
          </Card>

          {/* Add Milestone Task Card */}
          <Card className="p-6 border-border shadow-md space-y-4">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2 border-b border-border pb-3">
              <Plus size={18} className="text-blue-600" /> Add Task or Exam Milestone
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Task Title</label>
                <Input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Take UCAT Exam / Submit Common App" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Category</label>
                  <Select value={newCategory} onChange={e => setNewCategory(e.target.value as any)}>
                    <option value="Exam">Exam</option>
                    <option value="Application">Application</option>
                    <option value="Activity">Activity</option>
                    <option value="Essay">Essay</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1">Due Date</label>
                  <Input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
                </div>
              </div>

              <button
                onClick={addTask}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Schedule Task
              </button>
            </div>
          </Card>
        </div>

        {/* Right 2 Columns: Task Checklist & Stage Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-border shadow-md space-y-4">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2 border-b border-border pb-3">
              <CheckCircle2 size={18} className="text-emerald-500" /> {profile.level} Milestone Checklist
            </h3>

            <div className="space-y-3">
              {tasks.map((task) => {
                const days = calculateDaysLeft(task.dueDate);
                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                      task.completed ? "bg-muted/40 border-border opacity-75" : "bg-card border-border hover:border-blue-600/40 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                      />
                      <div>
                        <div className={`font-semibold text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="font-bold text-[10px] px-2 py-0.5 rounded bg-muted uppercase">{task.category}</span>
                          <span>Due: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${days < 7 ? 'text-red-500' : 'text-slate-500'}`}>
                        {days > 0 ? `${days}d left` : 'Passed'}
                      </span>
                      <button onClick={() => deleteTask(task.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
