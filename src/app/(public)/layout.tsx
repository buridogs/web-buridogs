import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/HeaderWrapper";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-col flex-1">
                <main className="pt-[110px]">{children}</main>
            </div>
            <Footer />
        </div>
    );
}
