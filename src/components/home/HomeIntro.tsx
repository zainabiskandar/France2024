import { Moon, Star, Sparkle } from "lucide-react";

export function HomeIntro() {
  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 text-foreground">
      {/* Decorative quote block */}
      <figure className="relative mx-auto max-w-[820px] px-6 sm:px-10 py-10 sm:py-14">
        {/* Decorative celestial accents */}
        <Star
          className="absolute top-2 left-2 h-4 w-4 text-muted-foreground/50"
          strokeWidth={1.25}
          aria-hidden
        />
        <Sparkle
          className="absolute top-6 right-8 h-3 w-3 text-muted-foreground/40"
          strokeWidth={1.25}
          aria-hidden
        />
        <Moon
          className="absolute -top-1 right-2 h-5 w-5 text-muted-foreground/60 -rotate-12"
          strokeWidth={1.25}
          aria-hidden
        />
        <Star
          className="absolute bottom-6 left-10 h-3 w-3 text-muted-foreground/40"
          strokeWidth={1.25}
          aria-hidden
        />
        <Sparkle
          className="absolute bottom-2 right-4 h-4 w-4 text-muted-foreground/50"
          strokeWidth={1.25}
          aria-hidden
        />

        <blockquote className="text-center">
          <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl leading-relaxed text-foreground">
            “On ne voit bien qu’avec le cœur.
            <br className="hidden sm:block" />
            {" "}L’essentiel est invisible pour les yeux.”
          </p>
          <p className="mt-5 font-serif text-base sm:text-lg leading-relaxed text-muted-foreground">
            “One sees clearly only with the heart.
            <br className="hidden sm:block" />
            {" "}What is essential is invisible to the eyes.”
          </p>
          <figcaption className="mt-6 font-sans text-xs sm:text-sm tracking-wide uppercase text-muted-foreground">
            — Antoine de Saint-Exupéry,{" "}
            <span className="italic normal-case">The Little Prince</span>
          </figcaption>
        </blockquote>
      </figure>

      <div className="mt-10 space-y-6">
        <p className="text-base sm:text-lg leading-relaxed text-foreground">
          This is an archive of my Language Immersion Programme in France (2024).
        </p>

        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          My first French journey unfolds across Paris, Besançon, Franche-Comté, and
          the Centre de Linguistique Appliquée (CLA). Each section holds traces of
          daily life as it was lived at the time: movement through unfamiliar streets,
          the repetition of routines that slowly became familiar, and the gradual
          settling of language into something no longer only studied, but inhabited.
        </p>
      </div>
    </section>
  );
}
