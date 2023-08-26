import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export const CONSOLE_INIT_TEXT = '0' as const

const ConsoleContext = createContext<Array<any>>([])

export const ConsoleProvider = ({
                                  initValue = CONSOLE_INIT_TEXT,
                                  children
                                }: Record<string, any>) => {
  const [text, setText] = useState(initValue)
  const [calculatedFlag, setCalculatedFlag] = useState(false)
  const contextValue = useMemo(
    () => [text, setText, calculatedFlag, setCalculatedFlag],
    [text, setText, calculatedFlag, setCalculatedFlag]
  )
  return <ConsoleContext.Provider value={ contextValue }>{ children }</ConsoleContext.Provider>
}

export const useConsole = () => {
  const [text, setText, calculatedFlag, setCalculatedFlag] =
    useContext(ConsoleContext)

  const handleInputText = useCallback(
    (
      operateCallback: (currentText: string, isCalculated: boolean) => string,
      isNeedFormat: (currentText: string) => boolean,
      isCalculated = false
    ) => {
      let formattedText = text
      if (isNeedFormat(formattedText)) {
        formattedText = formattedText.slice(0, formattedText.length - 1)
      }
      const newText = operateCallback(formattedText, calculatedFlag)
      setText(newText)
      setCalculatedFlag(isCalculated)
    },
    [text, calculatedFlag]
  )


  return { value: text, onChange: handleInputText }
}
