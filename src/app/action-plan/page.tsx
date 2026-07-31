"use client";

import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2, Trash2, Sparkles, BookOpen, Building2, Layers, CheckSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getStoredProfile, StudentProfile, UniversityItem } from "@/lib/profile-store";
import { QualificationEntry } from "@/lib/calculators";

interface SubjectTask {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

interface UniversityTask {
  id: string;
  uniName: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function ActionPlanPage() {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile());
  const [activeTab, setActiveTab] = useState<'general' | 'subjects' | 'universities'>('general');
  const [selectedSubjectTab, setSelectedSubjectTab] = useState<string>("");
  const [selectedUniTab, setSelectedUniTab] = useState<string>("");

  // Subject Tasks State
  const [subjectTasks, setSubjectTasks] = useState<SubjectTask[]>([]);
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("");
  const [newSubTaskDate, setNewSubTaskDate] = useState("2026-05-15");

  // University Tasks State
  const [uniTasks, setUniTasks] = useState<UniversityTask[]>([]);
  const [newUniTaskTitle, setNewUniTaskTitle] = useState("");
  const [newUniTaskDate, setNewUniTaskDate] = useState("2026-10-15");

  useEffect(() => {
    const prof = getStoredProfile();
    setProfile(prof);

    // Initial subjects
    const enrolledSubs = prof.entries?.map(e => e.subject) || ["Economics", "Mathematics", "Physics"];
    if (enrolledSubs.length > 0 && !selectedSubjectTab) {
      setSelectedSubjectTab(enrolledSubs[0]);
    }

    // Initial universities
    const unis = prof.draftlist?.map(u => u.name) || prof.targetUniversities || ["Imperial College London", "UCL"];
    if (unis.length > 0 && !selectedUniTab) {
      setSelectedUniTab(unis[0]);
    }

    // Load saved subject tasks
    const savedSubTasks = localStorage.getItem("gradehub_subject_action_tasks");
    if (savedSubTasks) {
      try {
        setSubjectTasks(JSON.parse(savedSubTasks));
      } catch (e) {
        setSubjectTasks(generateDefaultSubjectTasks(enrolledSubs));
      }
    } else {
      setSubjectTasks(generateDefaultSubjectTasks(enrolledSubs));
    }

    // Load saved uni tasks
    const savedUniTasks = localStorage.getItem("gradehub_uni_action_tasks");
    if (savedUniTasks) {
      try {
        setUniTasks(JSON.parse(savedUniTasks));
      } catch (e) {
        setUniTasks(generateDefaultUniTasks(unis));
      }
    } else {
      setUniTasks(generateDefaultUniTasks(unis));
    }
  }, []);

  const generateDefaultSubjectTasks = (subs: string[]): SubjectTask[] => {
    const defaults: SubjectTask[] = [];
    subs.forEach(s => {
      defaults.push(
        { id: `${s}-1`, subject: s, title: `Complete 2024 ${s} Past Paper 1 & Mark Scheme Review`, dueDate: "2026-04-15", completed: false },
        { id: `${s}-2`, subject: s, title: `Revise Key Definitions & Equations for ${s}`, dueDate: "2026-04-30", completed: false },
        { id: `${s}-3`, subject: s, title: `Attempt 3 Timed Essay / Long Answer Questions in ${s}`, dueDate: "2026-05-10", completed: false }
      );
    });
    return defaults;
  };

  const generateDefaultUniTasks = (unis: string[]): UniversityTask[] => {
    const defaults: UniversityTask[] = [];
    unis.forEach(u => {
      defaults.push(
        { id: `${u}-1`, uniName: u, title: `Request Teacher UCAS Reference Letter for ${u}`, dueDate: "2026-09-15", completed: false },
        { id: `${u}-2`, uniName: u, title: `Tailor Personal Statement Hook for ${u} Requirements`, dueDate: "2026-09-30", completed: false },
        { id: `${u}-3`, uniName: u, title: `Register & Complete Admissions Test (MAT/STEP/UCAT)`, dueDate: "2026-10-15", completed: false }
      );
    });
    return defaults;
  };

  const saveSubjectTasks = (tasks: SubjectTask[]) => {
    setSubjectTasks(tasks);
    localStorage.setItem("gradehub_subject_action_tasks", JSON.stringify(tasks));
  };

  const saveUniTasks = (tasks: UniversityTask[]) => {
    setUniTasks(tasks);
    localStorage.setItem("gradehub_uni_action_tasks", JSON.stringify(tasks));
  };

