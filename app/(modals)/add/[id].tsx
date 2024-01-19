import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useLocalSearchParams, useRouter } from "expo-router";
import { db } from "../../../firebaseConfig";

export default function Page() {
  const params = useLocalSearchParams();
  const [text, setText] = useState("");
  const router = useRouter();
  const submitCategory = () => {
    addDoc(collection(db, `category/${params.id}/items`), {
      name: text,
      active: true,
    });
    router.back();
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.inputContainer}
          placeholder="Category"
        />
      </View>
      <Pressable style={styles.btnContainer} onPress={submitCategory}>
        <Text style={styles.textStyle}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "dodgerblue",
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  inputContainer: {
    height: 100,
    fontSize: 30,
    margin: 20,
    borderColor: "dodgerblue",
  },
  btnContainer: {
    backgroundColor: "dodgerblue",
    height: 50,
    width: 200,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  textStyle: {
    fontSize: 25,
    color: "#fff",
  },
});