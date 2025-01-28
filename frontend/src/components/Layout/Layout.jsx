import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

export const Layout = () => {
    const location = useLocation();
    return <>
        {location.pathname !== "/login" && <Sidebar />}
        {location.pathname !== "/login" && <Header />}
    </>
}