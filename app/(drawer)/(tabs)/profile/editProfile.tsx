import { View } from "@/components/Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProfile, updateProfile } from "@/services/user.service";
import { getToken, getUser } from "@/config/tokenUser";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "@/app/Context/Context";
import LottieView from "lottie-react-native";

const EditProfile = () => {
  const client = useQueryClient();
  const [avatar, setAvatar] = useState<any>();
  const { userContext }: any = useContext(AppContext);
  type ProfileType = {
    name: string;
    email: string;
    department: string;
    position: string;
    dob: string;
    phone: string;
    address: string;
    identificationNumber: string;
    gender: string;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await getProfile(userContext);
      setAvatar(response?.object?.avatar);
      return response.object;
    },
  });
  const {
    control,

    formState: { errors },
  } = useForm<ProfileType>({
    defaultValues: {
      name: data.name,
      email: data.email,
      department: data.department,
      position: data.position,
      dob: data.dob,
      phone: data.phone,
      address: data.address,
      identificationNumber: data.identificationNumber,
      gender: data.gender,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (userContext) {
        const response = await updateProfile(userContext, data);
        console.log("respon1", response);

        if (response.code == "00" && response.object) {
          ToastAndroid.show(
            "Cập nhật thông tin thành công!",
            ToastAndroid.SHORT
          );
          router.navigate("profile");
        } else {
          ToastAndroid.show(
            "Cập nhật thông tin thất bại! Vui lòng kiểm tra lại thông tin.",
            ToastAndroid.SHORT
          );
          return;
        }
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (e) => {
      console.log("error up", e);

      ToastAndroid.show("Cập nhật thông tin thất bại!", ToastAndroid.SHORT);
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("file", avatar);
      console.log("formData", formData);

      mutation.mutate(formData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const selectImage = async () => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };

    result = await ImagePicker.launchImageLibraryAsync(options);

    // Save image if not cancelled
    if (!result.canceled) {
      console.log(result.assets[0]);

      setAvatar(result.assets[0]);
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {/* <Image source={require('../../assets/images/load.jpg')} /> */}
        <LottieView
          autoPlay
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("@/assets/load.json")}
        />
      </View>
    );
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity>
            <Image
              source={{
                uri:
                  avatar?.uri ||
                  data.avatar ||
                  "https://via.placeholder.com/150",
              }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 1,
                borderColor: "gray",
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <Pressable
                onPress={() => {
                  selectImage();
                }}
              >
                <MaterialIcons name="photo-camera" size={32} color={"gray"} />
              </Pressable>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={{ fontSize: 10 }}>Tên</Text>
                  <View
                    style={{
                      height: 44,
                      width: "100%",
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 4,
                      marginVertical: 6,
                      justifyContent: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <TextInput
                      value={value}
                      editable={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  </View>
                </>
              )}
              name="name"
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text>Phòng ban</Text>
                  <View
                    style={{
                      height: 44,
                      width: "100%",
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 4,
                      marginVertical: 6,
                      justifyContent: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <TextInput
                      value={value}
                      editable={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  </View>
                </>
              )}
              name="department"
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text>Vị trí</Text>
                  <View
                    style={{
                      height: 44,
                      width: "100%",
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 4,
                      marginVertical: 6,
                      justifyContent: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <TextInput
                      value={value}
                      editable={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  </View>
                </>
              )}
              name="position"
            />
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={{}}>Email</Text>
                  <TouchableOpacity
                    style={{
                      height: 44,
                      width: "100%",
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 4,
                      marginVertical: 6,
                      justifyContent: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <TextInput
                      value={value}
                      editable={false}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      keyboardType="email-address"
                    />
                  </TouchableOpacity>
                </>
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <Text style={{}}>CCCD/CMT</Text>
                  <TouchableOpacity
                    style={{
                      height: 44,
                      width: "100%",
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 4,
                      marginVertical: 6,
                      justifyContent: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <TextInput
                      value={value}
                      editable={true}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                  </TouchableOpacity>
                </>
              )}
              name="identificationNumber"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={{}}>Điện thoại</Text>
                <View
                  style={{
                    height: 44,
                    width: "100%",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <TextInput
                    value={value}
                    editable={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="phone-pad"
                  />
                </View>
              </>
            )}
            name="phone"
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={{}}>Địa chỉ</Text>
                <View
                  style={{
                    height: 44,
                    width: "100%",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <TextInput
                    value={value}
                    editable={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </View>
              </>
            )}
            name="address"
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Text style={{}}>Ngày sinh</Text>
                <View
                  style={{
                    height: 44,
                    width: "100%",
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8,
                  }}
                >
                  <TextInput
                    value={value}
                    editable={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}
            name="dob"
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <>
                {/* <Text>Giới tính</Text> */}
                <View>
                  <Picker
                    selectedValue={value}
                    onValueChange={(itemValue) => onChange(itemValue)}
                  >
                    <Picker.Item label="Chọn giới tính" value="" />
                    <Picker.Item label="Nam" value={0} />
                    <Picker.Item label="Nữ" value={1} />
                  </Picker>
                </View>
              </>
            )}
            name="gender"
            defaultValue=""
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "green",
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => onSubmit(control._formValues)}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Lưu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditProfile;