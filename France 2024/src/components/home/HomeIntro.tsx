export function HomeIntro() {
  return (
    <section className="mx-auto max-w-[720px] py-12 sm:py-16 lg:py-20 px-2 text-foreground">
      <blockquote className="font-serif italic text-lg sm:text-xl lg:text-2xl leading-relaxed text-foreground">
        “On ne voit bien qu’avec le cœur. L’essentiel est invisible pour les yeux.”
        <footer className="mt-3 not-italic font-sans text-xs sm:text-sm text-muted-foreground">
          — Antoine de Saint-Exupéry, <span className="italic">The Little Prince</span>
        </footer>
      </blockquote>

      <p className="mt-10 text-base sm:text-lg leading-relaxed text-foreground">
        This is an archive of my Language Immersion Programme in France (2024).
      </p>

      <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
        My first French journey unfolds across Paris, Besançon, Franche-Comté, and
        the Centre de Linguistique Appliquée (CLA). Each section holds traces of
        daily life as it was lived at the time: movement through unfamiliar streets,
        the repetition of routines that slowly became familiar, and the gradual
        settling of language into something no longer only studied, but inhabited.
      </p>
    </section>
  );
}
