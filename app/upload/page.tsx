"use client";

import fs from "fs";
import path from "path";
import { parseCSV } from "@/lib/csvParser";
import { GetServerSideProps } from "next";

import type React from "react";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  FileText,
  CheckCircle,
  Info,
  Database,
  Plus,
  Search,
  Calendar,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { realEcommerceDataset, DatasetTable } from "@/lib/dataParser";

interface RealDataset {
  id: string;
  name: string;
  description: string;
  rows: number;
  columns: number;
  tables: number;
  size: string;
  uploadDate: string;
  lastModified: string;
  type: string;
  tags: string[];
  tableBreakdown: {
    name: string;
    rows: number;
    columns: number;
  }[];
}

// Re-introduce the static dataset for now to fix build errors
const realDatasets: RealDataset[] = [
  {
    id: "ecommerce-dataset",
    name: realEcommerceDataset.name,
    description:
      "Real e-commerce analytics dataset with sales, inventory, and financial data",
    rows: realEcommerceDataset.tables.reduce(
      (total, table) => total + table.rows,
      0
    ),
    columns: realEcommerceDataset.tables.reduce(
      (total, table) => total + table.columns.length,
      0
    ),
    tables: realEcommerceDataset.tables.length,
    size: "72.1MB",
    uploadDate: "2024-01-22",
    lastModified: "2024-01-22",
    type: "CSV",
    tags: ["E-commerce", "Sales", "Analytics", "Real Data"],
    tableBreakdown: realEcommerceDataset.tables.map((table) => ({
      name: table.name,
      rows: table.rows,
      columns: table.columns.length,
    })),
  },
];

export default function UploadPage() {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [newDatasetName, setNewDatasetName] = useState("");
  const [newDatasetDescription, setNewDatasetDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filteredDatasets = realDatasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleDatasetSelect = (datasetId: string) => {
    setSelectedDataset(datasetId);
  };

  const handleConfirmSelection = () => {
    if (selectedDataset) {
      // 导航到工作流程界面，传递选中的dataset ID
      router.push(`/workflow?dataset=${selectedDataset}`);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setUploadedFile(e.target.files[0]);
      }
    },
    []
  );

  const simulateUpload = useCallback(() => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // 上传完成后，创建新的dataset并跳转到工作流程
          const newDatasetId = `dataset-${Date.now()}`;
          router.push(`/workflow?dataset=${newDatasetId}&new=true`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [uploadedFile, router]);

  const handleUploadSubmit = () => {
    if (uploadedFile && newDatasetName) {
      simulateUpload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            New Analysis
          </h1>
          <p className="text-xl text-slate-600">
            Choose an existing dataset or upload a new one to start your data
            analysis workflow.
          </p>
        </div>

        {/* Search and Upload Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload New Dataset
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload New Dataset</DialogTitle>
                  <DialogDescription>
                    Upload your data file to create a new dataset for analysis.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  {/* File Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-300 hover:border-slate-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {uploadedFile ? (
                      <div className="space-y-4">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                        <div>
                          <p className="font-medium text-slate-900">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        {isUploading && (
                          <div className="space-y-2">
                            <Progress
                              value={uploadProgress}
                              className="w-full"
                            />
                            <p className="text-sm text-slate-600">
                              Uploading... {uploadProgress}%
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-slate-900">
                            Drop your file here, or{" "}
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-500"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              browse
                            </button>
                          </p>
                          <p className="text-sm text-slate-500">
                            Supports CSV, Excel, JSON, TSV files up to 100MB
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".csv,.xlsx,.xls,.json,.tsv"
                      onChange={handleFileSelect}
                    />
                  </div>

                  {/* Dataset Details */}
                  {uploadedFile && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Dataset Name *
                        </label>
                        <Input
                          placeholder="Enter dataset name..."
                          value={newDatasetName}
                          onChange={(e) => setNewDatasetName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Description
                        </label>
                        <Textarea
                          placeholder="Describe your dataset..."
                          value={newDatasetDescription}
                          onChange={(e) =>
                            setNewDatasetDescription(e.target.value)
                          }
                          rows={3}
                        />
                      </div>
                      <Button
                        onClick={handleUploadSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={!newDatasetName || isUploading}
                      >
                        {isUploading
                          ? "Uploading..."
                          : "Create Dataset & Start Analysis"}
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Datasets Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredDatasets.map((dataset) => (
            <Card
              key={dataset.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedDataset === dataset.id
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => handleDatasetSelect(dataset.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{dataset.name}</CardTitle>
                  </div>
                  <Badge variant="outline">{dataset.type}</Badge>
                </div>
                <CardDescription className="text-sm">
                  {dataset.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>{dataset.rows.toLocaleString()} rows</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{dataset.columns} columns</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Database className="w-4 h-4" />
                        <span>{dataset.tables} tables</span>
                      </span>
                    </div>
                    <span className="text-slate-500">{dataset.size}</span>
                  </div>

                  {/* Table breakdown for e-commerce dataset */}
                  {dataset.id === "ecommerce-dataset" && (
                    <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">
                        Dataset Structure:
                      </h4>
                      <div className="space-y-1 text-xs">
                        {/* Sales Reports Group */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-slate-700 font-medium">
                            <Database className="w-3 h-3" />
                            <span>Sales Reports</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            <div className="flex justify-between text-slate-600">
                              <span className="flex items-center space-x-1">
                                <FileText className="w-3 h-3" />
                                <span>Amazon Sale Report.csv</span>
                              </span>
                              <span>128,000 rows</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span className="flex items-center space-x-1">
                                <FileText className="w-3 h-3" />
                                <span>Sale Report.csv</span>
                              </span>
                              <span>9,273 rows</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span className="flex items-center space-x-1">
                                <FileText className="w-3 h-3" />
                                <span>International Sale Report.csv</span>
                              </span>
                              <span>15,000 rows</span>
                            </div>
                          </div>
                        </div>

                        {/* Financial Data Group */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-slate-700 font-medium">
                            <Database className="w-3 h-3" />
                            <span>Financial Data</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            <div className="flex justify-between text-slate-600">
                              <span className="flex items-center space-x-1">
                                <FileText className="w-3 h-3" />
                                <span>P & L March 2021.csv</span>
                              </span>
                              <span>1,332 rows</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span className="flex items-center space-x-1">
                                <FileText className="w-3 h-3" />
                                <span>May-2022.csv</span>
                              </span>
                              <span>1,332 rows</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span className="flex items-center space-x-1">
                                <FileText className="w-3 h-3" />
                                <span>Expense IIGF.csv</span>
                              </span>
                              <span>19 rows</span>
                            </div>
                          </div>
                        </div>

                        {/* Operations Data */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-slate-600">
                            <span className="flex items-center space-x-1">
                              <FileText className="w-3 h-3" />
                              <span>Cloud Warehouse Compersion Chart.csv</span>
                            </span>
                            <span>52 rows</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {dataset.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(dataset.uploadDate).toLocaleDateString()}
                      </span>
                    </span>
                    <span>
                      Modified{" "}
                      {new Date(dataset.lastModified).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selection Actions */}
        {selectedDataset && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border p-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium">
                {realDatasets.find((d) => d.id === selectedDataset)?.name}{" "}
                selected
              </span>
            </div>
            <Button
              onClick={handleConfirmSelection}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Start Analysis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {filteredDatasets.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No datasets found
            </h3>
            <p className="text-slate-600 mb-4">
              No datasets match your search criteria. Try a different search
              term.
            </p>
            <Button onClick={() => setSearchQuery("")} variant="outline">
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
