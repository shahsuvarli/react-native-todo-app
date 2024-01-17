import {
  View,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import ListItem from "../../components/ListItem";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function Page({ route }: any) {
  console.log("wefwefwe");
  console.log(route, "dadededta");
  const router = useRouter();
  interface PageData {
    id: number;
    name: string;
  }
  const [pageData, setPagetData] = useState<PageData[] | undefined>([]);
  const nav = useNavigation();
  const params = useLocalSearchParams();
  // console.log(nav, 'params')
  useEffect(() => {
    onSnapshot(collection(db, `category/${params.id}/items`), () => {
      console.log("samplee");
      async () => {
        const items: any = [];
        const docRef = await getDocs(
          collection(db, `category/${params.id}/items`)
        );
        docRef.forEach((item) => {
          console.log(item.data());
          items.push({ ...item.data(), id: item.id });
        });
      };
    })();
    // navigation.setOptions({ title: newData?.name });
    // setPagetData(newData?.items);
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
          onPress={() => router.push("/(modals)/addItem")}
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
