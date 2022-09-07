import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import TextField, { TextFieldTypes } from "../components/forms/TextField";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import { UserContext } from "../context/UserContext";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
  User,
  useRegisterMutation,
} from "../graphql/generated/graphql";
import tw from "../lib/tailwind";
import handleGraphqlErrors from "../util/handleGraphqlErrors";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

enum FormNames {
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

interface FormValues {
  [FormNames.USERNAME]: string;
  [FormNames.EMAIL]: string;
  [FormNames.PASSWORD]: string;
  [FormNames.CONFIRM_PASSWORD]: string;
}

interface UserError {
  key?: string | null | undefined;
  message?: string;
}

const defaultValues: FormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const RegisterScreen = ({ navigation }: Props) => {
  console.log("register screen");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { data: meData, loading: loading } = useMeQuery();
  const [genericErrorMessage, setGenericErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const route: RouteProp<{ params: { next: string | null } }> = useRoute();

  const [register] = useRegisterMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { username, email, password } = data;
      const response = await register({
        variables: {
          data: {
            username,
            email,
            password,
            isMusician: false,
          },
        },
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.register.user,
            },
          });
          cache.evict({ fieldName: "boxes" }); // TODO do I need this?
        },
      });
      // └ has to match what defined in graphqlmutation

      if (response) {
        const gqlErrors = response.data?.register.errors;

        const resultUserErrors = handleGraphqlErrors(
          data,
          gqlErrors,
          setError as unknown as UseFormSetError<FieldValues>,
          setGenericErrorMessage
        );

        const userId = response.data?.register.user?.id;
        if (resultUserErrors.length === 0 && userId) {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.log("error registering");
    }
  };

  console.log("rhf errors", errors.email?.message);

  // manuall set user in context
  useEffect(() => {
    if (meData?.me && setCurrentUser) setCurrentUser(meData.me as User);
  }, [meData?.me, setCurrentUser]);

  useEffect(() => {
    // redirect if already logged in
    if (currentUser) {
      // without the following line, push to / even when there is next param
      const nextScreen = route.params?.next;

      if (typeof nextScreen === "string") {
        navigation.navigate(nextScreen, {
          from: "Login",
        });
      } else {
        navigation.navigate("Home");
      }
    }
  }, []);
  return (
    <ScreenLayout>
      <View>
        <MyText>Username</MyText>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              style={tw`bg-white w-3/4 h-8 p-2 rounded-md m-auto my-2`}
            />
          )}
          name={FormNames.USERNAME}
        />

        {errors.username ? <MyText>This is required.</MyText> : null}
      </View>

      <View>
        <MyText>Email</MyText>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              style={tw`bg-white w-3/4 h-8 p-2 rounded-md m-auto my-2`}
            />
          )}
          name={FormNames.EMAIL}
        />
        {errors.email ? (
          <Text style={tw`text-grey-0`}>{errors.email?.message}</Text>
        ) : null}
      </View>

      <View>
        <MyText>Password</MyText>

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              value={value}
              style={tw`bg-white  w-3/4 h-8 p-2 rounded-md m-auto my-2`}
            />
          )}
          name={FormNames.PASSWORD}
        />
        {errors.password ? <MyText>This is required.</MyText> : null}
      </View>

      <View>
        <MyText>Confirm Password</MyText>

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize="none"
              value={value}
              style={tw`bg-white  w-3/4 h-8 p-2 rounded-md m-auto my-2`}
            />
          )}
          name={FormNames.CONFIRM_PASSWORD}
        />
        {errors.confirmPassword && <MyText>Password does not match.</MyText>}
      </View>

      <View>
        <Button label="Create account" onPress={handleSubmit(onSubmit)} />
      </View>

      <View>
        <MyText>Already have an account?</MyText>
        <Button
          label="Log in"
          type={ButtonTypes.TEXT}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </ScreenLayout>
  );
};

export default RegisterScreen;
