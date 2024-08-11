import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ banner, updateBanner }) => {
  const [formState, setFormState] = useState({
    description: '',
    timer: 0,
    link: '',
    isVisible: true
  });

  // Set form state when banner data is received
  useEffect(() => {
    if (banner) {
      setFormState({
        description: banner.description || '',
        timer: banner.timer || 0,
        link: banner.link || '',
        isVisible: banner.isVisible || true
      });
    }
  }, [banner]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/banner', formState)
      .then(() => {
        updateBanner(formState);
        // Reset form fields after update
        setFormState({
          description: '',
          timer: 0,
          link: '',
          isVisible: true
        });
      })
      .catch(error => console.error('Error updating banner:', error));
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Timer (seconds):
          <input
            type="number"
            name="timer"
            value={formState.timer}
            onChange={handleChange}
          />
        </label>
        <label>
          Link:
          <input
            type="text"
            name="link"
            value={formState.link}
            onChange={handleChange}
          />
        </label>
        <label>
          Visible:
          <input
            type="checkbox"
            name="isVisible"
            checked={formState.isVisible}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Banner</button>
      </form>
    </div>
  );
};

export default Dashboard;
