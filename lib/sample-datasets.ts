// 样本数据集配置
export interface SampleDataRow {
  [key: string]: string | number | null;
}

export interface DatasetConfig {
  id: string;
  title: string;
  provider: string;
  category: string;
  rating: number;
  reviews: number;
  records: string;
  coverage: string;
  quality: number;
  lastUpdated: string;
  features: string[];
  description: string;
  keyFeatures: string[];
  valuationMetrics: {
    marketValue: string;
    annualGrowth: string;
    userBase: string;
    dataPoints: string;
  };
  dataDictionary: Array<{
    field: string;
    type: string;
    count: string;
    unique: string;
    missing: string;
    description: string;
  }>;
  sampleData: SampleDataRow[];
  categoryDistribution?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  geographicCoverage?: Array<{
    region: string;
    countries: number;
    percentage: number;
  }>;
}

// Fintech数据集 - 数字支付交易分析
export const fintechDataset: DatasetConfig = {
  id: "7",
  title: "Global Digital Payment Transaction Analytics",
  provider: "FinTech Insights Pro",
  category: "Financial Data",
  rating: 4.9,
  reviews: 234,
  records: "18.5M+",
  coverage: "85 countries",
  quality: 99,
  lastUpdated: "2024-01-18",
  features: [
    "Real-time processing",
    "Fraud detection metrics",
    "Multi-currency support",
    "Regulatory compliance",
  ],
  description:
    "Comprehensive global digital payment transaction dataset covering mobile payments, digital wallets, cryptocurrency transactions, and traditional online payments across 85 countries with advanced fraud detection and risk assessment metrics.",
  keyFeatures: [
    "Multi-channel payment data",
    "Real-time fraud scoring",
    "Cross-border transaction analysis",
    "Regulatory compliance tracking",
  ],
  valuationMetrics: {
    marketValue: "$125M+",
    annualGrowth: "+28%",
    userBase: "2.5M+ merchants",
    dataPoints: "65+ attributes",
  },
  dataDictionary: [
    {
      field: "transaction_id",
      type: "String",
      count: "18,547,892",
      unique: "18,547,892",
      missing: "0%",
      description: "Unique transaction identifier (UUID format)",
    },
    {
      field: "transaction_timestamp",
      type: "DateTime",
      count: "18,547,892",
      unique: "18,234,567",
      missing: "0%",
      description: "Transaction timestamp in UTC (ISO 8601 format)",
    },
    {
      field: "payment_method",
      type: "String",
      count: "18,547,892",
      unique: "12",
      missing: "0.1%",
      description:
        "Payment method type (credit_card, digital_wallet, crypto, etc.)",
    },
    {
      field: "transaction_amount",
      type: "Decimal",
      count: "18,547,892",
      unique: "2,847,293",
      missing: "0%",
      description: "Transaction amount in original currency",
    },
    {
      field: "currency_code",
      type: "String",
      count: "18,547,892",
      unique: "147",
      missing: "0%",
      description: "ISO 4217 currency code",
    },
    {
      field: "merchant_category",
      type: "String",
      count: "18,547,892",
      unique: "28",
      missing: "0.3%",
      description: "Merchant category code classification",
    },
    {
      field: "fraud_score",
      type: "Float",
      count: "18,547,892",
      unique: "1000",
      missing: "0.8%",
      description: "ML-based fraud risk score (0-100)",
    },
    {
      field: "country_code",
      type: "String",
      count: "18,547,892",
      unique: "85",
      missing: "0%",
      description: "ISO 3166-1 alpha-2 country code",
    },
  ],
  sampleData: [
    {
      transaction_id: "TXN_4A7B9C2D1E",
      transaction_timestamp: "2024-01-18T14:23:45Z",
      payment_method: "digital_wallet",
      transaction_amount: 156.78,
      currency_code: "USD",
      merchant_category: "E-commerce",
      fraud_score: 12.3,
      country_code: "US",
    },
    {
      transaction_id: "TXN_8F3E6B1A5C",
      transaction_timestamp: "2024-01-18T14:24:12Z",
      payment_method: "credit_card",
      transaction_amount: 89.5,
      currency_code: "EUR",
      merchant_category: "Retail",
      fraud_score: 8.7,
      country_code: "DE",
    },
    {
      transaction_id: "TXN_2D9F4C7E8A",
      transaction_timestamp: "2024-01-18T14:24:33Z",
      payment_method: "cryptocurrency",
      transaction_amount: 0.0034,
      currency_code: "BTC",
      merchant_category: "Digital Services",
      fraud_score: 15.6,
      country_code: "SG",
    },
    {
      transaction_id: "TXN_6B1E9A3F7D",
      transaction_timestamp: "2024-01-18T14:25:01Z",
      payment_method: "bank_transfer",
      transaction_amount: 2450.0,
      currency_code: "GBP",
      merchant_category: "Professional Services",
      fraud_score: 5.2,
      country_code: "GB",
    },
    {
      transaction_id: "TXN_9C5A2F8B4E",
      transaction_timestamp: "2024-01-18T14:25:28Z",
      payment_method: "mobile_payment",
      transaction_amount: 23.75,
      currency_code: "JPY",
      merchant_category: "Food & Beverage",
      fraud_score: 3.9,
      country_code: "JP",
    },
  ],
  categoryDistribution: [
    { name: "E-commerce", value: 32, color: "#3B82F6" },
    { name: "Retail", value: 24, color: "#10B981" },
    { name: "Digital Services", value: 18, color: "#F59E0B" },
    { name: "Professional Services", value: 12, color: "#8B5CF6" },
    { name: "Food & Beverage", value: 8, color: "#EF4444" },
    { name: "Others", value: 6, color: "#6B7280" },
  ],
  geographicCoverage: [
    { region: "North America", countries: 3, percentage: 28 },
    { region: "Europe", countries: 27, percentage: 35 },
    { region: "Asia Pacific", countries: 18, percentage: 25 },
    { region: "Latin America", countries: 22, percentage: 8 },
    { region: "Middle East & Africa", countries: 15, percentage: 4 },
  ],
};

