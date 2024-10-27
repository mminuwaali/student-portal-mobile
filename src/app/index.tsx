import React from "react";
import { router } from "expo-router";
import { hideAsync } from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";
import { useUser } from "@/src/providers/user.provider";

setTimeout(hideAsync, 100);
export default function () {
    const { user } = useUser();

    React.useEffect(() => {
        if (user) router.replace("/dashboard");
    }, [user]);

    return <View style={{ gap: 80 }} className="justify-around items-center wrapper">
        <Image source={require("@/assets/splash.png")} className="w-72 h-72 mt-10 rounded-md" />

        <View style={{ gap: 20 }} className="justify-center mt-auto items-center w-full">
            <Text className="font-bold text-2xl text-center">Welcome to Schooled</Text>
            <Text className="text-center text-slate-500 text-sm">
                Your complete student portal for managing admissions,
                academic records, and student life. Register for admission,
                track your progress, and access all your academic information in one place.
            </Text>
        </View>

        <View className="flex-row justify-between items-center bg-slate-800 mb-12 px-5 py-3 rounded-full w-4/5">
            <Text className="font-bold text-white capitalize">get started</Text>
            <Text onPress={() => router.replace("/account/sign-in")} className="bg-white px-6 py-2 rounded-full h-full">
                <AntDesign size={22} name="arrowright" className="rounded-full" />
            </Text>
        </View>
    </View>;
};