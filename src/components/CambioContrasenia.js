import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

function CambioContrasenia ()
{

    const [pwdActual, setPwdActual] = useState("");
    const [pwdNueva, setPwdNueva] = useState("");
    const [confPwdNueva, setConfPwdNueva] = useState("");

    const manejoPwdActual =((e) =>
    {
        setPwdActual(e.target.value);
    })

    const manejoPwdNueva =((e) =>
    {
        setPwdNueva(e.target.value);
    })

    const manejoConfPwdNueva =((e) =>
    {
        setConfPwdNueva(e.target.value);
    })



    return(
        
        <div className="flex flex-col items-center justify-center h-screen space-y-10">

            <span className="text-xl text-blue-950 font-bold w-full max-w-md"><FormattedMessage id="Reestablecer Contraseña" defaultMessage="Amount is required and it must be a number"/></span>
            
            <div className="flex flex-col w-full max-w-md">
                <span className="text-base text-blue-950"><FormattedMessage id="Contraseña actual"/></span>     
                <input id='pwdActual' type="password" placeholder="..." className="input input-ghost" onChange={manejoPwdActual}/>
                <div class="border-t border-gray-400"></div>
            </div>

            <div className="flex flex-col w-full max-w-md">
                <span className="text-base text-blue-950"><FormattedMessage id="Contraseña nueva"/></span>     
                <input id='pwdNueva' type="password" placeholder="..." className="input input-ghost" onChange={manejoPwdNueva} />
                <div class="border-t border-gray-400"></div>
            </div>

            <div className="flex flex-col w-full max-w-md">
                <span className="text-base text-blue-950"><FormattedMessage id="Confirmar contraseña nueva"/></span>     
                <input id='copiaPwdNueva' type="password" placeholder="..." className="input input-ghost" onChange={manejoConfPwdNueva}/>
                <div class="border-t border-gray-400"></div>
            </div>

            <button className="btn btn-primary text-white rounded-full"><FormattedMessage id="Reestablecer Contraseña"/></button>

        </div>
    );
}
 export default CambioContrasenia;