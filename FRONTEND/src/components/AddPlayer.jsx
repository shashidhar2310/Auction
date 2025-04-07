import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';

const AddPlayer = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [playerData, setPlayerData] = useState({
    name: '',
    role: '',
    matches: 0,
    runs: 0,
    wickets: 0,
    strikeRate: 0,
    economy: 0,
    currentBid: 0,
    bidEndingTime: '', // ✅ Added auction end time
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !token) {
      alert("You must be logged in to add a player.");
      navigate('/login');
      return;
    }

    try {
      const payload = {
        ...playerData,
        bidStartingTime: new Date().toISOString(), // ✅ Optional: set start time automatically
      };

      await axios.post('http://localhost:5000/api/Addplayers', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('✅ Player added successfully!');
      setPlayerData({
        name: '',
        role: '',
        matches: 0,
        runs: 0,
        wickets: 0,
        strikeRate: 0,
        economy: 0,
        currentBid: 0,
        bidEndingTime: '',
      });
    } catch (error) {
      console.error('Error adding player:', error.response?.data?.error || error.message);
      alert('❌ Failed to add player');
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '700px' }}>
        <h3 className="mb-4 text-center fw-bold">Add New Player</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Player Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={playerData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              name="role"
              value={playerData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-Rounder</option>
              <option value="Wicket-Keeper">Wicket-Keeper</option>
            </select>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Matches</label>
              <input
                type="number"
                className="form-control"
                name="matches"
                value={playerData.matches}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Runs</label>
              <input
                type="number"
                className="form-control"
                name="runs"
                value={playerData.runs}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Wickets</label>
              <input
                type="number"
                className="form-control"
                name="wickets"
                value={playerData.wickets}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Strike Rate</label>
              <input
                type="number"
                className="form-control"
                name="strikeRate"
                value={playerData.strikeRate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Economy</label>
              <input
                type="number"
                className="form-control"
                name="economy"
                value={playerData.economy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Starting Bid</label>
              <input
                type="number"
                className="form-control"
                name="currentBid"
                value={playerData.currentBid}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Auction End Time</label>
              <input
                type="datetime-local"
                className="form-control"
                name="bidEndingTime"
                value={playerData.bidEndingTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-4">
              Add Player
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;
