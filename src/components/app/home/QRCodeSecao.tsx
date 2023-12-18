"use client";
import { BURIDOGS_PIX_KEY, BURIDOGS_QRCODE_CODE } from "@/utils/consts";
import QRCode from "react-qr-code";
import { useState } from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa6";
import { Tooltip } from "@/components/Tooltip/Tooltip";

export function QRCodeSecao() {
    const [showCopyText, setShowCopyText] = useState(false);

    const handleCopyText = () => {
        navigator.clipboard.writeText(BURIDOGS_PIX_KEY);
        setShowCopyText(true);
        setTimeout(() => {
            setShowCopyText(false);
        }, 1000);
    };

    return (
        <section className="w-full bg-grey-50">
            <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-evenly lg:flex-row px-8 py-8">
                <div className="flex flex-col py-8 max-w-[500px] md:pr-8 lg:ml-10">
                    <span className="text-grey-400 font-bold text-2xl leading-8 mb-8 lg:text-3xl">
                        Escaneie nosso QR Code e contribua para ajudarmos cada vez mais cachorros!
                    </span>
                    <span className="text-grey-400 text-xl leading-8 mb-8 lg:3xl">
                        Você pode contribuir com o Buri Dogs de uma forma bem simples. Basta
                        capturar o QR Code com a câmera do seu celular e realizar a doação. O PIX
                        estará em nome de{" "}
                        <strong className="text-primary-400">Christiane Simões</strong>.
                    </span>
                </div>
                <div className="flex flex-col items-center">
                    <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={BURIDOGS_QRCODE_CODE}
                        viewBox={"0 0 256 256"}
                    />
                    <div className="flex flex-col items-center mt-4 lg:flex-row">
                        <span className="font-medium mr-4">Chave PIX</span>
                        <button
                            onClick={handleCopyText}
                            className="flex items-center"
                        >
                            <span
                                id="pixkey"
                                className={`text-xl ${
                                    showCopyText ? "text-grey-400" : "text-primary-400"
                                } font-semibold mb-2 mr-3 lg:mb-0 lg:mr-2`}
                            >
                                {BURIDOGS_PIX_KEY}
                            </span>
                            {showCopyText ? (
                                <Tooltip tooltipLabel="Copiado">
                                    <FaClipboardCheck
                                        className="text-grey-400"
                                        color="primary-400"
                                        size={24}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip tooltipLabel="Copiar">
                                    <FaClipboard
                                        className="text-primary-400"
                                        size={24}
                                    />
                                </Tooltip>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
