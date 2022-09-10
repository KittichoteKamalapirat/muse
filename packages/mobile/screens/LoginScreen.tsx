import { Entypo } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormSetError,
} from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import IconButton from "../components/Buttons/IconButton";
import ScreenLayout from "../components/layouts/ScreenLayout";
import MyText from "../components/MyTexts/MyText";
import { UserContext } from "../context/UserContext";
import {
  MeDocument,
  MeQuery,
  useLoginMutation,
  useMeQuery,
  User,
} from "../graphql/generated/graphql";
import tw from "../lib/tailwind";
import { grey0, grey100 } from "../theme/style";
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

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { data: meData, loading: loading } = useMeQuery();
  const [passwordIsShown, setPasswordIsShown] = useState(false);
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

  const [login] = useLoginMutation();

  const togglepasswordIsShown = () => {
    setPasswordIsShown(!passwordIsShown);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
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

      console.log("response log in", response);

      if (response) {
        const gqlErrors = response.data?.login.errors;

        const resultUserErrors = handleGraphqlErrors(
          data,
          gqlErrors,
          setError as unknown as UseFormSetError<FieldValues>,
          setGenericErrorMessage
        );

        const userId = response.data?.login.user?.id;
        if (resultUserErrors.length === 0 && userId) {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.log("⛔ catch block", error);
    }
  };

  // manuall set user in context
  useEffect(() => {
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
      <ScreenLayout alignItems="items-center">
        <MyText>loading...</MyText>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout alignItems="items-center">
      <View style={tw`w-3/4`}>
        <MyText size="text-2xl" weight="font-bold" extraStyle="mb-4">
          Log in
        </MyText>

        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Email or Username</Text>
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
                placeholder="Email or Username"
                placeholderTextColor={grey100}
                style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
              />
            )}
            name={FormNames.USERNAME_OR_EMAIL_OR_PHONE_NUMBER}
          />
          {errors.usernameOrEmailOrPhoneNumber ? (
            <Text>This is required.</Text>
          ) : null}
        </View>

        <View style={tw`mt-2`}>
          <Text style={tw`text-white`}>Password</Text>

          <View style={tw`items-end`}>
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
                  placeholder="Password"
                  placeholderTextColor={grey100}
                  secureTextEntry={!passwordIsShown}
                  style={tw`text-grey-0 bg-grey-500 w-full h-8 p-2 rounded-sm m-auto my-2`}
                />
              )}
              name={FormNames.PASSWORD}
            />
            <IconButton
              icon={
                <Entypo
                  name={passwordIsShown ? "eye-with-line" : "eye"}
                  size={16}
                  color={grey0}
                  onPress={togglepasswordIsShown}
                />
              }
            />
          </View>

          {errors.password && <Text>This is required.</Text>}
        </View>

        <View style={tw`mt-6`}>
          <Button label="Login" onPress={handleSubmit(onSubmit)} />
        </View>

        <View style={tw`flex-row justify-center mt-2`}>
          <MyText>Don't have an account yet? </MyText>
          <Button
            label="Create account"
            type={ButtonTypes.TEXT}
            onPress={() => navigation.navigate("Register")}
            size="text-md"
            fontColor="text-primary"
          />
        </View>
      </View>
    </ScreenLayout>
  );
};

export default Login;
