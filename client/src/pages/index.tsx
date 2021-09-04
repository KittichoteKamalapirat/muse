import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../util/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import { Link } from "@chakra-ui/layout";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  // console.log(variables);
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>query failed</div>;
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>Cookknow</Heading>
        <NextLink href="/create-post">
          <Link ml={"auto"} color={"green"} fontWeight={700}>
            Create Post
          </Link>
        </NextLink>
      </Flex>

      {/* Navbar also does server side rendering since it's inside this fille with ssr */}
      {/* add ! because it can't be undefined becase wee catched it! typescrypt didnt know that somehow */}
      {!data && fetching ? (
        <div>loading ... </div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((post) => (
            <div key={post.id}>
              <Box key={post.id} p={5} m={2} shadow="md" borderWidth="1px">
                <Heading fontSize="xl">{post.title}</Heading>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            </div>
          ))}
        </Stack>
      )}

      {data ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.length - 1].createdAt,
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
