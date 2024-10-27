import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useGetNextOfKin } from "@/src/queries/nextofkin.query";
import { ActivityIndicator, FlatList, ListRenderItem, Text, TouchableOpacity, View } from "react-native";

export default function () {
  const { data, isLoading, refetch } = useGetNextOfKin();

  const renderNextOfKin: ListRenderItem<INextOfKin> = ({ item }) => (
    <TouchableOpacity style={{ gap: 10 }} className="w-full flex-row items-center py-3 justify-start">
      <MaterialIcons name="person" size={18} color="gray" />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text className="font-bold text-gray-700">{item.full_name}</Text>
        <View style={{ gap: 5 }} className="flex-row items-center justify-start">
          <Text className="text-gray-500">{item.relationship}</Text>
          <Text className="text-gray-500">{item.phone_number}</Text>
        </View>
      </View>
      <Entypo name="chevron-small-right" size={20} color="lightgray" />
    </TouchableOpacity>
  );

  return <View style={{ gap: 20 }} className="wrapper pt-16 pb-32">
    <View className="h-2/5 rounded-b-full bg-slate-800 absolute  top-0 -left-20 -right-20" />
    <View className="bg-white rounded-lg w-full py-2 px-4 overflow-hidden">
      {isLoading ? (
        <View className="py-8 items-center justify-center">
          <ActivityIndicator size="large" color="#1e293b" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderNextOfKin}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View className="w-full h-0.5 bg-gray-100" />}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}
    </View>

    <View style={{ gap: 20 }} className="flex-1">
    </View>
  </View>;
};