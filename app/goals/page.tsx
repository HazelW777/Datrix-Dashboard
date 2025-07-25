"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Target,
  Lightbulb,
  Database,
  BarChart3,
  TrendingUp,
  Eye,
  Plus,
  Trash2,
  Sparkles,
  Wand2,
  LineChart,
  Sliders,
  ArrowLeft,
  Edit2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAnalysis } from "@/contexts/analysis-context";

interface CustomTask {
  id: string;
  column: string;
  description: string;
  enabled: boolean;
  category:
    | "missing_values"
    | "data_types"
    | "duplicates"
    | "outliers"
    | "formatting";
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: "cleaning" | "modeling" | "analyzing" | "visualizing";
  icon: React.ReactNode;
}

const templates: Template[] = [
  {
    id: "data-cleaning",
    name: "Data Cleaning",
    description: "Clean and preprocess your data for analysis",
    category: "cleaning",
    icon: <Sliders className="w-5 h-5" />,
  },
  {
    id: "predictive-modeling",
    name: "Predictive Modeling",
    description: "Build predictive models to forecast future trends",
    category: "modeling",
    icon: <Wand2 className="w-5 h-5" />,
  },
  {
    id: "trend-analysis",
    name: "Trend Analysis",
    description: "Analyze patterns and trends in your data",
    category: "analyzing",
    icon: <LineChart className="w-5 h-5" />,
  },
  {
    id: "data-visualization",
    name: "Data Visualization",
    description: "Create insightful visualizations of your data",
    category: "visualizing",
    icon: <BarChart3 className="w-5 h-5" />,
  },
];

