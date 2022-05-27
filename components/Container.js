import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BLOG from "@/blog.config";
import Head from "next/head";
import PropTypes from "prop-types";
import Link from "next/link";
import formatDate from "@/lib/formatDate";

const Container = ({
  children,
  layout,
  fullWidth,
  asideData,
  ...customMeta
}) => {
  const url = BLOG.path.length ? `${BLOG.link}/${BLOG.path}` : BLOG.link;
  const meta = {
    title: BLOG.title,
    type: "website",
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        {/* <meta content={BLOG.darkBackground} name="theme-color" /> */}
        <meta name="robots" content="follow, index" />
        <meta charSet="UTF-8" />
        {BLOG.seo.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={BLOG.seo.googleSiteVerification}
          />
        )}
        {BLOG.seo.keywords && (
          <meta name="keywords" content={BLOG.seo.keywords.join(", ")} />
        )}
        <meta name="description" content={meta.description} />
        <meta property="og:locale" content={BLOG.lang} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:url"
          content={meta.slug ? `${url}/${meta.slug}` : url}
        />
        <meta
          property="og:image"
          content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
            meta.title
          )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`}
        />
        <meta property="og:type" content={meta.type} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:title" content={meta.title} />
        <meta
          name="twitter:image"
          content={`${BLOG.ogImageGenerateURL}/${encodeURIComponent(
            meta.title
          )}.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fnobelium.vercel.app%2Flogo-for-dark-bg.svg`}
        />
        {meta.type === "article" && (
          <>
            <meta
              property="article:published_time"
              content={meta.date || meta.createdTime}
            />
            <meta property="article:author" content={BLOG.author} />
          </>
        )}
      </Head>
      <div
        className={`wrapper ${
          BLOG.font === "serif" ? "font-serif" : "font-sans"
        }`}
      >
        <Header
          navBarTitle={layout === "blog" ? meta.title : null}
          fullWidth={fullWidth}
        />
        <main
          className={`m-auto flex-grow w-full transition-all ${
            !fullWidth && !asideData
              ? "max-w-2xl px-4"
              : "max-w-7xl px-4 md:px-24"
          } ${asideData ? "flex flex-row ml-auto" : ""}`}
        >
          <section
            className={`flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in w-full ${
              asideData ? "max-w-4xl pl-4 pr-14" : ""
            }`}
          >
            {children}
          </section>
          {asideData && (
            <aside className="sidebar md:shadow transform -translate-x-full md:max-w-xs md:translate-x-0 transition-transform duration-150 ease-in">
              <div className="pb-7">
                <Image
                  src="/images/FSAA-logo-square.png"
                  alt="Picture of the author"
                  width={500}
                  height={500}
                />
              </div>
              <h2 className="text-lg md:text-xl font-medium cursor-pointer text-black dark:text-gray-100 leading-6">
                NEWS
              </h2>
              <span className="block text-black dark:text-gray-100 leading-3 mb-6">
                .....................................
              </span>
              {asideData.map((post) => (
                <Link key={post.title} href={`${BLOG.path}/${post.slug}`}>
                  <a>
                    <article key={post.id} className="mb-6 md:mb-8">
                      <header className="flex flex-col justify-between md:flex-row md:items-baseline">
                        <h3 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
                          {post.title}
                        </h3>
                      </header>
                      <main>
                        {/* <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
                          {post.summary}
                        </p> */}
                        <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                          {formatDate(
                            post?.date?.start_date || post.createdTime,
                            BLOG.lang
                          )}
                        </time>
                      </main>
                    </article>
                  </a>
                </Link>
              ))}
            </aside>
          )}
        </main>

        <Footer fullWidth={fullWidth} />
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
