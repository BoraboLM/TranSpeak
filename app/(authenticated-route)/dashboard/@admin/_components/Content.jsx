import Dashboard from "./component_pages/Dashboard";
import Learn from "./component_pages/Learn";
import SystemLogs from "./component_pages/SystemLogs";
import UserActivityLogs from "./component_pages/SystemLogs";
import Users from "./component_pages/Users";

export default function Content() {
    return (
        <div className="rounded-l-[30px]">
            {/* <Dashboard /> */}
            <Users />
            {/* <Learn /> */}
            {/* <SystemLogs /> */}
        </div>
    )
}