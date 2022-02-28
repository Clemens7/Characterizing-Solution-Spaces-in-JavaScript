
        import * as SearchAPI from './search.js';
        import * as FrameAPI from './frame.js';
        import * as ConfigAPI from './config.js';
        import * as ConfigDomAPI from './config-dom.js';
        import { setCartItemsInHeader } from './header-cart.js';

        document.addEventListener('DOMContentLoaded', event => {

            //parameter
            const params = (new URL(document.location)).searchParams;

            setCartItemsInHeader();

            try{
                ConfigAPI.constructConfig(params);
            } 


            const formElement = document.getElementById('config-form');

            formElement.addEventListener('submit', );

        });





    