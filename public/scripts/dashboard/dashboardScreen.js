import dashboardMenu from './dashboardMenu.js';

const dashboardScreen = {
    after_render: () => {
        
    },
    render: async () => {
        return `
            <section class="dashboard content">
                ${dashboardMenu.render({ selected: 'dashboard' })}
            </section>
        `;
    }
};

export default dashboardScreen;