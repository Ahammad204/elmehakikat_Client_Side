import React from 'react';
import starter from "../../assets/bismillahirrahmanirrahim.png"

const Starter = () => {
    return (
        <>
            <div className='w-full flex justify-center items-center h-32 shadow-xl'>
                <img className='w-96 h-96' src={starter} alt="" />
            </div>
        </>
    );
};

export default Starter;