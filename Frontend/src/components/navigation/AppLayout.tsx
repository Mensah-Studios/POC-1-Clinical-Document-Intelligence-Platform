import { Outlet } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import Sidebar from "./Sidebar";

export default function AppLayout(): JSX.Element {
    return <div className="flex h-screen w-screen overflow-hidden bg-surface-2 text-left font-body">
        <Sidebar />
        <main className="flex flex-1 flex-col overflow-y-auto">
            <Outlet />
        </main>
    </div>
}
