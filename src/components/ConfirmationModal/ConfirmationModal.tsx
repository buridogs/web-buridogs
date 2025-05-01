"use client";

import React, { useEffect, useRef } from "react";

export interface ConfirmationModalProps {
    isOpen: boolean;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    onPrimaryAction: () => void;
    onSecondaryAction: () => void;
    onClose: () => void;
    isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    description,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryAction,
    onSecondaryAction,
    onClose,
    isLoading = false,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Close on ESC key press
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

            {/* Modal */}
            <div
                className="relative z-50 max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all"
                ref={modalRef}
            >
                {/* Title */}
                <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>

                {/* Description */}
                <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        onClick={onSecondaryAction}
                    >
                        {secondaryButtonText}
                    </button>
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        onClick={onPrimaryAction}
                        disabled={isLoading}
                        style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    >
                        {primaryButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
