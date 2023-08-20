import { render, screen } from '@testing-library/react';

import user from '@testing-library/user-event';

import {
  AdditionKey,
  BackspaceKey,
  ClearKey,
  DivisionKey,
  DotKey,
  EqualityKey,
  Key,
  MultiplicationKey,
  NumberKey,
  SubtractionKey,
} from '@/components/Key';
import { CONSOLE_INIT_TEXT, ConsoleProvider } from '@/contexts/ConsoleContext';
import { Console } from '@/components/Console';

describe('Key', () => {
  it('should display single number', async () => {
    const mockHandleClick = jest.fn();

    render(
      <Key value={1} onClick={mockHandleClick}>
        1
      </Key>,
    );
    const key = await screen.findByTestId('key-1');
    await user.click(key);

    expect(mockHandleClick).toHaveBeenCalledWith(1);
  });
});

const getConsoleText = () => {
  const consoleEle = screen.queryByTestId('console')!;
  return consoleEle.innerHTML;
};

describe('NumberKey', () => {
  it('should display input text', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <NumberKey value={1} />
      </ConsoleProvider>,
    );
    const button = screen.queryByTestId('key-1')!;
    await user.click(button);
    await user.click(button);

    expect(getConsoleText()).toBe('11');
  });

  it('should display input text suffix 0', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <NumberKey value={1} />
        <NumberKey value={0} />
      </ConsoleProvider>,
    );
    const button0 = screen.queryByTestId('key-0')!;
    const button1 = screen.queryByTestId('key-1')!;
    await user.click(button1);
    await user.click(button0);

    expect(getConsoleText()).toBe('10');
  });

  it('should display 0 when current text is 0 and inputs 0', async () => {
    render(
      <ConsoleProvider>
        <Console />
        <NumberKey value={0} />
      </ConsoleProvider>,
    );
    const button = screen.queryByTestId('key-0')!;
    await user.click(button);
    await user.click(button);

    expect(getConsoleText()).toBe('0');
  });

  it('should replace 0 after clicking other number buttons when first digit of number is 0', async () => {
    render(
      <ConsoleProvider initValue="10+0">
        <Console />
        <NumberKey value={1} />
      </ConsoleProvider>,
    );
    const button = screen.queryByTestId('key-1')!;
    await user.click(button);

    expect(getConsoleText()).toBe('10+1');
  });
});

describe('OperatorKey', () => {
  it('should replace char when last char is operator and click operator button', async () => {
    render(
      <ConsoleProvider initValue="10+">
        <Console />
        <SubtractionKey />
      </ConsoleProvider>,
    );
    const button = screen.queryByTestId('key-subtraction')!;
    await user.click(button);

    expect(getConsoleText()).toBe('10-');
  });

  it.each([
    { keyValue: 'subtraction', component: <SubtractionKey />, expected: '0-' },
    {
      keyValue: 'addition',
      component: <AdditionKey />,
      expected: '0+',
    },
    {
      keyValue: 'multiplication',
      component: <MultiplicationKey />,
      expected: '0*',
    },
    {
      keyValue: 'division',
      component: <DivisionKey />,
      expected: '0/',
    },
    {
      keyValue: 'dot',
      component: <DotKey />,
      expected: '0.',
    },
    {
      keyValue: 'clear',
      initValue: '10+2',
      component: <ClearKey />,
      expected: CONSOLE_INIT_TEXT,
    },
  ])(
    'should display $keyValue char when click $keyValue key',
    async ({ keyValue, initValue, component, expected }) => {
      render(
        <ConsoleProvider initValue={initValue}>
          <Console />
          {component}
        </ConsoleProvider>,
      );
      const button = screen.queryByTestId(`key-${keyValue}`)!;
      await user.click(button);

      expect(getConsoleText()).toBe(expected);
    },
  );
});

describe('EqualityKey', () => {
  const clickEqualityKey = async () => {
    const button = screen.queryByTestId('key-equality')!;
    await user.click(button);
  };

  it('should print result when click equality button', async () => {
    render(
      <ConsoleProvider initValue="1+9">
        <Console />
        <EqualityKey />
      </ConsoleProvider>,
    );
    await clickEqualityKey();

    expect(getConsoleText()).toBe('10');
  });

  it('should cancel last operator without number after last operator when click equality button', async () => {
    render(
      <ConsoleProvider initValue="1+9+">
        <Console />
        <EqualityKey />
      </ConsoleProvider>,
    );
    await clickEqualityKey();

    expect(getConsoleText()).toBe('10');
  });

  it('should replace by new number if click number key after click equality button', async () => {
    render(
      <ConsoleProvider initValue="1+9">
        <Console />
        <NumberKey value={1} />
        <EqualityKey />
      </ConsoleProvider>,
    );

    const button1 = screen.queryByTestId('key-1')!;

    await clickEqualityKey();
    await user.click(button1);

    expect(getConsoleText()).toBe('1');
  });

  it('should calculate by last result if click operator key after click equality button', async () => {
    render(
      <ConsoleProvider initValue="1+9">
        <Console />
        <AdditionKey />
        <EqualityKey />
      </ConsoleProvider>,
    );

    const buttonAdd = screen.queryByTestId('key-addition')!;

    await clickEqualityKey();
    await user.click(buttonAdd);

    expect(getConsoleText()).toBe('10+');
  });
});

describe('BackspaceKey', () => {
  async function clickBackspace() {
    const keyBack = screen.queryByTestId('key-backspace')!;
    await user.click(keyBack);
  }

  it('should remove last char in console', async () => {
    render(
      <ConsoleProvider initValue="1+9">
        <Console />
        <BackspaceKey />
      </ConsoleProvider>,
    );
    await clickBackspace();

    expect(getConsoleText()).toBe('1+');
  });

  it('should reset to initial value if expression in console is one char', async () => {
    render(
      <ConsoleProvider initValue="1">
        <Console />
        <BackspaceKey />
      </ConsoleProvider>,
    );
    await clickBackspace();

    expect(getConsoleText()).toBe(CONSOLE_INIT_TEXT);
  });
});
