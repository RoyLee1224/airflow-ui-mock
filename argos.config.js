export default {
  // Upload screenshots to Argos
  upload: {
    // Screenshots directory
    screenshots: './screenshots',
    // Token is read from ARGOS_TOKEN environment variable
  },
  // Project reference (will be set in Argos dashboard)
  // Format: owner/repo
  // Example: 'RoyLee1224/airflow-ui-mock'
  reference: {
    // Branch to use as baseline for comparison
    branch: 'main',
    // Commit to use as baseline (optional)
    // If not specified, uses the latest commit on the branch
  },
  // Parallel mode - useful for CI/CD
  parallel: {
    // Total number of parallel jobs
    total: 1,
    // Current job index (0-based)
    nonce: process.env.CI_BUILD_ID || 'local',
  },
};
