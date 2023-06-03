import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SuperHeroesPage from "./components/SuperHeroesPage";
import RQSuperHeroesPage from "./components/RQSuperHeroesPage";
import Navbar from "./components/Navbar";
import { GlobalStyles } from "./components/styles/Global.styled";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import RQSuperHeroPage from "./components/RQSuperHeroPage";
import ParallelQueriesPage from "./components/ParallelQueriesPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rq-parallel" element={<ParallelQueriesPage />} />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          />
          <Route path="/super-heroes" element={<SuperHeroesPage />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPage />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;
