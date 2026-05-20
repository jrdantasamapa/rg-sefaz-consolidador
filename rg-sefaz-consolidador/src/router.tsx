import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { UnidadesSetores } from "./pages/UnidadesSetores";
import { MatrizItens } from "./pages/MatrizItens";
import { RespostaItem } from "./pages/RespostaItem";
import { Evidencias } from "./pages/Evidencias";
import { Pendencias } from "./pages/Pendencias";
import { RevisaoConsolidacao } from "./pages/RevisaoConsolidacao";
import { PreviaRelatorio } from "./pages/PreviaRelatorio";
import { Formularios } from "./pages/Formularios";
import { DashboardFormularios } from "./pages/DashboardFormularios";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "dashboard-formularios", element: <DashboardFormularios /> },
      { path: "unidades-setores", element: <UnidadesSetores /> },
      { path: "matriz-itens", element: <MatrizItens /> },
      { path: "consolidacao/:itemId?", element: <RespostaItem /> },
      { path: "formularios/:itemId?", element: <Formularios /> },
      { path: "evidencias", element: <Evidencias /> },
      { path: "pendencias", element: <Pendencias /> },
      { path: "revisao", element: <RevisaoConsolidacao /> },
      { path: "previa-relatorio", element: <PreviaRelatorio /> },
    ],
  },
]);
