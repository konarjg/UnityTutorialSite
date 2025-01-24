import { Home } from "./components/Home";
import { EditorPanel } from "./components/EditorPanel";

const AppRoutes = [
    {
        index: true,
        path: "/",
        element: <Home />
    },
    {
        index: false,
        path: "/EditorPanel",
        element: <EditorPanel />
    }
];

export default AppRoutes;
