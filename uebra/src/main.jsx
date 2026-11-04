import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
} from '@tanstack/react-router';
import Header from './components/header';
import './index.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import Footer from './components/footer';
import Index from './components/index'

const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-column min-h-screen">
      <Header />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  ),
});

// Uma rota para cada link do menu (páginas provisórias)
const pages = [
  { path: '/', component: Index },
  { path: '/sobre', component: () => <h2>Sobre Nós</h2> },
  { path: '/guia', component: () => <h2>Guia do Recém-Chegado</h2> },
  { path: '/eventos', component: () => <h2>Eventos</h2> },
  { path: '/apoio', component: () => <h2>Apoio & Comunidade</h2> },
  { path: '/cadastro', component: () => <h2>Cadastrar-se</h2> },
];

const routes = pages.map((page) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: page.path,
    component: page.component,
  })
);

const router = createRouter({ routeTree: rootRoute.addChildren(routes) });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);