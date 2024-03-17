import React from 'react';
import logo from '../Invictum.svg'

const Footer = () => {
    return (

        <footer className="footer items-center p-4 bg-gradient-to-t from-[#030A1C] to-[#301965] text-white">
            <aside className="items-center grid-flow-col">
                <img className='h-20' src={logo} alt="Logo" />
                <a className="btn btn-ghost p-0 text-xl">NVICTUM</a>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <h6 className="footer-title">Proyecto Desarrollo Web</h6>
            </nav>
        </footer>
    );
};

export default Footer;