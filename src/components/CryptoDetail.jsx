import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from './Loader';

const CryptoDetail = () => {


    const { id: cryptoId } = useParams();

    const [crypto, setCrypto] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const endpoint = `https://api.coingecko.com/api/v3/coins/${cryptoId}`;

    const showData = () => {
        axios.get(endpoint).then((res) => {
            setCrypto(res.data);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setError(true);
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        showData();

    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    if(loading) return <Loader title={cryptoId} />

    if(error || crypto?.error) return <h1>Something went wrong</h1>

    const componenteBoton = (order, color, opacidad, texto) => (
        <div className={{order}} style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
            <div style={{borderRadius: '5px', background: `${color}`, opacity: `${opacidad}`, padding: '2px 5px', marginLeft: '10px'}}>{texto}</div>
        </div>
    );

    const description = () => {
        return {__html: crypto.description.en}
    }    

    return (
        <>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-6">
                        <div className="d-flex flex-nowrap">
                            <div className="p-2 order-1">
                                <img src={crypto.image.small} alt={crypto.name} />
                            </div>
                            <div className="p-2 order-2">
                                <h1>{crypto.name}</h1>
                            </div>
                            <div className="p-2 order-3" style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
                                <div style={{borderRadius: '5px', background: '#000', opacity: '25%', padding: '2px 5px'}}>{crypto.symbol.toUpperCase()}</div>
                            </div>
                             
                        </div>
                        <div className="d-flex flex-nowrap mt-2">
                            { componenteBoton('p-2 order-1', '#858ca2', '40%', `Rank #${crypto.market_cap_rank}` ) }
                            { componenteBoton('p-2 order-2', '#000', '25%', `Market Cap: ${formatter.format(crypto.market_data.market_cap.usd)}` ) }
                            <div className="p-2 order-3" style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
                                <div style={{borderRadius: '5px', background: '#000', opacity: '25%', padding: '2px 5px'}}> 
                                    <a href={crypto?.links?.homepage[0] } style={{textDecoration: 'none', color: 'white'}} target="_blank" rel="noreferrer">{crypto.name} Homepage</a>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-6">
                        <div className="">
                    
                            <p style={{marginBottom: '-10px', marginLeft: '10px', color: '#fff', opacity: '70%'}}> <small>{crypto.name} Price ({crypto.symbol.toUpperCase()})</small></p>
            
                            <div className="d-flex flex-nowrap">
                                <div className="p-2 order-1">
                                    <h2><strong>{formatter.format(crypto.market_data.current_price.usd)}</strong></h2>
                                </div>
                                <div className="p-3 order-2">
                                    {
                                        crypto.market_data?.price_change_percentage_24h > 0 ? (
                                            <span className="badge bg-success" style={{padding: '8px 16px'}}>
                                                {crypto.market_data?.price_change_percentage_24h.toFixed(2)}%
                                            </span>
                                        ) : (
                                            <span className="badge bg-danger" style={{padding: '8px 16px'}}>
                                                {crypto.market_data?.price_change_percentage_24h.toFixed(2)}%
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="p-2 order-1">
                                    <span>Low: {formatter.format(crypto?.market_data?.low_24h?.bmd)}</span>
                                </div>
                                <div className="p-2 order-2">
                                    <meter style={{color: ''}} min={crypto?.market_data?.low_24h?.bmd} max={crypto?.market_data?.high_24h?.bmd} value={crypto?.market_data?.current_price?.bmd}></meter>
                                </div>
                                <div className="p-2 order-3">
                                    <span>High: {formatter.format(crypto?.market_data?.high_24h?.bmd)}</span>
                                </div>
                                <div className="p-2 order-4" style={{alignItems: 'center', display: 'flex', flexDirection: 'row'}}>
                                    <div style={{borderRadius: '5px', background: '#000', opacity: '25%', padding: '2px 5px'}}>24h</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <h2><strong>What is {crypto.name} ({crypto.symbol.toUpperCase()})</strong></h2>
                        <p dangerouslySetInnerHTML={description()} style={{color: '#fff', opacity: '70%'}}></p>
                    </div>
                </div>

            </div>
                
        </>
    )
}

export default CryptoDetail