import { getUserInfo, getCartItems } from './export/cookies.js';
import { parseRequestUrl } from './export/utils.js';

const { name, isAdmin } = getUserInfo();
const { value } = parseRequestUrl();
const cartItems = getCartItems();

//search bar
const searchBar = document.getElementById('search-form');
searchBar.innerHTML = `
    <input type="text" name="q" id="q" value="${value || ''}">
    <button type="submit"><i class="fa fa-search"></i></button>
`;

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchKeyword = document.getElementById('q').value;
    document.location.href = `/search/?q=${searchKeyword}`;
});


//cart and user details
const headerOther = document.getElementById('header-other');
headerOther.innerHTML = `
    <ul class='user-links'>
        ${
            name 
            ? `<li><a href='/users/dashboard'>${name}</a></li>`
            : `<li><a href='/users/register'>REGISTER</a></li>
                <li><a href='/users/login'>LOGIN</a></li>`
        }
        <li>
            <a id='cart-icon' href='/cart'>
                <div class='header-cart'>
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>${cartItems.reduce((a, c) => a + c.qty, 0)}</p>
                </div>
            </a>
        </li>
    </ul>
    <div class='header-dashboard'>
        ${isAdmin ? `<a href='/users/dashboard'>Dashboard</a>` : '' }
    </div>
`;


//sidebar
const sidebar = document.getElementById('sidebar-container');

document.getElementById('sidebar-open-btn').addEventListener('click', () => {
    if(sidebar.style.display === 'flex') {
        sidebar.style.display = 'none';
    }else {
        sidebar.style.display = 'flex';
    }
    
});
document.getElementById('sidebar-close-btn').addEventListener('click', () => {
    sidebar.style.display = 'none';  
});
window.addEventListener('click', (e) => {
    if(e.target == sidebar) {
        sidebar.style.display = 'none';
    }
})


//chatbox
document.getElementById('openBtn').addEventListener('click', () => {
    document.getElementById('chat-popup').style.display = "flex";
    document.getElementById('openBtn').style.display = "none";
})
document.getElementById('closeBtn').addEventListener('click', () => {
    document.getElementById('chat-popup').style.display = "none";
    document.getElementById('openBtn').style.display = "flex";
})