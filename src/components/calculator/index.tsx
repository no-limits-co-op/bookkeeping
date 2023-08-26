import { View } from 'react-native'
import Grid from '../Grid'

import { ConsoleProvider } from './contexts/ConsoleContext'
import { Console } from './Console'
import { KeyBoard } from './KeyBoard'

const Calculator = () => {
  return (
    <View>
      <Grid id="calculator" container columnSpacing={ 2 }>
        <ConsoleProvider>
          <Grid item xs={ 8 } container>
            <Grid item xs={ 12 } sx={ { border: 1, borderRadius: 1, borderColor: 'primary.main' } }>
              <Console/>
            </Grid>
            <KeyBoard/>
          </Grid>
        </ConsoleProvider>
      </Grid>
    </View>
  )
}

export default Calculator
