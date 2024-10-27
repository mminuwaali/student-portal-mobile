import React from "react";
import Indicate from "@/src/components/indicate";
import { View, Animated, Dimensions } from "react-native";
// slides
import Courses from "@/src/components/admission/courses";
import Payment from "@/src/components/admission/payment";
import NextofKin from "@/src/components/admission/nextofkin";
import Department from "@/src/components/admission/department";

const { width } = Dimensions.get("screen");
export default function () {
    const ref = React.useRef<any>();
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        ref.current?.scrollTo({ animated: true, x: index * width });
    }, [index]);

    return <View className="container items-center justify-bewtween py-[5%]">
        <Indicate index={index} length={3} />

        <Animated.ScrollView ref={ref} style={{ width, gap: 20 }} horizontal scrollEnabled={false}>

        </Animated.ScrollView>
    </View >;
};
