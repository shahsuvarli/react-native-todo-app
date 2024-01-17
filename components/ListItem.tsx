import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";

export default function ListItem({ item }: any) {
  return (
    <TouchableOpacity style={styles.btnStyle}>
      <Text style={styles.textContainer}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "green",
    marginVertical: 5,
    display: "flex",
    padding: 20,
    justifyContent: "center",
  },
  textContainer: {
    fontSize: 20,
    color: "#fff",
  },
});
