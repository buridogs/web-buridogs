import { Metadata } from "next";
import AdminDashboardContainer from "@/components/app/admin/AdminDashboardContainer";

export const metadata: Metadata = {
    title: "Dashboard Administrativo",
    description: "Painel de administração do Buridogs",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function AdminPage() {
    return <AdminDashboardContainer />;
}
