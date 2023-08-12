import type { Component } from 'solid-js';
import { useRoutes } from '@solidjs/router';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Edit } from './pages/Edit';

const App: Component = () => {
  const Route = useRoutes([
    { path: "/"    , component: Home },
    { path: "/edit", component: Edit }
  ]);

  return (
    <main class="min-w-screen w-full min-h-screen h-full bg-primary text-gray-300 ">
      <Navbar />
      <section class="p-6">
        <Route />
      </section>
    </main>
  );
};

export default App;
