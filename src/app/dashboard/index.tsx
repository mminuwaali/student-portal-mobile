import { router } from "expo-router";
import Constants from "expo-constants";
import Section from "@/src/components/section";
import { LineChart } from "react-native-chart-kit";
import { useUser } from "@/src/providers/user.provider";
import { useGetPortal } from "@/src/queries/portal.query";
import { useGetSessionGpa } from "@/src/queries/gpa.query";
import { useGetProfile } from "@/src/queries/profile.query";
import { useGetTimeTable } from "@/src/queries/timetable.query";
import { FlatList, Image, ListRenderItem, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";

const serverIp = Constants.expoConfig?.hostUri?.split(":").shift();


export default function DashboardIndex() {
    const { user } = useUser();
    const portalQuery = useGetPortal();
    const profileQuery = useGetProfile();
    const timetableQuery = useGetTimeTable();
    const sessionGpaQuery = useGetSessionGpa();

    const renderLectureTime: ListRenderItem<ITimetable> = ({ item }) => (
        <View className="w-full p-2 rounded border-l-2 border-l-slate-700 bg-gray-50 flex-row justify-between items-center">
            <View className="flex-row items-center flex-shrink">
                <View className="p-1 px-2 items-center justify-center bg-slate-300 rounded-md mr-3">
                    <Text style={{ fontVariant: ['small-caps'] }} className="text-xs text-white font-bold uppercase">{item.course.code}</Text>
                </View>

                <View>
                    <Text className="font-semibold text-sm flex-1">{item.course.name}</Text>
                    <Text className="text-xs text-gray-600">{item.course.lecturer.first_name} {item.course.lecturer.last_name}</Text>
                </View>
            </View>

            <View className="items-end flex-none">
                <Text className="font-medium text-sm">{item.start_time} - {item.end_time}</Text>
                <Text className="text-xs text-gray-600">Duration: {getDuration(item.start_time, item.end_time)}</Text>
            </View>
        </View>
    );

    const getDuration = (start: string, end: string) => {
        const [endHour, endMinute] = end.split(':').map(Number);
        const [startHour, startMinute] = start.split(':').map(Number);
        const durationInMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);

        return `${Math.floor(durationInMinutes / 60)}h ${durationInMinutes % 60}m`;
    };

    const cgpaData = {
        labels: ["Year 1", "Year 2", "Year 3", "Year 4"],
        datasets: [
            {
                data: [3.5, 3.7, 3.8, 3.9],
                color: (opacity = 1) => `rgba(200, 122, 255, ${opacity})`,
                strokeWidth: 2
            }
        ]
    };

    return (
        <View style={{ gap: 10 }} className="wrapper">
            <View className="h-2/5 rounded-b-xl bg-slate-800 absolute  top-0 -left-20 -right-20" />

            <View style={styles.shadow} className="bg-white rounded-xl w-full relative flex-row items-center p-4">
                <Image source={user?.profile ? { uri: `http://${serverIp}:8000/${user.profile}` } : require("@/assets/image/abstract-onboarding.png")} className="h-16 w-16 rounded-md brightness-50" />
                <View className="ml-4">
                    <Text className="text-lg font-bold">{user?.first_name} {user?.last_name}</Text>
                    <Text className="text-sm text-gray-600">Student ID: {user?.username}</Text>
                    <Text className="text-sm text-gray-600">{profileQuery.data?.department.name}, {profileQuery.data?.current_academic_year.level.name}</Text>
                </View>
            </View>

            <View style={{ gap: 20 }} className="flex-1">
                {portalQuery.data && (
                    <TouchableOpacity onPress={() => router.push('/admission')} className="bg-slate-800 p-4 rounded-xl">
                        <Text className="text-white text-center font-bold">Go to Admission Portal</Text>
                    </TouchableOpacity>
                )}

                <LineChart
                    bezier
                    height={200}
                    yAxisLabel=""
                    yAxisSuffix=""
                    data={cgpaData}
                    yAxisInterval={1}
                    width={Dimensions.get("window").width - 40}
                    style={{ marginVertical: 8, borderRadius: 16 }}
                    chartConfig={{
                        decimalPlaces: 2,
                        backgroundColor: "#1e40af",
                        style: { borderRadius: 16 },
                        backgroundGradientTo: "#3b82f6",
                        backgroundGradientFrom: "#1e3a8a",
                        color: (op = 1) => `rgba(255, 255, 255, ${op})`,
                        labelColor: (op = 1) => `rgba(255, 255, 255, ${op})`,
                        propsForDots: { r: "6", strokeWidth: "2", stroke: "#3b82f6" },
                    }}
                />
                <Section title="today's lectures" titleClassName="text-slate-800 capitalize text-md font-bold">
                    <FlatList
                        data={timetableQuery.data}
                        renderItem={renderLectureTime}
                        contentContainerStyle={{ gap: 10 }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </Section>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadow: {
        elevation: 5,
        shadowRadius: 1.84,
        shadowOpacity: 0.25,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 20 },
    },
});