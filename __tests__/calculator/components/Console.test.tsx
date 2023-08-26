import { render, screen } from '@testing-library/react';

import { describe, it, expect } from '@jest/globals'
import { CONSOLE_INIT_TEXT, ConsoleProvider } from 'src/components/calculator/contexts/ConsoleContext'
import { Console } from 'src/components/calculator/Console'

describe('Console', () => {
  it('should should display 0 as initial text', () => {
    render(
      <ConsoleProvider>
        <Console />
      </ConsoleProvider>,
    );

    const consoleEle = screen.queryByTestId('console')!;
    expect(consoleEle.innerHTML).toBe(CONSOLE_INIT_TEXT);
  });
});
