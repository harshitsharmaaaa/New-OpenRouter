import "./index.css";
import { useState } from "react";
import type { App } from "app";
import { treaty } from "@elysiajs/eden";
import { BrowserRouter, Route, Routes } from "react-router";
import { SignUpPage } from "./pages/Signup";
import { SignInPage } from "./pages/SignIn";
import { DashboardPage } from "./pages/Dashboard";
import { CreditsPage } from "./pages/Credits";
import { ApiKeys } from "./pages/ApiKeys";
import { LandingPage } from "./pages/LandingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ElysiaClientContextProvider } from "./providers/Eden";

const queryClient = new QueryClient();

// Ensure cookies (auth session) are sent with every request
const client = treaty<App>("localhost:3000", {
  fetch: {
    credentials: "include",
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ElysiaClientContextProvider value={client}>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<LandingPage />} />
            <Route path={"/SignUp"} element={<SignUpPage />} />
            <Route path={"/SignIn"} element={<SignInPage />} />
            <Route path={"/dashboard"} element={<DashboardPage />} />
            <Route path={"/credits"} element={<CreditsPage />} />
            <Route path={"/api-keys"} element={<ApiKeys />} />
          </Routes>
        </BrowserRouter>
      </ElysiaClientContextProvider>
    </QueryClientProvider>
  );
}

export default App;
