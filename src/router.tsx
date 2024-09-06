import { createBrowserRouter } from "react-router-dom";
import { Main } from "./pages";
import { Categories } from "./components/Categories";

export const router = createBrowserRouter([
   {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/categories',
                element: <Categories />,
            }
        ]
    }
])