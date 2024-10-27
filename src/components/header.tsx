import { View, Text, Image } from "react-native";

export default function () {
    return <View style={{ gap: 20 }} className="flex-row items-cente p-10">
        <Image className="bg-black rounded-full w-10 h-10" />

        <View style={{ gap: 10 }} className="flex-1 justify-center items-start"></View>

        <View style={{ gap: 10 }} className="flex-row justify-center items-center"></View>
    </View>;
};
