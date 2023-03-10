import { apiUrl, getUrl } from '../export/config.js';
import { getUserInfo } from '../export/cookies.js';
import { showMessage } from '../export/utils.js';

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


//new products
if(document.querySelector('#create-product-btn')) {
    //open and close create product container
    const createProductBtn = document.getElementById('create-product-btn');
    const containerOverlay = document.getElementById('container-overlay');
    const closeProductCont = document.querySelector('.dashboard-form-close-btn');
        
    createProductBtn.addEventListener('click', () => {
        containerOverlay.style.display = 'flex';
    });

    closeProductCont.addEventListener('click', () => {
            containerOverlay.style.display = 'none';
    });

    //post new product
    const newProduct = async ({ name, description, gender, category, type, image_main, image_1, image_2, image_3, image_4, price, countInStock }) => {
        try {
            const { token } = getUserInfo();
            const response = await axios ({
                url: `${apiUrl}/admin/product-list`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                data: {
                    name, description, gender, category, type, image_main, image_1, image_2, image_3, image_4, price, countInStock
                }
            });
            if(response.statusText !== 'Created') {
                throw new Error(response.data.message);
            }
            return response.data;
        }catch(err) {
            return { error: err.response.data.message || err.message };
        }
    };
    
    document.getElementById('new-product-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = await newProduct({
            name: document.getElementById('name').value, description: document.getElementById('description').value, 
            gender: document.getElementById('gender').value, 
            category: document.getElementById('category').value, 
            type: document.getElementById('type').value, 
            image_main: document.getElementById('image_main').value, 
            image_1: document.getElementById('image_1').value, 
            image_2: document.getElementById('image_2').value, 
            image_3: document.getElementById('image_3').value, 
            image_4: document.getElementById('image_4').value, 
            price: document.getElementById('price').value, 
            countInStock: document.getElementById('countInStock').value
        });
        if(data.error) {
            showMessage(data.error);
        }else {
            location.href = '/admin/product-list';
        }
    });

    //upload image(s)
    const uploadImage = async (formData) => {
        try {
            const { token } = getUserInfo();
            const response = await axios ({
                url: `${apiUrl}/admin/product-list/imageUpload`,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
                data: formData
            });
            if(response.statusText !== 'Created') {
                throw new Error(response.data.message);
            }
            return response.data;
        }catch(err) {
            return { error: err.response.data.message || err.message };
        }
    }

    //upload image_main
    document.getElementById('image_file_main').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image_main', file);
        const data = await uploadImage(formData);
        if(data.error) {
            showMessage(data.error);
        }else {
            document.getElementById('image_main').value = data.image_main;
        }
    });
    //upload image_1 - 4
    document.getElementById('image_file_1').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image_1', file);
        const data = await uploadImage(formData);
        if(data.error) {
            showMessage(data.error);
        }else {
            document.getElementById('image_1').value = data.image_1;
        }
    });
    document.getElementById('image_file_2').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image_2', file);
        const data = await uploadImage(formData);
        if(data.error) {
            showMessage(data.error);
        }else {
            document.getElementById('image_2').value = data.image_2;
        }
    });
    document.getElementById('image_file_3').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image_3', file);
        const data = await uploadImage(formData);
        if(data.error) {
            showMessage(data.error);
        }else {
            document.getElementById('image_3').value = data.image_3;
        }
    });
    document.getElementById('image_file_4').addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image_4', file);
        const data = await uploadImage(formData);
        if(data.error) {
            showMessage(data.error);
        }else {
            document.getElementById('image_4').value = data.image_4;
        }
    });
}

//edit products
if(document.querySelector('#edit-product-container')) {
    document.getElementById('edit-product-form').addEventListener('submit', (e) => {
        e.preventDefault();
    });
}