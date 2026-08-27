import type { ComponentProps } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cache } from "react";
import path from "node:path/posix";
import { blogImageMap } from "@/lib/blogDefaults";
import { getAllBlogPages, getBlogPage } from "@/lib/blogUtils";
import type { BlogPageContentMarkdown } from "@/lib/blogTypes";

type BlogRouteParams = {
  mdxPath: string[];
};

const blogBasePath = "/blog";
const getBlogPagesIndex = cache(async () => await getAllBlogPages());

// ReactMarkdown node type - we don't know the exact type, so we use unknown
type ReactMarkdownNode = unknown;

// Helper type for React element with props
interface ReactElementWithProps {
  props: {
    children?: ReactMarkdownChildren;
  };
}

// Type guard to check if value is a React element with props
function isReactElementWithProps(value: unknown): value is ReactElementWithProps {
  return typeof value === 'object' && value !== null && 'props' in value;
}

interface HeadingProps extends ComponentProps<'h1'> {
  node: ReactMarkdownNode;
  children: React.ReactNode;
}

interface LinkProps extends ComponentProps<'a'> {
  node: ReactMarkdownNode;
  href?: string;
  children: React.ReactNode;
}

interface CodeProps extends ComponentProps<'code'> {
  node: ReactMarkdownNode;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ReactMarkdownChildren = string | React.ReactNode | React.ReactNode[];

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

function resolveBlogHref(currentSlug: string, href: string): string {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  if (href.startsWith("/")) {
    return href.endsWith(".md")
      ? href.slice(0, -3)
      : href.endsWith(".mdx")
        ? href.slice(0, -4)
        : href;
  }

  const [rawPath, hash = ""] = href.split("#");
  const currentDir = path.dirname(currentSlug);
  const normalizedPath = path.normalize(path.join(currentDir, rawPath));
  const blogPath = `${blogBasePath}/${normalizedPath}`.replace(
    /\.(md|mdx)$/u,
    "",
  );

  return hash ? `${blogPath}#${hash}` : blogPath;
}

function childrenToString(children: ReactMarkdownChildren): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return children.toString();
  if (Array.isArray(children)) return children.map(childrenToString).join("");
  if (isReactElementWithProps(children)) {
    return childrenToString(children.props.children);
  }
  return "";
}

function createMarkdownComponents(currentSlug: string) {
  return {
    h1: ({ node: _node, children, ...props }: HeadingProps) => {
      const id = slugifyHeading(childrenToString(children));
      return (
        <h1 id={id} {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ node: _node, children, ...props }: HeadingProps) => {
      const id = slugifyHeading(childrenToString(children));
      return (
        <h2 id={id} {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ node: _node, children, ...props }: HeadingProps) => {
      const id = slugifyHeading(childrenToString(children));
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      );
    },
    h4: ({ node: _node, children, ...props }: HeadingProps) => {
      const id = slugifyHeading(childrenToString(children));
      return (
        <h4 id={id} {...props}>
          {children}
        </h4>
      );
    },
    h5: ({ node: _node, children, ...props }: HeadingProps) => {
      const id = slugifyHeading(childrenToString(children));
      return (
        <h5 id={id} {...props}>
          {children}
        </h5>
      );
    },
    h6: ({ node: _node, children, ...props }: HeadingProps) => {
      const id = slugifyHeading(childrenToString(children));
      return (
        <h6 id={id} {...props}>
          {children}
        </h6>
      );
    },
    a: ({ node: _node, href, children, ...props }: LinkProps) => {
      if (!href) {
        return <>{children}</>;
      }
      const resolvedHref = resolveBlogHref(currentSlug, href);
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return (
          <a href={resolvedHref} rel="noreferrer" target="_blank" {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link href={resolvedHref} {...props}>
          {children}
        </Link>
      );
    },
    code: ({ node: _node, inline, className, children, ...props }: CodeProps) => {
      const language = className?.replace("language-", "");
      return inline ? (
        <code {...props}>{children}</code>
      ) : (
        <pre>
          <code
            className={language ? `language-${language}` : undefined}
            {...props}
          >
            {children}
          </code>
        </pre>
      );
    },
  };
}

export async function generateStaticParams(): Promise<BlogRouteParams[]> {
  const pages = await getBlogPagesIndex();
  return pages.map((page: BlogPageContentMarkdown) => ({
    mdxPath: page.slug.split("/").filter(Boolean),
  }));
}

export async function generateMetadata(props: {
  params: Promise<BlogRouteParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const page = await getBlogPage(slug);
  if (!page) {
    return {
      title: "Blog post not found",
    };
  }

  const metadata: Metadata = {
    title: page.frontmatter.title,
  };

  if (page.frontmatter.description) {
    metadata.description = page.frontmatter.description;
    metadata.openGraph = {
      title: page.frontmatter.title,
      description: page.frontmatter.description,
      type: "article",
    };
    metadata.twitter = {
      title: page.frontmatter.title,
      description: page.frontmatter.description,
    };
  }

  return metadata;
}

export default async function BlogArticlePage(props: {
  params: Promise<BlogRouteParams>;
}) {
  const params = await props.params;
  const slug = params.mdxPath.join("/");
  const page = await getBlogPage(slug);

  if (!page) {
    notFound();
  }

  // Get preview image from mapping
  const imageKey = page.frontmatter.previewImage || "feature-01";
  const previewImage = blogImageMap[imageKey] || blogImageMap["feature-01"];
  const previewImageSrc =
    typeof previewImage === "string" ? previewImage : previewImage.src;

  const markdownComponents = createMarkdownComponents(slug);
  const content = (
    <div className="markdown-content">
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm]}
      >
        {page.content}
      </ReactMarkdown>
    </div>
  );

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 pt-24">
      <article className="overflow-hidden rounded-4xl border border-trim-offset bg-page-offset shadow-card">
        <div className="relative aspect-2/1">
          <Image
            src={previewImageSrc}
            alt={page.frontmatter.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-secondary px-3 py-1 font-medium text-content-inverse">
                Blog
              </span>
              {page.frontmatter.publishedAt ? (
                <span>{page.frontmatter.publishedAt}</span>
              ) : null}
            </div>
          </header>

          <h1 className="text-4xl font-semibold tracking-tight text-secondary">
            {page.frontmatter.title}
          </h1>

          <div className="min-w-0 wrap-break-word text-content markdown-content">
            {page.frontmatter.description && (
              <p className="text-lg leading-8 text-content-active mb-6">
                {page.frontmatter.description}
              </p>
            )}
            {content}
          </div>
        </div>
      </article>
    </main>
  );
}
