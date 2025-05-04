export type OperatorType = '+' | '-' | '*' | '/' | '';

export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operator: OperatorType;
  overwrite: boolean;
  expression: string;
}

// Adding sx props to button component to allow for gridColumn span 2 for the 0 button to have a larger width
export interface ButtonProps {
  value: string;
  onClick: () => void;
  className?: string;
  sx?: React.CSSProperties | Record<string, unknown>;
}