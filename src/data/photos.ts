// Placeholder photos. To use real ones: drop images into src/assets/photos/,
// import them here, and update the alt text + captions.
// The first three are used in the home-page hero; `photo04` and `photo05` appear on Home and About.
import photo01 from '../assets/photos/photo-01.jpg';
import photo02 from '../assets/photos/photo-02.jpg';
import photo03 from '../assets/photos/photo-03.jpg';
import photo04 from '../assets/photos/photo-04.jpg';
import photo05 from '../assets/photos/photo-05.jpg';
import photo06 from '../assets/photos/photo-06.jpg';
import photo07 from '../assets/photos/photo-07.jpg';
import photo08 from '../assets/photos/photo-08.jpg';
import photo09 from '../assets/photos/photo-09.jpg';
import photo10 from '../assets/photos/photo-10.jpg';
import photo11 from '../assets/photos/photo-11.jpg';
import photo12 from '../assets/photos/photo-12.jpg';

export type Photo = { src: ImageMetadata; alt: string; caption: string };

const make = (src: ImageMetadata, n: number): Photo => ({
  src,
  alt: `Placeholder photo ${n} — replace with a photo of a groomed pup`,
  caption: `Sample caption ${String(n).padStart(2, '0')}`,
});

// Order matters: this is the order of the home-page photo stack and the gallery.
export const photos = {
  photo01: make(photo01, 1),
  photo02: make(photo02, 2),
  photo03: make(photo03, 3),
  photo04: make(photo04, 4),
  photo05: make(photo05, 5),
  photo06: make(photo06, 6),
  photo07: make(photo07, 7),
  photo08: make(photo08, 8),
  photo09: make(photo09, 9),
  photo10: make(photo10, 10),
  photo11: make(photo11, 11),
  photo12: make(photo12, 12),
} satisfies Record<string, Photo>;
