import { cleanup, render, screen } from "@testing-library/react";
import { Register } from "./register";
import { MockedProvider } from "@apollo/client/testing";
import { PostsDocument } from "../generated/graphql";

describe("register", () => {
  afterEach(cleanup);

  const mocks = [
    {
      request: {
        query: PostsDocument,
        variables: {
          limit: 20,
          cursor: null as null | string,
        },
      },
      result: {
        data: {
          posts: {
            __typename: "PaginatedPosts",
            hasMore: true,
            posts: [
              {
                __typename: "Post",
                id: 10,
                title: "Italian Restaurant @ France",
                text: "One of the most famous restaurants in France",
                textSnippet: "One of the most famous restaurants in France",
                url: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
                createdAt: "1643276872384",
                updatedAt: "1643303094908",
                reviewsSum: 14,
                reviewsCounter: 5,
                reviewAvg: 2.8,
                creator: {
                  id: 7,
                  username: "nicha",
                },
              },
              {
                __typename: "Post",
                id: 3,
                title: "Korean fusion restaurant @ Bangkok",
                text: "nicee",
                textSnippet: "nicee",
                url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
                createdAt: "1643121357529",
                updatedAt: "1643303097073",
                reviewsSum: 47,
                reviewsCounter: 13,
                reviewAvg: 3.6153846153846154,
                creator: {
                  id: 6,
                  username: "kittishane",
                },
              },
            ],
          },
        },
      },
    },
  ];
  it("user can register", async () => {
    const { debug } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* <ThemeProvider theme={theme}> */}

        <Register />

        {/* </ThemeProvider> */}
      </MockedProvider>
    );
    // render(<Register />);
    // screen.debug();

    // expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    // const title = await screen.findByText(/italian restaurant @ france/i);

    // expect(title).toBeInTheDocument();
  });
});
