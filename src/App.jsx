import { useEffect, useState } from 'react'
import { Delete, Divide, Equal, X } from 'lucide-react'

const buttons = [
  { label: 'AC', type: 'clear', value: 'clear' },
  { label: 'DEL', type: 'delete', value: 'delete' },
  { label: '÷', type: 'operator', value: '/' },
  { label: '×', type: 'operator', value: '*' },
  { label: '7', type: 'number', value: '7' },
  { label: '8', type: 'number', value: '8' },
  { label: '9', type: 'number', value: '9' },
  { label: '-', type: 'operator', value: '-' },
  { label: '4', type: 'number', value: '4' },
  { label: '5', type: 'number', value: '5' },
  { label: '6', type: 'number', value: '6' },
  { label: '+', type: 'operator', value: '+' },
  { label: '1', type: 'number', value: '1' },
  { label: '2', type: 'number', value: '2' },
  { label: '3', type: 'number', value: '3' },
  { label: '=', type: 'equals', value: '=' },
  { label: '0', type: 'number zero', value: '0' },
  { label: '.', type: 'number', value: '.' },
]

const operatorSymbols = {
  '/': '÷',
  '*': '×',
  '-': '-',
  '+': '+',
}

function App() {
  const [currentValue, setCurrentValue] = useState('0')
  const [previousValue, setPreviousValue] = useState('')
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [justCalculated, setJustCalculated] = useState(false)
  const [error, setError] = useState(false)
  const [pressedKey, setPressedKey] = useState(null)

  const formatResult = (value) => {
    if (!Number.isFinite(value)) {
      return 'Cannot divide by zero'
    }

    const rounded = Number.parseFloat(value.toFixed(12))
    const result = String(rounded)

    if (result.length <= 14) {
      return result
    }

    return rounded.toExponential(8)
  }

  const appendNumber = (number) => {
    setError(false)

    if (justCalculated) {
      setCurrentValue(number === '.' ? '0.' : number)
      setPreviousValue('')
      setOperator(null)
      setWaitingForOperand(false)
      setJustCalculated(false)
      return
    }

    if (waitingForOperand) {
      setCurrentValue(number === '.' ? '0.' : number)
      setWaitingForOperand(false)
      return
    }

    if (number === '.' && currentValue.includes('.')) {
      return
    }

    if (currentValue === '0' && number !== '.') {
      setCurrentValue(number)
      return
    }

    if (currentValue.length >= 14) {
      return
    }

    setCurrentValue((value) => `${value}${number}`)
  }

  const chooseOperator = (nextOperator) => {
    setError(false)

    if (justCalculated) {
      setPreviousValue(currentValue)
      setOperator(nextOperator)
      setWaitingForOperand(true)
      setJustCalculated(false)
      return
    }

    if (operator && waitingForOperand) {
      setOperator(nextOperator)
      return
    }

    if (operator && previousValue) {
      const result = performCalculation(
        Number(previousValue),
        Number(currentValue),
        operator,
      )

      if (result === null) {
        setCurrentValue('Cannot divide by zero')
        setPreviousValue('')
        setOperator(null)
        setWaitingForOperand(true)
        setError(true)
        return
      }

      setCurrentValue(result)
      setPreviousValue(result)
    } else {
      setPreviousValue(currentValue)
    }

    setOperator(nextOperator)
    setWaitingForOperand(true)
  }

  const performCalculation = (first, second, selectedOperator) => {
    switch (selectedOperator) {
      case '+':
        return formatResult(first + second)
      case '-':
        return formatResult(first - second)
      case '*':
        return formatResult(first * second)
      case '/':
        if (second === 0) {
          return null
        }

        return formatResult(first / second)
      default:
        return null
    }
  }

  const calculate = () => {
    if (!operator || waitingForOperand || error) {
      return
    }

    const result = performCalculation(
      Number(previousValue),
      Number(currentValue),
      operator,
    )

    if (result === null) {
      setCurrentValue('Cannot divide by zero')
      setPreviousValue('')
      setOperator(null)
      setWaitingForOperand(true)
      setError(true)
      return
    }

    setPreviousValue(
      `${previousValue} ${operatorSymbols[operator]} ${currentValue} =`,
    )
    setCurrentValue(result)
    setOperator(null)
    setWaitingForOperand(false)
    setJustCalculated(true)
  }

  const clearAll = () => {
    setCurrentValue('0')
    setPreviousValue('')
    setOperator(null)
    setWaitingForOperand(false)
    setJustCalculated(false)
    setError(false)
  }

  const deleteLast = () => {
    if (error || justCalculated || waitingForOperand) {
      return
    }

    if (currentValue.length === 1) {
      setCurrentValue('0')
      return
    }

    setCurrentValue((value) => value.slice(0, -1))
  }

  const handleButtonClick = (value) => {
    if (/^\d$/.test(value) || value === '.') {
      appendNumber(value)
      return
    }

    if (['+', '-', '*', '/'].includes(value)) {
      chooseOperator(value)
      return
    }

    if (value === '=') {
      calculate()
      return
    }

    if (value === 'clear') {
      clearAll()
      return
    }

    if (value === 'delete') {
      deleteLast()
    }
  }

  const handleKeyboard = (event) => {
    const { key } = event

    if (/^\d$/.test(key) || key === '.') {
      event.preventDefault()
      setPressedKey(key)
      handleButtonClick(key)
      return
    }

    if (['+', '-', '*', '/'].includes(key)) {
      event.preventDefault()
      setPressedKey(key)
      handleButtonClick(key)
      return
    }

    if (key === 'Enter' || key === '=') {
      event.preventDefault()
      setPressedKey('=')
      calculate()
      return
    }

    if (key === 'Backspace') {
      event.preventDefault()
      setPressedKey('delete')
      deleteLast()
      return
    }

    if (key === 'Escape' || key.toLowerCase() === 'c') {
      event.preventDefault()
      setPressedKey('clear')
      clearAll()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('keydown', handleKeyboard)
    }
  })

  useEffect(() => {
    if (!pressedKey) {
      return
    }

    const timer = setTimeout(() => {
      setPressedKey(null)
    }, 120)

    return () => clearTimeout(timer)
  }, [pressedKey])

  const getButtonIcon = (value) => {
    if (value === 'delete') {
      return <Delete className="h-4 w-4" aria-hidden="true" />
    }

    if (value === '/') {
      return <Divide className="h-4 w-4" aria-hidden="true" />
    }

    if (value === '*') {
      return <X className="h-4 w-4" aria-hidden="true" />
    }

    if (value === '=') {
      return <Equal className="h-4 w-4" aria-hidden="true" />
    }

    return null
  }

  const displayValue = error ? 'Cannot divide by zero' : currentValue

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111315] px-4 py-6">
      <section
        aria-label="Interactive Calculator"
        className="w-full max-w-[340px] overflow-hidden rounded-[28px] border border-[#36393d] bg-[#25282d] p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:p-4"
      >
        <div className="mb-3 flex items-center justify-between px-1.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff4b55]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffc928]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5d6269]" />
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#191b1f] text-[#d5d7da] shadow-inner">
            <span className="text-sm">▦</span>
          </div>
        </div>

        <div
          className="mb-3 flex min-h-[120px] flex-col items-end justify-end overflow-hidden rounded-[20px] bg-[#2b2e33] px-4 py-4 text-right"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="mb-1.5 min-h-5 max-w-full truncate text-xs font-medium text-[#8f949b]">
            {previousValue}
          </p>

          <p
            className={`max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-light tracking-tight ${
              error
                ? 'text-base text-[#ff6b6b]'
                : 'text-3xl text-[#f2f3f4] sm:text-4xl'
            }`}
          >
            {displayValue}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {buttons.map((button) => {
            const isPressed =
              pressedKey === button.value ||
              (pressedKey === 'delete' && button.value === 'delete') ||
              (pressedKey === 'clear' && button.value === 'clear')

            const isOperator =
              button.type === 'operator' || button.type === 'equals'

            return (
              <button
                key={button.value}
                type="button"
                onClick={() => handleButtonClick(button.value)}
                aria-label={
                  button.value === 'delete'
                    ? 'Delete last digit'
                    : button.value === 'clear'
                      ? 'Clear calculator'
                      : button.label
                }
                data-value={button.value}
                className={`flex min-h-[56px] items-center justify-center rounded-full border text-lg font-normal transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:ring-offset-2 focus:ring-offset-[#25282d] sm:min-h-[60px] ${
                  button.value === '0' ? 'col-span-2' : ''
                } ${
                  button.type === 'clear'
                    ? 'border-[#6a6e74] bg-[#666a70] text-white hover:bg-[#73777d]'
                    : button.type === 'delete'
                      ? 'border-[#6a6e74] bg-[#666a70] text-white hover:bg-[#73777d]'
                      : isOperator
                        ? 'border-[#ff9500] bg-[#ff9500] text-white hover:bg-[#ffab2e]'
                        : 'border-[#555a60] bg-[#4b4f55] text-white hover:bg-[#585d64]'
                } ${isPressed ? 'scale-95' : 'active:scale-95'}`}
              >
                {getButtonIcon(button.value) || button.label}
              </button>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App