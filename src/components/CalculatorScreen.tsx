import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import Button from './Button';
import { CalculatorState, OperatorType } from '../types/types';

const CalculatorScreen = () => {
    const [state, setState] = useState<CalculatorState>({
        currentValue: '0',
        previousValue: '',
        operator: '',
        overwrite: true,
        expression: ''
    });

    const getOperatorSymbol = (op: OperatorType): string => {
        switch (op) {
            case '+': return '+';
            case '-': return '-';
            case '*': return '×';
            case '/': return '÷';
            default: return '';
        }
    };

    const handleDigitInput = (digit: string) => {
        if (state.overwrite) { //if overwriting current value
            setState({
                ...state,
                currentValue: digit,
                overwrite: false,
                expression: state.operator ?
                    `${state.previousValue} ${getOperatorSymbol(state.operator)} ${digit}` :
                    digit
            });
        } else {
            if (digit === '.' && state.currentValue.includes('.')) { // cannot have 2 decimals in a number
                return;
            }
            if (state.currentValue === '0' && digit !== '.') { // no leading 0s allowed if not a decimal
                setState({
                    ...state,
                    currentValue: digit,
                    expression: state.operator ?
                        `${state.previousValue} ${getOperatorSymbol(state.operator)} ${digit}` :
                        digit
                });
            } else {
                setState({
                    ...state,
                    currentValue: state.currentValue + digit,
                    expression: state.operator ?
                        `${state.previousValue} ${getOperatorSymbol(state.operator)} ${digit}` :
                        state.currentValue
                });
            }
        }
    };

    const handleOperatorInput = (operator: OperatorType) => {
        if (state.operator && !state.overwrite) {
            const result = performCalculation();
            setState({
                currentValue: result,
                previousValue: result,
                operator,
                overwrite: true,
                expression: `${result} ${getOperatorSymbol(operator)}`
            });
        } else {
            setState({
                ...state,
                previousValue: state.currentValue,
                operator,
                overwrite: true,
                expression: `${state.currentValue} ${getOperatorSymbol(operator)}`
            });
        }
    };

    // calculator functions. takes in string then parseFloat to get number calcs.
    const performCalculation = (): string => {
        const prev = parseFloat(state.previousValue);
        const current = parseFloat(state.currentValue);

        let result = 0;
        switch (state.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    return "Can't divide by 0";
                }
                result = prev / current;
                break;
            default:
                return state.currentValue;
        }

        return result.toString();
    };

    const handleEquals = () => {
        if (!state.operator || state.overwrite) {
            return;
        }

        const result = performCalculation();
        setState({
            currentValue: result,
            previousValue: '',
            operator: '',
            overwrite: true,
            expression: ''
        });
    };

    const handleClear = () => {
        setState({
            currentValue: '0',
            previousValue: '',
            operator: '',
            overwrite: true,
            expression: ''
        });
    };

    // Percent button functionality
    const handlePercentage = () => {
        const newValue = (parseFloat(state.currentValue) / 100).toString();
        setState({
            ...state,
            currentValue: newValue,
            overwrite: false,
            expression: state.operator ?
                `${state.previousValue} ${getOperatorSymbol(state.operator)} ${newValue}` :
                newValue
        });
    };

    // Sign change functionality
    const handleSignChange = () => {
        const newValue = (parseFloat(state.currentValue) * -1).toString();
        setState({
            ...state,
            currentValue: newValue,
            expression: state.operator ?
                `${state.previousValue} ${getOperatorSymbol(state.operator)} ${newValue}` :
                newValue
        });
    };

    return (
        <div>
            <div>
                 <Container>
                {/* Below sections are for the full expression (top) and current value (bottom). Tried to mirror my phone calculator display */}
                <Typography
                    sx={{
                        color: "#AAAAAA",
                        fontSize: "2em",
                        textAlign: "right",
                        paddingRight: "20px",
                        height: "2em",
                        minHeight: "2em",
                    }}
                >
                    {state.expression}
                </Typography>
                <Typography
                    sx={{
                        color: "#FFFFFF",
                        fontSize: "4em",
                        justifySelf: "end",
                        paddingRight: "20px",
                        marginBottom: "0.5em"
                    }}
                >
                    {state.currentValue}
                </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
                        {/* FIRST ROW: AC, +/-, %, divide */}
                        <Button
                            value="AC"
                            onClick={handleClear}
                            className='calculator-top-row'
                        />
                        <Button
                            value="+/-"
                            onClick={handleSignChange}
                            className='calculator-top-row'
                        />
                        <Button
                            value="%"
                            onClick={handlePercentage}
                            className='calculator-top-row'
                        />
                        <Button
                            value="÷"
                            onClick={() => handleOperatorInput('/')}
                            className='calculator-button-operations'
                        />
                        {/* SECOND ROW: 7, 8, 9, multiply */}
                        <Button
                            value="7"
                            onClick={() => handleDigitInput('7')}
                            className='calculator-button'
                        />
                        <Button
                            value="8"
                            onClick={() => handleDigitInput('8')}
                            className='calculator-button'
                        />
                        <Button
                            value="9"
                            onClick={() => handleDigitInput('9')}
                            className='calculator-button'
                        />
                        <Button
                            value="×"
                            onClick={() => handleOperatorInput('*')}
                            className='calculator-button-operations'
                        />
                        {/* THIRD ROW: 4, 5, 6, subtract */}
                        <Button
                            value="4"
                            onClick={() => handleDigitInput('4')}
                            className='calculator-button'
                        />
                        <Button
                            value="5"
                            onClick={() => handleDigitInput('5')}
                            className='calculator-button'
                        />
                        <Button
                            value="6"
                            onClick={() => handleDigitInput('6')}
                            className='calculator-button'
                        />
                        <Button
                            value="-"
                            onClick={() => handleOperatorInput('-')}
                            className='calculator-button-operations'
                        />
                        {/* FOURTH ROW: 1, 2, 3, add */}
                        <Button
                            value="1"
                            onClick={() => handleDigitInput('1')}
                            className='calculator-button'
                        />
                        <Button
                            value="2"
                            onClick={() => handleDigitInput('2')}
                            className='calculator-button'
                        />
                        <Button
                            value="3"
                            onClick={() => handleDigitInput('3')}
                            className='calculator-button'
                        />
                        <Button
                            value="+"
                            onClick={() => handleOperatorInput('+')}
                            className='calculator-button-operations'
                        />
                        {/* FIFTH ROW: 0, ., = */}
                        <Button sx={{
                            gridColumn: "span 2",
                            height: "4rem",
                            width: "8rem",
                            borderRadius: '40%',
                            alignItems: 'center',
                            fontSize: "1.5rem",
                            fontWeight: "500"
                        }}
                            value="0"
                            onClick={() => handleDigitInput('0')}
                        />
                        <Button
                            value="."
                            onClick={() => handleDigitInput('.')}
                            className='calculator-button'
                        />
                        <Button
                            value="="
                            onClick={handleEquals}
                            className='calculator-button-operations'
                        />
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default CalculatorScreen;
