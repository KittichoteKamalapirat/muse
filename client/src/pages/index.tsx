import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { createUrqlClient } from "../util/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <div>
      {/* Navbar also does server side rendering since it's inside this fille with ssr */}
      <Navbar />
      {!data
        ? null
        : data.posts.map((post) => <div key={post.id}>{post.title}</div>)}
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
