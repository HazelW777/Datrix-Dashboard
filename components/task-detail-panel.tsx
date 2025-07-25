"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Loader2, AlertCircle, TrendingUp, BarChart3 } from "lucide-react"

interface TaskResult {
  rowsAffected: number
  changes: string[]
  before: any[]
  after: any[]
  statistics?: {
    [key: string]: {
      before: number | string
      after: number | string
      change: string
    }
  }
}

interface Task {
  id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "error"
  progress: number
  duration?: number
  result?: TaskResult
}

interface TaskDetailPanelProps {
  task: Task | null
}

export function TaskDetailPanel({ task }: TaskDetailPanelProps) {
  if (!task) {
    return (
      <div className="p-6 text-center">
        <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">No Task Selected</h3>
        <p className="text-slate-600">Select a task from the left panel to view its details</p>
      </div>
    )
  }

  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "running":
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
    }
  }

  const getStatusColor = () => {
    switch (task.status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Task Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <CardTitle className="text-lg">{task.name}</CardTitle>
                <CardDescription>{task.description}</CardDescription>
              </div>
            </div>
            <Badge className={getStatusColor()}>{task.status}</Badge>
          </div>
        </CardHeader>

        {task.status !== "pending" && (
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(task.progress)}%</span>
              </div>
              <Progress value={task.progress} className="h-2" />

              {task.duration && (
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Duration</span>
                  <span>{task.duration}s</span>
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Task Results */}
      {task.result && (
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="changes">Changes</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Task Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{task.result.rowsAffected}</div>
                    <div className="text-sm text-blue-700">Rows Affected</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">{task.result.changes.length}</div>
                    <div className="text-sm text-green-700">Operations</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="changes">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Detailed Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {task.result.changes.map((change, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{change}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Before vs After Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                {task.result.statistics ? (
                  <div className="space-y-4">
                    {Object.entries(task.result.statistics).map(([metric, data]) => (
                      <div key={metric} className="border rounded-lg p-4">
                        <h4 className="font-medium text-slate-900 mb-3 capitalize">{metric.replace("_", " ")}</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Before:</span>
                            <div className="font-medium">{data.before}</div>
                          </div>
                          <div>
                            <span className="text-slate-600">After:</span>
                            <div className="font-medium">{data.after}</div>
                          </div>
                          <div>
                            <span className="text-slate-600">Change:</span>
                            <div className="font-medium text-blue-600">{data.change}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No statistics available for this task</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
