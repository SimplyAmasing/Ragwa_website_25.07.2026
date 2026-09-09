hero-main.png — the approved main marketing artwork (2048x768).

Always slide 1 of the hero carousel. Designed with a clean negative-space area
on the LEFT; the site renders the localized headline / subtitle / CTA there as
real HTML (never baked in, never mirrored). The product cluster on the right
stays unobstructed. Arrows and pagination dots are separate website UI on top.

Localise per-locale later by adding hero-main.he.png / hero-main.en.png and
wiring them in src/components/HeroCarousel.tsx.

Committed (real site asset), unlike public/mock-images/.
