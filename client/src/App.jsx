import PaginatedBacklog from "./components/PaginatedBacklog";
import Navigation from "./components/Navigation";
import Searchbar from "./components/Searchbar";
import './App.css'

function App() {

  return (
     <main className="content"> 
      <Navigation />
      <Searchbar />
      <h1>Backlog Taken</h1>
      <PaginatedBacklog />
    </main>
  )
}

export default App
