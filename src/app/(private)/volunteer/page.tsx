import { Metadata } from "next";
import VolunteerDashboardContainer from "@/components/app/volunteer/VolunteerDashboardContainer";

export const metadata: Metadata = {
    title: "Área do Voluntário",
    description: "Painel para voluntários do Buridogs",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function VolunteerPage() {
    return <VolunteerDashboardContainer />;
}
