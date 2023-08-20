import { render, screen } from '@testing-library/react';

import { KeyBoard } from '@/components/KeyBoard';

describe('Keyboard', () => {
  it('should display operator buttons', () => {
    render(<KeyBoard />);

    expect(screen.queryByTestId('key-addition')).not.toBeNull();
    expect(screen.queryByTestId('key-equality')).not.toBeNull();
  });
});
