import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <div className="w-[100%] bg-white py-8">
            <section className="max-w-screen-xl flex justify-between items-center m-auto">
                <Link href="/">
                    <Image
                        src="/images/logo-buridogs.png"
                        alt="Buridogs logo"
                        width={150}
                        height={40}
                        priority
                    />
                </Link>
                <nav>
                    <Link href="/adocao">Adoção</Link>
                    <Link href="/finais-felizes">Finais Felizes</Link>
                    <Link href="/parceiros">Parceiros</Link>
                    <Link href="/sobre-nos">Sobre Nós</Link>
                    <Link href="/contato">Contato</Link>
                </nav>
            </section>
        </div>
    );
}
