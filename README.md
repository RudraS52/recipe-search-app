# 🍳 Recipe Search App

A responsive recipe search application built with **React.js, JavaScript, and TheMealDB API** to help users discover recipes through a simple and intuitive interface.

The project demonstrates practical frontend development skills, including reusable React components, API integration, search functionality, autocomplete suggestions, and responsive UI design. Future enhancements will explore AI-powered recipe discovery through natural-language prompts.

## ✨ Features

- 🔍 **Recipe Search** — Search for recipes using recipe names or keywords.
- 💡 **Autocomplete Suggestions** — Get search suggestions while typing.
- 🥗 **Recipe Discovery** — Retrieve matching recipes using TheMealDB API.
- 📱 **Responsive UI** — Designed for desktop and mobile screens.
- 🧩 **Reusable Components** — Organized component-based architecture.
- 🎨 **Custom Styling** — Styled using CSS and the Poppins font.
- 🍽️ **Empty State** — Displays a cooking-themed illustration before searching.
- 🧭 **Reusable Layout** — Header and footer components provide a consistent interface.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Programming Language:** JavaScript (ES6+)
- **Styling:** CSS3, Poppins
- **API Integration:** TheMealDB API
- **Package Manager:** npm
- **Build Tool:** Create React App
- **Deployment:** GitHub Pages

## 📂 Project Structure

```text
my-recipe-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Footer.js
│   │   ├── Footer.css
│   │   ├── SearchBar.js
│   │   ├── SearchBar.css
│   │   ├── RecipeList.js
│   │   ├── RecipeList.css
│   │   ├── RecipeCard.js
│   │   └── RecipeCard.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── package-lock.json
└── README.md
```

## 🚀 Getting Started

Follow these instructions to run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- Git (optional, for cloning the repository)

### 1. Clone the repository

```bash
git clone https://github.com/RudraS52/recipe-search-app.git
```

### 2. Navigate to the project directory

```bash
cd recipe-search-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📡 API Integration

The application uses **TheMealDB API** to retrieve recipe information.

- **API Provider:** [TheMealDB](https://www.themealdb.com/api.php)
- **Documentation:** [TheMealDB API Documentation](https://www.themealdb.com/api.php)

The API supplies recipe data that the application can use to display relevant search results.

## 🏗️ Build for Production

Create an optimized production build by running:

```bash
npm run build
```

The generated files will be available in the `build/` directory.

## 🌐 Live Demo

[**View Recipe Search App**](https://rudras52.github.io/recipe-search-app/)

## 🔮 Upcoming Features

The project roadmap includes AI-powered functionality to make recipe discovery more interactive and personalized.

- 🤖 **AI-Powered Recipe Assistant** — Integrate an AI API to interpret cooking requests and assist users in finding suitable recipes.
- 💬 **Prompt-Based Recipe Search** — Let users describe what they want in natural language instead of relying only on keywords.
- 🥗 **Personalized Recipe Recommendations** — Recommend recipes based on available ingredients, dietary preferences, and user requirements.
- 🧑‍🍳 **Step-by-Step Cooking Guidance** — Provide cooking instructions, preparation tips, and ingredient substitution suggestions.
- 🥦 **Smart Ingredient Substitutions** — Suggest alternatives when specific ingredients are unavailable.
- 🧠 **Context-Aware Conversations** — Support follow-up prompts that refine earlier suggestions.

### 💡 Example AI Prompt

> I have eggs, spinach, and cheese. Suggest three easy breakfast recipes that take less than 20 minutes to prepare.

### Planned AI Integration

The proposed AI functionality will explore:

1. Integrating a suitable AI API.
2. Building a prompt-based chat interface with React.
3. Processing natural-language recipe requests.
4. Connecting AI suggestions with recipe data where appropriate.
5. Supporting conversational follow-up questions.
6. Handling loading states, API errors, and empty responses.

**Status:** Planned for a future release. AI functionality is not yet included in the current application.

## 🎯 Learning Objectives

This project demonstrates practical frontend development concepts:

- Building reusable components with React.
- Managing component state and user interactions.
- Implementing search and autocomplete functionality.
- Integrating a REST API.
- Displaying dynamically retrieved data.
- Creating responsive layouts using CSS.
- Organizing a maintainable component-based application.
- Preparing production builds and deploying with GitHub Pages.

## 👨‍💻 Author

**Rudra Singh**

Frontend Developer | React.js | JavaScript | UI Development | ASP.NET MVC/.NET

- **GitHub:** [RudraS52](https://github.com/RudraS52)
- **LinkedIn:** [Connect with me](https://www.linkedin.com/in/web-developer-rp-singh/)
- **Portfolio:** [Visit my portfolio](https://portfolio-jade-nine-36.vercel.app/)

---

⭐ If you find this project useful, explore the repository and share your feedback.

*Built with React.js and a passion for creating practical, user-friendly web applications.*
