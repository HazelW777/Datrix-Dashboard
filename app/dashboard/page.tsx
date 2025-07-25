"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Clock, Plus, CheckCircle, Loader2, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"
import { useAnalysis } from "@/contexts/analysis-context"

export default function DashboardPage() {
  const { history, models } = useAnalysis()

  const completedAnalyses = history.filter((h) => h.status === "completed")
  const processingAnalyses = history.filter((h) => h.status === "processing")
  const savedModels = models.filter((m) => !m.isTemplate)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "processing":
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-lg text-slate-600">Welcome back! Here's an overview of your data analysis activities.</p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link href="/upload">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <Plus className="w-8 h-8 text-blue-900 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 mb-2">New Analysis</h3>
              <p className="text-sm text-blue-700">Upload data and start a new analysis</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/models">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">Use Saved Model</h3>
              <p className="text-sm text-slate-600">Apply a saved analysis model to new data</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/history">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">View Results</h3>
              <p className="text-sm text-slate-600">Review past analysis results and insights</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-blue-900 mx-auto mb-3" />
            <div className="text-2xl font-bold text-slate-900">{history.length}</div>
            <div className="text-sm text-slate-600">Total Analyses</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-slate-900">{completedAnalyses.length}</div>
            <div className="text-sm text-slate-600">Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <FileText className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-slate-900">{savedModels.length}</div>
            <div className="text-sm text-slate-600">Saved Models</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-slate-900">
              {completedAnalyses.reduce((sum, a) => sum + a.insights, 0)}
            </div>
            <div className="text-sm text-slate-600">Total Insights</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Analyses */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Analyses</CardTitle>
                <CardDescription>Your latest data analysis projects</CardDescription>
              </div>
              <Link href="/history">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">No analyses yet</p>
                <Link href="/upload">
                  <Button>Start Your First Analysis</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {history.slice(0, 5).map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {getStatusIcon(analysis.status)}
                        <span className="font-medium text-slate-900">{analysis.name}</span>
                      </div>
                      <div className="text-sm text-slate-500">
                        {analysis.fileName} • {new Date(analysis.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant={analysis.status === "completed" ? "default" : "secondary"}>{analysis.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Models */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Saved Models</CardTitle>
                <CardDescription>Reusable analysis templates</CardDescription>
              </div>
              <Link href="/models">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {savedModels.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">No saved models yet</p>
                <p className="text-sm text-slate-400">Complete an analysis to save it as a reusable model</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedModels.slice(0, 5).map((model) => (
                  <div key={model.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-slate-900">{model.name}</span>
                      <Badge variant="outline">{model.goals.length} goals</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{model.description}</p>
                    <div className="text-xs text-slate-400">
                      Created {new Date(model.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Processing Status */}
      {processingAnalyses.length > 0 && (
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span>Currently Processing</span>
            </CardTitle>
            <CardDescription>Analyses currently being processed by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processingAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <span className="font-medium text-slate-900">{analysis.name}</span>
                    <div className="text-sm text-slate-500">{analysis.fileName}</div>
                  </div>
                  <Link href={`/processing`}>
                    <Button size="sm" variant="outline">
                      View Progress
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
