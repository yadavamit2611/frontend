import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./src/Header";
import Footer from "./src/Footer";
import Error from "./src/Error";
import Body from "./src/Body";
import Admin from "./src/Admin";
import Info from "./src/Info";
import Upload from "./src/Upload";
import { ThemeProvider } from "@material-tailwind/react";

const AppLayout = () => {
return (<>
    <Header/>
    <Outlet/>
    <Footer/>
</>)
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/admin",
                element: <Admin />               
            },
            {
                path: "/info",
                element: <Info />
            },
            {
                path: "/upload",
                element: <Upload />
            }
        ]
    }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ThemeProvider><RouterProvider router={appRouter}/></ThemeProvider>);