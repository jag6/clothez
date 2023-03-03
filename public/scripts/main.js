import { getUserInfo, getCartItems } from './export/cookies.js';
import { parseRequestUrl } from './export/utils.js';

const { first_name, isAdmin } = getUserInfo();
const { value } = parseRequestUrl();
const cartItems = getCartItems();

//search bar
const searchBar = document.querySelectorAll('.search-form');
searchBar.forEach((form) => {
    form.innerHTML = `
        <input type="text" name="q" value="${value || ''}">
        <button type="submit"><i class="fa fa-search"></i></button>
    `;
});
searchBar.forEach((form) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    const searchKeyword = document.querySelectorAll('q').value;
    document.location.href = `/search/?q=${searchKeyword}`;
    });
});


//cart and user details
const headerOther = document.getElementById('header-other');
headerOther.innerHTML = `
    <ul id="user-links" class='user-links'>
        <li>
            <a href='/favorites'>
                <div class='header-cf'>
                    <i class="fa-solid fa-heart"></i>
                </div>
            </a>
        </li>
        <li>
            <a id='cart-icon' href='/cart'>
                <div class='header-cf'>
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>${cartItems.reduce((a, c) => a + c.qty, 0)}</p>
                </div>
            </a>
        </li>
    </ul>
`;

const userLinks = document.getElementById('user-links');
const dashboardLink = document.createElement('li');
const registerLink = document.createElement('li');
const loginLink = document.createElement('li');

if(isAdmin == 'true') {
    dashboardLink.innerHTML = `
        <a href='/admin/dashboard'>
            <div class='header-cf'>
                <i class="fa-solid fa-user"></i>
            </div>
        </a>
    `;
    userLinks.insertBefore(dashboardLink, userLinks.children[0]);
}else if(isAdmin == 'false') {
    dashboardLink.innerHTML = `
        <a href='/users/profile'>
            <div class='header-cf'>
                <i class="fa-solid fa-user"></i>
            </div>
        </a>
    `;
    userLinks.insertBefore(dashboardLink, userLinks.children[0]);
}else {
    registerLink.innerHTML = `
        <a href='/users/register'>REGISTER</a>
    `;
    loginLink.innerHTML = `
        <a href='/users/login'>LOGIN</a>
    `;
    userLinks.insertBefore(registerLink, userLinks.children[0]);
    userLinks.insertBefore(loginLink, userLinks.children[1]);
}


//user dashboard
if(document.querySelector('#dashboard-header')) {
    const userName = document.getElementById('dashboard-header');
    userName.innerHTML = `
        <h1>Welcome ${first_name}</h1>
    `;
}


//toggle dashboard menu
const dashPU = document.getElementById('dashboard-popup');
const dashMenu = document.getElementById('dashboard-menu');
const dashOverlay = document.getElementById('dashboard-overlay');
const sidebar = document.getElementById('sidebar-container');
const sidebarCBtn = document.getElementById('sidebar-close-btn');

if(dashPU) {
    dashPU.addEventListener('click', () => {
        if(dashMenu.style.display === 'flex') {
            dashMenu.style.display = 'none';
            dashOverlay.style.display = 'none';
        }else {
            dashMenu.style.display = 'flex';
            dashOverlay.style.display = 'flex';
        }
    });
    window.addEventListener('click', (e) => {
        if(e.target == dashOverlay) {
            dashMenu.style.display = 'none';
            dashOverlay.style.display = 'none';
        }
    });
}


//toggle sidebar
document.getElementById('sidebar-open-btn').addEventListener('click', () => {
    if(sidebar.style.display === 'flex') {
        sidebar.style.display = 'none';
    }else {
        sidebar.style.display = 'flex';
        if(dashPU) {
            dashPU.style.display = 'none';
            dashMenu.style.display = 'none';
            dashOverlay.style.display = 'none';
        }
    }
});
sidebarCBtn.addEventListener('click', () => {
    sidebar.style.display = 'none';  
    if(dashPU) {
        dashPU.style.display = 'flex';
    }
});
window.addEventListener('click', (e) => {
    if(e.target == sidebar) {
        sidebar.style.display = 'none';
        if(dashPU) {
            dashPU.style.display = 'flex';
        }
    }
});


//chatbox
const openPU = document.getElementById('open-popup');
const chatPU = document.getElementById('chat-popup');
const closePU = document.getElementById('close-popup');

openPU.addEventListener('click', () => {
    chatPU.style.display = 'flex';
    openPU.style.display = 'none';
});
closePU.addEventListener('click', () => {
    chatPU.style.display = 'none';
    openPU.style.display = 'flex';
});

if(isAdmin) {
    openPU.style.display = 'none';
}