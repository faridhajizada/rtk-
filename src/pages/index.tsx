import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export function Main() {

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}