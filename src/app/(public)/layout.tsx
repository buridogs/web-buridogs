import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/HeaderWrapper";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="flex flex-col">
                <main className="pt-[110px]">{children}</main>
            </div>
            <Footer />
        </>
    );
}
