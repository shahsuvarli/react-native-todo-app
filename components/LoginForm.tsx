// Formik x React Native example
import React from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Formik } from "formik";
import { useRouter } from "expo-router";
import * as Yup from "yup";

export const LoginForm = (props: any) => {
  const router = useRouter();
  const loginValidation = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string().required("required"),
  });
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {
        if (values.email === "shah@tudu.com" && values.password === "Shah123") {
          router.push("/(tabs)");
        }
      }}
      validationSchema={loginValidation}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }: any) => (
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              style={styles.inputField}
              textContentType="emailAddress"
              placeholder="name@tudu.io"
            />
            {errors.email && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            )}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={styles.inputField}
              textContentType="password"
              secureTextEntry={true}
              placeholder="password"
            />
            {errors.password && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            )}
          </View>
          <Pressable onPress={handleSubmit} style={styles.btnContainer}>
            <Text style={styles.btnText}>Login</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  inputContainer: { width: "70%", gap: 5 },
  inputField: {
    color: "#706c6c",
    height: 60,
    width: "100%",
    padding: 10,
    fontSize: 17,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#a29e9e",
  },
  btnContainer: {
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    color: "#FF505A",
    fontWeight: "bold",
  },
  errorContainer: {
    backgroundColor: "#e94242a2",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  errorText: {
    fontSize: 15,
    color: "#fff",
  },
});
