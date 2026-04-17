/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar, Hero, About, Menu, Reservation, Contact, Footer } from './components/SaffraLayout';

export default function App() {
  return (
    <div className="min-h-screen selection:bg-green selection:text-champagne" id="app-root">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
