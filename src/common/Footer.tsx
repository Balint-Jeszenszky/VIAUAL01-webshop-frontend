import React, { useContext } from 'react';
import { IUserContext, UserContext } from './UserContext';

interface IFooter {
    updateUserCtx(c: IUserContext): void;
    currencies: string[];
}

const Footer: React.FC<IFooter> = props => {
    const userCtx = useContext(UserContext);

    return (
        <footer className="footer-dark mt-3">
            <div className="container p-3">
                <span>Available currencies: </span>
                {props.currencies.map((e, i) => (
                    <span className={`pl-1 ${(e === userCtx.currency) ? 'selected' : 'available'}`} 
                        onClick={() => props.updateUserCtx({ currency: e })} key={`currency${i}`}>{e}
                    </span>)
                )}
            </div>
        </footer>
    );
}

export default Footer;
