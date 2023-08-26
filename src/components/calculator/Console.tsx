import { useConsole } from './contexts/ConsoleContext'
import { View } from 'react-native'

export const Console = () => {
  const { value } = useConsole();
  return (
    <View data-testid="console" variant="h4" align="right" sx={ { overflowX: 'hidden' } }>
      {value}
    </View>
  );
};
