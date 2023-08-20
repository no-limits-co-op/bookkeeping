import { render, screen } from '@testing-library/react';

import { CONSOLE_INIT_TEXT, ConsoleProvider } from '@/contexts/ConsoleContext';
import { Console } from '@/components/Console';

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
