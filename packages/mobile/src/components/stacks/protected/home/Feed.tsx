import {
  PostSnippetFragment,
  useMeQuery,
  usePostsQuery,
} from "@cookknow/shared-package";
import { Video } from "expo-av";
import React from "react";
import {
  Button,
  FlatList,
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  Text,
  View,
} from "react-native";
import { Center } from "../../../Container/Center";

interface FeedProps {}

export const Feed: React.FC<FeedProps> = ({}) => {
  const [status, setStatus] = React.useState({ isPlaying: false });
  const video = React.useRef(null);
  const { data: me, loading: meLoading } = useMeQuery();

  const {
    data: posts,
    error: postsError,
    loading: postsLoading,
    fetchMore,
    variables,
  } = usePostsQuery({
    variables: {
      limit: 20,
      cursor: null as null | string,
    },
  });
  //   console.log({ me });
  //   console.log({ posts });

  const renderItem: ListRenderItem<PostSnippetFragment> = (
    post: ListRenderItemInfo<PostSnippetFragment>
  ) => (
    <Center>
      <View
        style={{
          width: "90%",
        }}
      >
        {/* avatar and username */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            // style={{ width: "10px", height: "10px", borderRadius: "20px" }}
            source={{ uri: post.item.creator.avatar }}
          />
          <Text>{post.item.creator.username}</Text>
        </View>
        {/* video */}
        <View>
          <Video
            ref={video}
            style={{
              width: "100%",
              height: 40,
              flex: 1,
              flexDirection: "row",
            }}
            source={{
              uri: post.item.videoUrl,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View>
        </View>
        {/* content */}

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {post.item.title}
          </Text>
          <Text>{post.item.textSnippet}</Text>
        </View>
      </View>
    </Center>
  );

  if (meLoading || postsLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!posts || postsError) {
    return (
      <View>
        <Text>Query</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={posts?.posts.posts}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
      />
    </View>
  );
};
