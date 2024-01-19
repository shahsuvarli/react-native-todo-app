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
  id: number;
  name: string;
}
export default function Page() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [itemId, setItemId] = useState<string | string[] | null>(id);
  const navigation = useNavigation();
  const [pageData, setPagetData] = useState<PageData[] | undefined>([]);
  useEffect(() => {
    console.log(id, "my name");
    onSnapshot(
      collection(db, `category/${itemId}/items`),
      async (): Promise<any> => {
        const items: any = [];
        console.log("efwefw");
        const docRef = await getDocs(
          collection(db, `category/${itemId}/items`)
        );
        docRef.forEach((item) => {
          items.push({ ...item.data(), id: item.id });
        });
        console.log(items, "itemmsss");
        setPagetData(items);
      }
    )();
    navigation.setOptions({ title: id });
  }, []);
  return (
    <SafeAreaView
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.container}>
        <FlatList
          data={pageData}
          renderItem={({ item }) => <ListItem item={item} />}
          keyExtractor={(item) => item.name}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => router.push(`/(modals)/add/${itemId}`)}
          style={styles.btnContainer}
        >
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
    backgroundColor: "green",
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
