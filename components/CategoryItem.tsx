import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

export default function CategoryItem({ item }: any) {
  const router = useRouter();
  const toggleItem = () => {
    router.push(`/categories/${item.name}`);
  };
  return (
    <TouchableOpacity
      onPress={toggleItem}
      style={{
        backgroundColor: "dodgerblue",
        marginVertical: 5,
        display: "flex",
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, color: "white" }}>{item.name}</Text>
    </TouchableOpacity>
  );
}
