import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../App";
import { Link } from "react-router-dom";

const PlayerList = () => {
  const { token } = useAuth();
  const [players, setPlayers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/players", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlayers(response.data);
        setFiltered(response.data);
      } catch (error) {
        console.error("Error fetching players:", error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [token]);

  useEffect(() => {
    const now = new Date();

    let results = players.filter(player => {
      const bidEnd = new Date(player.bidEndingTime);
      return bidEnd > now;
    });

    if (searchTerm) {
      results = results.filter(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      results = results.filter(player => player.role === roleFilter);
    }

    setFiltered(results);
  }, [searchTerm, roleFilter, players]);

  return (
    <div className="container py-5 mt-5">
      <h2 className="text-center mb-4 fw-bold">Players List</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="form-select"
          >
            <option value="">All Roles</option>
            <option value="Batsman">Batsman</option>
            <option value="Bowler">Bowler</option>
            <option value="All-Rounder">All-Rounder</option>
            <option value="Wicket-Keeper">Wicket-Keeper</option>
          </select>
        </div>
      </div>

      {/* Player Cards */}
      {loading ? (
        <p className="text-center">Loading players...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted">No players found or auctions have ended.</p>
      ) : (
        <div className="row g-4">
          {filtered.map((player) => (
            <div className="col-md-6 col-lg-4" key={player._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{player.name}</h5>
                  <p className="card-text">Role: {player.role}</p>
                  <p className="card-text">Matches: {player.matches}</p>
                  <p className="card-text">Runs: {player.runs}</p>
                  <p className="card-text">Wickets: {player.wickets}</p>
                  <p className="card-text">Strike Rate: {player.strikeRate}</p>
                  <p className="card-text">Economy: {player.economy}</p>
                  <p className="card-text fw-bold">Current Bid: ₹{player.currentBid}</p>
                  <p className="card-text text-muted small">
                    Ends on: {new Date(player.bidEndingTime).toLocaleString()}
                  </p>
                  <Link to={`/bid/${player._id}`} className="btn btn-primary mt-2 w-100">
                    Place Bid
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerList;
