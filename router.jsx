import { createBrowserRouter } from "react-router-dom";

import ModelCreate from "./src/pages/ModelCreate";
import ResultsPage from "./src/pages/ResultsPage";

export const router = createBrowserRouter(
    [
        { path: '/', element: <ModelCreate /> },
        { path: '/results', element: <ResultsPage />},
    ]
)