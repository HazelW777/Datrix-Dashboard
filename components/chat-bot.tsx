"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Minimize2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  datasets?: Array<{
    id: string;
    title: string;
    provider: string;
    category: string;
  }>;
}

interface QAItem {
  keywords: string[];
  response: string;
  suggestions?: string[];
  datasets?: Array<{
    id: string;
    title: string;
    provider: string;
    category: string;
  }>;
}

// 预设问答数据库
const qaDatabase: QAItem[] = [
  {
    keywords: ["hello", "hi", "hey", "help", "start"],
    response:
      "👋 Hello! I'm your data marketplace assistant. I can help you find the perfect dataset for your needs. What type of data are you looking for?",
    suggestions: [
      "Show me financial data",
      "I need e-commerce data",
      "What B2B datasets do you have?",
      "Help me find consumer behavior data",
    ],
  },
  {
    keywords: [
      "financial",
      "finance",
      "fintech",
      "payment",
      "transaction",
      "banking",
      "trading",
    ],
    response:
      "💰 Great! We have excellent financial datasets. Here are some popular options:",
    datasets: [
      {
        id: "7",
        title: "Global Digital Payment Transaction Analytics",
        provider: "FinTech Insights Pro",
        category: "Financial Data",
      },
      {
        id: "2",
        title: "Financial Market Intelligence Database",
        provider: "FinanceHub",
        category: "Financial Data",
      },
    ],
    suggestions: [
      "Tell me about fraud detection data",
      "What's the pricing for financial data?",
      "Do you have cryptocurrency data?",
    ],
  },
  {
    keywords: [
      "ecommerce",
      "e-commerce",
      "shopping",
      "retail",
      "consumer",
      "purchase",
      "buying",
    ],
    response:
      "🛒 Perfect! E-commerce and consumer behavior data is one of our specialties. Check out these datasets:",
    datasets: [
      {
        id: "1",
        title: "Global E-commerce Consumer Behavior Dataset",
        provider: "DataVendor Corp",
        category: "Consumer Data",
      },
      {
        id: "9",
        title: "Cross-border E-commerce Consumer Behavior Dataset",
        provider: "Global Commerce Analytics",
        category: "Consumer Data",
      },
    ],
    suggestions: [
      "What countries are covered?",
      "Can I get real-time data?",
      "Show me B2B data instead",
    ],
  },
  {
    keywords: [
      "b2b",
      "business",
      "sales",
      "lead",
      "company",
      "enterprise",
      "corporate",
    ],
    response:
      "🏢 Excellent choice! B2B data is crucial for business intelligence. Here's what we recommend:",
    datasets: [
      {
        id: "8",
        title: "Global B2B Sales Intelligence Database",
        provider: "BizIntel Solutions",
        category: "Business Data",
      },
      {
        id: "5",
        title: "Global Supply Chain Analytics",
        provider: "LogisticsPro",
        category: "Business Data",
      },
    ],
    suggestions: [
      "What's included in B2B data?",
      "How often is the data updated?",
      "Can I filter by company size?",
    ],
  },
  {
    keywords: [
      "pricing",
      "price",
      "cost",
      "how much",
      "expensive",
      "cheap",
      "budget",
    ],
    response:
      "💵 Our pricing is flexible and depends on your specific needs. Most datasets offer multiple pricing options:\n\n• **API Access**: $0.01 - $0.05 per call\n• **Annual Subscription**: $8,000 - $30,000/year\n• **One-time Purchase**: $5,000 - $25,000\n• **Free Samples**: Available for evaluation\n\nWould you like me to connect you with our sales team for custom pricing?",
    suggestions: [
      "Show me free sample data",
      "I need enterprise pricing",
      "What's included in subscriptions?",
    ],
  },
  {
    keywords: ["sample", "free", "trial", "demo", "test", "preview"],
    response:
      "🎁 Great news! We offer free samples for all our datasets. You can:\n\n• Download 1,000 sample records\n• Test our API endpoints\n• Preview data quality and structure\n• Evaluate geographic coverage\n\nNo credit card required! Which dataset would you like to sample?",
    suggestions: [
      "Download e-commerce sample",
      "Try financial data sample",
      "Get B2B data preview",
    ],
  },
  {
    keywords: [
      "coverage",
      "countries",
      "global",
      "international",
      "regions",
      "geographic",
    ],
    response:
      "🌍 Our datasets have excellent global coverage:\n\n• **Financial Data**: 85+ countries\n• **E-commerce Data**: 150-168 countries\n• **B2B Data**: 195 countries\n• **All Regions**: North America, Europe, Asia-Pacific, Latin America, MEA\n\nWhich specific regions are you most interested in?",
    suggestions: [
      "Focus on North America",
      "I need European data",
      "Show Asia-Pacific coverage",
    ],
  },
  {
    keywords: [
      "quality",
      "accuracy",
      "reliable",
      "verified",
      "clean",
      "complete",
    ],
    response:
      "✅ Data quality is our top priority! Our datasets feature:\n\n• **98-99% Completeness** - Minimal missing values\n• **96-99% Accuracy** - Verified and validated\n• **Real-time Updates** - Fresh data daily\n• **Compliance Ready** - GDPR, CCPA compliant\n• **Quality Scores** - Transparent metrics\n\nAll data goes through rigorous validation before delivery.",
    suggestions: [
      "Show me quality metrics",
      "What's your data validation process?",
      "Tell me about compliance",
    ],
  },
  {
    keywords: [
      "api",
      "integration",
      "format",
      "json",
      "csv",
      "technical",
      "developer",
    ],
    response:
      "🔧 We support multiple integration methods:\n\n• **REST API** - Real-time access\n• **Streaming** - Live data feeds\n• **Batch Download** - Scheduled exports\n• **Formats**: JSON, CSV, Parquet, Avro\n• **SDKs**: Python, JavaScript, R\n• **Documentation**: Comprehensive API docs\n\nNeed help with technical integration?",
    suggestions: [
      "Show me API documentation",
      "I need Python examples",
      "What about rate limits?",
    ],
  },
  {
    keywords: [
      "healthcare",
      "medical",
      "health",
      "clinical",
      "pharmaceutical",
      "patient",
    ],
    response:
      "🏥 We have healthcare datasets available with strict compliance:\n\n• **HIPAA Compliant** - Patient privacy protected\n• **Clinical Research** - Anonymized medical data\n• **Pharmaceutical** - Drug development insights\n• **Public Health** - Population health trends\n\nAll healthcare data is de-identified and compliant with regulations.",
    datasets: [
      {
        id: "3",
        title: "Healthcare Research Analytics",
        provider: "MedResearch Inc",
        category: "Healthcare Data",
      },
    ],
    suggestions: [
      "What's included in clinical data?",
      "Is this HIPAA compliant?",
      "Show me pharmaceutical data",
    ],
  },
];

