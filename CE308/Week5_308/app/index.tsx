import "./global.css";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import Checkbox from "../components/Checkbox";

interface FormData {
  fullName: string;
  email: string;
  PhoneNumber: string;
  password: string;
  confirmPassword: string;
  address: string;
  acceptTerms: boolean;
  gender: string;
  dob: Date | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  PhoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  acceptTerms?: string;
  gender?: string;
  dob?: string;
}

export default function Index() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    PhoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    acceptTerms: false,
    gender: "",
    dob: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key in keyof FormData]?: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "กรุณากรอกชื่อ-นามสกุล";
        if (value.trim().length < 3) return "ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร";
        return undefined;
      case "email":
        if (!value.trim()) return "กรุณากรอกอีเมล";
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(value)) return "รูปแบบอีเมลไม่ถูกต้อง";
        return undefined;
      case "PhoneNumber":
        if (!value.trim()) return "กรุณากรอกเบอร์โทรศัพท์";
        if (!/^\d{10}$/.test(value)) return "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (10 หลัก)";
        return undefined;
      case "password":
        if (!value.trim()) return "กรุณากรอกรหัสผ่าน";
        if (value.length < 6) return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
        return undefined;
      case "confirmPassword":
        if (!value.trim()) return "กรุณายืนยันรหัสผ่าน";
        if (value !== formData.password) return "รหัสผ่านไม่ตรงกัน";
        return undefined;

      case "address":
        if (!value || value.trim().length < 10) return "กรุณากรอกที่อยู่อย่างน้อย 10 ตัวอักษร";
        return undefined;
      case "acceptTerms":
        if (value !== true) return "กรุณายอมรับข้อกำหนดและเงื่อนไข";
        return undefined;
      case "gender":
        if (!value) return "กรุณาระบุเพศ";
        return undefined;
      case "dob":
        if (!value) return "กรุณาระบุวันเกิด";
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age <= 13) return "อายุต้องมากกว่า 13 ปี";
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (name: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    (Object.keys(formData) as (keyof FormData)[]).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);

    const allTouched: { [key in keyof FormData]?: boolean } = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง", "กรุณาตรวจสอบข้อมูลและตรวจสอบใหม่อีกครั้ง");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("สำเร็จ",
        `ลงทะเบียนเสร็จสิ้น!\n\nชื่อ: ${formData.fullName}\nเพศ: ${formData.gender}\nวันเกิด: ${formData.dob?.toLocaleDateString('th-TH')}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("formData", formData),
          },
          {
            text: "รีเซ็ตฟอร์ม",
            onPress: handleReset,
            style: "cancel"
          },
        ]
      );
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      PhoneNumber: "",
      password: "",
      confirmPassword: "",
      address: "",
      acceptTerms: false,
      gender: "",
      dob: null,
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-50"
          contentContainerClassName="pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>

          <View className="px-6 mt-6">
            <CustomInput
              label="ชื่อ-นามสกุล"
              placeholder="กรอกชื่อ-นามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words"
            />

            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2 text-base">วันเดือนปีเกิด</Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className={`w-full px-4 py-3 rounded-lg border-2 bg-white ${errors.dob && touched.dob ? 'border-red-500' : 'border-gray-300'}`}
              >
                <Text className={formData.dob ? "text-gray-800" : "text-gray-400"}>
                  {formData.dob ? formData.dob.toLocaleDateString('th-TH') : "DD/MM/YYYY"}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={formData.dob || new Date()}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      handleChange("dob", selectedDate);
                      handleBlur("dob");
                    }
                  }}
                />
              )}
              {touched.dob && errors.dob && (
                <Text className="text-red-500 text-sm mt-1">{errors.dob}</Text>
              )}
            </View>


            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2 text-base">เพศ</Text>
              <View className="flex-row space-x-4">
                {["ชาย", "หญิง", "ไม่ระบุ"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      handleChange("gender", option);
                    }}
                    className="flex-row items-center mr-4"
                  >
                    <View className={`w-5 h-5 rounded-full border-2 mr-2 items-center justify-center ${formData.gender === option ? 'border-blue-600' : 'border-gray-400'}`}>
                      {formData.gender === option && <View className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                    </View>
                    <Text className="text-gray-700">{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {touched.gender && errors.gender && (
                <Text className="text-red-500 text-sm mt-1">{errors.gender}</Text>
              )}
            </View>

            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="กรอกเบอร์โทรศัพท์ 10 หลัก"
              value={formData.PhoneNumber}
              onChangeText={(value) => handleChange("PhoneNumber", value)}
              onBlur={() => handleBlur("PhoneNumber")}
              error={errors.PhoneNumber}
              touched={touched.PhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <View className="mb-4">
              <CustomInput
                label="ที่อยู่"
                placeholder="กรอกที่อยู่"
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
                onBlur={() => handleBlur("address")}
                error={errors.address}
                touched={touched.address}
                multiline={true}
                numberOfLines={4}
                style={{ height: 100, textAlignVertical: 'top' }}
              />
              <Text className="text-right text-gray-400 text-xs -mt-3">
                {formData.address.length}/200
              </Text>
            </View>

            <CustomInput
              label="รหัสผ่าน"
              placeholder="กรอกรหัสผ่าน"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />
            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="กรอกยืนยันรหัสผ่าน"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            <Checkbox
              label="ฉันยอมรับข้อกำหนดและเงื่อนไข"
              checked={formData.acceptTerms}
              onPress={() => {
                const newValue = !formData.acceptTerms;
                handleChange("acceptTerms", newValue);
              }}
              error={touched.acceptTerms ? errors.acceptTerms : undefined}
            />

            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoading}
              />
              <CustomButton
                title="รีเซ็ตฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                disabled={isLoading}
              />

              <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <Text className="text-blue-700 font-semibold text-center text-base mb-2">
                  คำแนะนำ:
                </Text>
                <Text className="text-blue-700 text-sm leading-5">
                  - กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง{"\n"}
                  - อายุต้องมากกว่า 13 ปี{"\n"}
                  - ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}