import { BLOGO_STORAGE_URL_LINK } from "@/services/storage";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaRegHandshake } from "react-icons/fa6";

interface ModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Modal({ setIsOpen }: ModalProps) {
    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="w-[320px] relative transform overflow-hidden rounded-lg bg-primary-100  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-primary-100  px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="flex flex-col items-center">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-700 sm:mx-0 sm:h-16 sm:w-16">
                                    <FaRegHandshake
                                        color="white"
                                        size={40}
                                    />
                                </div>
                                <div className="w-[80%] mt-3 flex justify-evenly">
                                    <div className="bg-white flex flex-col justify-center items-center px-4 py-4 border-[1.5px] border-solid border-primary-100 rounded-lg">
                                        <Image
                                            src={`${BLOGO_STORAGE_URL_LINK}/voluntario-diogo.png`}
                                            alt="Voluntário Diogo Almazan"
                                            width={50}
                                            height={50}
                                            className="rounded-[50%] mb-2"
                                            priority
                                        />
                                        <strong className="max-w-[80px] text-sm font-semibold text-center leading-5 text-gray-900">
                                            Diogo de P. Almazan
                                        </strong>
                                    </div>

                                    <div className="bg-white flex flex-col justify-center items-center px-4 py-4 border-[1.5px] border-solid border-primary-100 rounded-lg">
                                        <Image
                                            src={`${BLOGO_STORAGE_URL_LINK}/voluntario-joao.png`}
                                            alt="Voluntário João Carlos"
                                            width={50}
                                            height={50}
                                            className="rounded-[50%] mb-2"
                                            priority
                                        />
                                        <strong className="max-w-[80px] text-sm font-semibold text-center leading-5 text-gray-900">
                                            João Carlos Lot
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-primary-100 px-4 py-3 flex justify-center sm:px-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset transition-all duration-150 hover:bg-white hover:text-red-600 sm:mt-0"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
