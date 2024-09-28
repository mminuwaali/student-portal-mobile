import React from "react";
import { BlurView } from "expo-blur";
import { TouchableOpacity, ActivityIndicator, Text, TextInput, View } from "react-native";

export default function () {
    const [data, setData] = React.useState({ username: "", password: "" });

    return <View style={{ gap: 60 }} className="wrapper px-6 py-10 justify-center">
            <View className="w-full px-4">
                <Text className="text-slate-700 text-4xl text-center font-bold">Log into your account</Text>
            </View>

            <View style={{ gap: 10 }} className="w-full">
                <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                    <TextInput
                        value={data.username}
                        className="flex-1 py-2"
                        placeholder="Reg Number"
                        onChangeText={username => setData({ ...data, username })}
                    />
                </View>
                <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                    <TextInput
                        value={data.password}
                        className="flex-1 py-2"
                        placeholder="Password"
                        onChangeText={password => setData({ ...data, password })}
                    />
                </View>

                <TouchableOpacity className="w-full mt-20 bg-black text-center rounded-full py-4">
                    {false ?
                        <ActivityIndicator /> :
                        <Text className="w-full text-center text-white font-bold items-center justify-center uppercase">continue</Text>
                    }
                </TouchableOpacity>
            </View>

            <View className=""></View>
    </View>;
};
