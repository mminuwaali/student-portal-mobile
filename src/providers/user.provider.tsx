import React from "react";
import { useNavigation } from "expo-router";
import request from "@/src/utilities/request";
import { removeAuthToken, storeAuthToken } from "../utilities/storage";

interface UserContextType {
    user?: IUser;
    logout: () => void;
    updateUser: (userData: Partial<IUser>) => void;
    login: (user: { username: string; password: string }) => void;
}

const UserContext = React.createContext<UserContextType>({
    user: undefined,
    login: () => null,
    logout: () => null,
    updateUser: () => null,
});

export function useUser() {
    const context = React.useContext(UserContext);
    if (context === undefined)
        throw new Error("useUsefr must be used within a UserProvider");
    return context;
}

export default function UserProvider({ children }: React.PropsWithChildren) {
    const navigation = useNavigation();
    const [user, setUser] = React.useState<IUser>();

    React.useEffect(() => { getUser(); }, []);

    const getUser = async () => {
        try {
            const response = await request.get<IUser>('/user/');
            setUser(response.data);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        removeAuthToken();
        setUser(undefined);
        navigation.reset({
            ...navigation.getState(), // @ts-ignore
            routes: [{ key: "sign-in", name: "sign-in" }],
        })
    };
    const updateUser = async (userData: Partial<IUser>) => { };
    
    const login = async (userData: { username: string; password: string }) => {
        try {
            let res = await request.post<IToken>("/login/", userData);
            await storeAuthToken(res.data.access);
            await getUser();
        } catch (error) {
            throw error;
        }
    };

    return <UserContext.Provider value={{ user, login, logout, updateUser }}>{children}</UserContext.Provider>;
}