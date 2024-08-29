
import { HeaderSidebar } from "./header-sidebar";
import { NavSideBar } from "./nav-side-bar";

export default function MainSidebar() {
    return (
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-slate-100 lg:block">
         <HeaderSidebar />
        </div>
      </div>
    )
}