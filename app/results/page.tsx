"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Download, Share2, TrendingUp, DollarSign, Users, Target, CheckCircle } from "lucide-react"

export default function ResultsPage() {
  const [selectedInsight, setSelectedInsight] = useState(0)

  const keyInsights = [
    {
      title: "Social Media Campaigns Show 340% Higher ROI",
      description:
        "Social media channels consistently outperform other channels with an average ROI of 4.2x compared to 1.2x for traditional channels.",
      impact: "High",
      recommendation: "Increase social media budget allocation by 25% for Q2",
      metrics: { roi: "4.2x", conversion: "12.3%", cost: "$2.45" },
    },
    {
      title: "25-35 Age Group Drives 60% of Conversions",
      description: "The 25-35 demographic shows the highest engagement and conversion rates across all campaigns.",
      impact: "High",
      recommendation: "Focus targeting efforts on 25-35 age group with tailored messaging",
      metrics: { conversion: "18.7%", volume: "60%", value: "$89.50" },
    },
    {
      title: "Weekend Campaigns Underperform by 45%",
      description: "Campaigns running on weekends show significantly lower engagement and higher cost per conversion.",
      impact: "Medium",
      recommendation: "Shift weekend budget to weekday campaigns for better efficiency",
      metrics: { efficiency: "-45%", cost: "+67%", engagement: "-32%" },
    },
  ]

  const dataQuality = {
    completeness: 94,
    accuracy: 97,
    consistency: 91,
    timeliness: 89,
  }

  const exportOptions = [
    { format: "CSV", description: "Cleaned dataset with all transformations" },
    { format: "Excel", description: "Formatted report with charts and insights" },
    { format: "PDF", description: "Executive summary and recommendations" },
    { format: "JSON", description: "Raw data for API integration" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Analysis Complete!</h1>
          <p className="text-lg text-slate-600">
            Your data has been processed and analyzed. Here are the key insights and recommendations.
          </p>
        </div>

        {/* Success Banner */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-medium text-green-900">Processing Completed Successfully</h3>
                <p className="text-sm text-green-700">
                  Analyzed 15,420 rows across 12 columns • Processing time: 2m 34s • Data quality: 94%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="data">Processed Data</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          {/* Key Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Insights List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-blue-900" />
                      <span>Key Business Insights</span>
                    </CardTitle>
                    <CardDescription>AI-generated insights based on your analysis goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {keyInsights.map((insight, index) => (
                        <div
                          key={index}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedInsight === index
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                          onClick={() => setSelectedInsight(index)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-slate-900">{insight.title}</h4>
                            <Badge variant={insight.impact === "High" ? "default" : "secondary"}>
                              {insight.impact} Impact
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{insight.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            {Object.entries(insight.metrics).map(([key, value]) => (
                              <span key={key}>
                                <strong>{key}:</strong> {value}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Insight Details */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Insight Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">{keyInsights[selectedInsight].title}</h4>
                        <p className="text-sm text-slate-600 mb-3">{keyInsights[selectedInsight].description}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-900 mb-2">Recommendation</h5>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-900">{keyInsights[selectedInsight].recommendation}</p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-slate-900 mb-2">Key Metrics</h5>
                        <div className="space-y-2">
                          {Object.entries(keyInsights[selectedInsight].metrics).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="text-slate-600 capitalize">{key}:</span>
                              <span className="font-medium text-slate-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Quality */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Data Quality Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(dataQuality).map(([metric, score]) => (
                        <div key={metric}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize text-slate-600">{metric}</span>
                            <span className="font-medium">{score}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-blue-900 h-2 rounded-full" style={{ width: `${score}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* ROI by Channel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ROI by Channel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Interactive chart would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Conversion Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conversion Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Time series chart would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audience Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audience Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Users className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Demographic breakdown would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">$2.4M</div>
                  <div className="text-sm text-slate-600">Total Revenue</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">8.7%</div>
                  <div className="text-sm text-slate-600">Avg Conversion Rate</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">3.2x</div>
                  <div className="text-sm text-slate-600">Average ROI</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-blue-900 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">156</div>
                  <div className="text-sm text-slate-600">Active Campaigns</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Processed Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cleaned Dataset Preview</CardTitle>
                <CardDescription>
                  Your data has been cleaned, validated, and enhanced with derived features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3">campaign_id</th>
                        <th className="text-left py-2 px-3">campaign_name</th>
                        <th className="text-left py-2 px-3">channel</th>
                        <th className="text-left py-2 px-3">budget</th>
                        <th className="text-left py-2 px-3">impressions</th>
                        <th className="text-left py-2 px-3">clicks</th>
                        <th className="text-left py-2 px-3">conversions</th>
                        <th className="text-left py-2 px-3">roi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="py-2 px-3">C001</td>
                        <td className="py-2 px-3">Summer Sale 2024</td>
                        <td className="py-2 px-3">Social Media</td>
                        <td className="py-2 px-3">$5,000</td>
                        <td className="py-2 px-3">125,430</td>
                        <td className="py-2 px-3">3,245</td>
                        <td className="py-2 px-3">287</td>
                        <td className="py-2 px-3">4.2x</td>
                      </tr>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="py-2 px-3">C002</td>
                        <td className="py-2 px-3">Back to School</td>
                        <td className="py-2 px-3">Email</td>
                        <td className="py-2 px-3">$2,500</td>
                        <td className="py-2 px-3">45,230</td>
                        <td className="py-2 px-3">1,890</td>
                        <td className="py-2 px-3">156</td>
                        <td className="py-2 px-3">2.8x</td>
                      </tr>
                      <tr className="border-b hover:bg-slate-50">
                        <td className="py-2 px-3">C003</td>
                        <td className="py-2 px-3">Holiday Promo</td>
                        <td className="py-2 px-3">Search</td>
                        <td className="py-2 px-3">$8,000</td>
                        <td className="py-2 px-3">89,560</td>
                        <td className="py-2 px-3">2,134</td>
                        <td className="py-2 px-3">198</td>
                        <td className="py-2 px-3">1.9x</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-slate-500">Showing 3 of 15,420 rows</p>
                </div>
              </CardContent>
            </Card>

            {/* Data Transformations */}
            <Card>
              <CardHeader>
                <CardTitle>Applied Transformations</CardTitle>
                <CardDescription>Summary of data cleaning and enhancement operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Data Cleaning</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Removed 23 duplicate records</li>
                      <li>• Filled 156 missing target_audience values</li>
                      <li>• Standardized date formats</li>
                      <li>• Corrected 12 invalid budget entries</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Feature Engineering</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Calculated ROI and conversion rates</li>
                      <li>• Created campaign duration metrics</li>
                      <li>• Added seasonal indicators</li>
                      <li>• Generated performance categories</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="w-5 h-5 text-blue-900" />
                  <span>Export Your Results</span>
                </CardTitle>
                <CardDescription>Download your processed data, insights, and visualizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {exportOptions.map((option, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{option.format}</h4>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600">{option.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Share Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5 text-blue-900" />
                  <span>Share Results</span>
                </CardTitle>
                <CardDescription>Share your analysis with team members or stakeholders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="flex-1">
                      Generate Shareable Link
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Email Report
                    </Button>
                  </div>
                  <div className="text-center">
                    <Button className="bg-blue-900 hover:bg-blue-800 text-white">Create New Analysis</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
