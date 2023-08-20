import { Button, Grid } from '@mui/material';

import { CONSOLE_INIT_TEXT, useConsole } from '@/contexts/ConsoleContext';

type KeyProps = {
  value: number | string;
  onClick: (value: number | string) => void;
} & Record<string, any>;

export const Key = ({ value, children, onClick: clickHandle, ...props }: KeyProps) => {
  return (
    <Grid
      item
      data-testid={`key-${value}`}
      key={value}
      onClick={() => clickHandle(value)}
      component={Button}
      sx={{ border: 1, borderColor: 'primary.light' }}
      {...props}
    >
      {children}
    </Grid>
  );
};

type NumberKeyProps = {
  value: number | string;
  onClick?: (value: number | string) => void;
} & Record<string, any>;

export const NumberKey = ({ onClick: clickHandle = () => {}, ...props }: NumberKeyProps) => {
  const { onChange: handleInputText } = useConsole();
  return (
    <Key
      onClick={(value: number | string) => {
        handleInputText(
          (currentText, isCalculated) => (isCalculated ? `${value}` : `${currentText}${value}`),
          (currentText: string) => currentText === CONSOLE_INIT_TEXT || /\D0$/.test(currentText),
        );
        clickHandle(value);
      }}
      {...props}
    />
  );
};

type OperatorKeyProps = {
  value: string;
  onClick?: (value: number | string) => void;
  operateCallback: (currentText: string) => string;
  isCalculated?: boolean;
} & Record<string, any>;

export const OperatorKey = ({
  onClick: clickHandle = () => {},
  operateCallback,
  isCalculated = false,
  ...props
}: OperatorKeyProps) => {
  const { onChange: handleInputText } = useConsole();
  return (
    <Key
      onClick={(value: number | string) => {
        handleInputText(
          operateCallback,
          (currentText: string) => /\D$/.test(currentText),
          isCalculated,
        );
        clickHandle(value);
      }}
      {...props}
    />
  );
};

export const AdditionKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="addition"
      operateCallback={(currentText: string) => `${currentText}+`}
      {...props}
    >
      +
    </OperatorKey>
  );
};

export const SubtractionKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="subtraction"
      operateCallback={(currentText: string) => `${currentText}-`}
      {...props}
    >
      -
    </OperatorKey>
  );
};

export const MultiplicationKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="multiplication"
      operateCallback={(currentText: string) => `${currentText}*`}
      {...props}
    >
      *
    </OperatorKey>
  );
};

export const DivisionKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="division"
      operateCallback={(currentText: string) => `${currentText}/`}
      {...props}
    >
      /
    </OperatorKey>
  );
};

export const DotKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="dot"
      operateCallback={(currentText: string) => `${currentText}.`}
      {...props}
    >
      .
    </OperatorKey>
  );
};

export const EqualityKey = (props: Record<string, any>) => {
  return (
    <OperatorKey
      value="equality"
      operateCallback={(currentText: string) => {
        // eslint-disable-next-line no-eval
        return eval(currentText).toString();
      }}
      isCalculated
      {...props}
    >
      =
    </OperatorKey>
  );
};

export const ClearKey = (props: Record<string, any>) => (
  <OperatorKey value="clear" operateCallback={() => CONSOLE_INIT_TEXT} {...props}>
    C
  </OperatorKey>
);

export const BackspaceKey = (props: Record<string, any>) => (
  <OperatorKey
    value="backspace"
    operateCallback={(currentText) => {
      if (currentText.length === 1) return CONSOLE_INIT_TEXT;
      return currentText.slice(0, currentText.length - 1);
    }}
    {...props}
  >
    &lt;-
  </OperatorKey>
);
