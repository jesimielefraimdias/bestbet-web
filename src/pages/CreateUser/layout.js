import styled from "styled-components";


export const Layout = styled.div`
    display: grid;

    /* grid-template-columns: auto auto auto; */
    grid-template-rows: 90px auto 70px;

    grid-template-areas: 
        "HE"
        "CO"
        "FO"
    ;


    height: 100vh;
    
`;

export const ContentStyled = styled.div`
    grid-area: CO;

    display: flex;


    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #C4B2D1;

    border-style: solid;
    /* border-width: 5px; */
    border-width: 5;
    border-color: black;

    height: 100%;
`;

export const TitleStyled = styled.h2`
    font-family: "Roboto", sans-serif;
    justify-content: center;
    font-size: 20px;
    margin-top: 30px;
    margin-bottom: 20px;
`;

export const CardCreateStyled = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    align-self: center;

    width: 600px;
    height: 90%;

    margin-top: 5%;
    margin-bottom: 5%;
    /* padding-top: 80px; */
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    border-radius: 10px;
`;

export const LabelStyled = styled.label`
    display: none;
`;

export const LabelRadioStyled = styled.label`
    margin-left: 10px;
    margin-right: 10px;
    
    display: span;
`;

export const LabelOptionStyled = styled.label`
    display: block;
`;

export const InputGroupStyled = styled.div`
    margin-bottom: 20px;
    flex: flex;

    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const InputRadioGroupStyled = styled.div`
    margin-bottom: 20px;
    flex: flex;

    text-align: center;
    justify-content: center;
    align-items: center;
    align-self: center;
`;

export const ErrorStyled = styled.div`
    color: var(--notification);
    text-align: center;
    margin-top: 2px;
    margin-bottom: 10px;
`;

export const WarningStyled = styled.div`
    color: var(--mention-detail);
    /* text-align: center; */
    display: flex;

    justify-content: center;
    align-items: center;
    align-self: center;


    width: 100%;
    margin-top: 2px;
    margin-bottom: 10px;
    
`;

export const ButtonStyled = styled.button`
    display: flex;
    justify-content: center;

    align-items: center;
    justify-content: center;
    align-items: center;
    align-self: center;


    background-color: white;

    width: 350px;
    height: 40px;
    font-size: 15px;
    background-color: var(--secondary);

    border-radius: 10px; 
    margin-top: 40px;
    margin-bottom: 15px;
`;

export const LoginStyled = styled.div`
    
    display: block;
    justify-content: center;
    margin-top: 15px;
    margin-bottom: 15px;

`;