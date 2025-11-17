export default {
  // Root directory for screenshots
  root: './screenshots',

  // Comparison settings - make it more sensitive
  threshold: 0, // 0 = pixel-perfect comparison (default is 0.1)

  // Enable pixel-by-pixel comparison
  diffingEngine: 'pixelmatch', // Use pixelmatch for strict comparison
};
