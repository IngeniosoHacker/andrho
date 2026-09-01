import Navbar from './components/sections/Navbar.jsx'
import Hero from './components/sections/Hero.jsx'
import Features from './components/sections/Features.jsx'
import Waitlist from './components/sections/Waitlist.jsx'
import MissionForm from './components/sections/MissionForm.jsx'
import MissionGame from './components/sections/MissionGame.jsx'
import LiveProgress from './components/sections/LiveProgress.jsx'
import Footer from './components/sections/Footer.jsx'

// AndRho — under-construction landing page (see PRODUCT.md > Design).
// Full marketing site comes back once the backend is ready; for now this
// page's only job is: say we're under construction, explain the "why", and
// collect the waiting list.
export default function App() {
  return (
    <div className="overflow-x-hidden antialiased">
      <Navbar />
      <Hero />
      <Features />
      <Waitlist />
      <MissionForm />
      <MissionGame />
      <LiveProgress />
      <Footer />
    </div>
  )
}