const defaultSuggestions = [
  "Show me popular datasets",
  "What data categories do you have?",
  "I need help choosing a dataset",
  "Tell me about pricing",
];

export function ChatBot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "👋 Hi! I'm here to help you find the perfect dataset for your needs. What are you looking for?",
      timestamp: new Date(),
      suggestions: defaultSuggestions,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hide chatbot on dataset detail pages
  const isDatasetDetailPage = pathname?.startsWith("/dataset/");

  if (isDatasetDetailPage) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (userInput: string): QAItem | null => {
    const input = userInput.toLowerCase();

    // 寻找最佳匹配
    let bestMatch: QAItem | null = null;
    let maxMatches = 0;

    for (const qa of qaDatabase) {
      const matches = qa.keywords.filter((keyword) =>
        input.includes(keyword.toLowerCase())
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = qa;
      }
    }

    return bestMatch;
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // 模拟机器人思考时间
    setTimeout(() => {
      const bestMatch = findBestMatch(message);

      let botResponse: Message;

      if (bestMatch) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: bestMatch.response,
          timestamp: new Date(),
          suggestions: bestMatch.suggestions,
          datasets: bestMatch.datasets,
        };
      } else {
        // 默认回复
        botResponse = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content:
            "🤔 I'm not sure about that specific question, but I can help you with:\n\n• Finding datasets by category\n• Pricing information\n• Data quality and coverage\n• Technical integration\n• Free samples and trials\n\nWhat would you like to know more about?",
          timestamp: new Date(),
          suggestions: [
            "Show me all categories",
            "What's your most popular dataset?",
            "I need technical support",
            "Tell me about data quality",
          ],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2秒随机延迟
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Card
        className={`shadow-2xl border-0 transition-all duration-300 ${
          isMinimized
            ? "w-96 h-16"
            : "w-96 lg:w-[500px] xl:w-[600px] h-96 lg:h-[500px] xl:h-[600px]"
        }`}
      >
        {/* Header */}
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base font-medium">
                  Data Assistant
                </CardTitle>
                <p className="text-sm text-blue-100">Online • Ready to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0 text-white hover:bg-white/20"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent
              className={`flex-1 p-0 overflow-y-auto ${
                isMinimized ? "h-0" : "h-80 lg:h-96 xl:h-[480px]"
              }`}
            >
              <div className="p-6 space-y-6">
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
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>
                        <div
                          className={`rounded-lg p-4 text-sm ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-800"
                          }`}
                        >
                          <div className="whitespace-pre-line">
                            {message.content}
                          </div>

                          {/* Dataset Cards */}
                          {message.datasets && (
                            <div className="mt-4 space-y-3">
                              {message.datasets.map((dataset) => (
                                <Link
                                  key={dataset.id}
                                  href={`/dataset/${dataset.id}`}
                                  className="block"
                                >
                                  <div className="bg-white rounded-lg p-4 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="font-medium text-slate-900 text-sm leading-tight mb-2">
                                          {dataset.title}
                                        </div>
                                        <div className="text-sm text-slate-600 mb-2">
                                          by {dataset.provider}
                                        </div>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {dataset.category}
                                        </Badge>
                                      </div>
                                      <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" />
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.type === "bot" && (
                      <div className="flex flex-wrap gap-2 ml-11">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-sm h-8 px-3 border-slate-300 text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t bg-white rounded-b-lg">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 text-sm border-slate-300 focus:border-blue-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
