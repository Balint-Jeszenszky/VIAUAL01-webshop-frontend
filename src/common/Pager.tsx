import React, { useState, useEffect, useRef } from 'react';

interface IPager {
    url: string;
    currentPage: number;
    allPages: number;
}

const Products: React.FC<IPager> = props => {

    const diff = props.allPages - props.currentPage;
    const start = Math.max(1, props.currentPage - 2 - ((diff < 3) ? 3 - diff : 0));
    const end = Math.min(props.currentPage + 2 + ((props.currentPage < 4) ? 4 - props.currentPage : 0), props.allPages);
    const pages = [];

    if (start !== 1)
        pages.push(<li className="page-item disabled" key="pagerdotbefore"><a className="page-link" href="#">...</a></li>)

    for (let i = start; i <= end; i++) {
        pages.push(<li className={`page-item${(props.currentPage === i) ? ' active' : ''}`} key={`pager${i}`}><a className="page-link" href={props.url.replace(':page', i.toString())}>{i}</a></li>)
    }

    if (end !== props.allPages)
        pages.push(<li className="page-item disabled" key="pagerdotafter"><a className="page-link" href="#">...</a></li>)

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={`page-item${(props.currentPage === 1) ? ' disabled' : ''}`}>
                        <a className="page-link" href={props.url.replace(':page', (props.currentPage - 1).toString())} tabIndex={-1} aria-disabled="true">&laquo;</a>
                    </li>
                    {pages}
                    <li className={`page-item${(props.currentPage === props.allPages) ? ' disabled' : ''}`}>
                        <a className="page-link" href={props.url.replace(':page', (props.currentPage + 1).toString())}>&raquo;</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Products;
