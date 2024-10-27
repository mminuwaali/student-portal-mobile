import { z } from "zod";
import React from "react";
import { router } from "expo-router";
import { useUser } from "@/src/providers/user.provider";
import { TouchableOpacity, ActivityIndicator, Text, TextInput, View } from "react-native";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

const schema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

export default function () {
    const { login } = useUser();
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (values: { username: string; password: string }) => {
        setLoading(true);
        try {
            await login(values);
            router.replace("/dashboard");
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return <View style={{ gap: 60 }} className="wrapper px-6 py-10 justify-center">
        <View className="w-full px-4">
            <Text className="text-slate-700 text-4xl text-center font-bold">Log into your account</Text>
        </View>

        <Formik onSubmit={handleSubmit} initialValues={{ username: "", password: "" }} validationSchema={toFormikValidationSchema(schema)}>
            {({ handleChange, handleSubmit, values, errors, touched }) => (
                <View style={{ gap: 10 }} className="w-full">
                    <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                        <TextInput
                            value={values.username}
                            className="flex-1 py-2"
                            placeholder="Reg Number"
                            onChangeText={handleChange('username')}
                        />
                    </View>
                    {touched.username && errors.username && (<Text className="text-red text-xs">{errors.username}</Text>)}

                    <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                        <TextInput
                            value={values.password}
                            className="flex-1 py-2"
                            placeholder="Password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                        />
                    </View>
                    {touched.password && errors.password && (<Text className="text-red text-xs">{errors.password}</Text>)}

                    <TouchableOpacity onPress={() => handleSubmit()} className="w-full mt-20 bg-black text-center rounded-full py-4">
                        {loading ? <ActivityIndicator color="white" /> : <Text className="w-full text-center text-white font-bold items-center justify-center uppercase">continue</Text>}
                    </TouchableOpacity>
                </View>
            )}
        </Formik>

        <View className=""></View>
    </View>;
};
