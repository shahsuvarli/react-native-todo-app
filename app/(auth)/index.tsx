import { Text, Image, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginForm } from "../../components/LoginForm";

export default function Page() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        height: "100%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Image
        source={require("../../assets/images/login.jpg")}
        style={{ width: "100%", height: "30%", objectFit: "contain" }}
      />
      <View>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
}
