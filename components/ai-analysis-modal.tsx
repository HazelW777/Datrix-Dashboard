"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  X,
  Bot,
  User,
  Send,
  FileText,
  BarChart3,
  Table,
  Loader2,
  Sparkles,
  TrendingUp,
  Users,
  DollarSign,
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  analysisResult?: AnalysisResult;
}

interface AnalysisResult {
  id: string;
  title: string;
  type: "table" | "chart" | "summary";
  data: any;
  description: string;
}

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  datasetTitle: string;
  sampleData: any[];
}

export function AIAnalysisModal({
  isOpen,
  onClose,
  datasetTitle,
  sampleData,
}: AIAnalysisModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: `Hello! I'm your AI analyst for the "${datasetTitle}" dataset. I can help you analyze the data, identify patterns, and generate insights. 

Try asking me questions like:
• "Who are the top 5 customers by revenue?"
• "What are the most popular product categories?"
• "Show me sales trends over time"
• "Analyze customer demographics"

What would you like to explore?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(
    null
  );
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAnalysisResult = (
    query: string,
    sampleData: any[]
  ): AnalysisResult | null => {
    const lowerQuery = query.toLowerCase();

    // Top customers by revenue analysis
    if (
      lowerQuery.includes("top") &&
      (lowerQuery.includes("customer") || lowerQuery.includes("user")) &&
      lowerQuery.includes("revenue")
    ) {
      const topCustomers = [
        {
          customer_id: "USR_001847",
          name: "John Smith",
          total_revenue: 15420.5,
          orders: 28,
          avg_order: 550.73,
        },
        {
          customer_id: "USR_003421",
          name: "Sarah Johnson",
          total_revenue: 12850.25,
          orders: 22,
          avg_order: 584.1,
        },
        {
          customer_id: "USR_005234",
          name: "Mike Chen",
          total_revenue: 11240.8,
          orders: 19,
          avg_order: 591.62,
        },
        {
          customer_id: "USR_002156",
          name: "Emma Wilson",
          total_revenue: 9870.45,
          orders: 24,
          avg_order: 411.27,
        },
        {
          customer_id: "USR_004789",
          name: "David Brown",
          total_revenue: 8950.3,
          orders: 16,
          avg_order: 559.39,
        },
      ];

      return {
        id: `analysis_${Date.now()}`,
        title: "Top 5 Customers by Revenue",
        type: "table",
        data: topCustomers,
        description:
          "Analysis of highest revenue generating customers with order patterns and average order values.",
      };
    }

    // Product category analysis
    if (lowerQuery.includes("product") && lowerQuery.includes("categor")) {
      const categoryData = [
        {
          category: "Electronics",
          revenue: 2450000,
          orders: 8920,
          avg_order: 274.66,
          growth: "+15.2%",
        },
        {
          category: "Fashion",
          revenue: 1980000,
          orders: 12450,
          avg_order: 159.04,
          growth: "+8.7%",
        },
        {
          category: "Home & Garden",
          revenue: 1650000,
          orders: 6780,
          avg_order: 243.36,
          growth: "+22.1%",
        },
        {
          category: "Books",
          revenue: 890000,
          orders: 15600,
          avg_order: 57.05,
          growth: "+5.3%",
        },
        {
          category: "Sports",
          revenue: 1200000,
          orders: 4890,
          avg_order: 245.4,
          growth: "+18.9%",
        },
      ];

      return {
        id: `analysis_${Date.now()}`,
        title: "Product Category Performance",
        type: "table",
        data: categoryData,
        description:
          "Revenue and order analysis across different product categories with growth trends.",
      };
    }

    // Demographics analysis
    if (
      lowerQuery.includes("demographic") ||
      lowerQuery.includes("age") ||
      lowerQuery.includes("customer profile")
    ) {
      const demographicData = [
        {
          age_group: "18-25",
          customers: 125000,
          avg_spend: 185.5,
          top_category: "Fashion",
          retention: "68%",
        },
        {
          age_group: "26-35",
          customers: 280000,
          avg_spend: 245.8,
          top_category: "Electronics",
          retention: "75%",
        },
        {
          age_group: "36-45",
          customers: 195000,
          avg_spend: 320.4,
          top_category: "Home & Garden",
          retention: "82%",
        },
        {
          age_group: "46-55",
          customers: 145000,
          avg_spend: 280.9,
          top_category: "Books",
          retention: "79%",
        },
        {
          age_group: "56+",
          customers: 85000,
          avg_spend: 195.6,
          top_category: "Health",
          retention: "85%",
        },
      ];

      return {
        id: `analysis_${Date.now()}`,
        title: "Customer Demographics Analysis",
        type: "table",
        data: demographicData,
        description:
          "Customer segmentation by age groups showing spending patterns and preferences.",
      };
    }

    // Sales trends analysis
    if (
      lowerQuery.includes("trend") ||
      (lowerQuery.includes("sales") && lowerQuery.includes("time"))
    ) {
      const trendsData = [
        {
          month: "Jan 2024",
          revenue: 1850000,
          orders: 6420,
          conversion: "3.2%",
          growth: "+12%",
        },
        {
          month: "Feb 2024",
          revenue: 1920000,
          orders: 6680,
          conversion: "3.4%",
          growth: "+15%",
        },
        {
          month: "Mar 2024",
          revenue: 2100000,
          orders: 7250,
          conversion: "3.6%",
          growth: "+18%",
        },
        {
          month: "Apr 2024",
          revenue: 1980000,
          orders: 6890,
          conversion: "3.3%",
          growth: "+8%",
        },
        {
          month: "May 2024",
          revenue: 2250000,
          orders: 7890,
          conversion: "3.8%",
          growth: "+22%",
        },
        {
          month: "Jun 2024",
          revenue: 2380000,
          orders: 8120,
          conversion: "4.1%",
          growth: "+28%",
        },
      ];

      return {
        id: `analysis_${Date.now()}`,
        title: "Sales Trends Analysis",
        type: "table",
        data: trendsData,
        description:
          "Monthly sales performance showing revenue growth and conversion rate improvements.",
      };
    }

    // Geographic analysis
    if (
      lowerQuery.includes("geographic") ||
      lowerQuery.includes("country") ||
      lowerQuery.includes("region")
    ) {
      const geoData = [
        {
          country: "United States",
          revenue: 3200000,
          customers: 125000,
          avg_order: 256.0,
          market_share: "28%",
        },
        {
          country: "United Kingdom",
          revenue: 1850000,
          customers: 78000,
          avg_order: 237.18,
          market_share: "16%",
        },
        {
          country: "Germany",
          revenue: 1650000,
          customers: 65000,
          avg_order: 253.85,
          market_share: "14%",
        },
        {
          country: "Canada",
          revenue: 1200000,
          customers: 52000,
          avg_order: 230.77,
          market_share: "10%",
        },
        {
          country: "Australia",
          revenue: 980000,
          customers: 41000,
          avg_order: 239.02,
          market_share: "8%",
        },
      ];

      return {
        id: `analysis_${Date.now()}`,
        title: "Geographic Revenue Analysis",
        type: "table",
        data: geoData,
        description:
          "Revenue distribution and customer metrics across different countries and regions.",
      };
    }

    return null;
  };

  const generateAIResponse = (query: string, sampleData: any[]): string => {
    const lowerQuery = query.toLowerCase();

    if (
      lowerQuery.includes("top") &&
      (lowerQuery.includes("customer") || lowerQuery.includes("user")) &&
      lowerQuery.includes("revenue")
    ) {
      return `📊 **Top 5 Customers by Revenue Analysis**

I've analyzed the customer data to identify your highest-value customers. Here are the key findings:

**Key Insights:**
• Top customer generates $15,420.50 in total revenue
• Average order value ranges from $411 to $592
• High-value customers tend to have fewer but larger orders
• Top 5 customers contribute approximately 12% of total revenue

**Customer Patterns:**
• John Smith: Highest spender with consistent large orders
• Sarah Johnson: Second highest with good order frequency
• Mike Chen: Highest average order value at $591.62

Click on the analysis result to see the detailed breakdown table.`;
    }

    if (lowerQuery.includes("product") && lowerQuery.includes("categor")) {
      return `🛍️ **Product Category Performance Analysis**

I've analyzed sales performance across all product categories:

**Top Performers:**
• Electronics leads with $2.45M revenue (+15.2% growth)
• Fashion follows with $1.98M revenue (+8.7% growth)
• Home & Garden shows strongest growth at +22.1%

**Key Insights:**
• Electronics has highest revenue but lower order frequency
• Books have highest order volume but lowest average order value
• Home & Garden shows best growth potential
• Sports category has good balance of revenue and growth

The detailed breakdown shows revenue, order counts, and growth trends for each category.`;
    }

    if (
      lowerQuery.includes("demographic") ||
      lowerQuery.includes("age") ||
      lowerQuery.includes("customer profile")
    ) {
      return `👥 **Customer Demographics Analysis**

I've segmented customers by age groups to understand spending patterns:

**Key Demographics:**
• Largest segment: 26-35 years (280K customers)
• Highest spenders: 36-45 years ($320.40 avg)
• Best retention: 56+ years (85% retention rate)
• Growth segment: 18-25 years (Fashion-focused)

**Spending Patterns:**
• Younger customers prefer Fashion and Electronics
• Middle-aged customers invest in Home & Garden
• Older customers focus on Books and Health products

Each age group shows distinct preferences and spending behaviors that can inform targeted marketing strategies.`;
    }

    if (
      lowerQuery.includes("trend") ||
      (lowerQuery.includes("sales") && lowerQuery.includes("time"))
    ) {
      return `📈 **Sales Trends Analysis**

I've analyzed sales performance over the past 6 months:

**Growth Trends:**
• Consistent month-over-month growth
• June 2024: Peak performance with $2.38M revenue
• Conversion rate improved from 3.2% to 4.1%
• Order volume increased by 26% over 6 months

**Performance Highlights:**
• Strongest growth in May (+22%) and June (+28%)
• Steady improvement in conversion rates
• Order volume correlates with revenue growth
• Seasonal patterns emerging in Q2

The detailed monthly breakdown shows revenue, orders, conversion rates, and growth percentages.`;
    }

    if (
      lowerQuery.includes("geographic") ||
      lowerQuery.includes("country") ||
      lowerQuery.includes("region")
    ) {
      return `🌍 **Geographic Revenue Analysis**

I've analyzed revenue distribution across key markets:

**Market Leaders:**
• United States: $3.2M revenue (28% market share)
• United Kingdom: $1.85M revenue (16% market share)
• Germany: $1.65M revenue (14% market share)

**Market Insights:**
• US market dominates with highest customer count
• European markets show strong average order values
• Canada and Australia represent growth opportunities
• Geographic diversification reduces market risk

The analysis includes revenue, customer counts, average order values, and market share for each country.`;
    }

    return `I understand you're asking about "${query}". Let me analyze the dataset and provide insights:

Based on the current sample data, I can help you with various analyses such as:

**Available Analyses:**
• Customer revenue ranking and segmentation
• Product category performance metrics
• Sales trends and growth patterns
• Geographic market distribution
• Demographic customer profiling
• Purchase behavior analysis

Try asking specific questions like:
• "Who are the top 5 customers by revenue?"
• "What are the best performing product categories?"
• "Show me sales trends over time"
• "Analyze customer demographics"

What specific aspect would you like me to analyze?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentQuery = inputValue;
    setInputValue("");
    setIsTyping(true);

    // Generate analysis result
    const analysisResult = generateAnalysisResult(currentQuery, sampleData);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(currentQuery, sampleData),
        timestamp: new Date(),
        analysisResult: analysisResult || undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Add to analysis results if we have one
      if (analysisResult) {
        setAnalysisResults((prev) => [...prev, analysisResult]);
      }

      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderAnalysisResult = (result: AnalysisResult) => {
    if (!result) return null;

    if (result.type === "table") {
      const data = result.data as any[];
      if (!data || data.length === 0) return null;

      const headers = Object.keys(data[0]);

      return (
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {result.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{result.description}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 rounded-lg">
              <thead>
                <tr className="bg-slate-50">
                  {headers.map((header) => (
                    <th
                      key={header}
                      className="border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900"
                    >
                      {header
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    {headers.map((header) => {
                      const value = row[header];
                      const isRevenue =
                        header.includes("revenue") || header.includes("spend");
                      const isPercentage =
                        typeof value === "string" && value.includes("%");
                      const isGrowth =
                        header.includes("growth") &&
                        typeof value === "string" &&
                        value.includes("+");

                      return (
                        <td
                          key={header}
                          className={`border border-slate-200 px-4 py-3 text-sm ${
                            isRevenue
                              ? "font-semibold text-green-600"
                              : isGrowth
                              ? "font-semibold text-green-600"
                              : isPercentage
                              ? "font-medium text-blue-600"
                              : "text-slate-800"
                          }`}
                        >
                          {isRevenue && typeof value === "number"
                            ? `$${value.toLocaleString()}`
                            : value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-900">{result.title}</h3>
        <p className="text-slate-600 mt-2">{result.description}</p>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">AI Analysis</h2>
              <p className="text-sm text-slate-600">{datasetTitle}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Main Content - Left-Right Layout */}
        <div className="flex-1 flex min-h-0">
          {/* Left Side - Chat Interface */}
          <div className="flex-1 flex flex-col border-r">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    <div
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[85%] ${
                          message.type === "user"
                            ? "flex-row-reverse space-x-reverse"
                            : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gradient-to-br from-purple-600 to-blue-600 text-white"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div
                          className={`rounded-2xl p-4 ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          <div className="whitespace-pre-line text-sm leading-relaxed">
                            {message.content}
                          </div>

                          {/* Analysis Result Button */}
                          {message.analysisResult && (
                            <div className="mt-4">
                              <Button
                                onClick={() =>
                                  setSelectedResult(message.analysisResult!)
                                }
                                variant="outline"
                                size="sm"
                                className="bg-white hover:bg-slate-50 border-slate-300 text-slate-700"
                              >
                                <Table className="w-4 h-4 mr-2" />
                                View {message.analysisResult.title}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-slate-100 rounded-2xl p-4">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                          <span className="text-sm text-slate-600">
                            Analyzing data...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me to analyze the dataset... (e.g., 'Who are the top 5 customers by revenue?')"
                  className="flex-1 border-slate-300 focus:border-blue-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Analysis Results */}
          <div className="w-1/2 bg-slate-50">
            {selectedResult ? (
              <ScrollArea className="h-full">
                {renderAnalysisResult(selectedResult)}
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium mb-2">Analysis Results</p>
                  <p className="text-sm px-8">
                    Ask me questions about the dataset and I'll generate
                    detailed analysis results that you can view here.
                  </p>
                  <div className="mt-6 space-y-2 text-sm text-slate-400">
                    <p>Try asking:</p>
                    <p>"Who are the top 5 customers by revenue?"</p>
                    <p>"What are the best product categories?"</p>
                    <p>"Show me sales trends over time"</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
