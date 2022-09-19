import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NavigationScreenProp } from "react-navigation";
import logo from "../assets/images/logo.png";
import screenImage1 from "../assets/images/onboard-screen-1.jpg";
import screenImage2 from "../assets/images/onboard-screen-2.jpg";
import screenImage3 from "../assets/images/onboard-screen-3.jpg";
import Button, { ButtonTypes } from "../components/Buttons/Button";
import MyText from "../components/MyTexts/MyText";
import {
  MeDocument,
  MeQuery,
  useGuestLoginMutation,
} from "../graphql/generated/graphql";
import tw from "../lib/tailwind";
import { bgColor, grey0, grey500, primaryColor } from "../theme/style";
import { useIsAuth } from "../util/useIsAuth";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface OnboardingInfo {
  id: string;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

const { width, height } = Dimensions.get("window");

const COLORS = { primary: bgColor, white: "#fff" };

const slides: OnboardingInfo[] = [
  {
    id: "1",

    image: screenImage1,
    title: "Welcome to Jocky",
    subtitle: "Request your favorite songs to a DJ at your fingertips.",
  },

  {
    id: "2",
    image: screenImage2,
    title: "Hosting an event?",
    subtitle: "Create an event and invite your guests",
  },
  {
    id: "3",
    image: screenImage3,
    title: "Joining an event?",
    subtitle: "Request your favorite song and enjoy the night!",
  },
  {
    id: "4",
    image: logo,
    title: "Song requests made easy",
    subtitle: "",
  },
];

interface SlideProps {
  item: OnboardingInfo;
  navigation: NavigationScreenProp<any, any>;
}
const Slide = ({ item, navigation }: SlideProps) => {
  useIsAuth(); // !IMPORTTANT need this to set cookie when meQuery changes
  const [guestLogin] = useGuestLoginMutation();

  const handleGuestLogin = async () => {
    try {
      const response = await guestLogin({
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              __typename: "Query",
              me: data?.guestLogin.user,
            },
          });
          cache.evict({ fieldName: "boxes" }); // TODO do I need this?
        },
      });
      // └ has to match what defined in graphqlmutation

      if (response) {
        const userId = response.data?.guestLogin.user?.id;
        if (userId) {
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      console.log("⛔  error registering");
    }
  };

  if (item.id === "4")
    return (
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width,
            height: "50%",
          }}
        >
          <Image source={item.image} style={tw`w-20 h-20`} />
          <MyText
            fontColor="text-primary"
            size="text-3xl"
            extraStyle="font-serif"
          >
            Jocky
          </MyText>
          <Text style={styles.title}>{item?.title}</Text>
        </View>

        <View
          style={{
            width: "80%",
          }}
        >
          <Button
            label="Sign up free"
            onPress={() => navigation.navigate("Register")}
          />
          <Button
            label="Log in"
            type={ButtonTypes.OUTLINED}
            fontColor="grey-100"
            onPress={() => navigation.navigate("Login")}
          />

          <View style={tw`w-full flex items-center mt-4`}>
            <Button
              label="Log in as Guest"
              type={ButtonTypes.TEXT}
              fontColor="text-grey-0"
              onPress={handleGuestLogin}
            />
          </View>

          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    );
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={item.image}
        style={{ height: "85%", width, resizeMode: "cover" }}
      />
      <View style={tw`w-5/6`}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }: Props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.05,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.white,
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.85 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item, index }) => (
          <Slide key={item.id} item={item} navigation={navigation} />
        )}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: grey0,
    maxWidth: "100%",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "left",
    overflowWrap: "normal",
  },
  subtitle: {
    color: grey0,
    fontSize: 14, // can't be larger than this for now
    marginTop: 10,
    textAlign: "left",
  },

  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: grey500,
    marginHorizontal: 3,
    borderRadius: 2,
  },
});
export default OnboardingScreen;
