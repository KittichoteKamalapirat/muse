import { MockedProvider } from "@apollo/react-testing";
import { act, renderHook } from "@testing-library/react-hooks";
import { UserDocument, useUserQuery } from "../../generated/graphql";

const mockUser = {
  id: "e0930888-50c8-4172-9d80-9ba13cbe4d01",
  username: "kittishane",
  about: null,
  avatar:
    "https://avatars.dicebear.com/api/open-peeps/e0930888-50c8-4172-9d80-9ba13cbe4d01.svg",
  isFollowed: false,
  followerNum: 0,
  userReview: {
    reviewScore: 0,
    reviewCounter: 0,
  },
};

describe("useUserQuery", () => {
  it("Success", async () => {
    const mocks = [
      {
        request: {
          query: UserDocument,
          variables: {
            id: mockUser.id,
          },
        },
        result: {
          data: {
            user: mockUser,
          },
        },
      },
    ];

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(
      // tslint:disable-next-line: react-hooks-nesting
      () => useUserQuery({ variables: { id: mockUser.id } }),
      {
        wrapper,
      }
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();

    await act(waitForNextUpdate);

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual({ user: mockUser });
  });

  it("Unexpected error", async () => {
    const mocks = [
      {
        request: {
          query: UserDocument,
          variables: {
            id: mockUser.id,
          },
        },
        error: new Error("An unexpected error occurred"),
      },
    ];
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={mocks}>{children}</MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(
      // tslint:disable-next-line: react-hooks-nesting
      () => useUserQuery({ variables: { id: mockUser.id } }),
      {
        wrapper,
      }
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();

    await act(waitForNextUpdate);

    expect(result.current.loading).toBe(false);
    expect(result.current?.error?.message).toEqual(
      "An unexpected error occurred"
    );
    expect(result.current.data).toBeUndefined();
  });
});
