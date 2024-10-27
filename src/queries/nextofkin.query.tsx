import { useQuery } from "react-query";
import request from "@/src/utilities/request";

export function useGetNextOfKin() {
    return useQuery<INextOfKin[]>({
        queryKey: ["nextofkin"], queryFn: async () => {
            const response = await request.get("/next-of-kin/");
            return response.data;
        },
    });
};
