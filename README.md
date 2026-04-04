# Modern E-Commerce Store

A high-performance, responsive e-commerce application built with React, TypeScript, and Tailwind CSS.

## Features

- 🛒 **Shopping Cart**: Add, remove, and manage items in your cart.
- 📦 **Product Management**: Admin dashboard to add, edit, and delete products.
- 🔍 **Product Details**: Dedicated pages for every product with rich information.
- 📱 **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- 🔥 **Firebase Integration**: Real-time data storage and authentication.
- 🎨 **Modern UI**: Clean, professional design using Tailwind CSS and Lucide icons.

## Getting Started

To run this project locally:

1. **Clone the repository**:
   ```bash
   git clone <your-github-repo-url>
   cd <repo-name>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## Deployment to GitHub Pages

To deploy this app to GitHub Pages:

1. Install the `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```

2. Add the following to your `package.json`:
   ```json
   "homepage": "https://<your-username>.github.io/<repo-name>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Run the deploy command:
   ```bash
   npm run deploy
   ```

## License

MIT
