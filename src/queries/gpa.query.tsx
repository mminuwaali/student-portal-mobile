import { useQuery } from "react-query";
import request from "@/src/utilities/request";

export function useGetGpa() {
    return useQuery<IGPA[]>({
        queryKey: ["gpa"], queryFn: async () => {
            const response = await request.get("/gpa/");
            return response.data;
        },
    });
};

export function useGetSemesterGpa() {
    return useQuery<ISemesterGPA[]>({
        queryKey: ["semester-gpa"], queryFn: async () => {
            const response = await request.get("/semester-gpa/");
            return response.data;
        },
    });
};

export function useGetSessionGpa() {
    return useQuery<ISessionGPA[]>({
        queryKey: ["session-gpa"], queryFn: async () => {
            const response = await request.get("/session-gpa/");
            return response.data;
        },
    });
};

export function useGetCourseGrades() {
    return useQuery<ICourseGrade[]>({
        queryKey: ["course-grades"], queryFn: async () => {
            const response = await request.get("/courses-gpa/");
            return response.data;
        },
    });
};