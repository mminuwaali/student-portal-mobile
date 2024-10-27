import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
        <Stack
            initialRouteName='index'
            screenOptions={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 16 * 1.3,
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "Profile",
                }}
            />
            <Stack.Screen
                name="relative"
                options={{
                    title: "Next of Kins",
                }}
            />
            <Stack.Screen
                name="personal"
                options={{
                    title: "Personal Information",
                }}
            />
        </Stack>
    );
};
