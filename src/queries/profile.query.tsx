import { useQuery } from "react-query";
import request from "@/src/utilities/request";

export function useGetProfile() {
    return useQuery<IStudentAcademicProfile>({
        queryKey: ["profile"], queryFn: async () => {
            const response = await request.get<IStudentAcademicProfile[]>("/profile/");
            return response.data[0];
        },
    });
};

export function useGetHistory() {
    return useQuery<IAcademicHistory[]>({
        queryKey: ["history"], queryFn: async () => {
            const response = await request.get("/history/");
            return response.data;
        },
    });
};
