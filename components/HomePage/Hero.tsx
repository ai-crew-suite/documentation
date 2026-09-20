import Link from "next/link";

import { IHeroProps } from "@/lib/types";

import { Button } from "../shared/button";

/**
 * Marketing landing page hero — blueprint paper style.
 */
const Hero = ({ description, title, btnGetStarted }: IHeroProps) => {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pt-32 pb-16 text-center sm:px-6 sm:pt-40 sm:pb-20">
      <div className="flex max-w-3xl flex-col items-center gap-6">
        <h1 className="text-4xl font-semibold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-content-offset sm:text-xl">
          {description}
        </p>

        {btnGetStarted && btnGetStarted.text.trim() !== "" ? (
          <div data-testid="hero-cta-container" className="mt-4">
            <Button
              asChild
              variant="default"
              size="lg"
              className="h-12 rounded-full bg-secondary px-8 text-lg font-semibold text-secondary-inverse transition-colors hover:bg-secondary-offset"
            >
              <Link href={btnGetStarted.link}>{btnGetStarted.text}</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Hero;
