"use client";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

interface ToastProviderProps {
    children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    return (
        <>
            {children}
            <ToastContainer />
        </>
    );
}
