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
import Sobre from './components/sobre';
import Apoio from './components/apoio';
import Guia from './components/guia';
import Eventos from './components/eventos';
import Cadastro from './components/cadastro';
import Entrar from './components/entrar';

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

// Rotas
const pages = [
  { path: '/', component: Index },
  { path: '/sobre', component: Sobre },
  { path: '/guia', component: Guia },
  { path: '/eventos', component: Eventos },
  { path: '/apoio', component: Apoio },
  { path: '/cadastro', component: Cadastro },
  { path: '/entrar', component: Entrar },
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