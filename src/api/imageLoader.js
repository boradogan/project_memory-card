console.log('initializing the image loader')
// src/imageLoader.js

// 1. Use import.meta.glob to find all image files.
// The '/src/assets/**/*.png' pattern means:
// - Start in the /src/assets directory.
// - The first '**' means look in any subdirectory (alice, bob, etc.).
// - The '*.png' means find any file ending with .png.
// - { eager: true } imports the images directly.
const imageModules = import.meta.glob('/src/assets/**/*.jpg', { eager: true });

// 2. Process the modules into a more useful structure.
export const characterImages = Object.entries(imageModules).reduce((acc, [path, module]) => {
  // The path will look like: '/src/assets/alice/01.png'
  // We extract the character name ("alice") from the path.
  const pathParts = path.split('/');
  const characterName = pathParts[pathParts.length - 2];

  // Get the public URL of the image.
  const imageUrl = module.default;

  // If this is the first image for this character, create an array.
  if (!acc[characterName]) {
    acc[characterName] = [];
  }

  // Add the image URL to the character's array.
  acc[characterName].push(imageUrl);

  return acc;
}, {});
console.log(characterImages);
// The final 'characterImages' object will look like this:
// {
//   alice: ['/src/assets/alice/01.png', '/src/assets/alice/02.png'],
//   bob: ['/src/assets/bob/01.png', '/src/assets/bob/02.png'],
//   ...
// }