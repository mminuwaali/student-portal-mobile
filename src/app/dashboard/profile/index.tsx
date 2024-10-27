import Constants from "expo-constants";
import { router } from 'expo-router';
import { Entypo, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, FlatList, ListRenderItem } from "react-native";
import { useUser } from '@/src/providers/user.provider';

const serverIp = Constants.expoConfig?.hostUri?.split(":").shift();

const firstLinks: ProfileLinkType[] = [
    {
        title: "personal information",
        icon: () => <MaterialIcons name="person" size={18} color="gray" />,
        onPress: () => router.push("/dashboard/profile/personal"),
    },

    {
        title: "my next of kin",
        onPress: () => router.push("/dashboard/profile/relative"),
        icon: () => <MaterialIcons name="family-restroom" size={18} color="gray" />,
    },
];


const secondLinks: ProfileLinkType[] = [
    {
        title: "cgpa",
        onPress: () => router.push,
        icon: () => <Ionicons name="school" size={18} color="gray" />,
    },

    {
        title: "attendance",
        onPress: () => router.push("/dashboard/profile/attendance"),
        icon: () => <MaterialIcons name="devices" size={18} color="gray" />,
    },
    {
        title: "passwords",
        onPress: () => router.push("/dashboard/profile/password"),
        icon: () => <MaterialIcons name="lock" size={18} color="gray" />,
    },

    {
        title: "language",
        onPress: () => router.push,
        icon: () => <FontAwesome name="language" size={18} color="gray" />,
    },
];
export default function () {
    const { user, logout } = useUser();
    const renderItem: ListRenderItem<ProfileLinkType> = ({ item }) => (
        <TouchableOpacity style={{ gap: 10 }} key={item.title} onPress={item.onPress} className="w-full flex-row items-center py-3 justify-start">
            <item.icon />
            <Text className="capitalize font-bold text-gray-700 mr-auto">{item.title}</Text>

            <Entypo name="chevron-small-right" size={20} color="lightgray" />
        </TouchableOpacity>
    );

    return <View className="wrapper">
        <View className="relative justify-start items-center bg-cover rounded-xl w-full h-2/5 overflow-hidden">
            <Image source={require("@/assets/image/abstract-onboarding.png")} className="absolute w-full h-full object-cover" />

            <View style={{ gap: 5, backgroundColor: "rgba(0 0 0 / 0.4)" }} className="justify-start items-center w-full h-full pt-4">
                <Image source={user?.profile ? { uri: `http://${serverIp}:8000/${user.profile}` } : require("@/assets/image/abstract-onboarding.png")} className="border-4 bg-slate-700 rounded-full w-20 h-20" />

                <Text className="font-bold text-center text-white text-xl capitalize">{user?.first_name} {user?.last_name}</Text>
                <Text className="mt-4 w-4/5 text-center text-slate-200 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, sapiente!
                </Text>
            </View>
        </View>

        <View style={{ gap: 20 }} className="flex-1 px-1/20 -mt-16">
            <View className="bg-white rounded-lg w-full py-2 px-4 overflow-hidden">
                <FlatList data={firstLinks} ItemSeparatorComponent={() => <View className="w-full h-0.5 bg-gray-100" />} renderItem={renderItem} />
            </View>

            <View className="bg-white rounded-lg w-full py-2 px-4 overflow-hidden">
                <FlatList data={secondLinks} ItemSeparatorComponent={() => <View className="w-full h-0.5 bg-gray-100" />} renderItem={renderItem} />
            </View>

            <View className="bg-white rounded-lg w-full py-1 px-4 overflow-hidden">
                <TouchableOpacity onPress={logout} style={{ gap: 10 }} className="w-full flex-row items-center py-3 justify-start">
                    <MaterialIcons name="logout" size={20} color="#eee" />
                    <Text className="capitalize font-bold text-gray-700 mr-auto">log out</Text>

                    <Entypo name="chevron-small-right" size={20} color="lightgray" />
                </TouchableOpacity>
            </View>
        </View>
    </View>;
};
