import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../util/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UpvoteSection } from "../components/UpvoteSection";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 20,
    cursor: null as null | string,
  });
  const [{ data: meData }] = useMeQuery(); //this is renaming synta when destructing data => meData

  // console.log(variables);
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        <div>query failed</div>
        <div>{error?.message}</div>
      </div>
    );
  }
  return (
    <Layout>
      {/* Navbar also does server side rendering since it's inside this fille with ssr */}
      {/* add ! because it can't be undefined becase wee catched it! typescrypt didnt know that somehow */}
      {!data && fetching ? (
        <div>loading ... </div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((post) =>
            !post ? null : (
              <Box key={post.id} p={5} m={2} shadow="md" borderWidth="1px">
                <Text>by {post.creator.username}</Text>
                <Flex key={post.id}>
                  <Box flex={1}>
                    {/* <Box boxSize="sm">
                      <Image src={post.videoUrl} alt="image" />
                    </Box> */}

                    <video width="320" height="240" controls>
                      <source src={post.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    <NextLink
                      href={{
                        pathname: "/post/[id]",
                        query: { id: post.id },
                      }}
                    >
                      <Link>
                        <Heading fontSize="xl">{post.title}</Heading>
                      </Link>
                    </NextLink>
                    <UpvoteSection post={post} />
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text mt={4}>{post.textSnippet}</Text>
                      {/* show the box only if I own the post */}
                      {meData?.me?.id !== post.creator.id ? null : (
                        <Box>
                          <EditDeletePostButtons id={post.id} />
                        </Box>
                      )}
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            )
          )}
        </Stack>
      )}

      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            bgColor="lightgrey"
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
