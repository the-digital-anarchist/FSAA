import Container from "@/components/Container";
import Article from "@/components/Article";

const Layout = ({ blockMap, frontMatter, emailHash, fullWidth = false }) => {
  return (
    <Container
      layout="blog"
      title={frontMatter.title}
      description={frontMatter.summary}
      // date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
      fullWidth={fullWidth}
    >
      <Article
        frontMatter={frontMatter}
        emailHash={emailHash}
        blockMap={blockMap}
      />
    </Container>
  );
};

export default Layout;
