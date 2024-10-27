import { useQuery } from "react-query";
import request from "@/src/utilities/request";

export function useGetAttendance() {
    return useQuery<IAttendance[]>({
        queryKey: ["attendance"], queryFn: async () => {
            const response = await request.get("/attendance/");
            return response.data;
        },
    });
};