export default function GoalsPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customGoal, setCustomGoal] = useState("");
  const [customTasks, setCustomTasks] = useState<CustomTask[]>([]);
  const [newTaskColumn, setNewTaskColumn] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingDescription, setEditingDescription] = useState("");
  const { saveModel, setCurrentGoal } = useAnalysis();

  // Mock column data - in real app this would come from uploaded data
  const availableColumns = [
    "campaign_id",
    "campaign_start_date",
    "budget_allocated",
    "channel_type",
    "click_through_rate",
    "conversion_rate",
    "cost_per_acquisition",
    "target_audience",
    "campaign_objective",
  ];

  const predefinedGoals = [
    {
      id: "data-cleaning",
      title: "Data Cleaning",
      description:
        "Clean, validate, and prepare your data for analysis by handling missing values, duplicates, and inconsistencies",
      icon: Database,
      category: "Preparation",
      tasks: [
        {
          column: "target_audience",
          description:
            "Fill missing values with 'General' for undefined target audiences",
          details:
            "156 missing values detected. Will replace NULL values with default category 'General' to maintain data completeness.",
        },
        {
          column: "impressions",
          description:
            "Impute missing impression values using median of similar campaigns",
          details:
            "45 missing values found. Will calculate median impressions for campaigns in same channel and budget range.",
        },
        {
          column: "conversions",
          description:
            "Handle missing conversion data by setting to 0 for incomplete campaigns",
          details:
            "67 missing values detected. For campaigns without conversion tracking, will set to 0 to avoid analysis bias.",
        },
        {
          column: "budget",
          description:
            "Convert budget column from mixed string/number types to consistent numeric format",
          details:
            "Found mixed data types. Will parse string values and handle 'invalid' entries by replacing with median budget.",
        },
        {
          column: "start_date",
          description:
            "Standardize date format and handle invalid date entries",
          details:
            "12 invalid date formats detected. Will parse and convert to standard YYYY-MM-DD format.",
        },
      ],
    },
    {
      id: "modeling",
      title: "Modeling",
      description:
        "Build predictive models and statistical analyses to uncover patterns and make predictions",
      icon: TrendingUp,
      category: "Analysis",
      tasks: [
        "Feature engineering",
        "Model selection",
        "Training & validation",
        "Performance evaluation",
      ],
    },
    {
      id: "analyzing",
      title: "Analyzing",
      description:
        "Perform statistical analysis and generate business insights from your data",
      icon: BarChart3,
      category: "Insights",
      tasks: [
        "Descriptive statistics",
        "Correlation analysis",
        "Trend identification",
        "Business insights",
      ],
    },
    {
      id: "visualizing",
      title: "Visualizing",
      description:
        "Create interactive charts, dashboards, and visual reports to communicate findings",
      icon: Eye,
      category: "Presentation",
      tasks: [
        "Chart creation",
        "Dashboard design",
        "Interactive visualizations",
        "Report generation",
      ],
    },
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedTemplate(goalId);
  };

  const addCustomTask = () => {
    if (newTaskColumn && newTaskDescription.trim()) {
      // Auto-categorize based on description keywords
      const description = newTaskDescription.toLowerCase();
      let category: CustomTask["category"] = "missing_values";

      if (
        description.includes("missing") ||
        description.includes("null") ||
        description.includes("impute") ||
        description.includes("fill")
      ) {
        category = "missing_values";
      } else if (
        description.includes("type") ||
        description.includes("convert") ||
        description.includes("format") ||
        description.includes("parse")
      ) {
        category = "data_types";
      } else if (
        description.includes("duplicate") ||
        description.includes("unique")
      ) {
        category = "duplicates";
      } else if (
        description.includes("outlier") ||
        description.includes("anomal") ||
        description.includes("extreme")
      ) {
        category = "outliers";
      } else if (
        description.includes("standardize") ||
        description.includes("normalize") ||
        description.includes("clean")
      ) {
        category = "formatting";
      }

      const newTask: CustomTask = {
        id: `custom-${Date.now()}`,
        column: newTaskColumn,
        description: newTaskDescription,
        enabled: true,
        category: category,
      };
      setCustomTasks([...customTasks, newTask]);
      setNewTaskColumn("");
      setNewTaskDescription("");
    }
  };

  const removeCustomTask = (taskId: string) => {
    setCustomTasks(customTasks.filter((task) => task.id !== taskId));
  };

  const toggleCustomTask = (taskId: string) => {
    setCustomTasks(
      customTasks.map((task) =>
        task.id === taskId ? { ...task, enabled: !task.enabled } : task
      )
    );
  };

  const startEditingTask = (taskId: string, currentDescription: string) => {
    setEditingTaskId(taskId);
    setEditingDescription(currentDescription);
  };

  const saveTaskEdit = (taskId: string) => {
    setCustomTasks(
      customTasks.map((task) =>
        task.id === taskId ? { ...task, description: editingDescription } : task
      )
    );
    setEditingTaskId(null);
    setEditingDescription("");
  };

  const cancelTaskEdit = () => {
    setEditingTaskId(null);
    setEditingDescription("");
  };

  const handleContinue = () => {
    // Set current goal in context
    setCurrentGoal(selectedTemplate || "");

    // Save the analysis configuration as a model
    if (selectedTemplate || customGoal.trim()) {
      const model = {
        id: `model-${Date.now()}`,
        name: `Analysis Model - ${new Date().toLocaleDateString()}`,
        description: "Auto-saved analysis configuration",
        goals: selectedTemplate ? [selectedTemplate] : [],
        customGoal: customGoal,
        customTasks: customTasks,
        processingSteps: [
          "data-validation",
          "data-cleaning",
          "statistical-analysis",
          "goal-analysis",
        ],
        createdAt: new Date().toISOString(),
        dataTypes: ["marketing_data"],
        isTemplate: true,
      };
      saveModel(model);
    }

    router.push("/processing");
  };

  const canContinue = selectedTemplate || customGoal.trim().length > 0;

  const selectedGoalData = predefinedGoals.find(
    (goal) => goal.id === selectedTemplate
  );

  const categories = [
    { id: "cleaning", name: "Data Cleaning" },
    { id: "modeling", name: "Modeling" },
    { id: "analyzing", name: "Analyzing" },
    { id: "visualizing", name: "Visualizing" },
  ];

  // Get category display information
  const getCategoryInfo = (category: CustomTask["category"]) => {
    const categoryMap = {
      missing_values: {
        name: "Missing Values",
        icon: "🔍",
        color: "bg-red-50 border-red-200 text-red-800",
      },
      data_types: {
        name: "Data Types",
        icon: "🔧",
        color: "bg-blue-50 border-blue-200 text-blue-800",
      },
      duplicates: {
        name: "Duplicates",
        icon: "📋",
        color: "bg-orange-50 border-orange-200 text-orange-800",
      },
      outliers: {
        name: "Outliers",
        icon: "📊",
        color: "bg-purple-50 border-purple-200 text-purple-800",
      },
      formatting: {
        name: "Formatting",
        icon: "✨",
        color: "bg-green-50 border-green-200 text-green-800",
      },
    };
    return categoryMap[category];
  };

  // Group predefined tasks by category
  const groupTasksByCategory = () => {
    const dataCleaningGoal = predefinedGoals.find(
      (goal) => goal.id === "data-cleaning"
    );
    if (!dataCleaningGoal) return {};

    const grouped: Record<string, any[]> = {
      missing_values: [],
      data_types: [],
      formatting: [],
    };

    dataCleaningGoal.tasks.forEach((task) => {
      if (typeof task === "object" && "description" in task) {
        const predefinedTask = {
          ...task,
          id: `predefined-${task.column}-${Date.now()}`,
          type: "predefined" as const,
        };

        if (
          task.description.toLowerCase().includes("missing") ||
          task.description.toLowerCase().includes("fill")
        ) {
          grouped.missing_values.push(predefinedTask);
        } else if (
          task.description.toLowerCase().includes("convert") ||
          task.description.toLowerCase().includes("format")
        ) {
          grouped.data_types.push(predefinedTask);
        } else if (task.description.toLowerCase().includes("standardize")) {
          grouped.formatting.push(predefinedTask);
        }
      }
    });

    // Add custom tasks to the same categories
    customTasks.forEach((task) => {
      const customTask = { ...task, type: "custom" as const };
      if (grouped[task.category]) {
        grouped[task.category].push(customTask);
      }
    });

    return grouped;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/overview")}
            className="w-10 h-10 p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Set Your Analysis Goal
          </h1>
          <p className="text-lg text-slate-600">
            Choose a template or define your custom analysis goal
          </p>
        </div>

        <div className="space-y-8">
          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`flex flex-col items-center text-center p-6 rounded-lg border transition-all h-40 ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-md mb-3 ${
                        selectedTemplate === template.id
                          ? "bg-blue-100 text-blue-900"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {template.icon}
                    </div>
                    <h4 className="font-medium text-slate-900 mb-2">
                      {template.name}
                    </h4>
                    <p className="text-sm text-slate-600 overflow-hidden text-ellipsis">
                      {template.description}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Goal Input */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Analysis Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe your analysis goal in detail..."
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                className="min-h-[150px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-blue-900 hover:bg-blue-800 text-white px-8"
              onClick={handleContinue}
            >
              Continue to Analysis
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
