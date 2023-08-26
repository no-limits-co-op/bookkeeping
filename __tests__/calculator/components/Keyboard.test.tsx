import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals'

import { KeyBoard } from 'src/components/calculator/KeyBoard'

describe('Keyboard', () => {
  it('should display operator buttons', () => {
    render(<KeyBoard />);

    expect(screen.queryByTestId('key-addition')).not.toBeNull();
    expect(screen.queryByTestId('key-equality')).not.toBeNull();
  });
});