  const toggleSubjectTask = (id: string) => {
    saveSubjectTasks(subjectTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addSubjectTask = () => {
    if (!newSubTaskTitle.trim() || !selectedSubjectTab) return;
    const item: SubjectTask = {
      id: Date.now().toString(),
      subject: selectedSubjectTab,
      title: newSubTaskTitle,
      dueDate: newSubTaskDate,
      completed: false
    };
    saveSubjectTasks([...subjectTasks, item]);
    setNewSubTaskTitle("");
  };

  const deleteSubjectTask = (id: string) => {
    saveSubjectTasks(subjectTasks.filter(t => t.id !== id));
  };

  const toggleUniTask = (id: string) => {
    saveUniTasks(uniTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addUniTask = () => {
    if (!newUniTaskTitle.trim() || !selectedUniTab) return;
    const item: UniversityTask = {
      id: Date.now().toString(),
      uniName: selectedUniTab,
      title: newUniTaskTitle,
      dueDate: newUniTaskDate,
      completed: false
    };
    saveUniTasks([...uniTasks, item]);
    setNewUniTaskTitle("");
  };

  const deleteUniTask = (id: string) => {
    saveUniTasks(uniTasks.filter(t => t.id !== id));
  };

  const calculateDaysLeft = (targetDateStr: string): number => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysUntilExam = calculateDaysLeft(profile.examTargetDate || "2026-05-15");

  const enrolledSubjects = profile.entries?.map(e => e.subject) || ["Economics", "Mathematics", "Physics"];
  const targetUnis = profile.draftlist?.map(u => u.name) || profile.targetUniversities || ["Imperial College London", "UCL"];

  return (
    <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
      {/* Common App Header */}
      <div className="mb-10 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <CalendarIcon size={14} /> Admissions & Exam Action Planner
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-3">Action Plan & Checklist</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl">Manage subject-specific revision tasks (Economics, Math, Physics) and university application processes (Imperial, Oxford, UCL).</p>
      </div>

      {/* Main View Mode Selector Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 p-1.5 bg-card border border-border rounded-xl max-w-xl shadow-xs">
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'subjects' ? "bg-indigo-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen size={14} /> Subject Revision Tabs ({enrolledSubjects.length})
        </button>

        <button
          onClick={() => setActiveTab('universities')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'universities' ? "bg-indigo-600 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Building2 size={14} /> University Application Tracker ({targetUnis.length})
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Countdown & Task Scheduler */}
        <div className="space-y-6">
          <Card className="p-6 border-border shadow-md bg-indigo-600 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-200 flex items-center gap-1.5">
                <Clock size={14} /> Target Exam Countdown
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">{profile.level}</span>
            </div>

            <div className="text-5xl font-serif font-bold mb-2">
              {daysUntilExam > 0 ? daysUntilExam : 0} <span className="text-base font-sans font-normal opacity-80">Days Remaining</span>
            </div>
            <p className="text-xs text-indigo-100">Target Exam Date: <strong className="text-white">{profile.examTargetDate || "May 15, 2026"}</strong></p>
          </Card>

          {/* Task Add Card */}
          <Card className="p-6 border-border shadow-md space-y-4 bg-card">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2 border-b border-border pb-3">
              <Plus size={18} className="text-indigo-600" />
              {activeTab === 'subjects' ? `Add Task for ${selectedSubjectTab || 'Subject'}` : `Add Task for ${selectedUniTab || 'University'}`}
            </h3>

            {activeTab === 'subjects' ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-muted-foreground mb-1">Target Subject</label>
                  <Select value={selectedSubjectTab} onChange={e => setSelectedSubjectTab(e.target.value)}>
                    {enrolledSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </div>
                <div>
                  <label className="block font-medium text-muted-foreground mb-1">Task Title</label>
                  <Input value={newSubTaskTitle} onChange={e => setNewSubTaskTitle(e.target.value)} placeholder="e.g. Complete 2024 Past Paper 2" />
                </div>
                <div>
                  <label className="block font-medium text-muted-foreground mb-1">Target Due Date</label>
                  <Input type="date" value={newSubTaskDate} onChange={e => setNewSubTaskDate(e.target.value)} />
                </div>
                <button onClick={addSubjectTask} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <Plus size={16} /> Schedule Subject Task
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-muted-foreground mb-1">Target University</label>
                  <Select value={selectedUniTab} onChange={e => setSelectedUniTab(e.target.value)}>
                    {targetUnis.map(u => <option key={u} value={u}>{u}</option>)}
                  </Select>
                </div>
                <div>
                  <label className="block font-medium text-muted-foreground mb-1">Task Title</label>
                  <Input value={newUniTaskTitle} onChange={e => setNewUniTaskTitle(e.target.value)} placeholder="e.g. Submit UCAS Reference Form" />
                </div>
                <div>
                  <label className="block font-medium text-muted-foreground mb-1">Target Due Date</label>
                  <Input type="date" value={newUniTaskDate} onChange={e => setNewUniTaskDate(e.target.value)} />
                </div>
                <button onClick={addUniTask} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <Plus size={16} /> Schedule Application Task
                </button>
              </div>
            )}
          </Card>
        </div>

        {/* Right 2 Columns: Subject or University Task Checklists */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'subjects' ? (
            <Card className="p-6 border-border shadow-md space-y-4 bg-card">
              {/* Enrolled Subject Selector Pills */}
              <div className="border-b border-border pb-4">
                <span className="text-xs font-semibold text-muted-foreground block mb-2 uppercase tracking-wider">Select Enrolled Subject:</span>
                <div className="flex flex-wrap gap-2">
                  {enrolledSubjects.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubjectTab(sub)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSubjectTab === sub 
                          ? "bg-indigo-600 text-white shadow-sm" 
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      📚 {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tasks Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-sm text-foreground flex items-center justify-between">
                  <span>{selectedSubjectTab} Revision Tasks</span>
                  <span className="text-xs text-indigo-600 font-semibold">
                    {subjectTasks.filter(t => t.subject === selectedSubjectTab && t.completed).length} / {subjectTasks.filter(t => t.subject === selectedSubjectTab).length} Done
                  </span>
                </h4>

                {subjectTasks.filter(t => t.subject === selectedSubjectTab).length === 0 ? (
                  <div className="text-xs text-muted-foreground p-6 text-center">No tasks scheduled for {selectedSubjectTab} yet. Use the left form to add your first task.</div>
                ) : (
                  subjectTasks.filter(t => t.subject === selectedSubjectTab).map(task => {
                    const days = calculateDaysLeft(task.dueDate);
                    return (
                      <div key={task.id} className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                        task.completed ? "bg-muted/40 border-border opacity-70" : "bg-background border-border shadow-xs"
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleSubjectTask(task.id)}
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                          />
                          <div>
                            <span className={`text-sm font-semibold block ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                              {task.title}
                            </span>
                            <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold ${days < 7 ? 'text-red-500' : 'text-slate-500'}`}>
                            {days > 0 ? `${days}d left` : 'Passed'}
                          </span>
                          <button onClick={() => deleteSubjectTask(task.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-6 border-border shadow-md space-y-4 bg-card">
              {/* Target University Selector Pills */}
              <div className="border-b border-border pb-4">
                <span className="text-xs font-semibold text-muted-foreground block mb-2 uppercase tracking-wider">Select Target University:</span>
                <div className="flex flex-wrap gap-2">
                  {targetUnis.map(u => (
                    <button
                      key={u}
                      onClick={() => setSelectedUniTab(u)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedUniTab === u 
                          ? "bg-indigo-600 text-white shadow-sm" 
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      🏛️ {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tasks Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-sm text-foreground flex items-center justify-between">
                  <span>{selectedUniTab} Application Checklist</span>
                  <span className="text-xs text-indigo-600 font-semibold">
                    {uniTasks.filter(t => t.uniName === selectedUniTab && t.completed).length} / {uniTasks.filter(t => t.uniName === selectedUniTab).length} Done
                  </span>
                </h4>

                {uniTasks.filter(t => t.uniName === selectedUniTab).length === 0 ? (
                  <div className="text-xs text-muted-foreground p-6 text-center">No application tasks scheduled for {selectedUniTab} yet.</div>
                ) : (
                  uniTasks.filter(t => t.uniName === selectedUniTab).map(task => {
                    const days = calculateDaysLeft(task.dueDate);
                    return (
                      <div key={task.id} className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                        task.completed ? "bg-muted/40 border-border opacity-70" : "bg-background border-border shadow-xs"
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleUniTask(task.id)}
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                          />
                          <div>
                            <span className={`text-sm font-semibold block ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                              {task.title}
                            </span>
                            <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold ${days < 7 ? 'text-red-500' : 'text-slate-500'}`}>
                            {days > 0 ? `${days}d left` : 'Passed'}
                          </span>
                          <button onClick={() => deleteUniTask(task.id)} className="text-muted-foreground hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
