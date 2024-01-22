import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
