import { Home } from "./components/home/Home";
import { EditorPanel } from "./components/editorPanel/EditorPanel";
import { Login } from "./components/login/Login";
import { ForgotPassword } from "./components/login/ForgotPassword";

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
    },
    {
        index: false,
        path: "/Login",
        element: <Login />
    },
    {
        index: false,
        path: "/ForgotPassword",
        element: <ForgotPassword />
    }
];

export default AppRoutes;
