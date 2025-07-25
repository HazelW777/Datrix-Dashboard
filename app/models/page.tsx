"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, MoreVertical, BookOpen, Star, Edit, Trash2, Copy, Play } from "lucide-react"
import { useAnalysis, type AnalysisModel } from "@/contexts/analysis-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function ModelsPage() {
  const { models, saveModel, deleteModel } = useAnalysis()
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingModel, setEditingModel] = useState<AnalysisModel | null>(null)
  const [newModel, setNewModel] = useState({
    name: "",
    description: "",
    goals: [] as string[],
    customGoal: "",
  })

  const templates = models.filter((m) => m.isTemplate)
  const userModels = models.filter((m) => !m.isTemplate)

  const filteredModels = [...templates, ...userModels].filter(
    (model) =>
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateModel = () => {
    if (!newModel.name.trim()) return

    const model: AnalysisModel = {
      id: `model-${Date.now()}`,
      name: newModel.name,
      description: newModel.description,
      goals: newModel.goals,
      customGoal: newModel.customGoal,
      processingSteps: ["data-validation", "data-cleaning", "statistical-analysis", "goal-analysis"],
      createdAt: new Date().toISOString(),
      dataTypes: [],
      isTemplate: false,
    }

    saveModel(model)
    setNewModel({ name: "", description: "", goals: [], customGoal: "" })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteModel = (modelId: string) => {
    if (confirm("Are you sure you want to delete this model?")) {
      deleteModel(modelId)
    }
  }

  const handleDuplicateModel = (model: AnalysisModel) => {
    const duplicatedModel: AnalysisModel = {
      ...model,
      id: `model-${Date.now()}`,
      name: `${model.name} (Copy)`,
      createdAt: new Date().toISOString(),
      isTemplate: false,
    }
    saveModel(duplicatedModel)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Saved Models</h1>
          <p className="text-lg text-slate-600">Reusable analysis templates for consistent workflows.</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Plus className="w-4 h-4 mr-2" />
              Create Model
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Analysis Model</DialogTitle>
              <DialogDescription>
                Save your analysis configuration as a reusable model for future projects.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-900 mb-2 block">Model Name</label>
                <Input
                  placeholder="e.g., Marketing Campaign Analysis"
                  value={newModel.name}
                  onChange={(e) => setNewModel((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-900 mb-2 block">Description</label>
                <Textarea
                  placeholder="Describe what this model analyzes and when to use it..."
                  value={newModel.description}
                  onChange={(e) => setNewModel((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateModel} disabled={!newModel.name.trim()}>
                  Create Model
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Templates Section */}
      {templates.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            Templates
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter(
                (model) =>
                  model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  model.description.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((model) => (
                <Card key={model.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-blue-900" />
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                      </div>
                      <Badge variant="secondary">Template</Badge>
                    </div>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-slate-900">Goals:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.goals.slice(0, 3).map((goal) => (
                            <Badge key={goal} variant="outline" className="text-xs">
                              {goal.replace("-", " ")}
                            </Badge>
                          ))}
                          {model.goals.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{model.goals.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Link href="/upload" className="flex-1">
                          <Button size="sm" className="w-full">
                            <Play className="w-4 h-4 mr-2" />
                            Use Template
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline" onClick={() => handleDuplicateModel(model)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* User Models Section */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Models</h2>

        {userModels.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">No saved models yet</h3>
              <p className="text-slate-600 mb-6">Create reusable analysis models to streamline your workflow.</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Model
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userModels
              .filter(
                (model) =>
                  model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  model.description.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((model) => (
                <Card key={model.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingModel(model)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDuplicateModel(model)}>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteModel(model.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-slate-900">Goals:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {model.goals.slice(0, 3).map((goal) => (
                            <Badge key={goal} variant="outline" className="text-xs">
                              {goal.replace("-", " ")}
                            </Badge>
                          ))}
                          {model.goals.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{model.goals.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-slate-500">
                        Created {new Date(model.createdAt).toLocaleDateString()}
                      </div>

                      <Link href="/upload">
                        <Button size="sm" className="w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Apply to New Data
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
