import { Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ListItem({ item, id }: any) {
  const [active, setActive] = useState(item.active);
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
        padding: 17,
        // borderRadius: item.active ? 100 0,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 0.7,
        borderColor: item.active ? "#000" : "#fff",
        borderStyle: "solid",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: item.active ? "#000" : "#c4c2c2",
          fontStyle: item.active ? "normal" : "italic",
          textDecorationLine: item.active ? "none" : "line-through",
        }}
      >
        {item.name}
      </Text>
      <Pressable
        onPress={markAsDone}
        style={{ position: "absolute", right: 15 }}
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

const styles = StyleSheet.create({});
