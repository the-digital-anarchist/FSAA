import Container from "@/components/Container";
import BLOG from "@/blog.config";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import { createHash } from "crypto";
import Article from "@/components/Article";

const blog = ({
  postsToShow,
  //   page,
  //   showNext,
  blockMap,
  pageData,
  emailHash,
}) => {
  return (
    <Container
      title={BLOG.title}
      description={BLOG.description}
      asideData={postsToShow}
      type="article"
      fullWidth={true}
    >
      <Article
        blockMap={blockMap}
        frontMatter={pageData}
        emailHash={emailHash}
      />
    </Container>
  );
};

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: true });
  const pageData = posts.find((t) => t.slug === "home");
  const postsToShow = posts.slice(0, BLOG.postsPerPageSidebar);

  const blockMap = await getPostBlocks(pageData.id);
  const emailHash = createHash("md5")
    .update(BLOG.email)
    .digest("hex")
    .trim()
    .toLowerCase();
  const totalPosts = posts.length;
  const showNext = totalPosts > BLOG.postsPerPageSidebar;

  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext,
      pageData,
      emailHash,
      blockMap,
    },
    revalidate: 1,
  };
}

export default blog;