// B2B数据集 - 企业销售线索情报
export const b2bDataset: DatasetConfig = {
  id: "8",
  title: "Global B2B Sales Intelligence Database",
  provider: "BizIntel Solutions",
  category: "Business Data",
  rating: 4.7,
  reviews: 189,
  records: "12.3M+",
  coverage: "195 countries",
  quality: 96,
  lastUpdated: "2024-01-17",
  features: [
    "Real-time company updates",
    "Contact verification",
    "Intent data signals",
    "Technographic insights",
  ],
  description:
    "Comprehensive B2B sales intelligence database featuring verified company profiles, decision-maker contacts, technology stack information, and buying intent signals across 195 countries for enterprise sales and marketing teams.",
  keyFeatures: [
    "Verified contact information",
    "Company firmographic data",
    "Technology adoption insights",
    "Buying intent signals",
  ],
  valuationMetrics: {
    marketValue: "$85M+",
    annualGrowth: "+22%",
    userBase: "850K+ companies",
    dataPoints: "120+ attributes",
  },
  dataDictionary: [
    {
      field: "company_id",
      type: "String",
      count: "12,347,892",
      unique: "12,347,892",
      missing: "0%",
      description: "Unique company identifier",
    },
    {
      field: "company_name",
      type: "String",
      count: "12,347,892",
      unique: "12,298,456",
      missing: "0%",
      description: "Official registered company name",
    },
    {
      field: "industry_sector",
      type: "String",
      count: "12,347,892",
      unique: "42",
      missing: "0.8%",
      description: "Primary industry classification (NAICS based)",
    },
    {
      field: "employee_count",
      type: "Integer",
      count: "12,347,892",
      unique: "15",
      missing: "2.3%",
      description: "Employee count range classification",
    },
    {
      field: "annual_revenue",
      type: "String",
      count: "12,347,892",
      unique: "12",
      missing: "15.6%",
      description: "Annual revenue range in USD",
    },
    {
      field: "headquarters_country",
      type: "String",
      count: "12,347,892",
      unique: "195",
      missing: "0.1%",
      description: "Country of headquarters location",
    },
    {
      field: "technology_stack",
      type: "Array",
      count: "12,347,892",
      unique: "8,945",
      missing: "12.4%",
      description: "Detected technology and software usage",
    },
    {
      field: "intent_score",
      type: "Integer",
      count: "12,347,892",
      unique: "100",
      missing: "8.9%",
      description: "Buying intent score (0-100) based on digital signals",
    },
  ],
  sampleData: [
    {
      company_id: "CMP_A7F9E2B4C1",
      company_name: "TechCorp Industries Ltd",
      industry_sector: "Software & Technology",
      employee_count: "501-1000",
      annual_revenue: "$50M-$100M",
      headquarters_country: "United States",
      technology_stack: "Salesforce, AWS, HubSpot",
      intent_score: 78,
    },
    {
      company_id: "CMP_B3D8F1A6E9",
      company_name: "Global Manufacturing Solutions",
      industry_sector: "Manufacturing",
      employee_count: "1001-5000",
      annual_revenue: "$100M-$500M",
      headquarters_country: "Germany",
      technology_stack: "SAP, Microsoft Azure, Oracle",
      intent_score: 65,
    },
    {
      company_id: "CMP_C9E4A2F7B5",
      company_name: "FinanceFirst Consulting",
      industry_sector: "Financial Services",
      employee_count: "201-500",
      annual_revenue: "$10M-$50M",
      headquarters_country: "United Kingdom",
      technology_stack: "Tableau, Snowflake, Slack",
      intent_score: 89,
    },
    {
      company_id: "CMP_D1F6B9C3E8",
      company_name: "Healthcare Innovations Inc",
      industry_sector: "Healthcare & Life Sciences",
      employee_count: "101-200",
      annual_revenue: "$5M-$10M",
      headquarters_country: "Canada",
      technology_stack: "Epic, Cerner, Zoom",
      intent_score: 42,
    },
    {
      company_id: "CMP_E8A5C2D4F7",
      company_name: "RetailMax Solutions",
      industry_sector: "Retail & E-commerce",
      employee_count: "51-100",
      annual_revenue: "$1M-$5M",
      headquarters_country: "Australia",
      technology_stack: "Shopify, Google Analytics, Mailchimp",
      intent_score: 73,
    },
  ],
  categoryDistribution: [
    { name: "Software & Technology", value: 28, color: "#3B82F6" },
    { name: "Manufacturing", value: 22, color: "#10B981" },
    { name: "Financial Services", value: 18, color: "#F59E0B" },
    { name: "Healthcare & Life Sciences", value: 15, color: "#8B5CF6" },
    { name: "Retail & E-commerce", value: 10, color: "#EF4444" },
    { name: "Others", value: 7, color: "#6B7280" },
  ],
  geographicCoverage: [
    { region: "North America", countries: 3, percentage: 42 },
    { region: "Europe", countries: 45, percentage: 31 },
    { region: "Asia Pacific", countries: 52, percentage: 18 },
    { region: "Latin America", countries: 33, percentage: 6 },
    { region: "Middle East & Africa", countries: 62, percentage: 3 },
  ],
};

