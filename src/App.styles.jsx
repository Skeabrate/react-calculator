import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e7dfc6;
    color: white;
    font-size: 1.2rem;
`;

export const Calculator = styled.div`
    display: block;
    background: #191716;
    padding: 6px;
    font-weight: bold;
    width: 410px;
`;

export const Monitor = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 10px;
    word-break: break-all;
`;

export const PrevValue = styled.div`
    font-size: 1.4rem;
    color: #adadad;
    min-height: 30px;
`;

export const CurrentValue = styled.div`
    font-size: 2.6rem;
    min-height: 60px;
`;

export const ButtonsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(5, 80px);
    column-gap: 4px;
    row-gap: 4px;
`;

export const Button = styled.button`
    grid-column: ${({ first, last }) => {
        if (first) return '1/3';
        if (last) return '3/5';
    }};
    cursor: pointer;
    background: #440d0f;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    border: none;
    transition: all 0.1s ease-in-out;

    &:hover {
        background: #532022;
    }
`;
