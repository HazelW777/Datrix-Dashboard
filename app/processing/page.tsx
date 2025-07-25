"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Loader2,
  Play,
  Pause,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  FastForward,
  Save,
  Edit3,
  MessageSquare,
  Plus,
  ArrowLeft,
  CheckCircle2,
  Clock,
  GripVertical,
  Code,
  Copy,
  Download,
  Minimize,
  Maximize,
} from "lucide-react";
import { TaskDetailPanel } from "@/components/task-detail-panel";
import { useAnalysis } from "@/contexts/analysis-context";
import ModelingInterface from "@/components/modeling-interface";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: string;
  category: string;
  column: string;
  description: string;
  name: string;
  process: "todo" | "running" | "completed" | "error";
  status: "pending" | "running" | "completed" | "error";
  progress: number;
  duration?: number;
  result?: {
    rowsAffected: number;
    changes: string[];
    before: any[];
    after: any[];
    statistics?: any;
  };
  details: string;
}

interface TaskCategory {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  status: "pending" | "running" | "completed";
}

// Add type definitions
interface DataRow {
  id: number;
  campaign_name: string;
  start_date: string;
  end_date: string;
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost_per_click: string;
  conversion_rate: string;
  channel: string;
  target_audience: string | null;
}

interface EditingCell {
  rowIndex: number;
  column: string;
}

// Add ModelingInterface props type
interface ModelingInterfaceProps {
  selectedTask: string | null;
  onTaskComplete: (taskId: string, result: any) => void;
}

