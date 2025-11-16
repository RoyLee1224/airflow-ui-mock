import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { AirflowHomePage } from './AirflowHomePage';
import { page } from 'vitest/browser';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <ChakraProvider value={defaultSystem}>
      {component}
    </ChakraProvider>
  );
};

describe('AirflowHomePage', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render the Airflow home page', async () => {
    renderWithProvider(<AirflowHomePage />);

    // Verify header
    const heading = screen.getByText('Apache Airflow');
    expect(heading).toBeDefined();
  });

  it('should display all stat cards', async () => {
    renderWithProvider(<AirflowHomePage />);

    // Check for stat cards by their data-testid
    const totalDags = screen.getByTestId('stat-card-total-dags');
    expect(totalDags).toBeDefined();

    const running = screen.getByTestId('stat-card-running');
    expect(running).toBeDefined();

    const success = screen.getByTestId('stat-card-success');
    expect(success).toBeDefined();

    const failed = screen.getByTestId('stat-card-failed');
    expect(failed).toBeDefined();
  });

  it('should display DAGs table with correct data', async () => {
    renderWithProvider(<AirflowHomePage />);

    // Check for DAG rows
    const dag1 = screen.getByTestId('dag-row-1');
    expect(dag1).toBeDefined();

    const dag2 = screen.getByTestId('dag-row-2');
    expect(dag2).toBeDefined();

    const dag3 = screen.getByTestId('dag-row-3');
    expect(dag3).toBeDefined();

    const dag4 = screen.getByTestId('dag-row-4');
    expect(dag4).toBeDefined();
  });

  it('should capture full page screenshot', async () => {
    renderWithProvider(<AirflowHomePage />);

    // Wait a bit for all styles to be applied
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Capture screenshot
    const screenshot = await page.screenshot({
      fullPage: true,
      path: 'screenshots/airflow-home-full.png',
    });

    expect(screenshot).toBeDefined();
    expect(screenshot.length).toBeGreaterThan(0);
  });

  it('should capture header screenshot', async () => {
    renderWithProvider(<AirflowHomePage />);

    // Wait for page to render
    await new Promise(resolve => setTimeout(resolve, 500));

    // Capture just the header section
    const screenshot = await page.screenshot({
      clip: { x: 0, y: 0, width: 1280, height: 100 },
      path: 'screenshots/airflow-header.png',
    });

    expect(screenshot).toBeDefined();
    expect(screenshot.length).toBeGreaterThan(0);
  });

  it('should capture stats section screenshot', async () => {
    renderWithProvider(<AirflowHomePage />);

    // Wait for page to render
    await new Promise(resolve => setTimeout(resolve, 500));

    // Capture stats section
    const screenshot = await page.screenshot({
      clip: { x: 0, y: 100, width: 1280, height: 150 },
      path: 'screenshots/airflow-stats.png',
    });

    expect(screenshot).toBeDefined();
    expect(screenshot.length).toBeGreaterThan(0);
  });

  it('should capture DAGs table screenshot', async () => {
    renderWithProvider(<AirflowHomePage />);

    // Wait for table to render
    await new Promise(resolve => setTimeout(resolve, 500));

    // Capture table section
    const screenshot = await page.screenshot({
      fullPage: true,
      path: 'screenshots/airflow-dags-table.png',
    });

    expect(screenshot).toBeDefined();
    expect(screenshot.length).toBeGreaterThan(0);
  });
});
