import { Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function CategoryItem({ item }: any) {
  const router = useRouter();
  const deleteCategory = async () => {
    await deleteDoc(doc(db, "category", item.id));
  };
  const toggleItem = async () => {
    router.push(`/categories/${item.name}`);
  };
  return (
    <TouchableOpacity onPress={toggleItem} style={styles.btnContainer}>
      <Text style={styles.textContainer}>{item.name}</Text>
      <Pressable onPress={deleteCategory}>
        <Ionicons name="close-outline" size={27} color={"#fff"} />
      </Pressable>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "dodgerblue",
    marginVertical: 5,
    display: "flex",
    padding: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textContainer: {
    fontSize: 20,
    color: "#fff",
  },
});
