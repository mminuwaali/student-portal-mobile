import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { useUser } from '@/src/providers/user.provider';
import { router, Tabs, usePathname } from 'expo-router';

export default function DashboardLayout() {
    const { user } = useUser();
    const pathname = usePathname();

    React.useEffect(() => {
        // redirect to login if user is not logged in
        if (!user) router.replace("/account/sign-in");
    }, [user]);

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerTitleAlign: "center",
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8E8E93',
                tabBarStyle: (pathname.includes('profile') && !pathname.endsWith('profile')
                    ? { display: 'none' } : styles.tabBar),
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 16 * 1.3,
                    textAlign: "center",
                    textTransform: "capitalize",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "home",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name="home-outline" size={size * 0.75} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "profile",
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name="person-outline" size={size * 0.75} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        left: 80,
        right: 80,
        bottom: 25,
        elevation: 5,
        borderRadius: 100,
        shadowRadius: 3.84,
        shadowOpacity: 0.25,
        position: 'absolute',
        shadowColor: 'darkblue',
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        // backgroundColor: 'rgba(230, 230, 230, 0.8)',
    },
});