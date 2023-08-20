import {
  AdditionKey,
  BackspaceKey,
  ClearKey,
  DivisionKey,
  DotKey,
  EqualityKey,
  MultiplicationKey,
  NumberKey,
  SubtractionKey,
} from '@/components/Key';

export const KeyBoard = () => {
  return (
    <>
      <ClearKey xs={3} />
      <BackspaceKey xs={3} />
      <AdditionKey xs={3} />
      <SubtractionKey xs={3} />
      <NumberKey value={1} xs={3}>
        1
      </NumberKey>
      <NumberKey value={2} xs={3}>
        2
      </NumberKey>
      <NumberKey value={3} xs={3}>
        3
      </NumberKey>
      <MultiplicationKey xs={3} />
      <NumberKey value={4} xs={3}>
        4
      </NumberKey>
      <NumberKey value={5} xs={3}>
        5
      </NumberKey>
      <NumberKey value={6} xs={3}>
        6
      </NumberKey>
      <DivisionKey xs={3} />
      <NumberKey value={7} xs={3}>
        7
      </NumberKey>
      <NumberKey value={8} xs={3}>
        8
      </NumberKey>
      <NumberKey value={9} xs={3}>
        9
      </NumberKey>
      <DotKey xs={3} />
      <NumberKey value={0} xs={3}>
        0
      </NumberKey>
      <EqualityKey xs={9} />
    </>
  );
};
