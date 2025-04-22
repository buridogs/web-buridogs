import { Metadata } from "next";
import LoginContainer from "@/components/app/login/LoginContainer";

export const metadata: Metadata = {
    title: "Login",
    description: "Acesse o sistema do Buridogs",
    openGraph: {
        images: ["logo-buridogs.png"],
    },
};

export default function LoginPage() {
    return (
        <main className="bg-white">
            <div className="max-w-screen-xl mx-auto px-8 py-11 flex flex-col item-center md:py-12">
                <LoginContainer />
            </div>
        </main>
    );
}
