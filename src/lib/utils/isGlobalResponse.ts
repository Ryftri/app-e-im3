import { GlobalResponse } from "@/types/GlobalResponse";

export const isGlobalResponse = (error: any): error is GlobalResponse => {
    return (error as GlobalResponse).status !== undefined && (error as GlobalResponse).message !== undefined;
};