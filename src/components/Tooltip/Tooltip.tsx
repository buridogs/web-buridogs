import { ReactNode } from "react";

interface TooltipProps {
    tooltipLabel: string;
    children: ReactNode;
}

export function Tooltip({ children, tooltipLabel }: TooltipProps) {
    return (
        <div className="h-fit bg-transparent flex flex-col justify-center">
            <div className="relative sm:max-w-xl sm:mx-auto">
                <div className="group cursor-pointer relative inline-block w-fit text-center">
                    {children}
                    <div className="opacity-0 w-fit bg-black text-white text-center text-sm rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-[50%] px-3 mb-2 pointer-events-none">
                        {tooltipLabel}
                        <svg
                            className="absolute w-fit text-black h-2 left-[50%] top-full"
                            x="0px"
                            y="0px"
                            viewBox="0 0 255 255"
                            xmlBase="preserve"
                        >
                            <polygon
                                className="fill-current"
                                points="0,0 127.5,127.5 255,0"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
