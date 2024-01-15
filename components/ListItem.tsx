import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

export default function ListItem({ item }: any) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "green",
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
