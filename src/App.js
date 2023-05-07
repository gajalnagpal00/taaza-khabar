import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  // const NewsApiKey = '7e4594151caf450ebb3a931eaf02ac9e';
  // const NewsApiKey2 = '5676c3bca4134272ada07336561154bb';
  const NewsApiKey3 = '3b236cbd3df74e11828b215edb2932d2';

  const [progress, setProgress] = useState(0);
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress = {setProgress} key="general" pageSize={12} category="general" apiKey={NewsApiKey3}/>}></Route>
            <Route exact path="business" element={<News setProgress = {setProgress} key="business" pageSize={12} category="business" apiKey={NewsApiKey3}/>}></Route>
            <Route exact path="/entertainment" element={<News setProgress = {setProgress} key="entertainment" pageSize={12} category="entertainment" apiKey={NewsApiKey3}/>}></Route>
            <Route exact path="/health" element={<News setProgress = {setProgress} pageSize={12} key="health" category="health" apiKey={NewsApiKey3}/>}></Route>
            <Route exact path="/science" element={<News setProgress = {setProgress} pageSize={12} key="science" category="science" apiKey={NewsApiKey3}/>}></Route>
            <Route exact path="/sports" element={<News setProgress = {setProgress} pageSize={12} key="sports" category="sports" apiKey={NewsApiKey3}/>}></Route>
            <Route exact path="/technology" element={<News setProgress = {setProgress} pageSize={12} key="technology" category="technology" apiKey={NewsApiKey3}/>}></Route>
          </Routes>
        </Router>
      </div>
    )
}

export default App;
