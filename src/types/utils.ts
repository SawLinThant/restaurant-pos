import { ReactNode } from "react";

interface BaseLayoutProps {
    children?:ReactNode;
}

export type LayoutWithChildren = React.FC<BaseLayoutProps>;