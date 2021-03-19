import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { CurrencyContext } from './CurrencyContext';

interface IFooter {
    setCurrency(c: string): void;
}

const Footer: React.FC<IFooter> = props => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const currencies = useRef<string[]>([]);
    const current = useContext(CurrencyContext);

    useEffect(() => {
        axios.get('http://192.168.0.2:3000/api/currencies')
        .then(res => {
            currencies.current = res.data;
            setLoaded(true);
        });
    }, []);

    return (
        <footer className="footer-dark mt-3">
            <div className="container p-3">
                <span>Available currencies: </span>
                {loaded && currencies.current.map((e, i) => (
                    <span className={`pl-1 ${(e === current) ? 'selected' : 'available'}`} onClick={() => props.setCurrency(e)} key={`currency${i}`}>{e} </span>)
                )}
            </div>
        </footer>
    );
}

export default Footer;
