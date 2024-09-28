import { Image, Text, View } from "react-native";

export default function Slider(props: { width:number,welcome: WelcomeType }) {
    return <View style={{ gap: 10 }} className="justify-center items-center w-full">
        <Image source={props.welcome.image} className="w-full h-full object-contain" />
        <Text className="text-blue text-lg">{props.welcome.title}</Text>
    </View>;
};