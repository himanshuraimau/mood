
# Mood

Mood is a Gen AI-based journaling application designed to help users gain insights into their journal entries through advanced AI analysis. The app captures user entries, analyzes them, and provides valuable feedback on mood, sentiment, and key insights.

Live - [Mood](https://mood-nine-omega.vercel.app)

## Features

- **Intelligent Insights**: Analyze journal entries to get sentiment scores, mood detection, and summaries.
- **Interactive Q&A**: Ask questions about your journal entries and get precise answers based on the content.
- **Seamless Authentication**: Easily log in and manage your entries with secure authentication.

## Tech Stack

- **Frontend**: Built with [Next.js](https://nextjs.org/) for a fast and dynamic user interface.
- **Authentication**: Uses [Clerk](https://clerk.dev/) for seamless and secure user authentication.
- **Database**: Powered by [PostgreSQL](https://www.postgresql.org/) and managed with [Prisma](https://www.prisma.io/) for efficient data handling.
- **AI Analysis**: Leverages the [OpenAI API](https://openai.com/api) for analyzing journal entries and providing insightful feedback.
- **Deployment**: Deployed on [Vercel](https://vercel.com/) for reliable and scalable hosting.

## How It Works

1. **Data Collection**: Users create journal entries that are securely stored in the database.
2. **AI Analysis**: The app uses LangChain components, including `ChatOpenAI`, `PromptTemplate`, and `StructuredOutputParser`, to analyze entries and extract meaningful insights.
3. **Interactive Features**: Users can ask questions about their entries, and the app provides answers based on the analyzed data using `OpenAIEmbeddings` and `MemoryVectorStore`.

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/himanshuraimau/mood.git
   cd mood
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local and .env` file and add your environment variables for OpenAI API, Clerk, and PostgreSQL as mentioned in the example files.

4. **Run the App**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Visit `http://localhost:3000` to start using Mood.

## Contributing

Feel free to submit issues or pull requests to improve the app. Contributions are welcome!
