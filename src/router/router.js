import Main from "@/pages/MainPage"
import {createRouter, createWebHistory} from "vue-router"
import PostPage from "@/pages/PostPage"
import AboutPage from "@/pages/AboutPage"
import PostIdPage from "@/pages/PostIdPage"
import PostPageWithStore from "@/pages/PostPageWithStore"
import PostPageCompositionApi from "@/pages/PostPageCompositionApi"

const routes =[

    {
        path:'/posts',
        component: PostPage
    },
    {
        path:'/about',
        component: AboutPage
    },
    {
        path:'/posts/:id',
        component: PostIdPage
    },
    {
        path:'/store',
        component: PostPageWithStore
    },
    {
        path:'/composition',
        component: PostPageCompositionApi
    },
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;