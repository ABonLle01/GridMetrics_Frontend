import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/home/Home'
import Results from './components/results/Results'
import Drivers from './components/drivers/Drivers'
import DriverDetail from './components/drivers/details/DriverDetails'
import Teams from './components/teams/Teams'
import TeamDetail from './components/teams/details/TeamDetails'
import Schedule from './components/schedule/Schedule'
import GPSchedule from './components/schedule/details/GPSchedule'
import Compare from './components/compare/Compare'
import Strats from './components/strats/Strats'
import Layout from './components/Layout'
import Admin from './components/admin/Admin'
import DriversList from './components/admin/drivers/DriversList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="results" element={<Results />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="drivers/:id" element={<DriverDetail />} />
          <Route path="teams" element={<Teams />} />
          <Route path="teams/:id" element={<TeamDetail />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="circuits/:id" element={<GPSchedule />} />
          <Route path="compare" element={<Compare />} />
          <Route path="strats" element={<Strats />} />
          <Route path="admin" element={<Admin/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
