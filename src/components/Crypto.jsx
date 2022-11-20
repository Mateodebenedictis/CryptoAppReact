import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Crypto = () => {

    //create a filter for the price 24hs

    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);
    const [loading, setLoading] = useState(true);


    const endpoint = 'https://api.coingecko.com/api/v3/coins';
    const showData = () => {

        axios.get(endpoint).then((res) => {
            setLoading(false);
            setCrypto(res.data);
        }).catch((err) => {
            console.log(err);
            setLoading(true);
        }
        ).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        showData();
    }, []);

    const searcher = (e) => {
        setSearch(e.target.value);
    }

    const filteredCrypto = crypto.filter((crypto) => {
        return crypto.name.toLowerCase().includes(search.toLowerCase());
    });
    
    const results = !search ? crypto : filteredCrypto;

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const navigate = useNavigate();

    const handleRowClick = (crypto) => {
        navigate(`/crypto/${crypto.id}`);
    }
    

    if(loading) return <Loader />


    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group mb-3">
                            <input value={search} onChange={searcher} type="text" className="form-control bg-dark text-bg-primary" placeholder="Search Crypto" />
                        </div>
                    </div>
                </div>
                <div className="row">

                    <table
                        className="table table-striped table-dark table-hover table-bordered table-sm"
                        style={{ marginTop: 20 }}
                    >
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Ranking</th>
                                <th scope="col">Name</th>
                                <th scope="col">Symbol</th>
                                <th scope="col">Price</th>
                                <th scope="col">Price 24hs</th>
                                <th scope="col">Market Cap</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((crypto) => (
                                <tr key={crypto.id} onClick={ () => handleRowClick(crypto)} >
                                    <td>{crypto.market_data?.market_cap_rank}</td>
                                    <td> <small> <img src={crypto.image?.small} alt={crypto.name}/> {crypto.name} </small> </td>
                                    <td>{crypto.symbol.toUpperCase()}</td>
                                    <td>{ formatter.format(crypto.market_data?.current_price?.bmd.toFixed(2))}</td>
                                    <td>
                                        {
                                            crypto.market_data?.price_change_percentage_24h > 0 ? (
                                                <span className="badge bg-success">
                                                    {crypto.market_data?.price_change_percentage_24h.toFixed(2)}%
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger">
                                                    {crypto.market_data?.price_change_percentage_24h.toFixed(2)}%
                                                </span>
                                            )
                                        }
                                    </td>
                                    <td> { formatter.format(crypto.market_data?.market_cap?.bmd) }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}

export default Crypto