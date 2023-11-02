import { Dispatch, ReactNode, SetStateAction } from "react";

interface ModalProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    content: ReactNode;
    closeButtonLabel?: string;
}

export function Modal({ setIsOpen, content, closeButtonLabel = "Fechar" }: ModalProps) {
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
                        {content}
                        <div className="px-4 py-3 flex justify-center sm:px-6">
                            <button
                                onClick={() => setIsOpen(false)}
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset transition-all duration-150 hover:bg-white hover:text-red-600 sm:mt-0"
                            >
                                {closeButtonLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
