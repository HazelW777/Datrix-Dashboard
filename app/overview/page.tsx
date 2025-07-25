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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ColumnData {
  name: string;
  type: "string" | "date" | "numeric" | "categorical";
  count: number;
  unique: number;
  missing: number;
  missingPercentage: number;
  min?: number;
  max?: number;
  mean?: number;
  median?: number;
  q1?: number;
  q3?: number;
  outliers?: number[];
  distribution?: Array<{ range: string; count: number }>;
  categories?: Array<{ name: string; count: number; percentage: number }>;
  startDate?: string;
  endDate?: string;
  timeSpan?: string;
  monthlyCounts?: Array<{ month: string; count: number }>;
}

interface DataDescription {
  column: string;
  type: string;
  count: number;
  unique: number;
  missing: number;
  description: string;
}

export default function OverviewPage() {
  const router = useRouter();
  const [selectedColumn, setSelectedColumn] = useState("campaign_id");

  // Digital Marketing Campaign Performance Dataset
  const columnAnalysis = [
    {
      name: "campaign_id",
      type: "string",
      count: 12500,
      unique: 12500,
      missing: 0,
      missingPercentage: 0,
    },
    {
      name: "campaign_start_date",
      type: "date",
      count: 12500,
      unique: 90,
      missing: 0,
      missingPercentage: 0,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      timeSpan: "12 months",
      monthlyCounts: [
        { month: "Jan", count: 980 },
        { month: "Feb", count: 1050 },
        { month: "Mar", count: 1200 },
        { month: "Apr", count: 1150 },
        { month: "May", count: 1300 },
        { month: "Jun", count: 1250 },
        { month: "Jul", count: 1100 },
        { month: "Aug", count: 950 },
        { month: "Sep", count: 1180 },
        { month: "Oct", count: 1320 },
        { month: "Nov", count: 1400 },
        { month: "Dec", count: 1120 },
      ],
    },
    {
      name: "budget_allocated",
      type: "numeric",
      count: 12500,
      unique: 8200,
      missing: 25,
      missingPercentage: 0.2,
      min: 500,
      max: 50000,
      mean: 8750,
      median: 7500,
      q1: 3000,
      q3: 12000,
      outliers: [45000, 48000, 50000],
      distribution: [
        { range: "500-5000", count: 3200 },
        { range: "5001-10000", count: 4100 },
        { range: "10001-15000", count: 2800 },
        { range: "15001-25000", count: 1900 },
        { range: "25001-50000", count: 475 },
      ],
    },
    {
      name: "channel_type",
      type: "categorical",
      count: 12500,
      unique: 6,
      missing: 0,
      missingPercentage: 0,
      categories: [
        { name: "Google Ads", count: 3500, percentage: 28 },
        { name: "Facebook Ads", count: 2800, percentage: 22.4 },
        { name: "Instagram Ads", count: 2200, percentage: 17.6 },
        { name: "LinkedIn Ads", count: 1500, percentage: 12 },
        { name: "Email Marketing", count: 1750, percentage: 14 },
        { name: "Display Ads", count: 750, percentage: 6 },
      ],
    },
    {
      name: "click_through_rate",
      type: "numeric",
      count: 12500,
      unique: 980,
      missing: 180,
      missingPercentage: 1.44,
      min: 0.5,
      max: 8.2,
      mean: 3.2,
      median: 2.8,
      q1: 1.9,
      q3: 4.1,
      outliers: [7.8, 8.0, 8.2],
      distribution: [
        { range: "0.5-1.5", count: 1800 },
        { range: "1.6-2.5", count: 3200 },
        { range: "2.6-3.5", count: 3800 },
        { range: "3.6-4.5", count: 2400 },
        { range: "4.6-8.2", count: 1120 },
      ],
    },
    {
      name: "conversion_rate",
      type: "numeric",
      count: 12500,
      unique: 750,
      missing: 200,
      missingPercentage: 1.6,
      min: 0.8,
      max: 12.5,
      mean: 4.8,
      median: 4.2,
      q1: 2.5,
      q3: 6.8,
      outliers: [11.2, 12.0, 12.5],
      distribution: [
        { range: "0.8-2.0", count: 2100 },
        { range: "2.1-4.0", count: 3600 },
        { range: "4.1-6.0", count: 3200 },
        { range: "6.1-8.0", count: 2000 },
        { range: "8.1-12.5", count: 1400 },
      ],
    },
    {
      name: "cost_per_acquisition",
      type: "numeric",
      count: 12500,
      unique: 4200,
      missing: 150,
      missingPercentage: 1.2,
      min: 12,
      max: 450,
      mean: 85,
      median: 72,
      q1: 45,
      q3: 110,
      outliers: [380, 420, 450],
      distribution: [
        { range: "12-50", count: 3100 },
        { range: "51-75", count: 3400 },
        { range: "76-100", count: 2800 },
        { range: "101-150", count: 2200 },
        { range: "151-450", count: 850 },
      ],
    },
    {
      name: "target_audience",
      type: "categorical",
      count: 12500,
      unique: 5,
      missing: 15,
      missingPercentage: 0.12,
      categories: [
        { name: "Young Adults (18-25)", count: 3200, percentage: 25.6 },
        { name: "Millennials (26-35)", count: 3800, percentage: 30.4 },
        { name: "Gen X (36-50)", count: 2800, percentage: 22.4 },
        { name: "Baby Boomers (51-65)", count: 1900, percentage: 15.2 },
        { name: "Seniors (65+)", count: 785, percentage: 6.28 },
      ],
    },
    {
      name: "campaign_objective",
      type: "categorical",
      count: 12500,
      unique: 4,
      missing: 8,
      missingPercentage: 0.064,
      categories: [
        { name: "Brand Awareness", count: 4200, percentage: 33.6 },
        { name: "Lead Generation", count: 3800, percentage: 30.4 },
        { name: "Sales Conversion", count: 2900, percentage: 23.2 },
        { name: "Customer Retention", count: 1592, percentage: 12.74 },
      ],
    },
  ];

  const dataDescription: DataDescription[] = [
    {
      column: "campaign_id",
      type: "string",
      count: 12500,
      unique: 12500,
      missing: 0,
      description: "Unique identifier for each marketing campaign",
    },
    {
      column: "campaign_start_date",
      type: "date",
      count: 12500,
      unique: 90,
      missing: 0,
      description: "Date when the marketing campaign was launched",
    },
    {
      column: "budget_allocated",
      type: "numeric",
      count: 12500,
      unique: 8200,
      missing: 25,
      description: "Total budget allocated for the campaign in USD",
    },
    {
      column: "channel_type",
      type: "categorical",
      count: 12500,
      unique: 6,
      missing: 0,
      description: "Marketing channel used for campaign distribution",
    },
    {
      column: "click_through_rate",
      type: "numeric",
      count: 12500,
      unique: 980,
      missing: 180,
      description: "Percentage of users who clicked on the campaign ads",
    },
    {
      column: "conversion_rate",
      type: "numeric",
      count: 12500,
      unique: 750,
      missing: 200,
      description: "Percentage of clicks that resulted in desired actions",
    },
    {
      column: "cost_per_acquisition",
      type: "numeric",
      count: 12500,
      unique: 4200,
      missing: 150,
      description: "Average cost to acquire one customer through the campaign",
    },
    {
      column: "target_audience",
      type: "categorical",
      count: 12500,
      unique: 5,
      missing: 15,
      description: "Primary demographic target for the campaign",
    },
    {
      column: "campaign_objective",
      type: "categorical",
      count: 12500,
      unique: 4,
      missing: 8,
      description: "Primary goal or objective of the marketing campaign",
    },
  ];

  const handleContinue = () => {
    router.push("/goals");
  };

  const getColumnTypeColor = (type: string) => {
    switch (type) {
      case "string":
        return "bg-purple-100 text-purple-800";
      case "date":
        return "bg-orange-100 text-orange-800";
      case "numeric":
        return "bg-green-100 text-green-800";
      case "categorical":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const renderValueRangeChart = () => {
    const selectedColumnData = columnAnalysis.find(
      (col) => col.name === selectedColumn
    ) as ColumnData | undefined;

    if (!selectedColumnData) return null;

    switch (selectedColumnData.type) {
      case "numeric":
        return (
          <div className="space-y-6">
            {/* Statistics Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.min}
                  </div>
                  <div className="text-xs text-slate-600">Minimum</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.max}
                  </div>
                  <div className="text-xs text-slate-600">Maximum</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.mean}
                  </div>
                  <div className="text-xs text-slate-600">Mean</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.median}
                  </div>
                  <div className="text-xs text-slate-600">Median</div>
                </CardContent>
              </Card>
            </div>

            {/* Distribution Chart and Box Plot */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">
                    Distribution Histogram
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedColumnData.distribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="range" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">
                    Quartile Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Q1 (25%)</span>
                      <span className="text-sm font-medium">
                        {selectedColumnData.q1}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">
                        Q2 (Median)
                      </span>
                      <span className="text-sm font-medium">
                        {selectedColumnData.median}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">Q3 (75%)</span>
                      <span className="text-sm font-medium">
                        {selectedColumnData.q3}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-600">IQR</span>
                      <span className="text-sm font-medium">
                        {(
                          selectedColumnData.q3! - selectedColumnData.q1!
                        ).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Visual Box Plot Representation */}
                  <div className="mt-4">
                    <div className="text-xs text-slate-500 mb-2">
                      Box Plot Visualization
                    </div>
                    <div className="relative h-6 bg-slate-100 rounded">
                      <div
                        className="absolute h-full bg-blue-200 rounded"
                        style={{
                          left: `${
                            ((selectedColumnData.q1! -
                              selectedColumnData.min!) /
                              (selectedColumnData.max! -
                                selectedColumnData.min!)) *
                            100
                          }%`,
                          width: `${
                            ((selectedColumnData.q3! - selectedColumnData.q1!) /
                              (selectedColumnData.max! -
                                selectedColumnData.min!)) *
                            100
                          }%`,
                        }}
                      />
                      <div
                        className="absolute w-0.5 h-full bg-blue-600"
                        style={{
                          left: `${
                            ((selectedColumnData.median! -
                              selectedColumnData.min!) /
                              (selectedColumnData.max! -
                                selectedColumnData.min!)) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>{selectedColumnData.min}</span>
                      <span>{selectedColumnData.max}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Outliers */}
            {selectedColumnData.outliers &&
              selectedColumnData.outliers.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-medium">
                      Outlier Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive" className="text-xs">
                        {selectedColumnData.outliers.length} outliers
                      </Badge>
                      <span className="text-xs text-slate-600">
                        Values: {selectedColumnData.outliers.join(", ")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>
        );

      case "categorical":
        if (!selectedColumnData.categories) return null;
        return (
          <div className="space-y-6">
            {/* Category Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.unique}
                  </div>
                  <div className="text-xs text-slate-600">Categories</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.categories[0]?.name || "N/A"}
                  </div>
                  <div className="text-xs text-slate-600">Most Frequent</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.categories[0]?.percentage || 0}%
                  </div>
                  <div className="text-xs text-slate-600">Frequency</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.categories.length > 1
                      ? (100 / selectedColumnData.categories.length).toFixed(1)
                      : 100}
                    %
                  </div>
                  <div className="text-xs text-slate-600">Balance</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Pie Chart */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">
                    Category Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={selectedColumnData.categories}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percentage }) =>
                            `${name}: ${percentage}%`
                          }
                        >
                          {selectedColumnData.categories.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Category Table */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">
                    Category Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">Category</TableHead>
                        <TableHead className="text-xs">Count</TableHead>
                        <TableHead className="text-xs">Percentage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedColumnData.categories.map((category, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-sm">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              />
                              <span>{category.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {category.count}
                          </TableCell>
                          <TableCell className="text-sm">
                            {category.percentage}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "date":
        if (!selectedColumnData.monthlyCounts) return null;
        return (
          <div className="space-y-6">
            {/* Date Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-base font-bold text-blue-900">
                    {selectedColumnData.startDate}
                  </div>
                  <div className="text-xs text-slate-600">Start Date</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-base font-bold text-blue-900">
                    {selectedColumnData.endDate}
                  </div>
                  <div className="text-xs text-slate-600">End Date</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.timeSpan}
                  </div>
                  <div className="text-xs text-slate-600">Time Span</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {Math.round(
                      selectedColumnData.monthlyCounts.reduce(
                        (a, b) => a + b.count,
                        0
                      ) / selectedColumnData.monthlyCounts.length
                    )}
                  </div>
                  <div className="text-xs text-slate-600">Avg/Month</div>
                </CardContent>
              </Card>
            </div>

            {/* Time Series Chart */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">
                  Temporal Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedColumnData.monthlyCounts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "string":
        return (
          <div className="space-y-6">
            {/* String Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.unique}
                  </div>
                  <div className="text-xs text-slate-600">Unique Values</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {(
                      (selectedColumnData.unique / selectedColumnData.count) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-xs text-slate-600">Uniqueness</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.count - selectedColumnData.missing}
                  </div>
                  <div className="text-xs text-slate-600">Valid Values</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-xl font-bold text-blue-900">
                    {selectedColumnData.missing}
                  </div>
                  <div className="text-xs text-slate-600">Missing Values</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">
                  Data Quality Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-slate-600">
                        Completeness
                      </span>
                      <span className="text-sm font-medium">
                        {(
                          ((selectedColumnData.count -
                            selectedColumnData.missing) /
                            selectedColumnData.count) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        ((selectedColumnData.count -
                          selectedColumnData.missing) /
                          selectedColumnData.count) *
                        100
                      }
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-slate-600">Uniqueness</span>
                      <span className="text-sm font-medium">
                        {(
                          (selectedColumnData.unique /
                            selectedColumnData.count) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (selectedColumnData.unique / selectedColumnData.count) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/upload")}
            className="w-10 h-10 p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Data Overview
          </h1>
          <p className="text-lg text-slate-600">
            Here's what we found in your dataset from business and statistical
            perspectives
          </p>
        </div>

        {/* Data Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Description</CardTitle>
            <CardDescription>
              Statistical summary and description for each column in your
              dataset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Column</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Unique</TableHead>
                  <TableHead>Missing</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataDescription.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.column}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.unique}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.missing === 0
                            ? "bg-green-100 text-green-800"
                            : row.missing < 10
                            ? "bg-yellow-100 text-yellow-800"
                            : row.missing < 20
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.missing}
                        {row.missing > 0 && (
                          <span className="ml-1">
                            ({((row.missing / row.count) * 100).toFixed(1)}%)
                          </span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {row.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Value Range and Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Value Range</CardTitle>
            <CardDescription>
              Comprehensive analysis with different metrics based on data type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-3 mb-6 overflow-x-auto scrollbar-hide pb-2">
              {columnAnalysis.map((column) => (
                <button
                  key={column.name}
                  onClick={() => setSelectedColumn(column.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                    selectedColumn === column.name
                      ? "bg-blue-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {column.name}
                </button>
              ))}
            </div>
            {renderValueRangeChart()}
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-blue-900 hover:bg-blue-800 text-white px-8"
            onClick={handleContinue}
          >
            Continue to Set Goals
          </Button>
        </div>
      </div>
    </div>
  );
}
