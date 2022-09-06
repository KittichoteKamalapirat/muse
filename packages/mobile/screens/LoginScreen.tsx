import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import ScreenLayout from "../components/layouts/ScreenLayout";
import { UserContext } from "../context/UserContext";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
  User,
} from "../graphql/generated/graphql";
import tw from "../lib/tailwind";
import handleGraphqlErrors from "../util/handleGraphqlErrors";
import useSetUserContext from "../util/useSetUserContext";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

enum FormNames {
  USERNAME_OR_EMAIL_OR_PHONE_NUMBER = "usernameOrEmailOrPhoneNumber",
  PASSWORD = "password",
}

interface FormValues {
  usernameOrEmailOrPhoneNumber: string;
  password: string;
}

interface UserError {
  key?: string | null | undefined;
  message?: string;
}

const defaultValues: FormValues = {
  usernameOrEmailOrPhoneNumber: "",
  password: "",
};
const Login = ({ navigation }: Props) => {
  useSetUserContext();
  console.log("login screen");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [genericErrorMessage, setGenericErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const route: RouteProp<{ params: { next: string | null } }> = useRoute();
  const { data: meData, loading: loading } = useMeQuery();

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log("---------------------");
      console.log("trying to login");
      const response = await login({
        variables: data,
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.login.user,
            },
          });
          cache.evict({ fieldName: "boxes" }); // TODO do I need this?
        },
      });

      // └ has to match what defined in graphqlmutation
      const gqlErrors = response.data?.login.errors;
      if (gqlErrors) {
        // setErrors(toErrorMap(response.data.login.errors));
        const resultUserErrors = handleGraphqlErrors(
          data,
          gqlErrors,
          setError as unknown as UseFormSetError<FieldValues>,
          setGenericErrorMessage
        );
      }

      navigation.navigate("Home");
    } catch (error) {
      console.log(" ⛔ catch block", error);
    }
  };

  useEffect(() => {
    console.log("runnnnnn");
    if (meData?.me && setCurrentUser) setCurrentUser(meData.me as User);
  }, [meData?.me, setCurrentUser]);

  useEffect(() => {
    // redirect if already logged in
    if (currentUser) {
      const nextScreen = route.params?.next;
      if (typeof nextScreen === "string") {
        navigation.navigate(nextScreen, {
          from: "Login",
        });
      } else {
        navigation.navigate("Home");
      }
    }
  }, [currentUser]);

  if (loading) {
    return (
      <ScreenLayout>
        <Text>loading...</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Text style={tw`text-white`}>email, phone, username</Text>
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
        name={FormNames.USERNAME_OR_EMAIL_OR_PHONE_NUMBER}
      />
      {errors.usernameOrEmailOrPhoneNumber ? (
        <Text>This is required.</Text>
      ) : null}

      <Text style={tw`text-white`}>Password</Text>

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
      {errors.password && <Text>This is required.</Text>}

      <View>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScreenLayout>
  );
};

export default Login;
