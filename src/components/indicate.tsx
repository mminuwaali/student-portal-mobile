import React from "react";
import { View, Animated } from "react-native";

function Bar(props: BarPropsType) {
    const active = React.useRef(new Animated.Value(+props.current)).current;

    const width = active.interpolate({ inputRange: [0, 1], outputRange: [10, 22] });
    const backgroundColor = active.interpolate({ inputRange: [0, 1], outputRange: ["lightgray", "darkblue"] });

    React.useEffect(() => {
        Animated.timing(active, { duration: 800, useNativeDriver: false, toValue: +props.current, }).start();
    }, [props.current]);

    return <Animated.View style={[{ height: 8, width, backgroundColor, borderRadius: 80 }]} />;
};

export default function Indicate(props: IndicatePropsType) {
    return <View style={{ gap: 8 }} className={`flex-row justify-center items-center ${props.className}`} {...props}>
        {Array.from({ length: props.length }).map((_, key) => (<Bar key={key} current={props.index === key} />))}
    </View>;
};
