import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, useRouter } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Open",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="folder-open" color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push("..")}>
              <Ionicons name="log-out-outline" size={28} color={"#fff"} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Closed",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="folder-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
