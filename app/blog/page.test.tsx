import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  defaultBlogPageContent,
  defaultBlogContentPages,
  getBlogContentPages,
} from "@/lib/blogDefaults";
import BlogHomePage from "./page";

vi.mock("@/lib/blogDefaults", async (importOriginal) => {
  const actual = await importOriginal() as typeof import("@/lib/blogDefaults");
  return {
    ...actual,
    getBlogContentPages: vi.fn(),
  };
});

describe("Blog home page", () => {
  it("renders article cards from hardcoded blog content", async () => {
    vi.mocked(getBlogContentPages).mockResolvedValue(defaultBlogContentPages);

    const markup = renderToStaticMarkup(await BlogHomePage());

    expect(markup).toContain(defaultBlogPageContent.hero.title);
    expect(markup).toContain(defaultBlogPageContent.hero.description);
    expect(markup).toContain(defaultBlogPageContent.hero.badge);

    // Check that all blog posts are rendered
    defaultBlogContentPages.forEach((post) => {
      expect(markup).toContain(post.title);
      if (post.description) {
        // React encodes apostrophes in static markup
        const encodedDescription = post.description.replace(/'/g, "&#x27;");
        expect(markup).toContain(encodedDescription);
      }
      expect(markup).toContain(`href="/blog/${post.slug.current}"`);
    });

    expect(markup).toContain("Read article");
  });
});
