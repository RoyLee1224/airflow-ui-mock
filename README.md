# Airflow UI Mock

A mock project of Apache Airflow's home page, built with React + TypeScript + Chakra UI, and tested using Vitest Browser Mode.

## Features

- ✨ Built with React 19 and TypeScript
- 🎨 Chakra UI v3 as UI component library
- 🧪 Browser testing with Vitest Browser Mode
- 📸 Automated screenshot testing
- 🚀 GitHub Actions automated testing workflow
- 👁️ Visual regression testing with Argos CI

## Project Structure

```
airflow-ui-mock/
├── src/
│   ├── components/
│   │   ├── AirflowHomePage.tsx       # Airflow home page component
│   │   └── AirflowHomePage.test.tsx  # Component tests
│   ├── pages/
│   │   └── Dashboard/
│   │       ├── Dashboard.tsx         # Dashboard page
│   │       └── Dashboard.test.tsx    # Dashboard tests
│   ├── test/
│   │   └── setup.ts                  # Test setup
│   ├── theme/
│   │   └── airflowTheme.ts          # Airflow theme colors
│   ├── App.tsx                       # Application entry
│   ├── Sidebar.tsx                   # Navigation sidebar
│   └── main.tsx                      # React entry
├── screenshots/                      # Test screenshot output directory
├── .github/workflows/                # GitHub Actions workflows
├── vitest.config.ts                 # Vitest configuration
└── argos.config.js                  # Argos CI configuration
```

## Installation

```bash
pnpm install
```

## Development

Start the development server:

```bash
pnpm dev
```

Visit http://localhost:5173 to view the application.

## Testing

### Run all tests

```bash
pnpm test:run
```

### Interactive testing

```bash
pnpm test
```

### Testing with UI

```bash
pnpm test:ui
```

## Screenshot Testing

The project includes the following screenshot tests:

1. **Full page screenshot** - Captures the entire Airflow dashboard
2. **Header screenshot** - Captures only the top navigation bar
3. **Statistics cards screenshot** - Captures DAGs statistics
4. **DAGs table screenshot** - Captures the DAGs list table

All screenshots are saved in the `screenshots/` directory.

### Visual Regression Testing with Argos

This project integrates with [Argos CI](https://argos-ci.com) for automated visual regression testing:

- Screenshots are automatically uploaded to Argos on every CI run
- Visual diffs are displayed in Pull Requests
- Baseline screenshots are maintained on the `main` branch
- Review UI changes easily through Argos dashboard

To upload screenshots manually:

```bash
pnpm argos
```

**Note**: The `screenshots/` directory is git-ignored. Argos stores screenshots on their servers and provides visual comparisons in PR comments.

## Build

```bash
pnpm build
```

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **UI Library**: Chakra UI v3
- **Build Tool**: Vite
- **Testing Framework**: Vitest
- **Browser Testing**: @vitest/browser-playwright
- **Visual Testing**: Argos CI
- **Package Manager**: pnpm

## CI/CD

The project uses GitHub Actions for automated testing:

- Triggered on every push to `main` branch or branches starting with `claude/`
- Triggered on every Pull Request
- Automatically runs all tests
- Uploads screenshots to Argos CI for visual comparison
- Uploads screenshots and test results as artifacts

### Workflow Steps

1. Checkout code
2. Setup Node.js and pnpm
3. Install dependencies
4. Install Playwright browsers
5. Run Vitest browser tests
6. Upload screenshots to Argos
7. Upload artifacts (screenshots and test results)

## Argos CI Setup

To use Argos visual testing in your fork:

1. Sign up at [https://app.argos-ci.com](https://app.argos-ci.com)
2. Connect your GitHub repository
3. Add `ARGOS_TOKEN` to your repository secrets
4. Argos will automatically comment on PRs with visual diffs

For detailed setup instructions, see [ARGOS_SETUP.md](./ARGOS_SETUP.md).

## License

MIT
