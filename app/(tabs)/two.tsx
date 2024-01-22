import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import CategoryItem from "../../components/CategoryItem";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function TabOneScreen() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "category"), async (): Promise<any> => {
      const newCategories: any = [];
      const q = query(collection(db, "category"), where("active", "==", false));
      const data = await getDocs(q);
      data.forEach((item) => {
        newCategories.push({ ...item.data(), id: item.id });
      });
      setCategories(newCategories);
    });
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <View style={{ marginTop: 45 }}>
        <FlatList
          nestedScrollEnabled
          data={categories}
          renderItem={(item) => <CategoryItem item={item.item} />}
          keyExtractor={(item: any) => item.id}
        />
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
