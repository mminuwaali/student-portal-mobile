/// <reference types="nativewind/types" />

declare type WelcomeType = {
    image: any;
    title: string;
};

declare interface BarPropsType {
    current: boolean;
};

declare interface SectionPropsType {
    title: string;
    children: React.ReactNode;
};

declare interface AddressPropsType {
    address: AddressType;
};

declare interface ResoucePropsType {
};

declare interface IndicatePropsType {
    index: number;
    length: number;
    className?: string;
};
