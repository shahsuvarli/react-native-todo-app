import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { db } from "../../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const navigation = useNavigation();
  const { id, name } = useLocalSearchParams();
  const [text, setText] = useState("");
  const router = useRouter();
  const submitCategory = () => {
    addDoc(collection(db, `category/${id}/items`), {
      name: text,
      active: true,
    });
    router.back();
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View
        style={{
          backgroundColor: "#000",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: 100,
        }}
      >
        <View style={styles.container}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.inputContainer}
            placeholder="Item"
            placeholderTextColor={"#75717172"}
          />
          <Pressable
            style={styles.btnContainer}
            onPress={submitCategory}
            disabled={text ? false : true}
          >
            <Ionicons name="send" size={20} color={"#fff"} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#fff",
    borderBottomWidth: 0.7,
    flexDirection: "row",
    height: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 70,
  },
  inputContainer: {
    height: 100,
    fontSize: 30,
    margin: 20,
    borderColor: "#fff",
    color: "#fff",
    marginRight: 60,
  },
  btnContainer: {
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 1,
    borderStyle: "solid",
    height: 50,
    width: 50,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    right: 0,
  },

  textStyle: {
    fontSize: 25,
    color: "#fff",
  },
});
