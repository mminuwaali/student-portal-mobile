import { router } from "expo-router";
import { View, Text } from "react-native";
import { hideAsync } from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";

hideAsync();
export default function () {
    return <View style={{ gap: 80 }} className="justify-end items-center wrapper">
        <View style={{ gap: 20 }} className="justify-center items-center w-full">
            <Text className="font-bold text-2xl text-center">Lorem ipsum dolor sit.</Text>
            <Text className="text-center text-slate-500 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate at maiores vitae, ea beatae eligendi? Voluptatibus, consequuntur vel?
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
