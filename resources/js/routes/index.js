import VueRouter from 'vue-router';
import LinkShortener from "../views/LinkShortener";

const routes = [
    {
        name:'shortener',
        path:'/',
        component:LinkShortener
    }
];
const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
});

router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
        next(from.path);
    } else {
        next();
    }
});
export default router
