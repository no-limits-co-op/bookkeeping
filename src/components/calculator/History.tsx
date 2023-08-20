import { Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { History as HistoryType, useConsole } from '@/contexts/ConsoleContext';

export const History = () => {
  const { histories, skipToHistory, clearHistory } = useConsole();
  return (
    <>
      <Button variant="contained" data-testid="clear-history" onClick={clearHistory}>
        Clear History
      </Button>
      <List data-testid="history" sx={{ overflowY: 'auto', maxHeight: 200, width: '100%' }}>
        {histories.length > 0 ? (
          histories.map(({ id, expression }: HistoryType) => (
            <ListItem key={`histories-${id}`} data-testid={`history-${id}`} divider disablePadding>
              <ListItemButton onClick={() => skipToHistory(id)}>
                <ListItemText primary={expression} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>No Histories</ListItem>
        )}
      </List>
    </>
  );
};
