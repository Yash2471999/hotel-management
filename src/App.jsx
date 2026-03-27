import { useState } from "react";

const rooms = [
  { id: 101, type: "Deluxe Suite", price: 299, status: "available", floor: 1, beds: 2, view: "Ocean" },
  { id: 102, type: "Presidential Suite", price: 599, status: "occupied", floor: 1, beds: 3, view: "City" },
  { id: 103, type: "Standard Room", price: 149, status: "available", floor: 1, beds: 1, view: "Garden" },
  { id: 201, type: "Deluxe Suite", price: 299, status: "maintenance", floor: 2, beds: 2, view: "Ocean" },
  { id: 202, type: "Junior Suite", price: 399, status: "available", floor: 2, beds: 2, view: "City" },
  { id: 203, type: "Standard Room", price: 149, status: "occupied", floor: 2, beds: 1, view: "Garden" },
  { id: 301, type: "Presidential Suite", price: 599, status: "available", floor: 3, beds: 3, view: "Ocean" },
  { id: 302, type: "Junior Suite", price: 399, status: "occupied", floor: 3, beds: 2, view: "City" },
  { id: 303, type: "Deluxe Suite", price: 299, status: "available", floor: 3, beds: 2, view: "Garden" },
];

const initialGuests = [
  { id: 1, name: "Alexandra Chen", room: 102, checkIn: "2026-03-25", checkOut: "2026-03-29", status: "checked-in", amount: 2396 },
  { id: 2, name: "Marcus Williams", room: 203, checkIn: "2026-03-26", checkOut: "2026-03-28", status: "checked-in", amount: 298 },
  { id: 3, name: "Sofia Laurent", room: 302, checkIn: "2026-03-27", checkOut: "2026-03-30", status: "checked-in", amount: 1197 },
  { id: 4, name: "James Okafor", room: 105, checkIn: "2026-03-20", checkOut: "2026-03-24", status: "checked-out", amount: 596 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Jost:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold: #C9A84C;
    --gold-light: #E8C97A;
    --gold-dark: #8B6914;
    --black: #0A0A0A;
    --dark: #111111;
    --surface: #1A1A1A;
    --surface2: #222222;
    --border: #2A2A2A;
    --text: #F0EDE8;
    --text-muted: #8A8480;
    --green: #4CAF82;
    --red: #E05252;
    --amber: #E0A252;
  }

  body { background: var(--black); color: var(--text); font-family: 'Jost', sans-serif; }

  .app { display: flex; min-height: 100vh; }

  /* Sidebar */
  .sidebar {
    width: 260px;
    background: var(--dark);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    z-index: 100;
  }

  .logo {
    padding: 32px 24px;
    border-bottom: 1px solid var(--border);
  }

  .logo-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    color: var(--gold);
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .logo-sub {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .nav { padding: 16px 12px; flex: 1; }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 400;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }

  .nav-item:hover { background: var(--surface); color: var(--text); }
  .nav-item.active { background: var(--surface2); color: var(--gold); }
  .nav-icon { font-size: 18px; width: 20px; text-align: center; }

  .sidebar-footer {
    padding: 20px 24px;
    border-top: 1px solid var(--border);
  }

  .admin-info { display: flex; align-items: center; gap: 12px; }
  .admin-avatar {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--gold-dark), var(--gold));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; color: var(--black); font-weight: 700;
  }
  .admin-name { font-size: 13px; font-weight: 500; }
  .admin-role { font-size: 11px; color: var(--text-muted); letter-spacing: 1px; }

  /* Main */
  .main { margin-left: 260px; flex: 1; padding: 32px; min-height: 100vh; }

  .page-header {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 32px;
  }

  .page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 36px; font-weight: 300;
    color: var(--text);
    letter-spacing: 1px;
  }

  .page-subtitle { font-size: 13px; color: var(--text-muted); margin-top: 4px; letter-spacing: 1px; }

  .btn {
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1px;
    transition: all 0.2s;
  }

  .btn-gold {
    background: linear-gradient(135deg, var(--gold-dark), var(--gold));
    color: var(--black);
  }
  .btn-gold:hover { opacity: 0.9; transform: translateY(-1px); }

  .btn-outline {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-muted);
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }

  /* Stats */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }

  .stat-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--gold-dark), var(--gold));
  }

  .stat-label { font-size: 11px; color: var(--text-muted); letter-spacing: 2px; text-transform: uppercase; }
  .stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px; font-weight: 300;
    color: var(--gold); margin: 8px 0 4px;
    line-height: 1;
  }
  .stat-change { font-size: 12px; color: var(--green); }

  /* Rooms Grid */
  .rooms-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .room-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
  }

  .room-card:hover { border-color: var(--gold); transform: translateY(-2px); }

  .room-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .room-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 300; color: var(--gold);
  }

  .status-badge {
    padding: 4px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
  }
  .status-available { background: rgba(76, 175, 130, 0.15); color: var(--green); }
  .status-occupied { background: rgba(224, 82, 82, 0.15); color: var(--red); }
  .status-maintenance { background: rgba(224, 162, 82, 0.15); color: var(--amber); }

  .room-type { font-size: 14px; color: var(--text); margin-bottom: 4px; }
  .room-details { font-size: 12px; color: var(--text-muted); }
  .room-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; color: var(--gold-light);
    margin-top: 12px;
  }
  .room-price span { font-size: 12px; color: var(--text-muted); font-family: 'Jost', sans-serif; }

  /* Table */
  .table-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
  }

  .table-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
  }

  .table-title { font-size: 16px; font-weight: 500; letter-spacing: 0.5px; }

  table { width: 100%; border-collapse: collapse; }
  th {
    padding: 12px 24px;
    text-align: left;
    font-size: 11px; font-weight: 500;
    color: var(--text-muted); letter-spacing: 2px; text-transform: uppercase;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
  }

  td {
    padding: 16px 24px;
    font-size: 14px;
    border-bottom: 1px solid var(--border);
  }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--surface2); }

  .guest-name { font-weight: 500; }
  .guest-room {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; color: var(--gold);
  }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.8);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }

  .modal {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 32px;
    width: 480px;
    max-width: 90vw;
  }

  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 300;
    color: var(--gold); margin-bottom: 24px;
  }

  .form-group { margin-bottom: 16px; }
  .form-label { font-size: 11px; color: var(--text-muted); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; display: block; }

  .form-input {
    width: 100%; padding: 12px 16px;
    background: var(--surface2); border: 1px solid var(--border);
    border-radius: 8px; color: var(--text);
    font-family: 'Jost', sans-serif; font-size: 14px;
    outline: none; transition: border-color 0.2s;
  }

  .form-input:focus { border-color: var(--gold); }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .modal-actions { display: flex; gap: 12px; margin-top: 24px; justify-content: flex-end; }

  /* Search */
  .search-bar {
    display: flex; gap: 12px; margin-bottom: 24px;
  }

  .search-input {
    flex: 1; padding: 10px 16px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; color: var(--text);
    font-family: 'Jost', sans-serif; font-size: 14px;
    outline: none;
  }

  .search-input:focus { border-color: var(--gold); }

  .filter-btn {
    padding: 10px 16px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 8px; color: var(--text-muted);
    cursor: pointer; font-size: 13px; font-family: 'Jost', sans-serif;
    transition: all 0.2s;
  }

  .filter-btn.active { border-color: var(--gold); color: var(--gold); background: rgba(201,168,76,0.1); }
  .filter-btn:hover { border-color: var(--gold); color: var(--gold); }

  /* Dashboard specific */
  .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .recent-activity { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
  .activity-title { font-size: 15px; font-weight: 500; margin-bottom: 20px; color: var(--text); }

  .activity-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 0; border-bottom: 1px solid var(--border);
  }
  .activity-item:last-child { border-bottom: none; }

  .activity-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
  }

  .activity-text { font-size: 13px; color: var(--text-muted); flex: 1; }
  .activity-time { font-size: 11px; color: var(--text-muted); }

  .occupancy-bar {
    height: 6px; background: var(--surface2); border-radius: 3px; margin-top: 8px; overflow: hidden;
  }
  .occupancy-fill {
    height: 100%; border-radius: 3px;
    background: linear-gradient(90deg, var(--gold-dark), var(--gold));
  }

  .section-divider {
    display: flex; align-items: center; gap: 16px; margin-bottom: 24px;
  }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-text { font-size: 11px; color: var(--text-muted); letter-spacing: 2px; text-transform: uppercase; }
