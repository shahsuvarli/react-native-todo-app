import { FlatList, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import data from "../../assets/constants/data.json";
import CategoryItem from "../../components/CategoryItem";

export default function TabOneScreen() {
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={(item) => <CategoryItem item={item.item} />}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
