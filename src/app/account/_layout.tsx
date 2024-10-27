import React from "react";
import { router, Slot } from "expo-router";
import { useUser } from "@/src/providers/user.provider";

export default function () {
    const { user } = useUser();

    React.useEffect(() => {
        // redirect to dashboard if user is logged in
        if (user) router.replace("/dashboard");
    }, [user]);

    return <Slot />;
};
