import { Home } from "./components/home/Home";
import { EditorPanel } from "./components/editorPanel/EditorPanel";

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
