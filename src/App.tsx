import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './pages/HomeScreen';
import ResultsPage from './pages/ResultsPage';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { AppProvider } from './context-provider/AppProvider'; // Import AppProvider

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppProvider> {/* Wrap your entire app with AppProvider */}
        <Router>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </Provider>
  );
};

export default App;
