import WrapperPrivateLayout from "./components/WrapperPrivatePages";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
    return <WrapperPrivateLayout>{children}</WrapperPrivateLayout>;
}
