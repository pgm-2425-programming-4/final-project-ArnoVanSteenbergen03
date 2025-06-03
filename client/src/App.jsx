import { useState } from "react";
import PaginatedBacklog from "./components/PaginatedBacklog";
import Navigation from "./components/Navigation";
import Searchbar from "./components/Searchbar";
import './App.css'

function App() {
  const [showBacklog, setShowBacklog] = useState(false);

  const handleViewBacklog = () => {
    setShowBacklog(true);
  };

  return (
    <main className="content"> 
      <Navigation />
      <Searchbar onViewBacklog={handleViewBacklog} />
      
      {showBacklog && <PaginatedBacklog />}
    </main>
  )
}

export default App