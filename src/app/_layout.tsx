import React from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { StatusBar } from 'expo-status-bar';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { preventAutoHideAsync } from "expo-splash-screen";

export { ErrorBoundary } from "expo-router";

preventAutoHideAsync();
export default function () {
    const [loaded, error] = useFonts({ ...FontAwesome.font });

    React.useEffect(() => {
        if (error) throw error;
    }, [error]);

    return loaded && <>
        <Slot />
        <StatusBar />
    </>;
};
