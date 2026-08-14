# NextAuth.js Project

A Next.js application with authentication powered by NextAuth.js.

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd NextAuth
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- User authentication with NextAuth.js
- Session management
- Protected API routes and pages
- Sign in / Sign out functionality

## Project Structure

```
├── pages/
│   ├── api/
│   │   └── auth/[...nextauth].js
│   ├── index.js
│   └── ...
├── components/
├── public/
├── .env.local
└── package.json
```

## Technologies Used

- Next.js
- NextAuth.js
- Node.js

## Learn More

- [NextAuth.js Documentation](https://next-auth.js.org)
- [Next.js Documentation](https://nextjs.org)

## Deployment

You can deploy this app to platforms like Vercel or Netlify. After deploying, add the deployment URL to NEXTAUTH_URL in your environment variables.

- Live Demo: https://next-auth-sepia-kappa.vercel.app

## License

MIT
