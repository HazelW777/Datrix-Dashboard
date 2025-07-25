"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Upload,
  History,
  Plus,
  CheckCircle,
  Zap,
  Target,
} from "lucide-react";
import Link from "next/link";
import { ChatBot } from "@/components/chat-bot";

export default function HomePage() {
  const recentAnalyses = [
    {
      id: "1",
      title: "Q4 2024 Digital Marketing Campaign Analysis",
      status: "completed",
      date: "2024-01-15",
      insights: 18,
    },
    {
      id: "2",
      title: "Customer Acquisition Analysis",
      status: "completed",
      date: "2023-12-08",
      insights: 24,
    },
    {
      id: "3",
      title: "Social Media ROI Performance Study",
      status: "completed",
      date: "2023-11-22",
      insights: 15,
    },
  ];

  const features = [
    {
      icon: Upload,
      title: "Upload & Analyze",
      description: "Upload your data files and get instant AI-powered insights",
      href: "/upload",
      color: "blue",
    },
    {
      icon: History,
      title: "Analysis History",
      description:
        "Review past analyses and track your data insights over time",
      href: "/history",
      color: "green",
    },
    {
      icon: BarChart3,
      title: "Dashboard",
      description: "Monitor your analysis activities and performance metrics",
      href: "/dashboard",
      color: "purple",
    },
  ];

  const stats = [
    { label: "Analyses Completed", value: "127", icon: CheckCircle },
    { label: "Insights Generated", value: "2,450", icon: Zap },
    { label: "Data Points Processed", value: "5.2M", icon: BarChart3 },
    { label: "Success Rate", value: "98.5%", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
            Welcome to Datrix
          </h1>
          <p className="text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            Your AI-powered data analysis platform. Upload your data, get
            intelligent insights, and make data-driven decisions with
            confidence.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
          >
            <Link href="/upload">
              <Plus className="w-5 h-5 mr-2" />
              Start New Analysis
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const colorClasses: Record<string, string> = {
              blue: "border-blue-200 bg-blue-50 hover:bg-blue-100",
              green: "border-green-200 bg-green-50 hover:bg-green-100",
              purple: "border-purple-200 bg-purple-50 hover:bg-purple-100",
            };

            return (
              <Link key={feature.title} href={feature.href}>
                <Card
                  className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                    colorClasses[feature.color]
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <IconComponent className="w-8 h-8 text-slate-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Analyses */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Recent Analyses</CardTitle>
            <CardDescription>
              Your latest data analysis results and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {analysis.title}
                      </h4>
                      <p className="text-sm text-slate-600">
                        Completed on{" "}
                        {new Date(analysis.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">
                      {analysis.insights} insights
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/history">View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href="/history">
                  <History className="w-4 h-4 mr-2" />
                  View All Analyses
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <ChatBot />
    </div>
  );
}
