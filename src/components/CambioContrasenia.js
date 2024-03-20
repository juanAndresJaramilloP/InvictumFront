import { useState } from 'react';

function CambioContrasenia ()
{

    const [formValues, setFormValues] = useState({pwdActual:"", pwdNueva:"", confPwdNueva:"1"});



    return(
        
        <div className="flex flex-col items-center justify-center h-screen space-y-10">

            <span className="text-xl text-blue-950 font-bold w-full max-w-md">Reestablecer Contraseña</span>
            
            <div className="flex flex-col w-full max-w-md">
                <span className="text-base text-blue-950">Contraseña actual</span>     
                <input id='pwdActual' type="text" placeholder="Escriba aquí" className="input input-ghost"/>
                <div class="border-t border-gray-400"></div>
            </div>

            <div className="flex flex-col w-full max-w-md">
                <span className="text-base text-blue-950">Contraseña nueva</span>     
                <input id='pwdNueva' type="text" placeholder="Escriba aquí" className="input input-ghost" />
                <div class="border-t border-gray-400"></div>
            </div>

            <div className="flex flex-col w-full max-w-md">
                <span className="text-base text-blue-950">Confirmar contraseña nueva</span>     
                <input id='copiaPwdNueva' type="text" placeholder="Escriba aquí" className="input input-ghost" />
                <div class="border-t border-gray-400"></div>
            </div>

            <button className="btn btn-primary text-white rounded-full">Reestablecer Contraseña</button>

        </div>
    );
}
 export default CambioContrasenia;