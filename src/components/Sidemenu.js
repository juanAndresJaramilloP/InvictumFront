import React from "react";


const Sidemenu = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                ahsgdujvsdkjv
                <div className='flex flex-col sm:flex-row gap-8'>
                    <div>Punto 1</div>
                    <div>Punto 2</div>
                    <div>Punto 3</div>
                    <div>Punto 4</div>
                </div>
                <label for="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label for="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    sergwerg
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidemenu;