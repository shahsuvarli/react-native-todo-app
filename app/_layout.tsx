import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)/index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="(auth)">
        <Stack.Screen
          name="(auth)/index"
          options={{ headerShown: false, presentation: "fullScreenModal" }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="categories/[id]"
          options={{
            presentation: "modal",
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="chevron-down-outline"
                  size={28}
                  color={"#fff"}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/add/[id]"
          options={{
            title: "New to-do",
            presentation: "modal",
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="chevron-down-outline"
                  size={28}
                  color={"#fff"}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modals)/addCategory"
          options={{
            title: "New category",
            presentation: "modal",
            headerRight: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons
                  name="chevron-down-outline"
                  size={28}
                  color={"#fff"}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
