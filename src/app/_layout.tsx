import React from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import UserProvider from "../providers/user.provider";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { preventAutoHideAsync } from "expo-splash-screen";
import { QueryClient, QueryClientProvider } from 'react-query';

export { ErrorBoundary } from "expo-router";

preventAutoHideAsync();
const queryClient = new QueryClient()
export default function () {
    const [loaded, error] = useFonts({ ...FontAwesome.font });

    React.useEffect(() => {
        if (error) throw error;
    }, [error]);

    return loaded && <UserProvider>
        <QueryClientProvider client={queryClient}>
            <Slot /><StatusBar />
        </QueryClientProvider>
    </UserProvider>;
};