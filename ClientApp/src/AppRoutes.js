import { Home } from "./components/Home";
import { Tutorials } from "./components/Tutorials";
import { About } from "./components/About";

const AppRoutes = [
    {
        index: true,
        path: "/",
        element: <Home />
    },
    {
        index: false,
        path: "/Tutorials",
        element: <Tutorials />
    },
    {
        index: false,
        path: "/About",
        element: <About />
    }
];

export default AppRoutes;
