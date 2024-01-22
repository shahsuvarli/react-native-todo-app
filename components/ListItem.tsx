import { Text, TouchableOpacity, Pressable, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ListItem({ item, id }: any) {
  const markAsDone = async () => {
    await updateDoc(doc(db, "category", id, "items", item.id), {
      active: !item.active,
    });
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: item.active ? "#fff" : "#000",
        marginVertical: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 0.7,
        borderColor: item.active ? "#000" : "#fff",
        borderStyle: "solid",
      }}
    >
      <View style={{ width: "85%", padding: 15 }}>
        <Text
          style={{
            fontSize: 20,
            color: item.active ? "#000" : "#c4c2c2",
            fontStyle: item.active ? "normal" : "italic",
            textDecorationLine: item.active ? "none" : "line-through",
            lineHeight: 30,
            width: "95%",
          }}
        >
          {item.name}
        </Text>
      </View>

      <Pressable
        onPress={markAsDone}
        style={{
          height: "100%",
          width: "20%",
          position: "absolute",
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons
          name={item.active ? "checkmark-outline" : "checkmark-done-outline"}
          size={27}
          color={item.active ? "#000" : "#fff"}
        />
      </Pressable>
    </TouchableOpacity>
  );
}
