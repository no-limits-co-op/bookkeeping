import { queryByRole, queryByText, render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';

import { ConsoleProvider } from '@/contexts/ConsoleContext';
import { EqualityKey, NumberKey } from '@/components/Key';
import { History } from '@/components/History';
import { Console } from '@/components/Console';

describe('History', () => {
  //  TODO: record calculation histories
  it('should display "No Histories" without any histories', async () => {
    render(
      <ConsoleProvider>
        <History />
      </ConsoleProvider>,
    );

    const historyEle = screen.queryByTestId('history')!;
    expect(queryByText(historyEle, 'No Histories')).not.toBeNull();
  });

  it('should not change if click keys exclude equality key', async () => {
    render(
      <ConsoleProvider initValue="1+1">
        <NumberKey value={0} />
        <History />
      </ConsoleProvider>,
    );

    const key0 = screen.queryByTestId('key-0')!;
    await user.click(key0);

    const historyEle = screen.queryByTestId('history')!;
    expect(queryByText(historyEle, '1+1')).toBeNull();
  });

  it('should record expression and calculated result', async () => {
    render(
      <ConsoleProvider initValue="1+1">
        <EqualityKey />
        <History />
      </ConsoleProvider>,
    );

    const keyEql = screen.queryByTestId('key-equality')!;
    await user.click(keyEql);

    const historyEle = screen.queryByTestId('history')!;
    expect(queryByText(historyEle, '1+1')).not.toBeNull();
  });

  it('should clear all histories if clicking clear button', async () => {
    render(
      <ConsoleProvider
        initHistories={[
          { id: '1686041244384', expression: '2+1' },
          { id: '1686041244385', expression: '3' },
          { id: '1686041244386', expression: '3+1' },
          { id: '1686041244387', expression: '4' },
          { id: '1686041244388', expression: '4+1' },
        ]}
      >
        <History />
      </ConsoleProvider>,
    );

    const clearHistoryBtn = screen.queryByTestId('clear-history')!;
    await user.click(clearHistoryBtn);

    const historyEle = screen.queryByTestId('history')!;
    expect(queryByText(historyEle, 'No Histories')).not.toBeNull();
  });

  it('should display history item when going to this item', async () => {
    render(
      <ConsoleProvider
        initHistories={[
          { id: '1686041244384', expression: '2+1' },
          { id: '1686041244385', expression: '3' },
          { id: '1686041244386', expression: '3+1' },
          { id: '1686041244387', expression: '4' },
          { id: '1686041244388', expression: '4+1' },
        ]}
      >
        <Console />
        <History />
      </ConsoleProvider>,
    );

    const historyItemEle = screen.queryByTestId('history-1686041244386')!;
    const gotoBtn = queryByRole(historyItemEle, 'button')!;
    await user.click(gotoBtn);

    const consoleEle = screen.queryByTestId('console')!;
    expect(consoleEle.innerHTML).toBe('3+1');

    const historyEle = screen.queryByTestId('history')!;
    expect(historyEle.children.length).toBe(2);
  });
});
