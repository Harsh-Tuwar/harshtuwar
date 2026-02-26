export function BlogHero() {
  return (
    <section className="pt-32 pb-16 bg-linear-to-br from-background via-background to-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
          Blog & Insights
        </h1>
        <p className="font-inter text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Sharing thoughts on web development, technology trends, and lessons learned from building modern applications.
        </p>
      </div>
    </section>
  )
}
