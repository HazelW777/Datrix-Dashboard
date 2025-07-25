"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export interface AnalysisModel {
  id: string;
  name: string;
  description: string;
  goals: string[];
  customGoal: string;
  customTasks?: any[];
  processingSteps: string[];
  createdAt: string;
  dataTypes: string[];
  isTemplate: boolean;
}

export interface AnalysisHistory {
  id: string;
  name: string;
  fileName: string;
  status: "completed" | "processing" | "failed";
  createdAt: string;
  completedAt?: string;
  model?: AnalysisModel;
  insights: number;
  dataRows: number;
  dataColumns: number;
}

interface AnalysisContextType {
  history: AnalysisHistory[];
  models: AnalysisModel[];
  currentAnalysis: AnalysisHistory | null;
  currentGoal: string | null;
  addToHistory: (analysis: AnalysisHistory) => void;
  saveModel: (model: AnalysisModel) => void;
  deleteModel: (modelId: string) => void;
  deleteFromHistory: (analysisId: string) => void;
  setCurrentAnalysis: (analysis: AnalysisHistory | null) => void;
  setCurrentGoal: (goal: string | null) => void;
  getModelById: (modelId: string) => AnalysisModel | undefined;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined
);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [models, setModels] = useState<AnalysisModel[]>([]);
  const [currentAnalysis, setCurrentAnalysis] =
    useState<AnalysisHistory | null>(null);
  const [currentGoal, setCurrentGoal] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("datrix-history");
    const savedModels = localStorage.getItem("datrix-models");
    const savedCurrentGoal = localStorage.getItem("datrix-current-goal");

    // Demo history data for marketing analysis (always available)
    const demoHistory: AnalysisHistory[] = [
      {
        id: "demo-marketing-1",
        name: "Q4 2024 Digital Marketing Campaign Analysis",
        fileName: "q4_digital_marketing_campaigns.csv",
        status: "completed",
        createdAt: "2024-01-15T09:30:00.000Z",
        completedAt: "2024-01-15T11:45:00.000Z",
        insights: 18,
        dataRows: 12500,
        dataColumns: 9,
      },
      {
        id: "demo-marketing-2",
        name: "E-commerce Customer Acquisition Analysis",
        fileName: "ecommerce_customer_acquisition_2023.csv",
        status: "completed",
        createdAt: "2023-12-08T14:20:00.000Z",
        completedAt: "2023-12-08T16:15:00.000Z",
        insights: 24,
        dataRows: 8750,
        dataColumns: 12,
      },
      {
        id: "demo-marketing-3",
        name: "Social Media ROI Performance Study",
        fileName: "social_media_roi_analysis_2023.csv",
        status: "completed",
        createdAt: "2023-11-22T10:45:00.000Z",
        completedAt: "2023-11-22T13:30:00.000Z",
        insights: 15,
        dataRows: 15200,
        dataColumns: 8,
      },
    ];

    if (savedHistory) {
      const existingHistory = JSON.parse(savedHistory);
      // Merge demo data with existing history, avoiding duplicates
      const demoIds = demoHistory.map((d) => d.id);
      const filteredExisting = existingHistory.filter(
        (h: AnalysisHistory) => !demoIds.includes(h.id)
      );
      setHistory([...demoHistory, ...filteredExisting]);
    } else {
      setHistory(demoHistory);
    }

    if (savedModels) {
      setModels(JSON.parse(savedModels));
    } else {
      // Add default templates
      const defaultModels: AnalysisModel[] = [
        {
          id: "marketing-template",
          name: "Marketing Campaign Analysis",
          description:
            "Comprehensive analysis for marketing campaign performance",
          goals: [
            "roi-analysis",
            "performance-comparison",
            "audience-segmentation",
          ],
          customGoal: "",
          processingSteps: [
            "data-validation",
            "data-cleaning",
            "statistical-analysis",
            "goal-analysis",
          ],
          createdAt: new Date().toISOString(),
          dataTypes: ["campaign_data", "marketing_metrics"],
          isTemplate: true,
        },
        {
          id: "sales-template",
          name: "Sales Performance Analysis",
          description: "Track sales metrics and identify growth opportunities",
          goals: [
            "trend-analysis",
            "performance-comparison",
            "cost-efficiency",
          ],
          customGoal: "",
          processingSteps: [
            "data-validation",
            "data-cleaning",
            "trend-analysis",
            "forecasting",
          ],
          createdAt: new Date().toISOString(),
          dataTypes: ["sales_data", "revenue_metrics"],
          isTemplate: true,
        },
      ];
      setModels(defaultModels);
      localStorage.setItem("datrix-models", JSON.stringify(defaultModels));
    }

    if (savedCurrentGoal) {
      setCurrentGoal(savedCurrentGoal);
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    // Only save non-demo data to localStorage
    const nonDemoHistory = history.filter((h) => !h.id.startsWith("demo-"));
    localStorage.setItem("datrix-history", JSON.stringify(nonDemoHistory));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("datrix-models", JSON.stringify(models));
  }, [models]);

  useEffect(() => {
    if (currentGoal) {
      localStorage.setItem("datrix-current-goal", currentGoal);
    } else {
      localStorage.removeItem("datrix-current-goal");
    }
  }, [currentGoal]);

  const addToHistory = (analysis: AnalysisHistory) => {
    setHistory((prev) => [analysis, ...prev]);
  };

  const saveModel = (model: AnalysisModel) => {
    setModels((prev) => {
      const existing = prev.find((m) => m.id === model.id);
      if (existing) {
        return prev.map((m) => (m.id === model.id ? model : m));
      }
      return [model, ...prev];
    });
  };

  const deleteModel = (modelId: string) => {
    setModels((prev) => prev.filter((m) => m.id !== modelId));
  };

  const deleteFromHistory = (analysisId: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== analysisId));
  };

  const getModelById = (modelId: string) => {
    return models.find((m) => m.id === modelId);
  };

  return (
    <AnalysisContext.Provider
      value={{
        history,
        models,
        currentAnalysis,
        currentGoal,
        addToHistory,
        saveModel,
        deleteModel,
        deleteFromHistory,
        setCurrentAnalysis,
        setCurrentGoal,
        getModelById,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}
