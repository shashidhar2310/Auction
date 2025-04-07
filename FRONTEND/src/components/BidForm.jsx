import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../App";

const BidPage = () => {
  const { id } = useParams();
  const { token, user } = useAuth();
  const [player, setPlayer] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/players/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlayer(response.data);
      } catch (err) {
        console.error("Error fetching player:", err.message);
        navigate("/players");
      }
    };

    fetchPlayer();
    const interval = setInterval(fetchPlayer, 5000);
    return () => clearInterval(interval);
  }, [id, token, navigate]);

  const handleBid = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !token) {
      setError("You must be logged in to place a bid.");
      return;
    }

    if (bidAmount <= player.currentBid) {
      setError("Bid must be higher than current bid.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/bid",
        {
          playerId: id,
          userId: user.id, // Ensure user ID is passed
          bidAmount: Number(bidAmount),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBidAmount("");
    } catch (err) {
      console.error("Bid error:", err);
      setError(err.response?.data?.error || "Failed to place bid");
    }
  };

  if (!player) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4 w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center fw-bold mb-4">{player.name}</h2>

        <div className="row g-3 mb-3">
          <div className="col-6"><strong>Role:</strong> {player.role}</div>
          <div className="col-6"><strong>Matches:</strong> {player.matches}</div>
          <div className="col-6"><strong>Runs:</strong> {player.runs}</div>
          <div className="col-6"><strong>Wickets:</strong> {player.wickets}</div>
          <div className="col-6"><strong>Strike Rate:</strong> {player.strikeRate}</div>
          <div className="col-6"><strong>Economy:</strong> {player.economy}</div>
        </div>

        <div className="fs-5 mb-3">
          <strong>Current Bid:</strong> ₹{player.currentBid}
        </div>

        <form onSubmit={handleBid}>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Enter your bid"
              min={player.currentBid + 1}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-success">Place Bid</button>
          </div>
          {error && <div className="text-danger mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default BidPage;
