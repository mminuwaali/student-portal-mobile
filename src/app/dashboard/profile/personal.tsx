import React from "react";
import * as z from 'zod';
import { Formik } from 'formik';
import Constants from "expo-constants";
import * as ImagePicker from 'expo-image-picker';
import { useUser } from "@/src/providers/user.provider";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { TouchableOpacity, Text, TextInput, View, Image } from "react-native";

const serverIp = Constants.expoConfig?.hostUri?.split(":").shift();

const personalSchema = z.object({
    profile: z.string(),
    email: z.string().email('Invalid email address'),
    last_name: z.string().min(1, 'Last name is required'),
    first_name: z.string().min(1, 'First name is required'),
    phone_number: z.string().min(10, 'Invalid phone number'),
    reg_number: z.string().min(1, 'Registration number is required'),
});

export default function () {
    const { user, updateUser } = useUser();
    const initialValues = {
        email: user?.email || "",
        last_name: user?.last_name || "",
        reg_number: user?.username || "",
        first_name: user?.first_name || "",
        phone_number: user?.phone_number || "",
        profile: user?.profile ? `http://${serverIp}:8000/${user.profile}` : "",
    };

    const handleSubmit = async (values: Partial<IUser>) => {
        // Handle form submission here
        await updateUser(values);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={toFormikValidationSchema(personalSchema)}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => {
                const pickImage = async () => {
                    let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 1,
                    });

                    if (!result.canceled)
                        setFieldValue('profile', result.assets[0].uri);
                };

                return (
                    <View style={{ gap: 40 }} className="wrapper px-6 py-10 justify-center">
                        <View style={{ gap: 20 }} className="w-full">
                            <TouchableOpacity onPress={pickImage} className="w-32 h-32 self-center">
                                {values.profile !== "" ? (
                                    <Image source={{ uri: values.profile }} style={{ width: 128, height: 128, borderRadius: 64 }} />
                                ) : (
                                    <View style={{ width: 128, height: 128, borderRadius: 64, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>Add Photo</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                                <TextInput
                                    value={values.first_name}
                                    className="flex-1 py-2"
                                    placeholder={user?.first_name || "First Name"}
                                    onChangeText={handleChange('first_name')}
                                />
                                {errors.first_name && touched.first_name && (
                                    <Text className="text-red-500 text-xs">{errors.first_name}</Text>
                                )}
                            </View>
                            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                                <TextInput
                                    value={values.last_name}
                                    className="flex-1 py-2"
                                    placeholder={user?.last_name || "Last Name"}
                                    onChangeText={handleChange('last_name')}
                                />
                                {errors.last_name && touched.last_name && (
                                    <Text className="text-red-500 text-xs">{errors.last_name}</Text>
                                )}
                            </View>
                            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                                <TextInput
                                    value={values.email}
                                    className="flex-1 py-2"
                                    placeholder={user?.email || "Email"}
                                    onChangeText={handleChange('email')}
                                />
                                {errors.email && touched.email && (
                                    <Text className="text-red-500 text-xs">{errors.email}</Text>
                                )}
                            </View>
                            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                                <TextInput
                                    value={values.phone_number}
                                    className="flex-1 py-2"
                                    placeholder={user?.phone_number || "Phone Number"}
                                    onChangeText={handleChange('phone_number')}
                                />
                                {errors.phone_number && touched.phone_number && (
                                    <Text className="text-red-500 text-xs">{errors.phone_number}</Text>
                                )}
                            </View>
                            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                                <TextInput
                                    value={values.reg_number}
                                    className="flex-1 py-2"
                                    placeholder={user?.username || "Registration Number"}
                                    onChangeText={handleChange('reg_number')}
                                />
                                {errors.reg_number && touched.reg_number && (
                                    <Text className="text-red-500 text-xs">{errors.reg_number}</Text>
                                )}
                            </View>
                            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                                <TextInput
                                    value="********"
                                    className="flex-1 py-2"
                                    placeholder="Password"
                                    editable={false}
                                />
                            </View>

                            <TouchableOpacity onPress={() => handleSubmit()} className="w-full mt-20 bg-black text-center rounded-full py-4">
                                <Text className="w-full text-center text-white font-bold items-center justify-center uppercase">save changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }}
        </Formik>
    );
};