`;

export default function HotelManagement() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [guests, setGuests] = useState(initialGuests);
  const [roomFilter, setRoomFilter] = useState("all");
  const [searchGuest, setSearchGuest] = useState("");
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newGuest, setNewGuest] = useState({ name: "", room: "", checkIn: "", checkOut: "", amount: "" });

  const availableRooms = rooms.filter(r => r.status === "available").length;
  const occupiedRooms = rooms.filter(r => r.status === "occupied").length;
  const totalRevenue = guests.filter(g => g.status === "checked-in").reduce((s, g) => s + g.amount, 0);
  const occupancyRate = Math.round((occupiedRooms / rooms.length) * 100);

  const filteredRooms = rooms.filter(r => roomFilter === "all" || r.status === roomFilter);
  const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(searchGuest.toLowerCase()));

  const handleCheckIn = () => {
    if (!newGuest.name || !newGuest.room || !newGuest.checkIn || !newGuest.checkOut) return;
    setGuests([...guests, {
      id: guests.length + 1,
      name: newGuest.name,
      room: parseInt(newGuest.room),
      checkIn: newGuest.checkIn,
      checkOut: newGuest.checkOut,
      status: "checked-in",
      amount: parseInt(newGuest.amount) || 0
    }]);
    setShowCheckIn(false);
    setNewGuest({ name: "", room: "", checkIn: "", checkOut: "", amount: "" });
  };

  const handleCheckOut = (id) => {
    setGuests(guests.map(g => g.id === id ? { ...g, status: "checked-out" } : g));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-title">Grandeur</div>
            <div className="logo-sub">Hotel & Resorts</div>
          </div>
          <nav className="nav">
            {[
              { id: "dashboard", icon: "◈", label: "Dashboard" },
              { id: "rooms", icon: "⊞", label: "Rooms" },
              { id: "guests", icon: "⊹", label: "Guests" },
              { id: "reservations", icon: "◷", label: "Reservations" },
            ].map(item => (
              <button key={item.id} className={`nav-item ${activeTab === item.id ? "active" : ""}`} onClick={() => setActiveTab(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="admin-info">
              <div className="admin-avatar">R</div>
              <div>
                <div className="admin-name">Raj Kumar</div>
                <div className="admin-role">MANAGER</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main">

          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Good Morning, Raj</h1>
                  <p className="page-subtitle">THURSDAY, MARCH 27, 2026</p>
                </div>
                <button className="btn btn-gold" onClick={() => setShowCheckIn(true)}>+ New Check-In</button>
              </div>

              <div className="stats-grid">
                {[
                  { label: "Available Rooms", value: availableRooms, change: "↑ 3 from yesterday" },
                  { label: "Occupied Rooms", value: occupiedRooms, change: `${occupancyRate}% occupancy` },
                  { label: "Today's Revenue", value: `$${totalRevenue.toLocaleString()}`, change: "↑ 12% this week" },
                  { label: "Active Guests", value: guests.filter(g => g.status === "checked-in").length, change: "↑ 2 check-ins today" },
                ].map((s, i) => (
                  <div className="stat-card" key={i}>
                    <div className="stat-label">{s.label}</div>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-change">{s.change}</div>
                  </div>
                ))}
              </div>

              <div className="dashboard-grid">
                <div className="recent-activity">
                  <div className="activity-title">Recent Activity</div>
                  {[
                    { color: "#4CAF82", text: "Alexandra Chen checked into Room 102", time: "2h ago" },
                    { color: "#E05252", text: "James Okafor checked out from Room 105", time: "4h ago" },
                    { color: "#C9A84C", text: "Room 201 entered maintenance mode", time: "6h ago" },
                    { color: "#4CAF82", text: "Sofia Laurent checked into Room 302", time: "8h ago" },
                    { color: "#4CAF82", text: "Marcus Williams checked into Room 203", time: "10h ago" },
                  ].map((a, i) => (
                    <div className="activity-item" key={i}>
                      <div className="activity-dot" style={{ background: a.color }}></div>
                      <div className="activity-text">{a.text}</div>
                      <div className="activity-time">{a.time}</div>
                    </div>
                  ))}
                </div>

                <div className="recent-activity">
                  <div className="activity-title">Room Occupancy by Type</div>
                  {[
                    { type: "Presidential Suite", total: 2, occupied: 1 },
                    { type: "Deluxe Suite", total: 3, occupied: 1 },
                    { type: "Junior Suite", total: 2, occupied: 1 },
                    { type: "Standard Room", total: 2, occupied: 1 },
                  ].map((r, i) => (
                    <div key={i} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13 }}>{r.type}</span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{r.occupied}/{r.total}</span>
                      </div>
                      <div className="occupancy-bar">
                        <div className="occupancy-fill" style={{ width: `${(r.occupied / r.total) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Rooms */}
          {activeTab === "rooms" && (
            <>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Room Management</h1>
                  <p className="page-subtitle">{rooms.length} TOTAL ROOMS</p>
                </div>
              </div>

              <div className="search-bar">
                {["all", "available", "occupied", "maintenance"].map(f => (
                  <button key={f} className={`filter-btn ${roomFilter === f ? "active" : ""}`} onClick={() => setRoomFilter(f)}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <div className="rooms-grid">
                {filteredRooms.map(room => (
                  <div className="room-card" key={room.id} onClick={() => setSelectedRoom(room)}>
                    <div className="room-header">
                      <div className="room-number">{room.id}</div>
                      <div className={`status-badge status-${room.status}`}>{room.status}</div>
                    </div>
                    <div className="room-type">{room.type}</div>
                    <div className="room-details">{room.beds} Bed{room.beds > 1 ? "s" : ""} · {room.view} View · Floor {room.floor}</div>
                    <div className="room-price">${room.price} <span>/ night</span></div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Guests */}
          {activeTab === "guests" && (
            <>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Guest Registry</h1>
                  <p className="page-subtitle">{guests.filter(g => g.status === "checked-in").length} ACTIVE GUESTS</p>
                </div>
                <button className="btn btn-gold" onClick={() => setShowCheckIn(true)}>+ Check In Guest</button>
              </div>

              <div className="search-bar">
                <input className="search-input" placeholder="Search guests..." value={searchGuest} onChange={e => setSearchGuest(e.target.value)} />
              </div>

              <div className="table-card">
                <table>
                  <thead>
                    <tr>
                      <th>Guest Name</th>
                      <th>Room</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGuests.map(guest => (
                      <tr key={guest.id}>
                        <td><div className="guest-name">{guest.name}</div></td>
                        <td><div className="guest-room">{guest.room}</div></td>
                        <td>{guest.checkIn}</td>
                        <td>{guest.checkOut}</td>
                        <td style={{ color: "var(--gold)" }}>${guest.amount.toLocaleString()}</td>
                        <td><div className={`status-badge status-${guest.status === "checked-in" ? "available" : "occupied"}`}>{guest.status}</div></td>
                        <td>
                          {guest.status === "checked-in" && (
                            <button className="btn btn-outline" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => handleCheckOut(guest.id)}>
                              Check Out
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Reservations */}
          {activeTab === "reservations" && (
            <>
              <div className="page-header">
                <div>
                  <h1 className="page-title">Reservations</h1>
                  <p className="page-subtitle">UPCOMING & ACTIVE BOOKINGS</p>
                </div>
                <button className="btn btn-gold" onClick={() => setShowCheckIn(true)}>+ New Reservation</button>
              </div>

              <div className="table-card">
                <div className="table-header">
                  <div className="table-title">All Reservations</div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Guest</th>
                      <th>Room</th>
                      <th>Check In</th>
                      <th>Check Out</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map(guest => (
                      <tr key={guest.id}>
                        <td style={{ color: "var(--text-muted)", fontFamily: "monospace" }}>#{String(guest.id).padStart(4, "0")}</td>
                        <td><div className="guest-name">{guest.name}</div></td>
                        <td><div className="guest-room">{guest.room}</div></td>
                        <td>{guest.checkIn}</td>
                        <td>{guest.checkOut}</td>
                        <td style={{ color: "var(--gold)" }}>${guest.amount.toLocaleString()}</td>
                        <td><div className={`status-badge status-${guest.status === "checked-in" ? "available" : "occupied"}`}>{guest.status}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </main>

        {/* Check In Modal */}
        {showCheckIn && (
          <div className="modal-overlay" onClick={() => setShowCheckIn(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">New Check-In</div>
              <div className="form-group">
                <label className="form-label">Guest Name</label>
                <input className="form-input" placeholder="Full name" value={newGuest.name} onChange={e => setNewGuest({ ...newGuest, name: e.target.value })} />
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Room Number</label>
                  <input className="form-input" placeholder="e.g. 101" value={newGuest.room} onChange={e => setNewGuest({ ...newGuest, room: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Total Amount ($)</label>
                  <input className="form-input" placeholder="0" value={newGuest.amount} onChange={e => setNewGuest({ ...newGuest, amount: e.target.value })} />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Check In Date</label>
                  <input className="form-input" type="date" value={newGuest.checkIn} onChange={e => setNewGuest({ ...newGuest, checkIn: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Check Out Date</label>
                  <input className="form-input" type="date" value={newGuest.checkOut} onChange={e => setNewGuest({ ...newGuest, checkOut: e.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={() => setShowCheckIn(false)}>Cancel</button>
                <button className="btn btn-gold" onClick={handleCheckIn}>Confirm Check-In</button>
              </div>
            </div>
          </div>
        )}

        {/* Room Detail Modal */}
        {selectedRoom && (
          <div className="modal-overlay" onClick={() => setSelectedRoom(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-title">Room {selectedRoom.id}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[
                  { label: "Type", value: selectedRoom.type },
                  { label: "Status", value: selectedRoom.status },
                  { label: "Floor", value: selectedRoom.floor },
                  { label: "Beds", value: selectedRoom.beds },
                  { label: "View", value: selectedRoom.view },
                  { label: "Price", value: `$${selectedRoom.price}/night` },
                ].map((d, i) => (
                  <div key={i} style={{ background: "var(--surface2)", padding: 16, borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{d.label}</div>
                    <div style={{ fontSize: 15, color: "var(--gold)" }}>{d.value}</div>
                  </div>
                ))}
              </div>
              <div className="modal-actions">
                <button className="btn btn-outline" onClick={() => setSelectedRoom(null)}>Close</button>
                {selectedRoom.status === "available" && (
                  <button className="btn btn-gold" onClick={() => { setSelectedRoom(null); setNewGuest({ ...newGuest, room: selectedRoom.id }); setShowCheckIn(true); }}>
                    Check In Guest
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
