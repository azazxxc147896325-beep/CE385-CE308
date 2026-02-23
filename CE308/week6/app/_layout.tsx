import { Stack } from "expo-router";

const PRIMARY = "#F4511E";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="details"
        options={{
          title: "Product Details",
          headerStyle: { backgroundColor: PRIMARY },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack>
  );
}