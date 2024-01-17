import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import data from "../../assets/constants/data.json";
import CategoryItem from "../../components/CategoryItem";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function TabOneScreen() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "category"));
      const docs: any = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setCategories(docs);
    })();
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: "red", height: "100%" }}>
      <ScrollView>
        <FlatList
          nestedScrollEnabled
          data={categories}
          renderItem={(item) => <CategoryItem item={item.item} />}
          keyExtractor={(item) => item.name}
        />
      </ScrollView>
      <View style={styles.container}>
        <Pressable
          onPress={() => router.push("/(modals)/addCategory")}
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
    marginBottom: 10,
  },
  btnContainer: {
    backgroundColor: "dodgerblue",
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 200,
  },
});
