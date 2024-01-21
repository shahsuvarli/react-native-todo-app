import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import ListItem from "../../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

interface PageData {
  id: string;
  name: string;
}
export default function Page() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [itemId, setItemId] = useState<string | string[] | null>(id);
  const navigation = useNavigation();
  const [pageData, setPagetData] = useState<PageData[] | undefined>([]);

  const addItem = () => {
    router.push(`/(modals)/add/${itemId}`);
  };

  useEffect(() => {
    onSnapshot(
      collection(db, `category/${itemId}/items`),
      async (): Promise<any> => {
        const todos: any = [];
        const docRef = await getDocs(
          collection(db, `category/${itemId}/items`)
        );
        docRef.forEach((item) => {
          // if (item.data().active) {
            todos.push({ ...item.data(), id: item.id });
          // }
        });
        setPagetData(todos);
        navigation.setOptions({ title: itemId });
      }
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      <View style={styles.container}>
        <FlatList
          data={pageData}
          renderItem={({ item }) => <ListItem item={item} id={id} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={addItem} style={styles.btnContainer}>
          <Ionicons name="add-outline" size={35} color={"#fff"} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "60%",
  },
  btnContainer: {
    backgroundColor: "#000",
    borderColor: "#fff",
    borderStyle: "solid",
    borderWidth: 0.7,
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