// E-commerce数据集 - 跨境电商消费者行为
export const ecommerceDataset: DatasetConfig = {
  id: "9",
  title: "Cross-border E-commerce Consumer Behavior Dataset",
  provider: "Global Commerce Analytics",
  category: "Consumer Data",
  rating: 4.8,
  reviews: 312,
  records: "25.7M+",
  coverage: "168 countries",
  quality: 97,
  lastUpdated: "2024-01-19",
  features: [
    "Multi-platform tracking",
    "Real-time behavioral data",
    "Cross-device attribution",
    "Personalization insights",
  ],
  description:
    "Advanced cross-border e-commerce consumer behavior dataset capturing shopping patterns, preferences, and purchase journeys across multiple platforms and devices in 168 countries, with deep insights into international shopping trends.",
  keyFeatures: [
    "Cross-platform consumer journey",
    "International shipping preferences",
    "Multi-currency transaction data",
    "Cultural shopping behavior analysis",
  ],
  valuationMetrics: {
    marketValue: "$95M+",
    annualGrowth: "+31%",
    userBase: "5.2M+ consumers",
    dataPoints: "85+ attributes",
  },
  dataDictionary: [
    {
      field: "session_id",
      type: "String",
      count: "25,748,392",
      unique: "25,748,392",
      missing: "0%",
      description: "Unique shopping session identifier",
    },
    {
      field: "user_id",
      type: "String",
      count: "25,748,392",
      unique: "5,234,567",
      missing: "0%",
      description: "Anonymized unique user identifier",
    },
    {
      field: "session_start_time",
      type: "DateTime",
      count: "25,748,392",
      unique: "25,234,891",
      missing: "0%",
      description: "Session start timestamp in UTC",
    },
    {
      field: "platform_type",
      type: "String",
      count: "25,748,392",
      unique: "8",
      missing: "0.1%",
      description:
        "Shopping platform type (mobile_app, web, marketplace, etc.)",
    },
    {
      field: "product_category",
      type: "String",
      count: "25,748,392",
      unique: "156",
      missing: "0.3%",
      description: "Primary product category browsed/purchased",
    },
    {
      field: "purchase_amount_usd",
      type: "Decimal",
      count: "25,748,392",
      unique: "1,892,456",
      missing: "18.7%",
      description:
        "Purchase amount converted to USD (null for non-purchase sessions)",
    },
    {
      field: "shipping_country",
      type: "String",
      count: "25,748,392",
      unique: "168",
      missing: "0%",
      description: "Customer's shipping country code",
    },
    {
      field: "device_type",
      type: "String",
      count: "25,748,392",
      unique: "6",
      missing: "0.2%",
      description: "Device type used for shopping session",
    },
  ],
  sampleData: [
    {
      session_id: "SES_9F4E7A2B8C1D",
      user_id: "USR_A8F3E1B6D9C2",
      session_start_time: "2024-01-19T09:15:23Z",
      platform_type: "mobile_app",
      product_category: "Fashion & Apparel",
      purchase_amount_usd: 127.5,
      shipping_country: "CA",
      device_type: "smartphone",
    },
    {
      session_id: "SES_3B7D9A4F2E8C",
      user_id: "USR_F2D8B4A7E1C9",
      session_start_time: "2024-01-19T09:16:45Z",
      platform_type: "web_browser",
      product_category: "Electronics",
      purchase_amount_usd: 589.99,
      shipping_country: "DE",
      device_type: "desktop",
    },
    {
      session_id: "SES_7E1C5F9A3B4D",
      user_id: "USR_C9E4F7A2B8D1",
      session_start_time: "2024-01-19T09:17:12Z",
      platform_type: "marketplace",
      product_category: "Home & Garden",
      purchase_amount_usd: null,
      shipping_country: "AU",
      device_type: "tablet",
    },
    {
      session_id: "SES_2A8F4C6E9B7D",
      user_id: "USR_B7F9A3E4C2D8",
      session_start_time: "2024-01-19T09:18:34Z",
      platform_type: "social_commerce",
      product_category: "Beauty & Personal Care",
      purchase_amount_usd: 78.25,
      shipping_country: "JP",
      device_type: "smartphone",
    },
    {
      session_id: "SES_6D3A9F1E4B8C",
      user_id: "USR_E1A9F4B7C3D6",
      session_start_time: "2024-01-19T09:19:01Z",
      platform_type: "mobile_app",
      product_category: "Sports & Outdoors",
      purchase_amount_usd: 234.8,
      shipping_country: "BR",
      device_type: "smartphone",
    },
  ],
  categoryDistribution: [
    { name: "Fashion & Apparel", value: 26, color: "#3B82F6" },
    { name: "Electronics", value: 21, color: "#10B981" },
    { name: "Home & Garden", value: 18, color: "#F59E0B" },
    { name: "Beauty & Personal Care", value: 14, color: "#8B5CF6" },
    { name: "Sports & Outdoors", value: 12, color: "#EF4444" },
    { name: "Others", value: 9, color: "#6B7280" },
  ],
  geographicCoverage: [
    { region: "Asia Pacific", countries: 58, percentage: 34 },
    { region: "Europe", countries: 47, percentage: 29 },
    { region: "North America", countries: 3, percentage: 22 },
    { region: "Latin America", countries: 35, percentage: 10 },
    { region: "Middle East & Africa", countries: 25, percentage: 5 },
  ],
};

// 导出所有数据集配置
export const sampleDatasets: Record<string, DatasetConfig> = {
  "7": fintechDataset,
  "8": b2bDataset,
  "9": ecommerceDataset,
};

// 获取数据集配置的辅助函数
export function getDatasetConfig(id: string): DatasetConfig | null {
  return sampleDatasets[id] || null;
}
