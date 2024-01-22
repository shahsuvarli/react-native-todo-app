import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function CategoryItem({ item }: any) {
  const router = useRouter();
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    onSnapshot(collection(db, `category/${item.id}/items`), async () => {
      const q = query(
        collection(db, `category/${item.id}/items`),
        where("active", "==", true)
      );
      const data = await getDocs(q);
      let newCounter = 0;
      data.forEach(() => {
        newCounter = newCounter + 1;
      });
      setCounter(newCounter);
    });
  }, []);

  const deleteCategory = async () => {
    await updateDoc(doc(db, "category", item.id), {
      active: item.active ? false : null,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/categories/${item.id}`);
        router.setParams({ id: item.id, name: item.name });
      }}
      style={{
        backgroundColor: counter ? "#fff" : "#b0adad46",
        marginVertical: 5,
        display: "flex",
        padding: 17,
        borderRadius: 100,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <View
          style={{
            width: 30,
            height: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
            borderColor: "#000",
            borderWidth: 2,
            borderStyle: "solid",
          }}
        >
          <Text style={{ color: "#000", fontSize: 17 }}>{counter}</Text>
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.textContainer}
        >
          {item.name}
        </Text>
      </View>

      <Pressable
        onPress={deleteCategory}
        style={{ position: "absolute", right: 10 }}
      >
        <Ionicons name="close" size={27} color={"#000"} />
      </Pressable>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#fff",
    marginVertical: 5,
    display: "flex",
    padding: 17,
    borderRadius: 100,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textContainer: {
    fontSize: 20,
    color: "#000",
    flex: 1,
    paddingRight: 25,
  },
  counterContainer: {
    backgroundColor: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "#000",
    borderWidth: 2,
    borderStyle: "solid",
  },
});
