import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import CategoryItem from "../../components/CategoryItem";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function TabOneScreen() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    onSnapshot(collection(db, "category"), (): any => {
      (async () => {
        const categories: any = [];
        const docRef = await getDocs(collection(db, "category"));
        docRef.forEach((item) => {
          categories.push({ ...item.data(), id: item.id });
        });
        setCategories(categories);
      })();
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#ffffffdb",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <View style={{ height: "70%", backgroundColor: "dodgerblue" }}>
        <FlatList
          nestedScrollEnabled
          data={categories}
          renderItem={(item) => <CategoryItem item={item.item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            router.push("/(modals)/addCategory");
          }}
          style={styles.btnContainer}
        >
          <Ionicons color={"#fff"} size={35} name="add-outline" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    backgroundColor: "dodgerblue",
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
