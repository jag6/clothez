import { apiUrl, getUrl } from '../export/config.js';

//dashboard menu
const DashboardMenu = {
    render: (props) => {
        return `
            <ul>
                <li class="${props.selected === 'dashboard' ? 'selected' : ''}">
                    <a href="/admin/dashboard"><span><i class="fa-solid fa-chart-simple"></i></span>Overview</a>
                </li> 
                <li class="${props.selected === 'users' ? 'selected' : ''}">
                    <a href="/admin/user-list"><span><i class="fa-solid fa-users"></i></span>Users</a>
                </li> 
                <li class="${props.selected === 'orders' ? 'selected' : ''}">
                    <a href="/admin/order-list"><span><i class="fa-solid fa-list-ul"></i></span>Orders</a>
                </li> 
                <li class="${props.selected === 'products' ? 'selected' : ''}">
                    <a href="/admin/product-list"><span><i class="fa-solid fa-box"></i></span>Products</a>
                </li> 
                <li class="${props.selected === 'banners' ? 'selected' : ''}">
                    <a href="/admin/banner-list"><span><i class="fa-solid fa-images"></i></span>Banners</a>
                </li> 
                <li class="${props.selected === 'profile' ? 'selected' : ''}">
                    <a href="/admin/profile"><span><i class="fa-solid fa-address-card"></i></span>Profile</a>
                </li> 
            </ul>
        `;
    }
};

if(getUrl == `${apiUrl}/admin/dashboard`){
    document.getElementById('dashboard-menu').innerHTML = `${DashboardMenu.render({selected: 'dashboard'})}`;
}else if(getUrl == `${apiUrl}/admin/order-list`){
    document.getElementById('dashboard-menu').innerHTML = `${DashboardMenu.render({selected: 'orders'})}`;
}else if(getUrl == `${apiUrl}/admin/user-list`){
    document.getElementById('dashboard-menu').innerHTML = `${DashboardMenu.render({selected: 'users'})}`;
}else if(getUrl == `${apiUrl}/admin/product-list`){
    document.getElementById('dashboard-menu').innerHTML = `${DashboardMenu.render({selected: 'products'})}`;
}else if(getUrl == `${apiUrl}/admin/banner-list`){
    document.getElementById('dashboard-menu').innerHTML = `${DashboardMenu.render({selected: 'banners'})}`;
}else if(getUrl == `${apiUrl}/admin/profile`){
    document.getElementById('dashboard-menu').innerHTML = `${DashboardMenu.render({selected: 'profile'})}`;
}


//product list
if(document.querySelector('#create-product-btn')) {
    //new products
    const createProductBtn = document.getElementById('create-product-btn');
    const containerOverlay = document.getElementById('container-overlay');
    const closeProductCont = document.querySelector('.dashboard-form-close-btn');
        
    createProductBtn.addEventListener('click', () => {
        containerOverlay.style.display = 'flex';
    });

    closeProductCont.addEventListener('click', () => {
            containerOverlay.style.display = 'none';
    });
}

//product edit
if(document.querySelector('#edit-product-container')) {
    document.getElementById('edit-product-form').addEventListener('submit', () => {
        
    });
}