import React from 'react';


const CarsPagination = ({carsPerPage, totalCars,paginate}) => {
    const pageNumbers=[];
    console.log(totalCars);
    console.log(pageNumbers);
    for (let i = 1; i <= Math.ceil(totalCars/carsPerPage); i++) {
        pageNumbers.push(i)
        
    }
    return (
        <nav> 
            <ul className="pagination mt-4">
                {
                    pageNumbers.map(num=>(
                        <li key={num} className="page-item">
                            <a onClick={() =>paginate(num)} className="page-link">{num}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};

export default CarsPagination;