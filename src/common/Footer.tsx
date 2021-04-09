import React, { useState, useEffect, useRef, useContext } from 'react';
import { IUserContext, UserContext } from './UserContext';
import webshopAPI, { actions } from './webshopAPI';

interface IFooter {
    updateUserCtx(c: IUserContext): void;
}

const Footer: React.FC<IFooter> = props => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const currencies = useRef<string[]>([]);
    const userCtx = useContext(UserContext);

    useEffect(() => {
        webshopAPI(actions.GET, '/currencies')
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
                    <span className={`pl-1 ${(e === userCtx.currency) ? 'selected' : 'available'}`} 
                        onClick={() => props.updateUserCtx({ currency: e })} key={`currency${i}`}>{e}
                    </span>)
                )}
            </div>
        </footer>
    );
}

export default Footer;
