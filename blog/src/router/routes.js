import home from '@/views/home'
import label from '@/views/label'
import article from '@/views/article'
import about from '@/views/about'
import login from '@/views/login'
import detailed from '@/views/detailed'
import write from '@/views/write'
import search from '@/views/search'
import person from '@/views/person'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/about',
    name: 'about',
    component: about,
  },
  {
    path: '/label',
    name: 'label',
    component: label,
  },
  {
    path: '/article',
    name: 'article',
    component: article,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/detailed',
    name: 'detailed',
    component: detailed,
  },
  {
    path: '/write',
    name: 'write',
    component: write,
  },
  {
    path: '/search',
    name: 'search',
    component: search,
  },
  {
    path: '/person',
    name: 'person',
    component: person
  }
];

export default routes;

