import { useState } from 'react';
import { calculatorData } from './data';
import {
    Wrapper,
    Calculator,
    Monitor,
    PrevValue,
    CurrentValue,
    ButtonsWrapper,
    Button,
} from './App.styles';

function App() {
    const [prevValue, setPrevValue] = useState('');
    const [currValue, setCurrValue] = useState('');
    const [operation, setOperation] = useState();

    const splitVal = (val) => val.split(' ')[0];

    const calculateHandler = (val) => {
        switch (operation) {
            case '+':
                return +splitVal(val) + +currValue;

            case '-':
                return +splitVal(val) - +currValue;

            case '*':
                return +splitVal(val) * +currValue;

            case '/':
                return +splitVal(val) / +currValue;
        }
    };

    const prevValueHandler = (type) =>
        setPrevValue(
            (state) => calculateHandler(state) + ' ' + type,
            setCurrValue('')
        );

    const actionHandler = (type) => {
        if (type === '-' && !currValue & (currValue !== '-')) {
            setCurrValue('-');
        } else setOperation(type);

        if (currValue && currValue !== '-' && prevValue) {
            prevValueHandler(type);
        } else if (currValue && +currValue && !prevValue && currValue !== '-') {
            setPrevValue(currValue + ' ' + type);
            setCurrValue('');
        }
    };

    const equalsHandler = () => {
        if (prevValue && currValue) {
            setCurrValue(calculateHandler(prevValue));
            setPrevValue('');
        }
    };

    const dotHandler = () => {
        if (!currValue) setCurrValue('0.');
        else if (currValue && !currValue.toString().includes('.')) {
            setCurrValue((state) => state + '.');
        }
    };

    const resetHandler = () => {
        setPrevValue('');
        setCurrValue('');
        setOperation('');
    };

    const removeLetterHandler = () =>
        setCurrValue(currValue.substring(0, currValue.length - 1));

    const mainSwitch = (item) => {
        switch (item) {
            case 'AC':
                resetHandler();
                break;

            case 'DEL':
                removeLetterHandler();
                break;

            case '/':
            case '*':
            case '+':
            case '-':
                actionHandler(item);
                break;

            case '=':
                equalsHandler();
                break;

            case '.':
                dotHandler();
                break;

            default:
                return setCurrValue((state) => state + item);
        }
    };

    return (
        <Wrapper>
            <Calculator>
                <Monitor>
                    <PrevValue>{prevValue}</PrevValue>
                    <CurrentValue>{currValue}</CurrentValue>
                </Monitor>

                <ButtonsWrapper>
                    {calculatorData.map((item, index) => (
                        <Button
                            key={index}
                            first={index === 0}
                            last={index === calculatorData.length - 1}
                            onClick={() => mainSwitch(item)}
                        >
                            {item === '/' ? <>&#247;</> : item}
                        </Button>
                    ))}
                </ButtonsWrapper>
            </Calculator>
        </Wrapper>
    );
}

export default App;
