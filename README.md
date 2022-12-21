# Armada Frontend

Armada's user interface is built with [React](https://reactjs.org/),
[React Router](https://reactrouter.com/en/main),
[TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/).

To get started:

1. Clone the GitHub repository.

```bash
gh repo clone team-armada/armada-frontend
cd armada-frontend
```

2. Install all dependencies.

```bash
npm install
```

3. Start the development server.

```
npm run dev
```

4. Navigate to `http://localhost:5173` and get started.

The Vite development server is configured to proxy requests to all endpoints
beginning with `api` to `http://localhost:3000`.

These settings can be accessed and configured via the `vite.config.ts` file
contained in the `root` directory.
