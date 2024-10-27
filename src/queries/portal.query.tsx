import { useQuery } from "react-query";
import request from "@/src/utilities/request";

export function useGetPortal() {
    return useQuery<null | IRegistrationPeriod>({
        queryKey: ["portal"], queryFn: async () => {
            const response = await request.get("/registration-period/current/");
            return response.data;
        },
    });
};
