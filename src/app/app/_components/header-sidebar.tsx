import { Icons } from "@/components/icons";

export function HeaderSidebar() {
    return (
        <div className="w-full h-16 flex items-center justify-center px-4 space-x-5 mt-3">
            <Icons.logo className="w-5 h-5" />
            <p className="text-xl font-bold">GERVENTS</p>
        </div>
    )
}