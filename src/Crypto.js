import React, {useState, useEffect, useRef} from "react";
import './Crypto.css';
import CryptoList from "./CryptoList";
import axios from "axios";

function App(props) {

    const [cryptoList, setCryptoList] = useState([]);
    const [filteredCryptoList, setFilteredCryptoList] = useState([]);
    const filter = useRef();

    useEffect(() => {
        getCryptoData();

        const timerID = setInterval(() => {
            getCryptoData();
        }, 5000);
        return () => clearInterval(timerID);
    },);

    const getCryptoData = () => {
        axios.get('https://blockchain.info/ticker', {
            mode: 'cors'
        })
            .then(res => {
                const tickers = res.data;

                setCryptoList(() => {
                    let newCryptoList = [];

                    for (const [ticker, cryptoRate] of Object.entries(tickers)) {

                        let lastCryptoObj = cryptoList.find((cryptoObj) => {
                            return(cryptoObj.currency === ticker);
                        });

                        let newCryptoObj = {
                            currency: ticker,
                            symbol: cryptoRate.symbol,
                            buy: cryptoRate.buy,
                            sell: cryptoRate.sell,
                            lastRate: cryptoRate.last,
                        }

                        if (lastCryptoObj !== undefined) {
                            if (newCryptoObj.lastRate > lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'green';
                                newCryptoObj.htmlArray = String.fromCharCode(8593);
                            } else if (newCryptoObj.lastRate < lastCryptoObj.lastRate) {
                                newCryptoObj.cssClass = 'red';
                                newCryptoObj.htmlArray = String.fromCharCode(8595);
                            } else {
                                newCryptoObj.cssClass = 'blue';
                                newCryptoObj.htmlArray = String.fromCharCode(8596);    
                            }
                        } else {
                            newCryptoObj.cssClass = 'blue';
                            newCryptoObj.htmlArray = String.fromCharCode(8596);
                        }

                    newCryptoList.push(newCryptoObj); 
                    }
                    
                    return({
                        cryptoList: newCryptoList
                    })
                });

                filterCryptoList();

                // console.log(tickers);
            }); 
    }

    // czy filter używa się w useEffect ? 
    // jak zapisać ref na hookach ?
    
    const filterCryptoList = () => {

        let input = document.getElementsByTagName('input');

        let inputFilter = input.value;
        inputFilter  = inputFilter.value.trim().toUpperCase();

        setFilteredCryptoList((state) => {
            let newFilteredCryptoList = state.cryptoList.filter((cryptoObj) => {
                return(cryptoObj.currency.includes(inputFilter.value));
            });

            return({
                filteredCryptoList: newFilteredCryptoList
            });
        });
    }

    return(
        <div className="Crypto">
            <input ref={filter} onChange={filterCryptoList} type="text" placeholder="Filter" />
            <CryptoList cryptoList={filteredCryptoList}/>
        </div>
    );

}


export default App;