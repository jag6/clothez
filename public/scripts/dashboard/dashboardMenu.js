const dashboardMenu = {
    render: (props) => {
        return `
            <button id="dashboard-popup" class="dashboard-popup">
                <i class="fa-solid fa-plus"></i>
            </button>
            <div id="dashboard-overlay" class="dashboard-overlay"></div>
            <div id="dashboard-menu" class="dashboard-menu">
                <ul>
                    <li class="${props.selected === 'dashboard' ? 'selected' : ''}">
                        <a href="/users/admin"><div><i class="fa-solid fa-chart-simple"></i></div>Overview</a>
                    </li> 
                    <li class="${props.selected === 'users' ? 'selected' : ''}">
                        <a href="/users/userlist"><div><i class="fa-solid fa-users"></i></div>Users</a>
                    </li> 
                    <li class="${props.selected === 'orders' ? 'selected' : ''}">
                        <a href="/users/orderlist"><div><i class="fa-solid fa-list-ul"></i></div>Orders</a>
                    </li> 
                    <li class="${props.selected === 'products' ? 'selected' : ''}">
                        <a href="/users/productlist"><div><i class="fa-solid fa-box"></i></div>Products</a>
                    </li> 
                    <li class="${props.selected === 'banners' ? 'selected' : ''}">
                        <a href="/users/bannerlist"><div><i class="fa-solid fa-images"></i></div>Banners</a>
                    </li> 
                </ul>
            </div>
        `;
    }
}

export default dashboardMenu;