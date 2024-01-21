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
    onSnapshot(collection(db, "category"), async (): Promise<any> => {
      const categories: any = [];
      const docRef = await getDocs(collection(db, "category"));
      docRef.forEach((item) => {
        if (item.data().active) {
          categories.push({ ...item.data(), id: item.id });
        }
      });
      setCategories(categories);
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#000",
        // backgroundColor: "#ffffffdb",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <View
        style={{
          height: "70%",
        }}
      >
        <FlatList
          nestedScrollEnabled
          data={categories}
          renderItem={(item) => <CategoryItem item={item.item} />}
          keyExtractor={(item: any) => item.id}
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
