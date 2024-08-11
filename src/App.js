import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from './components/banner';
import Dashboard from './components/dashboard';
import './styles.css'; // Import the CSS file

const App = () => {
  const [banner, setBanner] = useState({
    description: '',
    timer: 0,
    link: '',
    isVisible: false, // Set default visibility to false
  });

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/banner`)
      .then((response) => {
        const data = response.data;
        setBanner(data);
        setTimeLeft(data.timer);
      })
      .catch(error => {
        console.error('Error fetching banner data:', error);
      });
  }, []);

  useEffect(() => {
    if (banner.isVisible && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && banner.isVisible) {
      setBanner((prevBanner) => ({
        ...prevBanner,
        isVisible: false,
      }));
    }
  }, [timeLeft, banner]);

  const updateBanner = (updatedBanner) => {
    setBanner(updatedBanner);
    setTimeLeft(updatedBanner.timer); // Reset timer when updating banner
  };

  return (
    <div className="App">
      {banner.isVisible && <Banner banner={banner} timeLeft={timeLeft} />}
      <Dashboard banner={banner} updateBanner={updateBanner} />
    </div>
  );
};

export default App;
