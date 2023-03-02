import { parseRequestUrl } from '../export/utils.js';
import dashboardScreen from './dashboardScreen.js';

const routes = {
    '/users/dashboard': dashboardScreen,
}

const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = 
        (request.resource ? `/${request.resource}`: '/') +
        (request.id ? '/:id': '') + 
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl]: ''//Error404Screen;

    const main = document.querySelector('main');
    main.innerHTML = await screen.render();
    if(screen.after_render) await screen.after_render();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);