import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = '@user_data';
const AUTH_TOKEN_KEY = '@auth_token';

export async function storeAuthToken(token: string): Promise<void> {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
        console.error('Error storing auth token:', error);
    }
};

export async function getAuthToken(): Promise<string | null> {
    try {
        return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

export async function removeAuthToken(): Promise<void> {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error('Error removing auth token:', error);
    }
};

export async function storeUserData(userData: any): Promise<void> {
    try {
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
    } catch (error) {
        console.error('Error storing user data:', error);
    }
};

export async function getUserData(): Promise<any | null> {
    try {
        const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

export async function removeUserData(): Promise<void> {
    try {
        await AsyncStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
        console.error('Error removing user data:', error);
    }
};