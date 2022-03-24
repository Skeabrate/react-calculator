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

    const calculateObj = {
        '+': (val) => +splitVal(val) + +currValue,
        '-': (val) => +splitVal(val) - +currValue,
        '*': (val) => +splitVal(val) * +currValue,
        '/': (val) => +splitVal(val) / +currValue,
    };

    const prevValueHandler = (type) =>
        setPrevValue(
            (state) => operation && calculateObj[operation](state) + ' ' + type,
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

    const dotHandler = () => {
        if (!currValue) setCurrValue('0.');
        else if (currValue && !currValue.toString().includes('.')) {
            setCurrValue((state) => state + '.');
        }
    };

    const mainSwitchObj = {
        AC: () => {
            setPrevValue('');
            setCurrValue('');
            setOperation('');
        },

        DEL: () => setCurrValue(currValue.toString().slice(0, -1)),

        operation: (item) => actionHandler(item),

        '=': () =>
            prevValue &&
            currValue &&
            setCurrValue(calculateObj[operation](prevValue), setPrevValue('')),

        '.': () => dotHandler(),
        number: (item) => setCurrValue((state) => state + item),
    };

    return (
        <Wrapper>
            <Calculator>
                <Monitor>
                    <PrevValue>{prevValue}</PrevValue>
                    <CurrentValue>{currValue}</CurrentValue>
                </Monitor>

                <ButtonsWrapper>
                    {calculatorData.map(({ value, role }, index) => (
                        <Button
                            key={index}
                            first={index === 0}
                            last={index === calculatorData.length - 1}
                            onClick={() => mainSwitchObj[role](value)}
                        >
                            {value === '/' ? <>&#247;</> : value}
                        </Button>
                    ))}
                </ButtonsWrapper>
            </Calculator>
        </Wrapper>
    );
}

export default App;
