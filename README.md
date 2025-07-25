# Datrix - AI-Powered Data Analysis Platform

A modern, AI-powered data analysis platform built with Next.js 15, React 19, and TypeScript. Datrix helps business professionals upload, analyze, and gain insights from their data using advanced AI technology.

![Datrix Banner](https://via.placeholder.com/1200x400/3B82F6/FFFFFF?text=Datrix+AI+Data+Analysis)

## ✨ Features

### 🤖 **AI-Powered Analysis**

- **Smart AI Assistant**: ChatGPT-style interface for data analysis
- **Interactive Queries**: Ask natural language questions like "Who are the top 5 customers by revenue?"
- **Dynamic Results**: Generate tables, charts, and insights based on user queries
- **Left-Right Layout**: Chat interface on the left, analysis results on the right

### 💬 **Intelligent Chatbot**

- **Global Assistant**: Available across all pages to help with data analysis
- **Smart Matching**: Keyword-based intelligent responses for analysis guidance
- **Quick Suggestions**: Contextual follow-up questions and recommendations
- **Analysis Recommendations**: Direct suggestions for data exploration

### 📊 **Rich Data Visualization**

- **Interactive Charts**: Built with Recharts for responsive data visualization
- **Statistical Analysis**: Comprehensive data quality metrics and distribution charts
- **Trend Analysis**: Time-series data with growth patterns and seasonal insights
- **Custom Dashboards**: Personalized views of your analysis results

### 🎨 **Modern UI/UX**

- **Clean Interface**: Minimalist design focused on data insights
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile
- **Dark/Light Mode**: Choose your preferred viewing experience
- **Intuitive Navigation**: Left sidebar for easy access to core features

### 📁 **Data Management**

- **Multiple Formats**: Support for CSV, Excel, JSON, and more
- **Data Validation**: Automatic quality checks and cleaning suggestions
- **Version Control**: Track changes and maintain data history
- **Export Options**: Download results in various formats

### 🔒 **Security & Privacy**

- **Data Encryption**: All data encrypted in transit and at rest
- **Privacy First**: Your data stays secure and private
- **GDPR Compliant**: Full compliance with data protection regulations
- **Access Controls**: Secure user authentication and authorization

## 🏗️ Project Structure

```
src/
├── app/                   # Next.js 13+ app directory
│   ├── dashboard/         # Main dashboard interface
│   ├── upload/           # Data upload interface
│   ├── history/          # Analysis history
│   ├── models/           # Saved analysis models
│   ├── overview/         # Data overview and exploration
│   ├── goals/            # Analysis goal setting
│   ├── processing/       # Real-time processing interface
│   ├── results/          # Analysis results display
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Homepage
├── components/           # Reusable React components
│   ├── ui/              # shadcn/ui components
│   ├── sidebar.tsx      # Navigation sidebar
│   ├── ai-analysis-modal.tsx  # AI analysis interface
│   └── chat-bot.tsx     # Global chatbot component
├── contexts/            # React context providers
│   └── analysis-context.tsx # Analysis state management
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and configurations
└── public/              # Static assets
```

## 🎯 Key Features Walkthrough

### 1. **Dashboard**

- Overview of analysis activities
- Quick access to recent analyses
- Performance metrics and statistics
- One-click access to core features

### 2. **Data Upload**

- Drag-and-drop file upload
- Format validation and preprocessing
- Data quality assessment
- Column mapping and type detection

### 3. **AI Analysis Interface**

- Natural language query processing
- Dynamic result generation
- Interactive tables and charts
- Contextual insights and recommendations

### 4. **Analysis History**

- Complete record of past analyses
- Search and filter functionality
- Re-run previous analyses
- Export and share results

### 5. **Saved Models**

- Save analysis configurations for reuse
- Template-based quick start
- Custom model creation
- Version management

## 📊 Sample Analysis Capabilities

The platform supports various types of data analysis:

1. **Marketing Analysis** - Campaign performance and ROI analysis

   - Customer acquisition metrics
   - Channel effectiveness tracking
   - Conversion funnel optimization

2. **Sales Intelligence** - Revenue and performance insights

   - Sales trend analysis
   - Customer segmentation
   - Pipeline forecasting

3. **Customer Analytics** - Behavior and demographic analysis
   - Customer lifetime value
   - Churn prediction
   - Satisfaction scoring

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/datrix.git
   cd datrix
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with new features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling

### UI Components

- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built component library
- **Lucide React** - Beautiful SVG icons
- **Recharts** - Composable charting library

### Development Tools

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on every push to main

### Other Platforms

- **Netlify**: Configure build command as `npm run build`
- **AWS Amplify**: Use the default Next.js build settings
- **Docker**: Create a Dockerfile for containerized deployment

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help:

- 📧 Email: support@datrix.com
- 💬 Discord: [Join our community](https://discord.gg/datrix)
- 📚 Documentation: [docs.datrix.com](https://docs.datrix.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/datrix/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives
- [Recharts](https://recharts.org/) - A composable charting library
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons

---

**Built with ❤️ by the Datrix Team**

_Transform your data into insights with Datrix - the AI-powered data analysis platform._
