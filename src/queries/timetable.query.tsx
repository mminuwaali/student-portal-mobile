import { useQuery } from "react-query";
import request from "@/src/utilities/request";

export function useGetTimeTable() {
    return useQuery<ITimetable[]>({
        queryKey: ["timetable"], queryFn: async () => {
            const response = await request.get("/timetable/");
            return response.data;
        },
    });
};
