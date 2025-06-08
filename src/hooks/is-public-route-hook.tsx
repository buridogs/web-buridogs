import { PublicRoutes } from "@/components/Header/routes-ui";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const isPublicRouteHook = (): boolean => {
    const pathname = usePathname();

    const isPublicRoute = useMemo(() => {
        return Object.values(PublicRoutes).some((route) => pathname.startsWith(route));
    }, [pathname]);

    return isPublicRoute;
};
