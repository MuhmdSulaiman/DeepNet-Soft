import { createBrowserRouter } from "react-router-dom";
import SignupForm from "./signup";
import LoginForm from "./login";
import CreateMenu from "./createmenu";
import MenuList from "./menuList";
import ViewMenuDetail from "./menufind";
import UpdateMenu from "./update";
// import Login from "./login";

const router=createBrowserRouter(
    [
        { path:"/signup",element:<SignupForm/>},
        { path:"/login",element:<LoginForm/>},
        { path:"/create",element:<CreateMenu/>},
        { path:"/",element:<MenuList/>},
        { path:"/find/:id",element:<ViewMenuDetail/>},
        { path:"/update/:id",element:<UpdateMenu/>}
        
]
);
export default router;