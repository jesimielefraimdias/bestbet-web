import styled from "styled-components";

export const ContentStyled = styled.div`
    grid-area: CO;
    display: block;
    border: 5px solid blue;
    justify-content: center;
    height: 100vh;
`;

export const ContainerStyled = styled.div`
    pointer-events: ${props => !props.disabled ? "auto" : "none"};
    display: block;
    height: 100vh;
    width: 100%;
`;

export const SubContentStyled = styled.div`
    border: 5px solid gray;
    grid-area: CO;
    display: grid;
    grid-template-columns: 250px auto 250px;
    grid-template-areas: "L H R";
    height: 50%;
`;

export const LeftStyled = styled.div`
    grid-area: L;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 2px solid green;
    background-color: var(--white);
`;

export const RightStyled = styled.div`
    grid-area: R;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 2px solid green;
    background-color: var(--white);
`;

export const HandStyled = styled.div`
    display: block;
    grid-area: H;
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    width: 100%;
`;

export const TitleStyled = styled.div`
    display: block;
    text-align: center;
    margin: 10px auto;
    font-size: 20px;
    font-weight: bold;
    border: 1px solid purple;
`;

export const ContainerBackAndNextStyled = styled.div`
    display: flex;
    border: 2px solid black;
    align-items: center;
    justify-content: flex-end;
`;

export const BackOrNextStyledButtonStyled = styled.button`

    display: block;
    margin: 10px;
    align-self: flex-end;
    min-width: 100px;
    height: 35px;
    font-size: 15px;
    background-color: var(--secondary);

    border-radius: 10px; 
`;

export const ContainerNumberDeckStyled = styled.div`
    pointer-events: ${props => props.disabled ? "none" : "auto"};
    display: ${props => props.disabled ? "none" : "flex"};
    opacity: ${props => props.disabled ? 0 : 1};
    z-index: 1;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left:0;
    right:0;
    top: 0; bottom: 0;
    margin: auto;
    height: 50%;
    width: 50%;
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
  
`;

export const ContainerSelectCardStyled = styled.div`
    pointer-events: ${props => props.addCard ? "none" : "auto"};
    display: ${props => props.addCard ? "none" : "flex"};
    /* opacity: ${props => props.disabled ? 0 : 1}; */
    z-index: 1; 
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: absolute;
    left:0;
    right:0;
    top: 0; bottom: 0;
    margin: auto;
    height: 70%;
    width: 70%;
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
  
`;

export const ContainerDeck = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    /* background-color: gray; */
    border: 1px solid red;
    /* z-index:2; */
    /* flex: 1; */
    align-items: center;
    height: 70%;
    width: 90%;
`;
export const Card = styled.img`
    /* display: flex; */
    /* flex: 1; */
    margin: 0px 10px;
    height: 200px;
    width: 150px;
    align-self: center;
`;

export const ContainerDeckOnHand = styled.div`
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    border: 1px solid red;
    /* flex: 1; */
    padding: 0 15px;
    height: 100%;
    width: 100%;
    align-items: center;
 
`;


export const CardOnHand = styled.img`
    /* display: flex; */
    /* flex: 1; */
    /* margin-left: auto; */
    /* margin-right: auto; */
    height: 150px;
    width: 100px;
    /* align-self: center; */
`;

export const ButtonStyled = styled.button`
    opacity: ${props => {

        return props.nextRound !== undefined && !props.nextRound ||
            props.split !== undefined && !props.split ||
            props.stopHandDealer !== undefined && !props.stopHandDealer ||
            props.stopPlayerHand !== undefined && !props.stopPlayerHand
            ? 0.5 : 1;
    }};
    align-self: center;
    width: 90%;
    height: 40px;
    font-size: 15px;
    background-color: var(--secondary);

    border-radius: 10px; 
`;

export const ButtonSubmitNumberOfDeckesStyled = styled.button`
    display: block;
    align-self: center;
    width: 250px;
    height: 40px;
    font-size: 15px;
    background-color: var(--secondary);

    border-radius: 10px; 
`;

export const InputStyled = styled.input`
    display: block;
    align-self: center;
    /* background-color: gray; */
    border-bottom: 1px solid gray;
    text-align: center;
    width: 300px;
    height: 40px;
    font-size: 20px;
`;

export const NumberOfDeckStyled = styled.div`
    padding: 0 10px;
    display: flex;
    flex: 1;
    text-align: left;
    border: 1px solid red;
`;



