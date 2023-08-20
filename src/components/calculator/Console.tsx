import { Typography } from '@mui/material';

import { useConsole } from '@/contexts/ConsoleContext';

export const Console = () => {
  const { value } = useConsole();
  return (
    <Typography data-testid="console" variant="h4" align="right" sx={{ overflowX: 'hidden' }}>
      {value}
    </Typography>
  );
};
