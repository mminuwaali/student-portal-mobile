import { z } from "zod";
import React from "react";
import { useFormik } from "formik";
import request from "@/src/utilities/request";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TouchableOpacity, Text, TextInput, View, ActivityIndicator } from "react-native";

const passwordSchema = z.object({
    current: z.string().min(1, "Current password is required"),
    confirm: z.string().min(1, "Please confirm your password"),
    password: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirm, { path: ["confirm"], message: "Passwords don't match" });

export default function () {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    const formik = useFormik({
        initialValues: { current: "", password: "", confirm: "" },
        validationSchema: toFormikValidationSchema(passwordSchema),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                setError("");
                let res = await request.post("/change-password/", values);
                formik.resetForm();
            } catch (error) {
                // @ts-ignore
                setError(error?.response?.data?.message || "Failed to change password");
            } finally {
                setLoading(false);
            }
        },
    });

    return <View style={{ gap: 40 }} className="wrapper px-6 py-10 justify-center">
        <View className="w-full px-4">
            <Text className="text-slate-700 text-4xl text-center font-bold">Change Password</Text>
        </View>

        <View className="w-full">
            <Text className="text-slate-600 text-base mb-4">
                To change your password, please enter your current password and then enter your new password twice to confirm.
            </Text>
            <Text className="text-slate-600 text-base mb-6">
                Your new password should be at least 8 characters long.
            </Text>
        </View>

        {error && (
            <Text className="text-red-500 text-center">{error}</Text>
        )}

        <View style={{ gap: 20 }} className="w-full">
            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                <TextInput
                    value={formik.values.current}
                    className="flex-1 py-2"
                    placeholder="Current Password"
                    secureTextEntry
                    onChangeText={formik.handleChange('current')}
                    onBlur={formik.handleBlur('current')}
                    editable={!loading}
                />
            </View>
            {formik.touched.current && formik.errors.current && (
                <Text className="text-red-500">{formik.errors.current}</Text>
            )}

            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                <TextInput
                    value={formik.values.password}
                    className="flex-1 py-2"
                    placeholder="New Password"
                    secureTextEntry
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    editable={!loading}
                />
            </View>
            {formik.touched.password && formik.errors.password && (
                <Text className="text-red-500">{formik.errors.password}</Text>
            )}

            <View style={{ gap: 10 }} className="w-full flex-row items-center border-b border-b-slate-600">
                <TextInput
                    value={formik.values.confirm}
                    className="flex-1 py-2"
                    placeholder="Confirm New Password"
                    secureTextEntry
                    onChangeText={formik.handleChange('confirm')}
                    onBlur={formik.handleBlur('confirm')}
                    editable={!loading}
                />
            </View>
            {formik.touched.confirm && formik.errors.confirm && (
                <Text className="text-red-500">{formik.errors.confirm}</Text>
            )}

            <TouchableOpacity
                className="w-full mt-20 bg-black text-center rounded-full py-4"
                onPress={() => formik.handleSubmit()}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text className="w-full text-center text-white font-bold items-center justify-center uppercase">change password</Text>
                )}
            </TouchableOpacity>
        </View>
    </View>;
};