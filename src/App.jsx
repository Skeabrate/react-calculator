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

    const divideHandler = () => {};

    const multiplyHandler = () => {};

    const addHandler = () => {
        if (prevValue) {
            setPrevValue(
                (state) =>
                    parseInt(state.split(' ')[0]) + parseInt(currValue) + ' +'
            );
            setCurrValue('');
        } else {
            setPrevValue(currValue + ' +');
            setCurrValue('');
        }
    };

    const subtractHandler = () => {};

    const equalsHandler = () => {
        if (prevValue && currValue) {
            switch (prevValue.split(' ')[1]) {
                case '+':
                    setCurrValue(
                        (
                            parseInt(prevValue.split(' ')[0]) +
                            parseInt(currValue)
                        ).toString()
                    );
                    setPrevValue('');
                    break;
            }
        }
    };

    const buttonHandler = (item) => {
        switch (item) {
            case 'AC':
                setPrevValue('');
                setCurrValue('');
                break;

            case 'DEL':
                setCurrValue(currValue.substring(0, currValue.length - 1));
                break;

            case '/':
                divideHandler();
                break;

            case '*':
                multiplyHandler();
                break;

            case '+':
                addHandler();
                break;

            case '-':
                subtractHandler();
                break;

            case '=':
                equalsHandler();
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
                            onClick={() => buttonHandler(item)}
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
