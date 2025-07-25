"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  MoreVertical,
  CheckCircle,
  Loader2,
  AlertCircle,
  Clock,
  Download,
  Trash2,
  Eye,
  Copy,
} from "lucide-react"
import { useAnalysis } from "@/contexts/analysis-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function HistoryPage() {
  const { history, deleteFromHistory } = useAnalysis()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const filteredHistory = history.filter((analysis) => {
    const matchesSearch =
      analysis.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || analysis.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleDelete = (analysisId: string) => {
    if (confirm("Are you sure you want to delete this analysis?")) {
      deleteFromHistory(analysisId)
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Analysis History</h1>
        <p className="text-lg text-slate-600">View and manage all your data analysis projects.</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search analyses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("completed")}
              >
                Completed
              </Button>
              <Button
                variant={statusFilter === "processing" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("processing")}
              >
                Processing
              </Button>
              <Button
                variant={statusFilter === "failed" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("failed")}
              >
                Failed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis List */}
      {filteredHistory.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No analyses found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Start your first analysis to see it here."}
            </p>
            <Link href="/upload">
              <Button>Start New Analysis</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((analysis) => (
            <Card key={analysis.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(analysis.status)}
                      <h3 className="text-lg font-semibold text-slate-900">{analysis.name}</h3>
                      <Badge className={getStatusColor(analysis.status)}>{analysis.status}</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-600">
                      <div>
                        <span className="font-medium">File:</span> {analysis.fileName}
                      </div>
                      <div>
                        <span className="font-medium">Data:</span> {analysis.dataRows.toLocaleString()} rows,{" "}
                        {analysis.dataColumns} columns
                      </div>
                      <div>
                        <span className="font-medium">Created:</span>{" "}
                        {new Date(analysis.createdAt).toLocaleDateString()}
                      </div>
                      {analysis.completedAt && (
                        <div>
                          <span className="font-medium">Completed:</span>{" "}
                          {new Date(analysis.completedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {analysis.status === "completed" && (
                      <div className="mt-3 text-sm text-slate-600">
                        <span className="font-medium">Insights:</span> {analysis.insights} key findings generated
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {analysis.status === "completed" && (
                      <Link href={`/results`}>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                      </Link>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {analysis.status === "completed" && (
                          <>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Export Results
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate Analysis
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(analysis.id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
          <CardDescription>Overview of your analysis activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">{history.length}</div>
              <div className="text-sm text-slate-600">Total Analyses</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {history.filter((h) => h.status === "completed").length}
              </div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {history.filter((h) => h.status === "processing").length}
              </div>
              <div className="text-sm text-slate-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">
                {history.reduce((sum, h) => sum + (h.insights || 0), 0)}
              </div>
              <div className="text-sm text-slate-600">Total Insights</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
