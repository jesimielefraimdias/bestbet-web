import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axiosServer from "../../services/axiosServer";


import {
    Layout,
} from "../../layout/privateLayout";

import {
    SubContentStyled,
    ContentStyled,
    ContainerStyled,
    ContainerBackAndNextStyled,
    ContainerNumberDeckStyled,
    ContainerDeck,
    BackOrNextStyledButtonStyled,
    LeftStyled,
    RightStyled,
    HandStyled,
    TitleStyled,
    ButtonStyled,
    ButtonSubmitNumberOfDeckesStyled,
    InputStyled,
    NumberOfDeckStyled,
    ContainerSelectCardStyled,
    ContainerDeckOnHand,
    Card,
    CardOnHand,
} from "./layout";

import "./style.css";


const BlackJack = () => {

    const [addNumberOfDeckes, setAddNumberOfDeckes] = useState(true);
    // const [playersNumber, setPlayersNumber] = useState(0);
    const [addCard, setAddCard] = useState(false);
    const [numberOfDeckes, setNumberOfDeckes] = useState(1);
    const [nextRound, setNextRound] = useState(false);
    const [currentHand, setCurrentHand] = useState(0);
    const [currentHandCards, setCurrentHandCards] = useState([
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0
    ]);
    const [deck, setDeck] = useState(null);
    const [valueDealerHand, setValueDealerHand] = useState(0);
    const [valueHand, setValueHand] = useState(0);
    const [hand, setHand] = useState([
        {
            cards: [],
            activated: true,
        }
    ]);

    const [dealerHand, setDealerHand] = useState(
        {
            cards: [],
            activated: true,
        }
    );

    const [updateStyle, setUpdateStyle] = useState(false);

    const initializeDeck = () => {

        setDeck([
            {
                card: "A",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/1.jpeg"),

            },
            {
                card: "2",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/2.jpeg"),
            },
            {
                card: "3",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/3.jpeg"),
            },
            {
                card: "4",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/4.jpeg"),
            },
            {
                card: "5",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/5.jpeg"),

            },
            {
                card: "6",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/6.jpeg"),
            },
            {
                card: "7",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/7.jpeg"),

            },
            {
                card: "8",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/8.jpeg"),

            },
            {
                card: "9",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/9.jpeg"),
            },
            {
                card: "10",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/10.jpeg"),

            },
            {
                card: "Q",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/Q.jpeg"),

            },
            {
                card: "J",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/J.jpeg"),
            },
            {
                card: "K",
                cardsAvailable: numberOfDeckes * 4,
                cardImage: require("../../assets/deck/K.jpeg"),
            }
        ]);
    }

    const restartCurrentHandCards = () => {

        setCurrentHandCards(
            [
                0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0
            ]
        );
    }


    const decodeCard = (card) => {
        switch (card) {
            case "A":
                return 0;
                break;
            case "Q":
                return 10;
                break;
            case "J":
                return 11;
                break;
            case "K":
                return 12;
                break;

            default:
                return parseInt(card) - 1;
                break;
        }
    }

    const lengthHand = () => {

        let accumulator = 0;

        if (nextRound && dealerHand && dealerHand.cards.length > 0) {
            dealerHand.cards.forEach((element, index) => {
                accumulator += element.quantity;
            });
        } else if (!nextRound && hand[currentHand] && hand[currentHand].cards.length > 0) {
            hand[currentHand].cards.forEach((element, index) => {
                accumulator += element.quantity;
            });
        }

        return accumulator;

    }

    const TotalCurrentHand = (param) => {
        let accumulator = 0;
        param.cards.forEach(element => {
            let card = decodeCard(element.card);
            card = card >= 10 ? 10 : card + 1;
            accumulator += card * element.quantity;
        });

        if (nextRound && param) {
            setValueDealerHand(accumulator);
        } else if (!nextRound && param) {

            setValueHand(accumulator);

        }
        return accumulator;
    }


    const verifyBlackJack = _ => {
        if (!nextRound) {
            return TotalCurrentHand(hand[currentHand]) > 21;
        } else {
            return TotalCurrentHand(dealerHand) > 21;
        }
    };

    const verifySplit = _ => lengthHand() === 2 && hand[currentHand].cards.length === 1 && currentHand === hand.length - 1;

    const maxAddCard = () => {
        const accumulator = currentHandCards.reduce((accumulator, currentValue) => accumulator + currentValue);

        return accumulator < 2 && lengthHand() === 0 || accumulator === 0 && lengthHand() > 0 ? true : false;
    }

    const initializeSplit = () => {
        const _hand = hand;

        const _cards = {
            card: _hand[currentHand].cards[0].card,
            quantity: 1,
        }

        _hand[currentHand].cards[0] = _cards;

        _hand.push(
            {
                cards: [_cards]
            }
        );

        setHand(_hand);
        setCurrentHand(currentHand + 1);
    }


    const removeHand = () => {
        setCurrentHand(currentHand - 1);
        hand.pop();
    }

    useEffect(() => {


    }, []);


    return (
        <Layout>
            <Navbar />


            <ContentStyled>

                <ContainerNumberDeckStyled disabled={!addNumberOfDeckes}>
                    <TitleStyled>
                        Entre com o número de baralhos que estão na mesa
                    </TitleStyled>

                    <InputStyled
                        type="number"
                        id="numberOfDeck"
                        name="numberOfDeck"
                        value={numberOfDeckes}
                        onChange={target => {

                            const value = parseInt(target.currentTarget.value);

                            if (typeof value === "number" && value > 0 && value <= 8) {
                                setNumberOfDeckes(value);
                            }

                        }}
                    />
                    <ButtonSubmitNumberOfDeckesStyled
                        onClick={_ => {
                            setAddNumberOfDeckes(false);
                            initializeDeck();
                            setAddCard(true);
                        }}
                    >
                        Confirmar número de cartas
                    </ButtonSubmitNumberOfDeckesStyled>
                </ContainerNumberDeckStyled>

                <ContainerSelectCardStyled addCard={!addCard}>
                    <TitleStyled>
                        {lengthHand() === 0 ? "Selecione duas cartas" : "Selecione uma carta"}
                    </TitleStyled>

                    <ContainerDeck>
                        {deck !== null ? deck.map((value, index) => {
                            return value.cardsAvailable > 0 ?
                                <div
                                    key={index}
                                >
                                    <div
                                        style={{
                                            marginLeft: 10
                                        }}
                                    >
                                        Quantidade de {value.card}'s disponíveis: {value.cardsAvailable - currentHandCards[index]}

                                        <InputStyled
                                            style={{ width: "100%" }}
                                            type="number"
                                            id={`${currentHandCards}${index}`}
                                            name={`${currentHandCards}${index}`}
                                            value={currentHandCards[index]}
                                            onChange={target => {

                                                const aux = parseInt(target.currentTarget.value);
                                                const _currentHandCards = currentHandCards;
                                                if (typeof aux === "number" &&
                                                    aux >= 0 &&
                                                    aux <= value.cardsAvailable &&
                                                    (maxAddCard() || aux < currentHandCards[index])
                                                ) {
                                                    _currentHandCards[index] = aux;
                                                    setCurrentHandCards(_currentHandCards);
                                                    setUpdateStyle(!updateStyle);
                                                }

                                            }}
                                        />
                                    </div>
                                    <Card
                                        src={value.cardImage}
                                    />
                                </div> : null;
                        }) : null}

                    </ContainerDeck>

                    <ButtonSubmitNumberOfDeckesStyled
                        onClick={_ => {
                            //Pegamos o número de cartas selecionadas pelo usuário
                            const accumulator = currentHandCards.reduce(
                                (accumulator, currentValue) => {
                                    return accumulator + currentValue;
                                }
                            );

                            /*
                            Verificamos se é começo do jogo ou meio, o que implica que vamos 
                            deixar selecionar duas ou uma carta.
                            */
                            if (lengthHand() === 0 && accumulator === 2 ||
                                lengthHand() > 0 && accumulator === 1) {

                                const _hand = hand; //Vetor de mãos do jogador.
                                const _deck = deck; //Vetor de cartas do baralho.

                                //CurrentHandCards são todas as cartas que o usuário pode selecionar.
                                currentHandCards.forEach((value, index) => {

                                    /*
                                    Caso o value seja > 0 implica que o usuário selecionou alguma carta e
                                    tenha cartas disponíveis no deck.
                                    */
                                    if (value > 0 && _deck[index].cardsAvailable - value >= 0) {

                                        //Decrementamos o número da carta em questão disponível.
                                        _deck[index] = {
                                            ..._deck[index],
                                            cardsAvailable: _deck[index].cardsAvailable - value
                                        };
                                        //Pegamos a currentHand em questão.
                                        let elementCurrentHand;

                                        if (!nextRound) {
                                            elementCurrentHand = _hand[currentHand];
                                        } else {
                                            elementCurrentHand = dealerHand;
                                        }

                                        //Pegamos a mão em questão de cartas.
                                        const _cards = elementCurrentHand.cards;

                                        //Verificamos se a carta que o usuário está adicionando é repetida.
                                        const indexCards = _cards.findIndex((element) => {
                                            /*
                                            No caso, a carta diz respeito a mão do usuário,
                                            porém, o decodeCard irá retornar o index da carta em questão
                                            que é o mesmo index da current hand cards que 
                                            é nosso vetor de cartas selecionadas. 
                                            */
                                            if (decodeCard(element.card) === index) {
                                                return true;
                                            }
                                            return false;
                                        });

                                        //Se o index for !== -1 então teremos que somar a quantidade de cartas iguais.
                                        if (indexCards !== -1) {
                                            _cards[indexCards].quantity += value;
                                            //Se não, criamos uma nova posição na current hand para a carta em questão.
                                        } else {
                                            _cards.push({
                                                card: deck[index].card,
                                                quantity: value,
                                            });
                                        }

                                        elementCurrentHand.cards = _cards;

                                        //Passamos a alterações para a hand auxiliar.
                                        if (!nextRound) {
                                            _hand[currentHand] = elementCurrentHand;
                                            setHand(_hand); //Escrevemos a alteração na variável de estado.
                                        } else {
                                            setDealerHand(elementCurrentHand);
                                        }
                                        TotalCurrentHand(elementCurrentHand)
                                    }

                                });
                                // setIsDisabled(true);
                                setAddCard(false); //Fechamos a janela de adicionar cartas.
                                restartCurrentHandCards(); //Resetamos as cartas que foram selecionadas.
                                setUpdateStyle(!updateStyle); //Estado para atualizar o tela.
                            }

                        }}
                    >
                        Adicionar cartas selecionadas
                    </ButtonSubmitNumberOfDeckesStyled>
                </ContainerSelectCardStyled>

                <ContainerStyled>
                    <SubContentStyled>
                        <LeftStyled>
                            <ButtonStyled
                                nextRound={nextRound}
                                disabled={nextRound}
                                onClick={_ => {
                                    setAddNumberOfDeckes(true);
                                }}
                            >
                                Embaralhar
                            </ButtonStyled>
                            <ButtonStyled
                                onClick={_ => {
                                    if (valueDealerHand < 21) {
                                        setAddCard(true);
                                    }
                                }}
                            >
                                Adicionar Carta
                            </ButtonStyled>
                        </LeftStyled>

                        <HandStyled>
                            <TitleStyled>
                                Mão da mesa
                            </TitleStyled>

                            <ContainerBackAndNextStyled>

                                <NumberOfDeckStyled>
                                    Quantidade de decks: {numberOfDeckes}
                                </NumberOfDeckStyled>


                            </ContainerBackAndNextStyled>

                            <ContainerDeckOnHand>
                                {dealerHand.cards.length !== 0 ? dealerHand.cards.map((element, index) => {
                                    return (
                                        <div
                                            key={`card_${index}`}
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginLeft: 10,
                                                marginRight: 10,
                                            }}
                                        >
                                            <div style={{
                                                alignItems: "center",
                                                textAlign: "center",
                                                justifyContent: "center"
                                            }}>
                                                {element.card}'s selecionados: {element.quantity}
                                            </div>

                                            <CardOnHand
                                                src={deck[decodeCard(element.card)].cardImage}
                                            />
                                        </div>
                                    );
                                }) : null}

                            </ContainerDeckOnHand>


                        </HandStyled>

                        <RightStyled>

                            <ButtonStyled nextRound={nextRound}>
                                Continuar
                            </ButtonStyled>

                            <ButtonStyled onClick={_ => {
                                if (lengthHand() === 0) {
                                    setNextRound(true);
                                }
                            }}>
                                Parar
                            </ButtonStyled>
                        </RightStyled>
                    </SubContentStyled>

                    <SubContentStyled>
                        <LeftStyled>
                            <ButtonStyled
                                disabled={verifyBlackJack() || nextRound}
                                onClick={_ => {
                                    console.log("teste add1", verifyBlackJack() && hand[currentHand].activated);
                                    console.log(verifyBlackJack(), hand[currentHand], hand[currentHand].activated);
                                    if (!verifyBlackJack() && hand[currentHand].activated) {
                                        console.log("teste add2");
                                        setAddCard(true);
                                    }
                                }}
                            >
                                Adicionar Carta
                            </ButtonStyled>

                            <ButtonStyled>
                                Remover Carta do Deck
                            </ButtonStyled>

                        </LeftStyled>

                        <HandStyled>
                            <TitleStyled>
                                Mão do Jogador
                            </TitleStyled>
                            <ContainerBackAndNextStyled>
                                <NumberOfDeckStyled>
                                    Soma da mão: {valueHand}
                                </NumberOfDeckStyled>
                                <div style={{
                                    flex: 1,
                                    alignItems: "center",
                                    alignSelf: "center", justifyContent: "center"
                                }}>
                                    <div>
                                        Mão atual:
                                        <select
                                            style={{ borderBottom: 1 }}
                                            name="currentHand"
                                            id="currentHand"
                                            key="currentHand"
                                            value={currentHand.toString()}
                                            onChange={target => {
                                                console.log(target, target.currentTarget.value);
                                                const value = parseInt(target.currentTarget.value);
                                                setCurrentHand(value);
                                                console.log(value, hand);
                                                setUpdateStyle(!updateStyle);
                                            }}
                                        >
                                            {lengthHand() === 0 ? null : hand.map((element, index) => {
                                                return (
                                                    <option
                                                        id={`currentHand_${index}`}
                                                        name={`currentHand_${index}`}
                                                        key={`currentHand_${index}`}
                                                        value={index.toString()}
                                                    >
                                                        nº{index + 1}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </ContainerBackAndNextStyled>

                            <ContainerDeckOnHand>
                                {hand[currentHand] && hand[currentHand].cards.length !== 0 ? hand[currentHand].cards.map((element, index) => {
                                    return (
                                        <div
                                            key={`card_${index}`}
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginLeft: 10,
                                                marginRight: 10,
                                            }}
                                        >
                                            <div style={{
                                                alignItems: "center",
                                                textAlign: "center",
                                                justifyContent: "center"
                                            }}>
                                                {element.card}'s selecionados: {element.quantity}
                                            </div>

                                            <CardOnHand
                                                src={deck[decodeCard(element.card)].cardImage}
                                            />
                                        </div>
                                    );
                                }) : null}

                            </ContainerDeckOnHand>

                        </HandStyled>

                        <RightStyled>
                            <ButtonStyled
                                disabled={!verifySplit() || nextRound}
                                split={verifySplit()}
                                onClick={_ => {
                                    initializeSplit();
                                    // setAddCard(true);
                                }}
                            >
                                Dividir Mão
                            </ButtonStyled>

                            <ButtonStyled
                                // stopPlayerHand={(lengthHand() === 0)}
                                disabled={(lengthHand() === 0) || nextRound}
                                onClick={_ => {
                                    const _hand = hand;
                                    let _nextRound = true;
                                    console.log("teste");
                                    _hand[currentHand].activated = false;

                                    _hand.forEach(element => {
                                        if (element.activated) {
                                            console.log("teste: ", element.activated);
                                            _nextRound = false;
                                        }
                                    });
                                    console.log(_hand[currentHand]);
                                    setNextRound(_nextRound);
                                }}
                            >
                                Parar
                            </ButtonStyled>

                        </RightStyled>
                    </SubContentStyled>
                </ContainerStyled>

            </ContentStyled>

        </Layout >
    );
}

export default BlackJack;