export default function TaskBasedProcessingPage() {
  const { currentGoal, setCurrentGoal } = useAnalysis();
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [taskCategories, setTaskCategories] = useState<TaskCategory[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [dataView, setDataView] = useState<"original" | "current">("current");
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [editValue, setEditValue] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [allTasksCompleted, setAllTasksCompleted] = useState(false);
  const [newCustomTaskColumn, setNewCustomTaskColumn] = useState("");
  const [newCustomTaskDescription, setNewCustomTaskDescription] = useState("");
  const [isResizing, setIsResizing] = useState(false);
  const [taskPanelWidth, setTaskPanelWidth] = useState(400);
  const taskPanelRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  useEffect(() => {
    if (!currentGoal) {
      setCurrentGoal("predictive-modeling");
    }
  }, [currentGoal, setCurrentGoal]);

  // Available columns
  const availableColumns = [
    "campaign_id",
    "campaign_name",
    "start_date",
    "end_date",
    "budget",
    "impressions",
    "clicks",
    "conversions",
    "cost_per_click",
    "conversion_rate",
    "channel",
    "target_audience",
  ];

  // Task categories based on selected goal
  const getTaskCategoriesForGoal = (goal: string | null): TaskCategory[] => {
    switch (goal) {
      case "data-cleaning":
        return [
          {
            id: "missing-values",
            name: "Missing Values",
            description: "Handle missing or null values in dataset",
            status: "pending",
            tasks: [
              {
                id: "handle_missing_values_target_audience",
                category: "missing values",
                column: "target_audience",
                description:
                  "Handle missing values in 'target_audience' column, possibly by imputing with default category 'General'.",
                name: "handle_missing_values_target_audience",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "156 missing values detected",
              },
              {
                id: "handle_missing_values_impressions",
                category: "missing values",
                column: "impressions",
                description:
                  "Handle missing values in 'impressions' column, possibly by imputing with median or similar campaigns data.",
                name: "handle_missing_values_impressions",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "45 missing values found",
              },
              {
                id: "handle_missing_values_conversions",
                category: "missing values",
                column: "conversions",
                description:
                  "Handle missing values in 'conversions' column, possibly by setting to 0 for incomplete campaigns.",
                name: "handle_missing_values_conversions",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "67 missing values detected",
              },
            ],
          },
          {
            id: "data-types",
            name: "Data Type Conversion",
            description: "Convert columns to appropriate data types",
            status: "pending",
            tasks: [
              {
                id: "convert_data_type_budget",
                category: "data type conversion",
                column: "budget",
                description:
                  "Convert 'budget' column from mixed string/number types to consistent numeric format, handling invalid entries.",
                name: "convert_data_type_budget",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "Mixed data types found",
              },
              {
                id: "standardize_date_format_start_date",
                category: "data type conversion",
                column: "start_date",
                description:
                  "Standardize 'start_date' column to consistent date format (YYYY-MM-DD), parsing various input formats.",
                name: "standardize_date_format_start_date",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "12 invalid date formats detected",
              },
              {
                id: "standardize_date_format_end_date",
                category: "data type conversion",
                column: "end_date",
                description:
                  "Standardize 'end_date' column to consistent date format (YYYY-MM-DD), parsing various input formats.",
                name: "standardize_date_format_end_date",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
          {
            id: "duplicates",
            name: "Duplicate Removal",
            description: "Identify and remove duplicate records",
            status: "pending",
            tasks: [
              {
                id: "remove_duplicates_campaign_name",
                category: "duplicate removal",
                column: "campaign_name",
                description:
                  "Remove duplicate records based on 'campaign_name' and 'channel' combination, keeping the first occurrence.",
                name: "remove_duplicates_campaign_name",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
          {
            id: "outliers",
            name: "Outlier Detection",
            description: "Detect and handle outliers in numerical columns",
            status: "pending",
            tasks: [
              {
                id: "detect_outliers_budget",
                category: "outlier detection",
                column: "budget",
                description:
                  "Detect outliers in 'budget' column using IQR method and handle extreme values appropriately.",
                name: "detect_outliers_budget",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "detect_outliers_impressions",
                category: "outlier detection",
                column: "impressions",
                description:
                  "Detect outliers in 'impressions' column using statistical methods and validate data integrity.",
                name: "detect_outliers_impressions",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "detect_outliers_clicks",
                category: "outlier detection",
                column: "clicks",
                description:
                  "Detect outliers in 'clicks' column and ensure logical relationship with impressions.",
                name: "detect_outliers_clicks",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
          {
            id: "validation",
            name: "Data Validation",
            description: "Validate data integrity and consistency",
            status: "pending",
            tasks: [
              {
                id: "validate_budget_values",
                category: "data validation",
                column: "budget",
                description:
                  "Validate that all 'budget' values are positive numbers and within reasonable business ranges.",
                name: "validate_budget_values",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "validate_metric_relationships",
                category: "data validation",
                column: "impressions",
                description:
                  "Validate logical relationships: impressions >= clicks >= conversions for data consistency.",
                name: "validate_metric_relationships",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "validate_channel_values",
                category: "data validation",
                column: "channel",
                description:
                  "Validate that all 'channel' values are from predefined list of marketing channels.",
                name: "validate_channel_values",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
        ];
      case "modeling":
      case "predictive-modeling":
        return [
          {
            id: "target-definition",
            name: "Target Definition",
            description: "Define what to predict or estimate",
            status: "pending",
            tasks: [
              {
                id: "define_prediction_target",
                category: "target definition",
                column: "user_selected",
                description:
                  "Define the target variable for prediction or estimation from available dataset columns.",
                name: "define_prediction_target",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
          {
            id: "model-recommendation",
            name: "Model Recommendation",
            description: "Get model recommendations based on preferences",
            status: "pending",
            tasks: [
              {
                id: "preference_accuracy_vs_robustness",
                category: "model recommendation",
                column: "model_selection",
                description:
                  "Choose preference between accuracy (high performance) vs robustness (stable across conditions).",
                name: "preference_accuracy_vs_robustness",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "preference_complexity_vs_simplicity",
                category: "model recommendation",
                column: "model_selection",
                description:
                  "Choose preference between complexity (advanced algorithms) vs simplicity (interpretable models).",
                name: "preference_complexity_vs_simplicity",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "preference_technique_vs_explanation",
                category: "model recommendation",
                column: "model_selection",
                description:
                  "Choose preference between technique (cutting-edge methods) vs explanation (interpretable results).",
                name: "preference_technique_vs_explanation",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "generate_model_recommendation",
                category: "model recommendation",
                column: "model_selection",
                description:
                  "Generate personalized model recommendation based on user preferences and data characteristics.",
                name: "generate_model_recommendation",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
          {
            id: "feature-selection",
            name: "Feature Selection",
            description: "Select features for model training",
            status: "pending",
            tasks: [
              {
                id: "drag_drop_feature_selection",
                category: "feature selection",
                column: "all_features",
                description:
                  "Drag and drop all possible features you want to use in the rectangular selection area.",
                name: "drag_drop_feature_selection",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
          {
            id: "feature-engineering",
            name: "Feature Engineering",
            description: "Engineer features for better model performance",
            status: "pending",
            tasks: [
              {
                id: "engineer_numerical_features",
                category: "feature engineering",
                column: "numerical_columns",
                description:
                  "Apply feature engineering techniques to numerical features (scaling, transformation, binning).",
                name: "engineer_numerical_features",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "engineer_categorical_features",
                category: "feature engineering",
                column: "categorical_columns",
                description:
                  "Apply feature engineering techniques to categorical features (encoding, grouping, embedding).",
                name: "engineer_categorical_features",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
          {
            id: "variable-selection",
            name: "Variable Selection",
            description: "Automatically select optimal variables",
            status: "pending",
            tasks: [
              {
                id: "run_variable_selection",
                category: "variable selection",
                column: "selected_features",
                description:
                  "Run automated variable selection algorithms to identify most important features for the model.",
                name: "run_variable_selection",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "show_selected_variables",
                category: "variable selection",
                column: "selected_features",
                description:
                  "Display the final list of selected variables with importance scores and selection rationale.",
                name: "show_selected_variables",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
          {
            id: "model-evaluation",
            name: "Model Evaluation",
            description: "Evaluate model performance comprehensively",
            status: "pending",
            tasks: [
              {
                id: "calculate_training_test_errors",
                category: "model evaluation",
                column: "model_metrics",
                description:
                  "Calculate training error (80%) and test error (78%) to assess model performance and overfitting.",
                name: "calculate_training_test_errors",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "generate_error_plots",
                category: "model evaluation",
                column: "model_metrics",
                description:
                  "Generate error plots showing model performance across different data segments and conditions.",
                name: "generate_error_plots",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "create_confusion_matrix",
                category: "model evaluation",
                column: "model_metrics",
                description:
                  "Create confusion matrix to visualize classification performance and error patterns.",
                name: "create_confusion_matrix",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
              {
                id: "perform_stress_test",
                category: "model evaluation",
                column: "model_metrics",
                description:
                  "Perform stress testing to evaluate model robustness under various edge cases and data conditions.",
                name: "perform_stress_test",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
        ];
      case "analyzing":
        return [
          {
            id: "descriptive-stats",
            name: "Descriptive Statistics",
            description: "Calculate basic statistical measures",
            status: "pending",
            tasks: [
              {
                id: "analyze_budget_distribution",
                category: "descriptive statistics",
                column: "budget",
                description:
                  "Calculate mean, median, standard deviation, and distribution analysis for budget column.",
                name: "analyze_budget_distribution",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
        ];
      case "visualizing":
        return [
          {
            id: "chart-creation",
            name: "Chart Creation",
            description: "Create visualizations for data insights",
            status: "pending",
            tasks: [
              {
                id: "create_budget_histogram",
                category: "chart creation",
                column: "budget",
                description:
                  "Create histogram visualization showing budget distribution across all campaigns.",
                name: "create_budget_histogram",
                process: "todo",
                status: "pending",
                progress: 0,
                details: "",
              },
            ],
          },
        ];
      default:
        return [];
    }
  };

  // Update task categories when currentGoal changes
  useEffect(() => {
    if (currentGoal) {
      const categories = getTaskCategoriesForGoal(currentGoal);
      setTaskCategories(categories);
      // Set all categories expanded by default
      setExpandedCategories(categories.map((cat) => cat.id));
    }
  }, [currentGoal]);

  // Add state for code view
  const [codeViewTaskId, setCodeViewTaskId] = useState<string | null>(null);

  // Function to get task code
  const getTaskCode = (task: Task) => {
    switch (task.id) {
      case "handle_missing_values_target_audience":
        return `# Fill missing values in target_audience column
df['target_audience'] = df['target_audience'].fillna('General')`;
      case "handle_missing_values_impressions":
        return `# Fill missing values in impressions column with median
median_impressions = df['impressions'].median()
df['impressions'] = df['impressions'].fillna(median_impressions)`;
      case "convert_data_type_budget":
        return `# Convert budget column to numeric type
df['budget'] = pd.to_numeric(df['budget'], errors='coerce')
df['budget'] = df['budget'].fillna(df['budget'].median())`;
      default:
        return `# Task code will be generated here
# This is a placeholder for task: ${task.id}`;
    }
  };

  // Add state management
  const [currentData, setCurrentData] = useState<DataRow[]>([]);

  // Update generateSampleData to use proper types
  const generateSampleData = (): DataRow[] => {
    const channels = ["Social Media", "Email", "Search", "Display", "Video"];
    const audiences = [
      "General",
      "Students",
      "Young Adults",
      "Professionals",
      "Parents",
    ];
    const data: DataRow[] = [];

    for (let i = 1; i <= 50; i++) {
      data.push({
        id: i,
        campaign_name: `Campaign ${i}`,
        start_date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        end_date: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(
          2,
          "0"
        )}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        budget: Math.floor(Math.random() * 10000) + 1000,
        impressions: Math.floor(Math.random() * 200000) + 10000,
        clicks: Math.floor(Math.random() * 10000) + 100,
        conversions: Math.floor(Math.random() * 1000) + 10,
        cost_per_click: (Math.random() * 5 + 0.5).toFixed(2),
        conversion_rate: (Math.random() * 10 + 1).toFixed(2),
        channel: channels[Math.floor(Math.random() * channels.length)],
        target_audience:
          Math.random() > 0.2
            ? audiences[Math.floor(Math.random() * audiences.length)]
            : null,
      });
    }
    return data;
  };

  // Update currentData state with sample data
  useEffect(() => {
    const sampleData = generateSampleData();
    setCurrentData(sampleData);
  }, []);

  // Update handleCellEdit with proper types
  const handleCellEdit = (
    rowIndex: number,
    column: keyof DataRow,
    value: string
  ) => {
    const newData = [...currentData];
    let processedValue: any = value;

    // Convert value based on column type
    switch (column) {
      case "budget":
      case "impressions":
      case "clicks":
      case "conversions":
        processedValue = value === "" ? null : Number(value);
        break;
      case "cost_per_click":
      case "conversion_rate":
        processedValue = value === "" ? null : parseFloat(value);
        break;
      case "start_date":
      case "end_date":
        // Validate date format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return;
        }
        break;
    }

    newData[rowIndex] = { ...newData[rowIndex], [column]: processedValue };
    setCurrentData(newData);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSelectTask = (taskId: string) => {
    setSelectedTask((prevTaskId) => (prevTaskId === taskId ? null : taskId));
  };

  const addCustomDataCleaningTask = () => {
    if (!newCustomTaskColumn || !newCustomTaskDescription.trim()) return;

    // Auto-categorize based on description keywords
    const description = newCustomTaskDescription.toLowerCase();
    let targetCategoryId = "missing-values"; // default
    let categoryName = "missing values";

    if (
      description.includes("missing") ||
      description.includes("null") ||
      description.includes("impute") ||
      description.includes("fill")
    ) {
      targetCategoryId = "missing-values";
      categoryName = "missing values";
    } else if (
      description.includes("type") ||
      description.includes("convert") ||
      description.includes("format") ||
      description.includes("parse") ||
      description.includes("standardize")
    ) {
      targetCategoryId = "data-types";
      categoryName = "data type conversion";
    } else if (
      description.includes("duplicate") ||
      description.includes("unique")
    ) {
      targetCategoryId = "duplicates";
      categoryName = "duplicate removal";
    } else if (
      description.includes("outlier") ||
      description.includes("anomal") ||
      description.includes("extreme")
    ) {
      targetCategoryId = "outliers";
      categoryName = "outlier detection";
    } else if (
      description.includes("validate") ||
      description.includes("check") ||
      description.includes("verify")
    ) {
      targetCategoryId = "validation";
      categoryName = "data validation";
    }

    const newTask: Task = {
      id: `custom-${newCustomTaskColumn}-${Date.now()}`,
      category: categoryName,
      column: newCustomTaskColumn,
      description: newCustomTaskDescription,
      name: `Custom: ${newCustomTaskDescription.substring(0, 30)}...`,
      process: "todo",
      status: "pending",
      progress: 0,
      details: "User-defined task",
    };

    setTaskCategories((prev) => {
      return prev.map((cat) =>
        cat.id === targetCategoryId
          ? { ...cat, tasks: [...cat.tasks, newTask] }
          : cat
      );
    });

    setNewCustomTaskColumn("");
    setNewCustomTaskDescription("");
  };

  const executeTask = async (taskId: string) => {
    setCurrentTaskId(taskId);
    setIsProcessing(true);

    // Update task status to running
    setTaskCategories((prev) =>
      prev.map((category) => ({
        ...category,
        tasks: category.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: "running" as const,
                process: "running" as const,
                progress: 0,
              }
            : task
        ),
      }))
    );

    // Simulate task execution with progress
    const interval = setInterval(() => {
      setTaskCategories((prev) =>
        prev.map((category) => ({
          ...category,
          tasks: category.tasks.map((task) => {
            if (task.id === taskId && task.status === "running") {
              const newProgress = Math.min(
                task.progress + Math.random() * 20 + 10,
                100
              );

              if (newProgress >= 100) {
                // Task completed - simulate data changes
                const result = simulateTaskResult(taskId);
                if (result.after) {
                  setCurrentData(result.after);
                }

                return {
                  ...task,
                  progress: 100,
                  status: "completed" as const,
                  process: "completed" as const,
                  duration: Math.floor(Math.random() * 5) + 2,
                  result,
                };
              }

              return { ...task, progress: newProgress };
            }
            return task;
          }),
        }))
      );
    }, 500);

    // Stop after task completion
    setTimeout(() => {
      clearInterval(interval);
      setIsProcessing(false);
      setCurrentTaskId(null);
    }, 3000);
  };

  // Update simulateTaskResult with proper types
  const simulateTaskResult = (taskId: string) => {
    switch (taskId) {
      case "handle_missing_values_target_audience":
        const afterMissingValues = currentData.map((row: DataRow) => ({
          ...row,
          target_audience: row.target_audience || "General",
        }));
        return {
          rowsAffected: 2,
          changes: [
            "Filled 2 missing values in 'target_audience' with 'General'",
            "Data completeness improved from 83% to 100%",
          ],
          before: currentData,
          after: afterMissingValues,
          statistics: {
            missing_values: {
              before: 2,
              after: 0,
              change: "-2 (100% reduction)",
            },
          },
        };
      case "handle_missing_values_impressions":
        const afterImpressions = currentData.map((row: DataRow) => ({
          ...row,
          impressions: row.impressions || 67890,
        }));
        return {
          rowsAffected: 1,
          changes: [
            "Filled 1 missing value in 'impressions' with median value 67890",
            "Impressions column now 100% complete",
          ],
          before: currentData,
          after: afterImpressions,
        };
      case "convert_data_type_budget":
        const afterTypeConversion = currentData.map((row: DataRow) => ({
          ...row,
          budget: (() => {
            const budgetValue = row.budget;
            if (typeof budgetValue === "string") {
              return budgetValue === "invalid"
                ? 5000
                : Number.parseInt(budgetValue);
            }
            return budgetValue;
          })(),
        }));
        return {
          rowsAffected: 2,
          changes: [
            "Converted 'budget' column from mixed types to numeric",
            "Replaced invalid value with median value 5000",
          ],
          before: currentData,
          after: afterTypeConversion,
        };
      default:
        return {
          rowsAffected: 0,
          changes: ["Task completed successfully"],
          before: currentData,
          after: currentData,
        };
    }
  };

  const executeAllTasks = () => {
    const allTasks = taskCategories.flatMap((category) => category.tasks);
    let currentIndex = 0;

    const executeNext = () => {
      if (currentIndex < allTasks.length) {
        const task = allTasks[currentIndex];
        executeTask(task.id);
        currentIndex++;
        setTimeout(executeNext, 3500); // Wait for current task to complete
      } else {
        // All tasks completed
        setAllTasksCompleted(true);
        setIsProcessing(false);
      }
    };

    executeNext();
  };

  const handleCellClick = (
    rowIndex: number,
    column: string,
    currentValue: any
  ) => {
    setEditingCell({ rowIndex, column });
    setEditValue(String(currentValue || ""));
  };

  const handleCellSave = () => {
    if (editingCell) {
      const newData = [...currentData];
      const { rowIndex, column } = editingCell;

      // Convert value to appropriate type
      let newValue: any = editValue;
      if (
        column === "budget" ||
        column === "impressions" ||
        column === "clicks" ||
        column === "conversions"
      ) {
        newValue = editValue === "" ? null : Number(editValue) || editValue;
      }

      newData[rowIndex] = { ...newData[rowIndex], [column]: newValue };
      setCurrentData(newData);
      setEditingCell(null);
      setEditValue("");
    }
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const getTaskIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "running":
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return (
          <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
        );
    }
  };

  const getCategoryStatus = (category: TaskCategory) => {
    const tasks = category.tasks;
    if (tasks.every((task) => task.status === "completed")) return "completed";
    if (tasks.some((task) => task.status === "running")) return "running";
    return "pending";
  };

  const selectedTaskData = selectedTask
    ? taskCategories.flatMap((c) => c.tasks).find((t) => t.id === selectedTask)
    : null;

  const renderCell = (value: any, rowIndex: number, column: string) => {
    const isEditing =
      editingCell?.rowIndex === rowIndex && editingCell?.column === column;
    const isNull = value === null || value === undefined;
    const isInvalid = value === "invalid";

    if (isEditing) {
      return (
        <div className="flex items-center space-x-2">
          <input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="h-8 text-sm border rounded px-2 flex-1"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCellSave();
              if (e.key === "Escape") handleCellCancel();
            }}
          />
          <Button size="sm" onClick={handleCellSave} className="h-6 px-2">
            <Save className="w-3 h-3" />
          </Button>
        </div>
      );
    }

    return (
      <div
        className={`cursor-pointer hover:bg-slate-100 p-1 rounded group flex items-center justify-between ${
          isNull || isInvalid ? "text-red-600 bg-red-50" : ""
        }`}
        onClick={() => handleCellClick(rowIndex, column, value)}
      >
        <span>{isNull ? "NULL" : value}</span>
        <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 text-slate-400" />
      </div>
    );
  };

  const handleSendMessage = () => {
    if (userMessage.trim() && selectedColumn) {
      // Handle send message for specific column
      console.log(`Message for ${selectedColumn}:`, userMessage);
      setUserMessage("");
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = taskPanelWidth;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const deltaX = e.clientX - startXRef.current;
      const newWidth = Math.max(
        300,
        Math.min(600, startWidthRef.current + deltaX)
      );
      setTaskPanelWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Add task types
  const taskTypes = [
    { id: "missing_values", name: "Missing Values" },
    { id: "data_type_conversion", name: "Data Type Conversion" },
    { id: "duplicate_removal", name: "Duplicate Removal" },
    { id: "outlier_detection", name: "Outlier Detection" },
    { id: "data_validation", name: "Data Validation" },
  ];

  // Add state for custom task creation
  const [newTaskType, setNewTaskType] = useState("");
  const [newTaskColumn, setNewTaskColumn] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const [taskMessage, setTaskMessage] = useState("");

  // Function to toggle task expansion
  const toggleTask = (taskId: string) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Function to send task message
  const handleSendTaskMessage = () => {
    if (taskMessage.trim()) {
      console.log("Task message:", taskMessage);
      setTaskMessage("");
    }
  };

  // Function to add custom task
  const addCustomTask = () => {
    if (!newTaskType || !newTaskColumn || !newTaskDescription.trim()) return;

    const newTask: Task = {
      id: `custom-${newTaskType}-${newTaskColumn}-${Date.now()}`,
      category: newTaskType,
      column: newTaskColumn,
      description: newTaskDescription,
      name: `Custom: ${newTaskDescription.substring(0, 20)}...`,
      process: "todo",
      status: "pending",
      progress: 0,
      details: "",
    };

    setTaskCategories((prev) => {
      const categoryExists = prev.find((cat) => cat.id === newTaskType);
      if (categoryExists) {
        return prev.map((cat) =>
          cat.id === newTaskType
            ? { ...cat, tasks: [...cat.tasks, newTask] }
            : cat
        );
      } else {
        const categoryName =
          taskTypes.find((t) => t.id === newTaskType)?.name || newTaskType;
        return [
          ...prev,
          {
            id: newTaskType,
            name: categoryName,
            description: `Custom ${categoryName} tasks`,
            status: "pending",
            tasks: [newTask],
          },
        ];
      }
    });

    // Reset form
    setNewTaskType("");
    setNewTaskColumn("");
    setNewTaskDescription("");
  };

  // Add state for fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update downloadData with proper types
  const downloadData = () => {
    const headers = Object.keys(currentData[0]) as (keyof DataRow)[];
    const csvContent = [
      headers.join(","),
      ...currentData.map((row: DataRow) =>
        headers
          .map((header) => {
            const value = row[header];
            return typeof value === "string" ? `"${value}"` : value;
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data.csv";
    link.click();
  };

  // Show message if no goal is selected
  if (!currentGoal) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No Analysis Goal Selected
            </h3>
            <p className="text-slate-600 mb-4">
              Please go back and select an analysis goal to continue.
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show modeling interface for modeling goal
  if (currentGoal === "predictive-modeling") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex h-screen">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="w-10 h-10 p-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-semibold">Predictive Modeling</h1>
            </div>
            <ModelingInterface
              selectedTask={selectedTask}
              onTaskComplete={(taskId: string, result: any) => {
                setTaskCategories((prev) =>
                  prev.map((category) => ({
                    ...category,
                    tasks: category.tasks.map((task) =>
                      task.id === taskId
                        ? {
                            ...task,
                            status: "completed" as const,
                            process: "completed" as const,
                            progress: 100,
                            result,
                          }
                        : task
                    ),
                  }))
                );
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Show data cleaning interface for data-cleaning goal
  if (currentGoal === "data-cleaning") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex h-screen">
          {/* Task Panel */}
          <div
            ref={taskPanelRef}
            className="bg-white border-r border-slate-200 flex flex-col"
            style={{ width: taskPanelWidth }}
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center space-x-4 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.back()}
                  className="w-10 h-10 p-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <h1 className="text-xl font-semibold">Data Cleaning</h1>
              </div>
              <Button
                onClick={executeAllTasks}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white"
              >
                <Play className="w-4 h-4 mr-2" />
                Run All Tasks
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {taskCategories.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <h3 className="text-base font-medium text-slate-900">
                          {category.name}
                        </h3>
                        {getCategoryStatus(category) === "completed" ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                        ) : getCategoryStatus(category) === "running" ? (
                          <Clock className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                        ) : null}
                      </div>
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                      )}
                    </button>

                    {expandedCategories.includes(category.id) && (
                      <div className="space-y-2 pl-4">
                        {category.tasks.map((task, index) => (
                          <div key={task.id} className="space-y-2">
                            <div
                              className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                              onClick={() => toggleTask(task.id)}
                            >
                              <div className="flex items-center space-x-2">
                                <ChevronRight
                                  className={`w-3 h-3 transition-transform ${
                                    expandedTasks.includes(task.id)
                                      ? "rotate-90"
                                      : ""
                                  }`}
                                />
                                <span className="text-sm text-slate-900">
                                  Task {index + 1}
                                </span>
                                {task.status === "completed" ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                ) : task.status === "running" ? (
                                  <Clock className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                                ) : task.status === "error" ? (
                                  <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                ) : null}
                              </div>
                              <div
                                className="flex items-center space-x-2"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    setCodeViewTaskId(
                                      codeViewTaskId === task.id
                                        ? null
                                        : task.id
                                    )
                                  }
                                  className="text-slate-500 hover:text-slate-700 h-7 px-2"
                                >
                                  <Code className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => executeTask(task.id)}
                                  disabled={task.status === "running"}
                                  className="h-7 px-2"
                                >
                                  {task.status === "running" ? (
                                    <Clock className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5" />
                                  )}
                                </Button>
                              </div>
                            </div>

                            {expandedTasks.includes(task.id) && (
                              <div className="border rounded-lg p-3 bg-white ml-4">
                                {codeViewTaskId === task.id ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-slate-500">
                                        Code
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          navigator.clipboard.writeText(
                                            getTaskCode(task)
                                          );
                                        }}
                                        className="text-slate-500 hover:text-slate-700 h-6 px-2"
                                      >
                                        <Copy className="w-3.5 h-3.5" />
                                      </Button>
                                    </div>
                                    <pre className="bg-slate-50 p-2 rounded text-xs font-mono overflow-x-auto">
                                      {getTaskCode(task)}
                                    </pre>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <div>
                                      <span className="text-xs text-slate-500">
                                        Column
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className="text-xs font-mono ml-2"
                                      >
                                        {task.column}
                                      </Badge>
                                    </div>

                                    <div>
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-500">
                                          Description
                                        </span>
                                        <button
                                          onClick={() => {
                                            const newDescription = prompt(
                                              "Edit task description:",
                                              task.description
                                            );
                                            if (newDescription) {
                                              setTaskCategories((prev) =>
                                                prev.map((cat) =>
                                                  cat.id === category.id
                                                    ? {
                                                        ...cat,
                                                        tasks: cat.tasks.map(
                                                          (t) =>
                                                            t.id === task.id
                                                              ? {
                                                                  ...t,
                                                                  description:
                                                                    newDescription,
                                                                }
                                                              : t
                                                        ),
                                                      }
                                                    : cat
                                                )
                                              );
                                            }
                                          }}
                                          className="text-slate-400 hover:text-slate-600"
                                        >
                                          <Edit3 className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                      <p className="text-sm text-slate-900 mt-1">
                                        {task.description}
                                      </p>
                                    </div>

                                    {task.details && (
                                      <div>
                                        <span className="text-xs text-slate-500">
                                          Details
                                        </span>
                                        <p className="text-xs text-slate-600 mt-1">
                                          {task.details}
                                        </p>
                                      </div>
                                    )}

                                    {task.status === "running" && (
                                      <Progress
                                        value={task.progress}
                                        className="mt-2"
                                      />
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed Custom Task Creation Form at Bottom */}
            <div className="border-t bg-white p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Select value={newTaskType} onValueChange={setNewTaskType}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Task type" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskTypes.map((type) => (
                        <SelectItem
                          key={type.id}
                          value={type.id}
                          className="text-sm"
                        >
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={newTaskColumn}
                    onValueChange={setNewTaskColumn}
                  >
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Column" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColumns.map((column) => (
                        <SelectItem
                          key={column}
                          value={column}
                          className="text-sm"
                        >
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative">
                  <Textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Describe what this task should do..."
                    className="min-h-[80px] text-sm pr-12 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        addCustomTask();
                      }
                    }}
                  />
                  <Button
                    onClick={addCustomTask}
                    disabled={
                      !newTaskType ||
                      !newTaskColumn ||
                      !newTaskDescription.trim()
                    }
                    size="sm"
                    className="absolute bottom-2 right-2 h-8 w-8 p-0"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-500">
                  Press Cmd/Ctrl+Enter to add task
                </p>
              </div>
            </div>
          </div>

          {/* Resize Handle */}
          <div
            className="w-1 cursor-col-resize hover:bg-blue-500 hover:opacity-50 transition-colors"
            onMouseDown={handleMouseDown}
          >
            <div className="h-full flex items-center justify-center">
              <GripVertical className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Data Table */}
          <div
            className={`flex-1 overflow-auto ${
              isFullscreen ? "fixed inset-0 z-50 bg-white" : ""
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={downloadData}
                    className="h-8 w-8"
                    disabled={currentData.length === 0}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="h-8 w-8"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-3.5 h-3.5" />
                    ) : (
                      <Maximize className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => router.push("/choose-template")}
                  className="h-8"
                >
                  Next Step
                </Button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  {currentData.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          {Object.keys(currentData[0]).map((column) => (
                            <TableHead
                              key={column}
                              className="text-xs font-medium whitespace-nowrap"
                            >
                              {column}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentData.map((row: DataRow, rowIndex: number) => (
                          <TableRow key={rowIndex}>
                            {Object.entries(row).map(([column, value]) => (
                              <TableCell key={column} className="p-2">
                                {editingCell?.rowIndex === rowIndex &&
                                editingCell?.column === column ? (
                                  <div className="flex items-center space-x-2">
                                    <input
                                      value={editValue}
                                      onChange={(e) =>
                                        setEditValue(e.target.value)
                                      }
                                      className="h-7 text-sm border rounded px-2 flex-1"
                                      autoFocus
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handleCellEdit(
                                            rowIndex,
                                            column as keyof DataRow,
                                            editValue
                                          );
                                          setEditingCell(null);
                                          setEditValue("");
                                        }
                                        if (e.key === "Escape") {
                                          setEditingCell(null);
                                          setEditValue("");
                                        }
                                      }}
                                      onBlur={() => {
                                        handleCellEdit(
                                          rowIndex,
                                          column as keyof DataRow,
                                          editValue
                                        );
                                        setEditingCell(null);
                                        setEditValue("");
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="cursor-pointer hover:bg-slate-50 p-1 rounded group flex items-center justify-between"
                                    onClick={() => {
                                      setEditingCell({ rowIndex, column });
                                      setEditValue(String(value || ""));
                                    }}
                                  >
                                    <span className="text-sm whitespace-nowrap">
                                      {value === null ? (
                                        <span className="text-red-500">
                                          NULL
                                        </span>
                                      ) : value === "invalid" ? (
                                        <span className="text-red-500">
                                          Invalid
                                        </span>
                                      ) : (
                                        String(value)
                                      )}
                                    </span>
                                    <Edit3 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-slate-400" />
                                  </div>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-8 text-center text-slate-500">
                      No data available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
