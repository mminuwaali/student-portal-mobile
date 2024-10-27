import React from "react";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useGetPortal } from "@/src/queries/portal.query";
import { View, Text, Image } from "react-native";

export default function () {
    const portalQuery = useGetPortal();
    const [timeLeft, setTimeLeft] = React.useState("");
    const [isAdmissionOpen, setIsAdmissionOpen] = React.useState(false);

    React.useEffect(() => {
        if (!portalQuery.data) return;

        const targetDate = new Date(portalQuery.data.end_date);
        const startDate = new Date(portalQuery.data.start_date);
        const now = new Date();

        setIsAdmissionOpen(now >= startDate && now <= targetDate);

        const timer = setInterval(() => {
            const currentTime = new Date();
            const difference = targetDate.getTime() - currentTime.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                clearInterval(timer);
                setTimeLeft("Time's up!");
                setIsAdmissionOpen(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [portalQuery.data]);

    return <View style={{ gap: 80 }} className="justify-around items-center wrapper">
        <Image source={require("@/assets/splash.png")} className="w-72 h-72 mt-10 rounded-md" />

        <View style={{ gap: 20 }} className="justify-center mt-auto items-center w-full">
            <Text className="font-bold text-2xl text-center">
                {isAdmissionOpen ? "Welcome to the Admission Portal" : "Admission Closed"}
            </Text>
            {isAdmissionOpen ? (
                <>
                    <Text className="text-center text-slate-500 text-sm">
                        {portalQuery.data?.description}
                    </Text>
                    <Text className="text-center text-slate-500 text-sm">
                        Time remaining before portal closes: {timeLeft}
                    </Text>
                </>
            ) : (
                <Text className="text-center text-slate-500 text-sm">
                    The admission period has ended. Please check back later for future opportunities.
                </Text>
            )}
        </View>

        {isAdmissionOpen ? (
            <View className="flex-row justify-between items-center bg-slate-800 mb-12 px-5 py-3 rounded-full w-4/5">
                <Text className="font-bold text-white capitalize">Start Admission</Text>
                <Text onPress={() => router.replace("/admission")} className="bg-white px-6 py-2 rounded-full h-full">
                    <AntDesign size={22} name="arrowright" className="rounded-full" />
                </Text>
            </View>
        ) : (
            <View className="flex-row justify-between items-center bg-slate-800 mb-12 px-5 py-3 rounded-full w-4/5">
                <Text className="font-bold text-white capitalize">Back to Dashboard</Text>
                <Text onPress={() => router.replace("/dashboard")} className="bg-white px-6 py-2 rounded-full h-full">
                    <AntDesign size={22} name="arrowleft" className="rounded-full" />
                </Text>
            </View>
        )}
    </View>;
};