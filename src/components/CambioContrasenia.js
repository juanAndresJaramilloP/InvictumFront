import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import NavBarLogin from './NavBarLogin';
import { useLocation } from 'react-router-dom';

function CambioContrasenia ()
{
    const location = useLocation();

    const {email, password} = location.state;
    const [pwdActual, setPwdActual] = useState("");
    const [pwdNueva, setPwdNueva] = useState("");
    const [confPwdNueva, setConfPwdNueva] = useState("");

    const [pwdActualEsCorrecta, setPwdActualEsCorrecta] = useState(true);
    const [pwdNuevaEsValida, setPwdNuevaEsValida] = useState(true);
    const [pwdCambiada, setPwdCambiada] = useState(false)

    const manejoPwdActual =((e) =>
    {
        setPwdActual(e.target.value);
    })

    const compararPwdActual = (()=>
    {
        if (password === pwdActual)
        {
            setPwdActualEsCorrecta(true);
        }
        else
        {
            setPwdActualEsCorrecta(false);
        }

        return null;
    })

    const manejoPwdNueva =((e) =>
    {
        setPwdNueva(e.target.value);
    })

    const manejoConfPwdNueva =((e) =>
    {
        setConfPwdNueva(e.target.value);
    })

    const evaluarPwdNueva = (() => 
    {
        let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{5,}$/;

        if((pwdNueva === confPwdNueva) && passwordRegex.test(pwdNueva))
        {
            setPwdNuevaEsValida(true);
        }
        else
        {
            setPwdNuevaEsValida(false);
        }

        return null;
    })



    const handleReestablecerContraseña = (() => 
    {
        compararPwdActual();
        evaluarPwdNueva();

        if (pwdActualEsCorrecta && pwdNuevaEsValida)
        {
            setPwdCambiada(true);
        }
        else
        {
            setPwdCambiada(false);
        }

    })



    return(

        <div>

            <NavBarLogin email= {email}/>

            {!pwdActualEsCorrecta && <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><FormattedMessage id="Contraseña actual incorrecta" /></span>
            </div>} 

            {!pwdNuevaEsValida && <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><FormattedMessage id="Contraseña nueva incorrecta" /></span>
            </div>} 

            {pwdCambiada && <div role="alert" className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><FormattedMessage id="Contraseña cambiada correctamente" /></span>
            </div>} 
        
            <div className="flex flex-col items-center justify-center h-screen space-y-10">

                <span className="text-xl text-blue-950 font-bold w-full max-w-md"><FormattedMessage id="Reestablecer Contraseña" defaultMessage="Amount is required and it must be a number"/></span>
                
                <div className="flex flex-col w-full max-w-md">
                    <span className="text-base text-blue-950"><FormattedMessage id="Contraseña actual"/></span>     
                    <input id='pwdActual' type="password" placeholder="..." className="input input-ghost" onChange={manejoPwdActual}/>
                    <div className="border-t border-gray-400"></div>
                </div>

                <div className="flex flex-col w-full max-w-md">
                    <span className="text-base text-blue-950"><FormattedMessage id="Contraseña nueva"/></span>     
                    <input id='pwdNueva' type="password" placeholder="..." className="input input-ghost" onChange={manejoPwdNueva} />
                    <div className="border-t border-gray-400"></div>
                </div>

                <div className="flex flex-col w-full max-w-md">
                    <span className="text-base text-blue-950"><FormattedMessage id="Confirmar contraseña nueva"/></span>     
                    <input id='copiaPwdNueva' type="password" placeholder="..." className="input input-ghost" onChange={manejoConfPwdNueva}/>
                    <div className="border-t border-gray-400"></div>
                </div>

                <button className="btn btn-primary text-white rounded-full" onClick={handleReestablecerContraseña}><FormattedMessage id="Reestablecer Contraseña"/></button>

            </div>

        </div>
    );
}
 export default CambioContrasenia;