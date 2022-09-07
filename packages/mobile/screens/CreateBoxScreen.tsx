import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { NavigationScreenProp } from "react-navigation";
import Button from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import {
  BoxTypeEnum,
  useCreateBoxMutation,
} from "../graphql/generated/graphql";
import tw from "../lib/tailwind";
import { grey0, grey100, grey500 } from "../theme/style";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

enum FormNames {
  NAME = "name",
  DESCRIPTION = "description",
  START_TIME = "startTime",
  END_TIME = "endTime",
  ADDRESS_NAME = "addressName",
  TYPE = "type",
}

interface FormValues {
  [FormNames.NAME]: string;
  [FormNames.DESCRIPTION]: string;
  [FormNames.START_TIME]: Date;
  [FormNames.END_TIME]: Date;
  [FormNames.ADDRESS_NAME]: string;
  [FormNames.TYPE]: BoxTypeEnum | null;
}

interface UserError {
  key?: string | null | undefined;
  message?: string;
}

const defaultValues: FormValues = {
  name: "",
  description: "",
  startTime: new Date(),
  endTime: new Date(),
  addressName: "",
  type: null,
};
const CreateBoxScreen = ({ navigation }: Props) => {
  const [createBox] = useCreateBoxMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await createBox({
        variables: {
          input: { ...data, type: data.type as BoxTypeEnum },
        },
        update: (cache) => {
          cache.evict({ fieldName: "boxes" });
        },
      });

      console.log("response", response);
      if (!response.errors)
        navigation.navigate("MyBoxesStack", {
          screen: "MyBox",
          params: { boxId: response.data?.createBox.id },
        });
    } catch (error) {
      console.log("error", error);
    }

    // └ has to match what defined in graphqlmutation
    // const gqlErrors = response.data?.createBox
    // if (gqlErrors) {
    //   // setErrors(toErrorMap(response.data.login.errors));
    //   const resultUserErrors = handleGraphqlErrors(
    //     data,
    //     gqlErrors,
    //     setError as unknown as UseFormSetError<FieldValues>,
    //     setGenericErrorMessage
    //   );
    // }
  };

  return (
    <ScreenLayout alignItems="items-center">
      <View style={tw`w-3/4`}>
        <MyText size="text-2xl" weight="font-bold" extraStyle="mb-4">
          Create an event
        </MyText>

        {/* event name */}
        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Event Name</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                placeholder="Event Name"
                placeholderTextColor={grey100}
                style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
              />
            )}
            name={FormNames.NAME}
          />
        </View>

        {/* description */}
        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Description</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
                value={value}
                placeholder="Details"
                placeholderTextColor={grey100}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={tw`text-grey-0 bg-grey-500 w-full p-2 rounded-sm m-auto my-2`}
              />
            )}
            name={FormNames.DESCRIPTION}
          />
        </View>
        {/* Location name */}
        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Name of Location</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
                value={value}
                placeholder="Location Name"
                placeholderTextColor={grey100}
                style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
              />
            )}
            name={FormNames.ADDRESS_NAME}
          />
        </View>

        {/* Event type */}
        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>What type of event is it?</Text>

          <Controller
            control={control}
            rules={{
              maxLength: 100,
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { invalid, isTouched, isDirty, error },
            }) => (
              <RNPickerSelect
                onValueChange={onChange}
                placeholder={{
                  label: "Select an event type",
                  value: BoxTypeEnum.MusicEvent,
                }}
                useNativeAndroidPickerStyle={false}
                style={{
                  placeholder: { color: grey0, fontSize: 14 },
                  inputIOS: {
                    color: grey0,
                    backgroundColor: grey500,
                    fontSize: 16,
                  },
                  inputAndroid: {
                    color: grey0,
                    backgroundColor: grey500,
                    fontSize: 16,
                  },
                  inputIOSContainer: {
                    borderColor: grey500,
                    borderRadius: 2,
                    borderWidth: 10,
                  },
                  inputAndroidContainer: {
                    marginTop: 8,
                    borderColor: grey500,
                    borderRadius: 1,
                    borderWidth: 3,
                  },
                }}
                items={[
                  { label: "Bar", value: BoxTypeEnum.Bar },
                  { label: "Dance Club", value: BoxTypeEnum.DanceClub },
                  { label: "Music Event", value: BoxTypeEnum.MusicEvent },
                  { label: "Wedding", value: BoxTypeEnum.Wedding },
                  { label: "Restaurant", value: BoxTypeEnum.Restaurant },
                  { label: "Other", value: BoxTypeEnum.Other },
                ]}
              />
            )}
            name={FormNames.TYPE}
          />
        </View>

        <View style={tw`mt-6`}>
          <Button label="Create" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default CreateBoxScreen;
