import Navbar from '../components/sections/Navbar.jsx'
import Hero from '../components/sections/Hero.jsx'
import Features from '../components/sections/Features.jsx'
import AboutProject from '../components/sections/AboutProject.jsx'
import MissionForm from '../components/sections/MissionForm.jsx'
import MissionGame from '../components/sections/MissionGame.jsx'
import LiveProgress from '../components/sections/LiveProgress.jsx'
import Footer from '../components/sections/Footer.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <AboutProject />
      <MissionForm />
      <MissionGame />
      <LiveProgress />
      <Footer />
    </>
  )
}
