"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Target,
  Brain,
  Layers,
  BarChart3,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Loader2,
  Play,
  Settings,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

interface ModelingInterfaceProps {
  selectedTask: string | null;
  onTaskComplete: (taskId: string, result: any) => void;
}

type ModelingStep =
  | "targetDefinition"
  | "modelPreference"
  | "modelRecommendation"
  | "featureSelection"
  | "processingDetail"
  | "modelEvaluation";

interface ColumnInfo {
  name: string;
  description: string;
}

interface ModelPreferences {
  accuracyVsRobustness: string;
  complexityVsSimplicity: string;
  techniqueVsExplanation: string;
}

interface ModelRecommendation {
  name: string;
  description: string;
  parameters: { name: string; defaultValue: string; description: string }[];
}

const ModelingInterface = ({
  selectedTask,
  onTaskComplete,
}: ModelingInterfaceProps) => {
  const [currentStep, setCurrentStep] =
    useState<ModelingStep>("targetDefinition");
  const [targetColumn, setTargetColumn] = useState<string>("");
  const [preferences, setPreferences] = useState<ModelPreferences>({
    accuracyVsRobustness: "",
    complexityVsSimplicity: "",
    techniqueVsExplanation: "",
  });
  const [recommendedModel, setRecommendedModel] =
    useState<ModelRecommendation | null>(null);
  const [modelParameters, setModelParameters] = useState<
    Record<string, string>
  >({});
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [evaluationResults, setEvaluationResults] = useState<any>(null);

  // Available columns for target selection
  const availableColumns: ColumnInfo[] = [
    {
      name: "budget_allocated",
      description: "Total budget allocated for the campaign in USD",
    },
    {
      name: "click_through_rate",
      description: "Percentage of users who clicked on the campaign ads",
    },
    {
      name: "conversion_rate",
      description: "Percentage of clicks that resulted in desired actions",
    },
    {
      name: "cost_per_acquisition",
      description: "Average cost to acquire one customer through the campaign",
    },
    {
      name: "channel_type",
      description: "Marketing channel used for campaign distribution",
    },
    {
      name: "target_audience",
      description: "Primary demographic target for the campaign",
    },
    {
      name: "campaign_objective",
      description: "Primary goal or objective of the marketing campaign",
    },
    {
      name: "campaign_start_date",
      description: "Date when the marketing campaign was launched",
    },
  ];

  // Available features for selection
  const availableFeatures: ColumnInfo[] = availableColumns.filter(
    (col) => col.name !== targetColumn
  );

  // Generate model recommendation based on preferences
  const generateModelRecommendation = (
    prefs: ModelPreferences
  ): ModelRecommendation => {
    if (
      prefs.accuracyVsRobustness === "accuracy" &&
      prefs.complexityVsSimplicity === "complexity"
    ) {
      return {
        name: "Random Forest",
        description:
          "Ensemble method that combines multiple decision trees for high accuracy",
        parameters: [
          {
            name: "n_estimators",
            defaultValue: "100",
            description: "Number of trees in the forest",
          },
          {
            name: "max_depth",
            defaultValue: "10",
            description: "Maximum depth of each tree",
          },
          {
            name: "min_samples_split",
            defaultValue: "2",
            description: "Minimum samples required to split a node",
          },
        ],
      };
    } else if (
      prefs.accuracyVsRobustness === "robustness" &&
      prefs.complexityVsSimplicity === "simplicity"
    ) {
      return {
        name: "Linear Regression",
        description: "Simple linear model that's interpretable and robust",
        parameters: [
          {
            name: "fit_intercept",
            defaultValue: "true",
            description: "Whether to calculate the intercept",
          },
          {
            name: "normalize",
            defaultValue: "false",
            description: "Whether to normalize the features",
          },
        ],
      };
    } else if (prefs.techniqueVsExplanation === "technique") {
      return {
        name: "XGBoost",
        description:
          "Advanced gradient boosting framework for high performance",
        parameters: [
          {
            name: "learning_rate",
            defaultValue: "0.1",
            description: "Step size shrinkage used in update",
          },
          {
            name: "max_depth",
            defaultValue: "6",
            description: "Maximum depth of a tree",
          },
          {
            name: "n_estimators",
            defaultValue: "100",
            description: "Number of boosting rounds",
          },
        ],
      };
    } else {
      return {
        name: "Decision Tree",
        description: "Tree-based model that's easy to interpret and explain",
        parameters: [
          {
            name: "max_depth",
            defaultValue: "5",
            description: "Maximum depth of the tree",
          },
          {
            name: "min_samples_leaf",
            defaultValue: "1",
            description: "Minimum samples required at a leaf node",
          },
        ],
      };
    }
  };

  // Handle step navigation
  const handleStepComplete = (step: ModelingStep) => {
    switch (step) {
      case "targetDefinition":
        setCurrentStep("modelPreference");
        break;
      case "modelPreference":
        const recommendation = generateModelRecommendation(preferences);
        setRecommendedModel(recommendation);
        // Initialize default parameters
        const defaultParams: Record<string, string> = {};
        recommendation.parameters.forEach((param) => {
          defaultParams[param.name] = param.defaultValue;
        });
        setModelParameters(defaultParams);
        setCurrentStep("modelRecommendation");
        break;
      case "modelRecommendation":
        setCurrentStep("featureSelection");
        break;
      case "featureSelection":
        setCurrentStep("processingDetail");
        startProcessing();
        break;
      case "processingDetail":
        setCurrentStep("modelEvaluation");
        break;
      default:
        break;
    }
  };

  // Handle going back to previous step
  const handleStepBack = (step: ModelingStep) => {
    switch (step) {
      case "modelPreference":
        setCurrentStep("targetDefinition");
        break;
      case "modelRecommendation":
        setCurrentStep("modelPreference");
        setRecommendedModel(null);
        setModelParameters({});
        break;
      case "featureSelection":
        setCurrentStep("modelRecommendation");
        break;
      case "processingDetail":
        setCurrentStep("featureSelection");
        setIsProcessing(false);
        setProcessingProgress(0);
        break;
      case "modelEvaluation":
        setCurrentStep("processingDetail");
        setEvaluationResults(null);
        break;
      default:
        break;
    }
  };

  // Start processing simulation
  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          // Generate evaluation results
          setEvaluationResults({
            trainingError: 0.2,
            testError: 0.22,
            confusionMatrix: [
              [85, 15],
              [12, 88],
            ],
            stressTestResults: [
              { name: "Data Quality Test", passed: true },
              { name: "Performance Test", passed: true },
              { name: "Stability Test", passed: false },
              { name: "Edge Case Test", passed: true },
            ],
          });
          setTimeout(() => handleStepComplete("processingDetail"), 1000);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {[
          "Target",
          "Preference",
          "Model",
          "Features",
          "Processing",
          "Evaluation",
        ].map((label, index) => {
          const stepNames: ModelingStep[] = [
            "targetDefinition",
            "modelPreference",
            "modelRecommendation",
            "featureSelection",
            "processingDetail",
            "modelEvaluation",
          ];
          const isActive = stepNames[index] === currentStep;
          const isCompleted = stepNames.indexOf(currentStep) > index;

          return (
            <div key={label} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
              </div>
              <span className="ml-2 text-sm font-medium">{label}</span>
              {index < 5 && (
                <ChevronRight className="w-4 h-4 mx-4 text-gray-400" />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Target Definition */}
        {currentStep === "targetDefinition" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Step 1: What do you want to predict or estimate?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  {availableColumns.map((column) => (
                    <div
                      key={column.name}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        targetColumn === column.name
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setTargetColumn(column.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{column.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {column.description}
                          </p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            targetColumn === column.name
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          {targetColumn === column.name && (
                            <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleStepComplete("targetDefinition")}
                  disabled={!targetColumn}
                  className="w-full"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Model Preference */}
        {currentStep === "modelPreference" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Step 2: Model Preference</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Accuracy vs Robustness */}
                <div>
                  <h4 className="font-medium mb-3">Accuracy vs Robustness</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={
                        preferences.accuracyVsRobustness === "accuracy"
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          accuracyVsRobustness: "accuracy",
                        }))
                      }
                      className="h-auto p-4 text-left"
                    >
                      <div>
                        <div className="font-medium">Accuracy</div>
                        <div className="text-sm text-gray-600 mt-1">
                          High performance on test data
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant={
                        preferences.accuracyVsRobustness === "robustness"
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          accuracyVsRobustness: "robustness",
                        }))
                      }
                      className="h-auto p-4 text-left"
                    >
                      <div>
                        <div className="font-medium">Robustness</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Stable across conditions
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Complexity vs Simplicity */}
                <div>
                  <h4 className="font-medium mb-3">Complexity vs Simplicity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={
                        preferences.complexityVsSimplicity === "complexity"
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          complexityVsSimplicity: "complexity",
                        }))
                      }
                      className="h-auto p-4 text-left"
                    >
                      <div>
                        <div className="font-medium">Complexity</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Advanced algorithms
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant={
                        preferences.complexityVsSimplicity === "simplicity"
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          complexityVsSimplicity: "simplicity",
                        }))
                      }
                      className="h-auto p-4 text-left"
                    >
                      <div>
                        <div className="font-medium">Simplicity</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Interpretable models
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Technique vs Explanation */}
                <div>
                  <h4 className="font-medium mb-3">Technique vs Explanation</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={
                        preferences.techniqueVsExplanation === "technique"
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          techniqueVsExplanation: "technique",
                        }))
                      }
                      className="h-auto p-4 text-left"
                    >
                      <div>
                        <div className="font-medium">Technique</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Cutting-edge methods
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant={
                        preferences.techniqueVsExplanation === "explanation"
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        setPreferences((prev) => ({
                          ...prev,
                          techniqueVsExplanation: "explanation",
                        }))
                      }
                      className="h-auto p-4 text-left"
                    >
                      <div>
                        <div className="font-medium">Explanation</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Interpretable results
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStepBack("modelPreference")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={() => handleStepComplete("modelPreference")}
                    disabled={
                      !preferences.accuracyVsRobustness ||
                      !preferences.complexityVsSimplicity ||
                      !preferences.techniqueVsExplanation
                    }
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Recommend Model
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Model Recommendation */}
        {currentStep === "modelRecommendation" && recommendedModel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Step 3: Recommended Model</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900">
                    {recommendedModel.name}
                  </h3>
                  <p className="text-blue-700 mt-1">
                    {recommendedModel.description}
                  </p>
                </div>

                {recommendedModel.parameters.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-4">Model Parameters</h4>
                    <div className="grid gap-4">
                      {recommendedModel.parameters.map((param) => (
                        <div key={param.name} className="space-y-2">
                          <Label htmlFor={param.name}>{param.name}</Label>
                          <Input
                            id={param.name}
                            value={
                              modelParameters[param.name] || param.defaultValue
                            }
                            onChange={(e) =>
                              setModelParameters((prev) => ({
                                ...prev,
                                [param.name]: e.target.value,
                              }))
                            }
                            placeholder={param.defaultValue}
                          />
                          <p className="text-sm text-gray-600">
                            {param.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStepBack("modelRecommendation")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={() => handleStepComplete("modelRecommendation")}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Select Features
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Feature Selection */}
        {currentStep === "featureSelection" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>Step 4: Relevant Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Select the features you want to use for prediction:
                </p>
                <div className="grid gap-3">
                  {availableFeatures.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-start space-x-3 p-3 border rounded-lg"
                    >
                      <Checkbox
                        id={feature.name}
                        checked={selectedFeatures.includes(feature.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFeatures((prev) => [
                              ...prev,
                              feature.name,
                            ]);
                          } else {
                            setSelectedFeatures((prev) =>
                              prev.filter((f) => f !== feature.name)
                            );
                          }
                        }}
                      />
                      <div className="flex-1">
                        <Label htmlFor={feature.name} className="font-medium">
                          {feature.name}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStepBack("featureSelection")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={() => handleStepComplete("featureSelection")}
                    disabled={selectedFeatures.length === 0}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Start Processing
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 5: Processing Detail */}
        {currentStep === "processingDetail" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Step 5: Processing Detail</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Model Training Progress</span>
                      <span>{Math.round(processingProgress)}%</span>
                    </div>
                    <Progress value={processingProgress} className="w-full" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Data preprocessing completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Feature engineering completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {processingProgress > 50 ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      )}
                      <span>Model training in progress...</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {processingProgress > 80 ? (
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span>Model validation pending...</span>
                    </div>
                  </div>

                  {processingProgress >= 100 && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">
                          Processing completed successfully!
                        </span>
                      </div>
                    </div>
                  )}

                  {processingProgress >= 100 && (
                    <div className="flex justify-between gap-4 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStepBack("processingDetail")}
                        className="flex items-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        onClick={() => handleStepComplete("processingDetail")}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        View Results
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 6: Model Evaluation */}
        {currentStep === "modelEvaluation" && evaluationResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Step 6: Model Evaluation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Error Rates */}
                <div>
                  <h4 className="font-medium mb-3">Error Rates</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-800">
                        {(evaluationResults.trainingError * 100).toFixed(0)}%
                      </div>
                      <div className="text-blue-600 font-medium">
                        Training Error
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-800">
                        {(evaluationResults.testError * 100).toFixed(0)}%
                      </div>
                      <div className="text-green-600 font-medium">
                        Test Error
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Plots */}
                <div>
                  <h4 className="font-medium mb-3">Error Plots</h4>
                  <div className="h-64 bg-white border border-gray-200 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { epoch: 1, training: 0.45, validation: 0.48 },
                          { epoch: 5, training: 0.35, validation: 0.38 },
                          { epoch: 10, training: 0.28, validation: 0.32 },
                          { epoch: 15, training: 0.22, validation: 0.28 },
                          { epoch: 20, training: 0.18, validation: 0.25 },
                          { epoch: 25, training: 0.15, validation: 0.22 },
                          { epoch: 30, training: 0.12, validation: 0.2 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="epoch" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="training"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          name="Training Loss"
                        />
                        <Line
                          type="monotone"
                          dataKey="validation"
                          stroke="#ef4444"
                          strokeWidth={2}
                          name="Validation Loss"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Confusion Matrix */}
                <div>
                  <h4 className="font-medium mb-3">Confusion Matrix</h4>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-80 mx-auto">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div></div>
                        <div className="text-center text-sm font-medium text-gray-600 p-2">
                          Predicted
                        </div>
                        <div></div>
                        <div className="text-center text-sm font-medium text-gray-600 p-2 rotate-90">
                          Actual
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-xs text-center p-1 bg-gray-50 rounded">
                            High
                          </div>
                          <div className="text-xs text-center p-1 bg-gray-50 rounded">
                            Low
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="grid grid-rows-2 gap-1">
                          <div className="text-xs text-center p-1 bg-gray-50 rounded rotate-90">
                            High
                          </div>
                          <div className="text-xs text-center p-1 bg-gray-50 rounded rotate-90">
                            Low
                          </div>
                        </div>
                        <div className="grid grid-cols-2 grid-rows-2 gap-1">
                          <div className="p-4 bg-green-100 border border-green-300 rounded text-center font-bold text-green-800">
                            {evaluationResults.confusionMatrix[0][0]}
                          </div>
                          <div className="p-4 bg-red-100 border border-red-300 rounded text-center font-bold text-red-800">
                            {evaluationResults.confusionMatrix[0][1]}
                          </div>
                          <div className="p-4 bg-red-100 border border-red-300 rounded text-center font-bold text-red-800">
                            {evaluationResults.confusionMatrix[1][0]}
                          </div>
                          <div className="p-4 bg-green-100 border border-green-300 rounded text-center font-bold text-green-800">
                            {evaluationResults.confusionMatrix[1][1]}
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-600">
                        <div className="text-center">
                          <div className="font-medium">Precision: 85%</div>
                          <div>Recall: 78%</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">F1-Score: 81%</div>
                          <div>Accuracy: 82%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stress Test */}
                <div>
                  <h4 className="font-medium mb-3">Stress Test</h4>
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-sm mb-3">
                        Robustness Analysis
                      </h5>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart
                          data={[
                            { test: "Noise", score: 85, threshold: 80 },
                            { test: "Outliers", score: 78, threshold: 75 },
                            { test: "Missing Data", score: 92, threshold: 85 },
                            { test: "Data Drift", score: 73, threshold: 70 },
                            { test: "Edge Cases", score: 68, threshold: 65 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="test" fontSize={12} />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="score" name="Model Score">
                            {[
                              { test: "Noise", score: 85, threshold: 80 },
                              { test: "Outliers", score: 78, threshold: 75 },
                              {
                                test: "Missing Data",
                                score: 92,
                                threshold: 85,
                              },
                              { test: "Data Drift", score: 73, threshold: 70 },
                              { test: "Edge Cases", score: 68, threshold: 65 },
                            ].map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry.score >= entry.threshold
                                    ? "#10b981"
                                    : "#ef4444"
                                }
                              />
                            ))}
                          </Bar>
                          <Bar
                            dataKey="threshold"
                            fill="#94a3b8"
                            name="Threshold"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2">
                      {evaluationResults.stressTestResults.map(
                        (test: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <span>{test.name}</span>
                            <Badge
                              variant={test.passed ? "default" : "destructive"}
                            >
                              {test.passed ? "Passed" : "Failed"}
                            </Badge>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStepBack("modelEvaluation")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                  <Button
                    onClick={() =>
                      onTaskComplete("modeling_complete", {
                        targetColumn,
                        preferences,
                        model: recommendedModel,
                        features: selectedFeatures,
                        results: evaluationResults,
                      })
                    }
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    Complete
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModelingInterface;
