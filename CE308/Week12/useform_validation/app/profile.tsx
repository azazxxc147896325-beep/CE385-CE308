import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormData } from "../schema/profileSchema";

export default function ProfileScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
    },
  });

  const firstName = useWatch({ control, name: "firstName" });
  const lastName = useWatch({ control, name: "lastName" });
  const email = useWatch({ control, name: "email" });
  const bio = useWatch({ control, name: "bio" });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Form</Text>

      {/* First Name */}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.firstName && <Text>{errors.firstName.message}</Text>}

      {/* Last Name */}
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.lastName && <Text>{errors.lastName.message}</Text>}

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      {/* Bio */}
      <Controller
        control={control}
        name="bio"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Bio"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      {/* Preview */}
      <View style={styles.preview}>
        <Text>First Name: {firstName}</Text>
        <Text>Last Name: {lastName}</Text>
        <Text>Email: {email}</Text>
        <Text>Bio: {bio}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  preview: {
    marginTop: 20,
  },
});