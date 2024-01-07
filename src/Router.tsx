import { createBrowserRouter } from "react-router-dom";
import ErrorComponent from "./Components/ErrorComponent";
import Home from "./Routes/Home";
import NotFound from "./Routes/NotFound";
import Root from "./Routes/Root";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Home />,
                errorElement: <ErrorComponent />
            },
            {
                path: "react-master-final",
                element: <Home />,
                errorElement: <ErrorComponent />
            },
            {
                path: "tv/*",
                element: <Tv />,
                errorElement: <ErrorComponent />
            },
            {
                path: "search",
                element: <Search />,
                errorElement: <ErrorComponent />
            },
            {
                path: "movie/*",
                element: <Home />,
                errorElement: <ErrorComponent />,
            },
        ]
    }], 
    {
        basename: "/react-master-final",
    }
);

export default router;