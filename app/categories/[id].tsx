import { View, Text, FlatList, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import data from "../../assets/constants/data.json";
import ListItem from "../../components/ListItem";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const router = useRouter();
  interface PageData {
    id: number;
    name: string;
  }
  const [pageData, setPagetData] = useState<PageData[] | undefined>([]);
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: params.id });
    const newData = data.find((item) => item.name == params.id);
    setPagetData(newData?.items);
  }, []);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={pageData}
        renderItem={({ item }) => <ListItem item={item} />}
        keyExtractor={(item) => item.name}
        style={{ width: "100%" }}
      />
      <Pressable
        onPress={() => router.push("/(modals)/addItem")}
        style={{
          backgroundColor: "green",
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="add-outline" size={35} color={"white"} />
      </Pressable>
    </View>
  );
}
