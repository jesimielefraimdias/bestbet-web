import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import ReactTooltip from "react-tooltip";
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
    const [addTooltip, setAddTooltip] = useState("Add");
    const [stopTooltip, setStopTooltip] = useState("Stop");
    const [splitTooltip, setSplitTooltip] = useState("Split");
    const [doubleTooltip, setDoubleTooltip] = useState("Double");
    const [hiddenTooltip, setHiddenTooltip] = useState("Hidden")
    const [double, setDouble] = useState(false);

    const [updateStyle, setUpdateStyle] = useState(false);
    const [addNumberOfDeckes, setAddNumberOfDeckes] = useState(true);
    const [addCard, setAddCard] = useState(false);
    const [removeCard, setRemoveCard] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [numberOfDeckes, setNumberOfDeckes] = useState(1);
    const [nextRound, setNextRound] = useState(true);
    const [currentHand, setCurrentHand] = useState(0);
    const [proceed, setProceed] = useState(0); // 0 - normal, embaralhar, continuar
    const [hand, setHand] = useState([
        {
            cards: [],
            activated: true,
        }
    ]);
    const [dealerHand, setDealerHand] = useState(
        {
            cards: [{
                card: "H",
                quantity: 1
            }],
            activated: true,
        }
    );
    const [currentHandCards, setCurrentHandCards] = useState([
        0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0
    ]);
    const [deck, setDeck] = useState(null);


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

    const restartRound = () => {

        setHand([
            {
                cards: [],
                activated: true,
            }
        ]);

        setDealerHand(
            {
                cards: [{
                    card: "H",
                    quantity: 1
                }],
                activated: true,
            }
        );
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
            case "H":
                return -1;
                break;
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

    const totalDealerHand = () => {
        let accumulator = 0;


        dealerHand.cards.forEach(element => {
            let card = decodeCard(element.card);
            card = card >= 10 ? 10 : card + 1;
            accumulator += card * element.quantity;
        });

        return accumulator;
    }

    const totalCurrentPlayerHand = () => {
        let accumulator = 0;


        if (hand[currentHand]) {

            hand[currentHand].cards.forEach(element => {
                let card = decodeCard(element.card);
                card = card >= 10 ? 10 : card + 1;
                accumulator += card * element.quantity;
            });
        }

        return accumulator;
    }

    const TotalCurrentHand = () => {
        let accumulator = 0;


        if (nextRound && dealerHand) {
            dealerHand.cards.forEach(element => {
                let card = decodeCard(element.card);
                card = card >= 10 ? 10 : card + 1;
                accumulator += card * element.quantity;
            });
        } else if (!nextRound && hand[currentHand]) {
            hand[currentHand].cards.forEach(element => {
                let card = decodeCard(element.card);
                card = card >= 10 ? 10 : card + 1;
                accumulator += card * element.quantity;
            });

        }
        return accumulator;
    }

    const verifyBlackJack = _ => TotalCurrentHand() > 21;

    const verifySplit = _ => lengthHand() === 2 && hand[currentHand].cards.length === 1 && currentHand === hand.length - 1;

    const maxAddCard = () => {
        const accumulator = currentHandCards.reduce((accumulator, currentValue) => accumulator + currentValue);

        return accumulator < 2 && lengthHand() === 0 || accumulator === 0 && lengthHand() > 0 ? true : false;
    }

    const initializeSplit = () => {
        const _hand = hand;

        const _card = {
            card: _hand[currentHand].cards[0].card,
            quantity: 1,
        }

        _hand[currentHand].cards[0] = _card;

        _hand.push(
            {
                activated: true,
                cards: [_card]
            }
        );

        setHand(_hand);
        setCurrentHand(currentHand + 1);
    }

    const addSelectedCards = () => {
        //Pegamos o número de cartas selecionadas pelo usuário
        let accumulator = currentHandCards.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue;
            }
        );

        /*
        Verificamos se é começo do jogo ou meio, o que implica que vamos 
        deixar selecionar duas ou uma carta.
        */
        if (lengthHand() === 0 && accumulator === 2 && !nextRound ||
            lengthHand() > 0 && accumulator === 1) {

            const _hand = hand; //Vetor de mãos do jogador.
            const _deck = deck; //Vetor de cartas do baralho.
            //Pegamos a currentHand em questão.
            let elementCurrentHand;

            if (!nextRound) {
                elementCurrentHand = _hand[currentHand];
            } else {
                elementCurrentHand = dealerHand;
            }
            //Pegamos a mão em questão de cartas.
            const _cards = elementCurrentHand.cards;
            elementCurrentHand = {
                activated: true,
                ...elementCurrentHand
            }


            //CurrentHandCards são todas as cartas que o usuário pode selecionar.
            currentHandCards.forEach((value, index) => {
                /*
                Caso o value seja > 0 implica que o usuário selecionou alguma carta e
                tenha cartas disponíveis no deck.
                */
                if (value > 0 && _deck[index].cardsAvailable - value >= 0 && accumulator !== 0) {

                    //Decrementamos o número da carta em questão disponível.
                    _deck[index] = {
                        ..._deck[index],
                        cardsAvailable: _deck[index].cardsAvailable - value
                    };

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
                    console.log("index" + index)
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
                    accumulator -= 1;
                }

            });

            elementCurrentHand.cards = _cards;

            //Passamos a alterações para a hand auxiliar.
            if (!nextRound) {
                _hand[currentHand] = elementCurrentHand;
                setHand(_hand); //Escrevemos a alteração na variável de estado.
            } else {
                setDealerHand(elementCurrentHand);
            }
            setAddCard(false); //Fechamos a janela de adicionar cartas.
            restartCurrentHandCards(); //Resetamos as cartas que foram selecionadas.
            setUpdateStyle(!updateStyle); //Estado para atualizar o tela.

            if (double) {
                stopCurrentHand();
                setDouble(false);
            }

            if (nextRound && hand[0].cards.length === 0) {
                setNextRound(false);
            }
        }
    }

    const removeSelectedCards = () => {

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
            }
        });

        setDeck(_deck);
        setRemoveCard(false);
        setAddCard(false);
        restartCurrentHandCards(); //Resetamos as cartas que foram selecionadas.
        setUpdateStyle(!updateStyle); //Estado para atualizar o tela.

    }

    const showHiddenCard = () => {

        //Pegamos o número de cartas selecionadas pelo usuário
        const accumulator = currentHandCards.reduce(
            (accumulator, currentValue) => {
                return accumulator + currentValue;
            }
        );
        const _deck = deck; //Vetor de cartas do baralho.
        const _dealerHand = dealerHand;
        const indexHidden = findHidden();

        if (accumulator === 1) {

            //CurrentHandCards são todas as cartas que o usuário pode selecionar.
            currentHandCards.forEach((value, index) => {

                /*
                Caso o value seja > 0 implica que o usuário selecionou alguma carta e
                tenha cartas disponíveis no deck.
                */
                if (value === 1 && _deck[index].cardsAvailable - value >= 0) {

                    //Decrementamos o número da carta em questão disponível.
                    _deck[index] = {
                        ..._deck[index],
                        cardsAvailable: _deck[index].cardsAvailable - value
                    };

                    _dealerHand.cards[indexHidden].card = _deck[index].card;

                }
            });
            setDeck(_deck);
            setShowCard(false);
            setAddCard(false);
            restartCurrentHandCards(); //Resetamos as cartas que foram selecionadas.
            setUpdateStyle(!updateStyle); //Estado para atualizar o tela.

        }
    }

    const disabledDealerAdd = _ => !dealerHand.activated || !nextRound || proceed > 0;

    const findHidden = _ => {
        return dealerHand.cards.findIndex(element => {
            if (element.card === "H") {
                return true;
            }

            return false;
        });
    }

    const disabledShuffleAndKeep = _ => {

        const isHidden = findHidden() === -1 ? false : true;

        return isHidden || !dealerHand.activated || !nextRound || proceed === 0;
        // return !(!dealerHand.activated || nextRound && proceed === 1);
    }

    const stopCurrentHand = _ => {
        const _hand = hand;
        let _nextRound = true;
        _hand[currentHand].activated = false;

        _hand.forEach(element => {
            if (element.activated) {
                _nextRound = false;
            }
        });
        setNextRound(_nextRound);
        setUpdateStyle(!updateStyle);
    }

    useEffect(() => {

        const getProbabilidade = async _ => {

            console.log("Teste");
            const res = await axiosServer.post("/BlackJack", {
                deck,
                cards: hand[currentHand].cards,
            });

            setAddTooltip(addTooltip + 1);
        }

        getProbabilidade();

    }, [updateStyle]);


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

                <ContainerSelectCardStyled
                    addCard={!addCard}
                >
                    <div
                        style={{ position: "absolute", zIndex: 2, top: 0, right: 0, padding: 20 }}
                        onClick={_ => {
                            setAddCard(false);
                            setRemoveCard(false);
                            restartCurrentHandCards(); //Resetamos as cartas que foram selecionadas.  
                        }}
                    >
                        Fechar
                    </div>

                    <TitleStyled>
                        {removeCard ? "Selecione cartas a serem retiradas do deck" : lengthHand() === 0 ? "Selecione duas cartas" : "Selecione uma carta"}
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
                                                if (typeof aux === "number" && aux >= 0 &&
                                                    (aux <= value.cardsAvailable && (maxAddCard() || aux < currentHandCards[index])
                                                        || removeCard)) {
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
                            if (removeCard) {
                                removeSelectedCards();
                            } else if (showCard) {
                                showHiddenCard();
                            } else {
                                addSelectedCards();
                            }
                        }}
                    >
                        {removeCard ? "Remover cartas selecionadas" : "Adicionar cartas selecionadas"}
                    </ButtonSubmitNumberOfDeckesStyled>
                </ContainerSelectCardStyled>

                <ContainerStyled>
                    <SubContentStyled>
                        <LeftStyled>
                            <ButtonStyled
                                disabled={disabledShuffleAndKeep()}
                                // nextRound={nextRound}
                                onClick={_ => {
                                    if (proceed === 1) {
                                        setProceed(0);
                                        setAddNumberOfDeckes(true);
                                        restartRound();
                                        setNextRound(false);
                                    }
                                }}
                            >
                                Embaralhar
                            </ButtonStyled>

                            <ButtonStyled
                                disabled={proceed !== 1 || !nextRound || findHidden() === -1}
                                // nextRound={nextRound}
                                onClick={_ => {
                                    if (proceed === 1 && nextRound && findHidden() >= 0) {
                                        setAddCard(true);
                                        setShowCard(true);
                                    }
                                }}
                            >
                                Revelar Carta
                            </ButtonStyled>

                            <ButtonStyled
                                disabled={disabledDealerAdd()}
                                onClick={_ => {
                                    console.log("começa aqui");
                                    console.log(dealerHand.activated, nextRound, proceed);
                                    console.log(!dealerHand.activated, !nextRound, proceed > 0);

                                    if (!verifyBlackJack() && dealerHand.activated) {
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
                                    Quantidade de decks: {numberOfDeckes}, Soma da mão: {totalDealerHand()}
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
                                                {element.card !== "H" ? `${element.card}'s selecionados: ${element.quantity}` :
                                                    `Carta escondida`}
                                            </div>

                                            {
                                                element.card === "H" ?
                                                    <>
                                                        <CardOnHand
                                                            data-tip=""
                                                            data-for="hiddenTooltip"
                                                            src={require("../../assets/deck/hidden.png")} />
                                                        <ReactTooltip id="hiddenTooltip" type="info">
                                                            {hiddenTooltip}
                                                        </ReactTooltip>
                                                    </>
                                                    :
                                                    <CardOnHand
                                                        src={deck[decodeCard(element.card)].cardImage} />
                                            }
                                        </div>
                                    );
                                }) : null}

                            </ContainerDeckOnHand>


                        </HandStyled>

                        <RightStyled>

                            <ButtonStyled
                                disabled={disabledShuffleAndKeep()}
                                onClick={_ => {
                                    if (proceed === 1) {
                                        setProceed(0);
                                        setNextRound(true);
                                        restartRound();
                                        setAddCard(true);
                                    }
                                }}
                            >
                                Continuar
                            </ButtonStyled>

                            <ButtonStyled
                                disabled={lengthHand() === 0 || !nextRound || proceed > 0 || TotalCurrentHand() === 0}
                                onClick={_ => {
                                    if (proceed === 0 && nextRound && lengthHand() > 0) {
                                        setProceed(1);
                                    }
                                }}
                            >
                                Parar
                            </ButtonStyled>
                        </RightStyled>
                    </SubContentStyled>

                    <SubContentStyled>
                        <LeftStyled>
                            <ButtonStyled
                                data-tip=""
                                data-for="addTooltip"
                                disabled={nextRound || verifyBlackJack() || !hand[currentHand].activated}
                                onClick={_ => {

                                    if (!verifyBlackJack() && hand[currentHand].activated) {
                                        setAddCard(true);
                                    }
                                }}
                            >
                                Adicionar Carta
                                </ButtonStyled>

                            <ReactTooltip id="addTooltip" type="info">
                                {addTooltip}
                            </ReactTooltip>

                            <ButtonStyled
                                data-tip=""
                                data-for="double"
                                disabled={TotalCurrentHand() < 2 || nextRound || verifyBlackJack() || !hand[currentHand].activated}
                                onClick={_ => {

                                    if (TotalCurrentHand() >= 2 && !verifyBlackJack() && hand[currentHand].activated) {
                                        setAddCard(true);
                                        setDouble(true);
                                    }
                                }}
                            >
                                Dobrar a aposta
                            </ButtonStyled>

                            <ReactTooltip id="double" type="info">
                                {doubleTooltip}
                            </ReactTooltip>

                            <ButtonStyled
                                onClick={_ => {
                                    setAddCard(true);
                                    setRemoveCard(true);
                                }}
                            >
                                Remover Carta do Deck
                            </ButtonStyled>

                        </LeftStyled>

                        <HandStyled>
                            <TitleStyled>
                                Mão do Jogador
                            </TitleStyled>
                            <ContainerBackAndNextStyled>
                                <NumberOfDeckStyled>
                                    Soma da mão: {totalCurrentPlayerHand()}
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
                                                const value = parseInt(target.currentTarget.value);
                                                setCurrentHand(value);
                                                setUpdateStyle(!updateStyle);
                                            }}
                                        >
                                            {hand.map((element, index) => {
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
                                data-tip=""
                                data-for="splitTooltip"
                                disabled={!verifySplit() || nextRound}
                                // split={verifySplit()}
                                onClick={_ => {
                                    initializeSplit();
                                    // setAddCard(true);
                                }}
                            >
                                Dividir Mão
                            </ButtonStyled>
                            <ReactTooltip id="splitTooltip" type="info">
                                {splitTooltip}
                            </ReactTooltip>


                            <ButtonStyled
                                data-tip=""
                                data-for="stopTooltip"
                                disabled={!hand[currentHand].activated || totalCurrentPlayerHand() < 2}
                                onClick={_ => {
                                    stopCurrentHand();
                                    console.log("teste");
                                }}
                            >
                                Parar
                            </ButtonStyled>
                            <ReactTooltip id="stopTooltip" type="info">
                                {stopTooltip}
                            </ReactTooltip>
                        </RightStyled>
                    </SubContentStyled>
                </ContainerStyled>

            </ContentStyled >

        </Layout >
    );
}

export default BlackJack;