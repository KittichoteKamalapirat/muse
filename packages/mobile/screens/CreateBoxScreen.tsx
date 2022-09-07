import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button from "../components/Buttons/Button";
import ScreenLayout from "../components/layouts/ScreenLayout";
import tw from "../lib/tailwind";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  BoxTypeEnum,
  useCreateBoxMutation,
} from "../graphql/generated/graphql";
import { bgColor, fontSizeMD, grey0 } from "../theme/style";

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

      if (!response.errors)
        navigation.navigate("Box", {
          boxId: response.data?.createBox.id,
        });
    } catch (error) {
      console.log("error: cannot create");
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
    <ScreenLayout>
      <Text style={tw`text-white`}>Event Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            autoCapitalize="none"
            onChangeText={onChange}
            value={value}
            style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
          />
        )}
        name={FormNames.NAME}
      />

      <Text style={tw`text-white`}>Description</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            value={value}
            style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
          />
        )}
        name={FormNames.DESCRIPTION}
      />

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
            style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
          />
        )}
        name={FormNames.ADDRESS_NAME}
      />
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
            placeholder="Select an event type"
            style={{
              placeholder: { color: bgColor },
              inputIOS: {
                color: bgColor,
                backgroundColor: "white",
                fontSize: 16,
              },
              inputIOSContainer: {
                borderColor: "white",
                borderRadius: 10,
                borderWidth: 10,
              },
            }}
            items={[
              { label: "Bar", value: BoxTypeEnum.Bar },
              { label: "Baseball", value: BoxTypeEnum.DanceClub },
              { label: "Music Event", value: BoxTypeEnum.MusicEvent },
              { label: "Wedding", value: BoxTypeEnum.Wedding },
              { label: "Restaurant", value: BoxTypeEnum.Restaurant },
              { label: "Other", value: BoxTypeEnum.Other },
            ]}
          />
        )}
        name={FormNames.TYPE}
      />

      <Button label="Create" onPress={handleSubmit(onSubmit)} />
    </ScreenLayout>
  );
};

export default CreateBoxScreen;
