# 🚀 Crawler For Discovering Product URLs On E-commerce

Design and implement a web crawler whose primary task is to discover and list all product URLs across multiple e-commerce websites.

## System Requirements
Ensure your system meets the following requirements before proceeding:

- **Node.js**: v21.2.0 or higher
- **npm/yarn**: Latest version
- **Express.js**: Node backend framework

## Installation Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git

2. Open project in any editor:
    ```bash
    cd repo

3. Install dependencies:
   ```bash
   npm install

4. Set up environment variables:
    - Copy env.example to .env
    - Update .env with appropriate values for your local setup.

5. Start the backend server:
    ```bash
   npm run dev

## Crawl
Once server is started, we can invoke GET API /api/crawl and it will start crawling products from different domains. We can see a log as well in the terminal, and at the end will be getting JSON Response.

Happy Crawling 🚀 ....