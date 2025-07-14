import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
 
const statusColors = {
  "Completed": "bg-blue-500",
  "On Track": "bg-green-500",
  "At Risk": "bg-yellow-400",
  "Delayed": "bg-red-500",
  "Not Started": "bg-gray-400"
};
 
const Overview = () => {
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const sprintChartRef = useRef(null);
  const [filters, setFilters] = useState({
    bank: "Sterling Bank",
    art: "Integration & Partnership",
    sprint: "Sprint 18",
    options: {
      bank: ["Sterling Bank", "TAB", "Peerless", "GoMoney"],
      art: ["Integration & Partnership", "Back Office", "Digital Channels"],
      sprint: ["Sprint 18", "Sprint 19", "Sprint 20"]
    }
  });
  const [overviewData, setOverviewData] = useState(null);
  const [topWorkItems, setTopWorkItems] = useState([]);
  const [velocity, setVelocity] = useState([]);
 
 
 
 
 
useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    let chartInstance = null;
 
    if (sprintChartRef.current) {
      chartInstance = new Chart(sprintChartRef.current, {
        type: 'pie',
        data: {
          labels: ['Sprint 11', 'Sprint 12', 'Sprint 13', 'Sprint 14', 'Sprint 15'],
          datasets: [{
            label: 'Performance',
            data: [20, 50, 30, 70, 100],
            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#6366f1']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
 
    setOverviewData({
      totalWorkItems: 1578,
      completionRate: 10,
      progressPercent: 78,
      breakdown: [
        { label: "Not Started", value: 130, color: "gray" },
        { label: "On Track", value: 134, color: "green" },
        { label: "Completed", value: 1234, color: "blue" },
        { label: "At Risk", value: 140, color: "yellow" },
        { label: "Delayed", value: 214, color: "red" }
      ]
    });
 
    setTopWorkItems([
      { sn: 1, item: "Onboarding Middleware", owner: "Adeyemi Salisu", status: "Completed", date: "12/08/2023" },
      { sn: 2, item: "NQR Payment Integration", owner: "Bolanie Tyson", status: "Completed", date: "12/08/2023" },
      { sn: 3, item: "DINS (Deferred Interbank)", owner: "Chibuzor Ezeh", status: "At Risk", date: "12/08/2023" },
      { sn: 4, item: "Virtual Account API Expansion", owner: "Valentina Atewogbade", status: "On Track", date: "12/08/2023" },
      { sn: 5, item: "Onboarding Middleware", owner: "Adeyemi Salisu", status: "Delayed", date: "12/08/2023" },
      { sn: 6, item: "DINS (Deferred Interbank)", owner: "Adeyemi Salisu", status: "Not Started", date: "12/08/2023" }
    ]);
 
    setVelocity([
      { name: "Integration & Partnership", hrs: 65 },
      { name: "Digital Channels", hrs: 32 },
      { name: "Digital Channels (Alpha)", hrs: 40 },
      { name: "BackOffice", hrs: 48 },
      { name: "Digital Lending", hrs: 60 },
      { name: "Investment Solutions", hrs: 36 },
      { name: "Productivity and Automation", hrs: 30 },
      { name: "Core Banking Team Project", hrs: 20 },
      { name: "Data Engineering", hrs: 30 },
      { name: "CX Project Management", hrs: 30 },
      { name: "H.E.A.R.T.", hrs: 30 }
    ]);
 
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);
 
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
 
  if (!overviewData) return <div className="p-6">Loading...</div>;
 
  return (
    <>
      <div className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-red-600 px-4">● Sterling</div>
        <div className="space-x-6">
          <a href="#" className="hover:underline"><span className="font-bold">Davis Uche</span> - Admin</a>
        </div>
      </div>
      <div className="flex h-screen bg-gray-50">
        <aside className="w-54 bg-white border-r p-0 space-y-4">
          <nav className="space-y-2 text-sm mt-6 [&>*]:py-[10px]">
            <div className="text-red-600 font-bold bg-red-100 px-4 border-r-4 border-red-500">⊛ Overview</div>
            <div className="px-4">⅏ Product Workstream</div>
            <div className="px-4">⁂ User Story Level</div>
            <div className="px-4">⊛ Engr. Performance</div>
            <div className="px-4">⛤ Engr. Delvy Quotient</div>
            <div className="px-4">⇪ Priority Workstream</div>
          </nav>
          <button className="text-sm text-red-500 mt-10 px-4">⎋ Log Out</button>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-2">
            <h1 className="text-xl font-bold">Overview</h1>
          </div>
 
          <div className="flex flex-wrap items-center gap-3 mb-4 bg-white border-y py-4 px-4">
            Bank:
            <select className="border rounded px-2 py-2 text-m" value={filters.bank} onChange={(e) => handleFilterChange("bank", e.target.value)}>
              {filters.options.bank.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            ART:
            <select className="border rounded px-2 py-2 text-m" value={filters.art} onChange={(e) => handleFilterChange("art", e.target.value)}>
              {filters.options.art.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            Sprint:
            <select className="border rounded px-2 py-2 text-m" value={filters.sprint} onChange={(e) => handleFilterChange("sprint", e.target.value)}>
              {filters.options.sprint.map(opt => <option key={opt}>{opt}</option>)}
            </select>
 
            
          <div className="relative" ref={dropdownRef}>
            <button className="ml-1 px-4 py-2" onClick={() => setShowDropdown(!showDropdown)}>
              Download Report ⇩
            </button>
 
            {showDropdown && (
              <div className="absolute mt-1 w-32 bg-white border rounded-lg shadow-md z-10">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob([
                      `Report for ${filters.bank}, ${filters.art}, ${filters.sprint}, ${filters.status}`
                    ], { type: 'application/pdf' });
                    element.href = URL.createObjectURL(file);
                    element.download = "report.pdf";
                    document.body.appendChild(element);
                    element.click();
                    setShowDropdown(false);
                  }}>
                  PDF
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5V9h5.5L13 3.5z" />
                  </svg>
                </button>
 
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    const csvContent = `Bank,ART,Sprint,Status\n${filters.bank},${filters.art},${filters.sprint},${filters.status}`;
                    const element = document.createElement("a");
                    const file = new Blob([csvContent], { type: 'text/csv' });
                    element.href = URL.createObjectURL(file);
                    element.download = "report.csv";
                    document.body.appendChild(element);
                    element.click();
                    setShowDropdown(false);
                  }}>
                  CSV
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-2.5 14h-2v-4h-1v4h-2v-6h2v1h1v-1h2v6z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
 
            
          </div>
 
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 space-y-4">
              <div className="bg-white rounded-[10px] p-4 border">
                <h2 className="font-bold text-lg mb-1">Product Workstream Overview</h2>
                <p className="text-m">Total Workitems</p>
                <p className="text-2xl font-bold">{overviewData.totalWorkItems}</p>
                <p className="text-m text-black-600">Completion rate <span className="text-green-700">⇧{overviewData.completionRate}%</span></p>
                <div className="w-full bg-gray-200 h-4 my-2 rounded-full flex overflow-hidden">
                  {overviewData.breakdown.map(({ label, value, color }) => {
                    const total = overviewData.breakdown.reduce((acc, item) => acc + item.value, 0);
                    const percent = (value / total) * 100;
                    return (
                      <div
                        key={label}
                        className={`h-full ${statusColors[label]} text-xs`}
                        style={{ width: `${percent}%` }}
                        title={`${label}: ${value}`}
                      />
                    );
                  })}
                </div>
                <div className="grid grid-cols-5 text-xs text-center">
                  {overviewData.breakdown.map(({ label, value, color }) => {
                    const total = overviewData.breakdown.reduce((acc, item) => acc + item.value, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return (
                      <div key={label}>
                        <span className={`text-${color}-500`}> ● </span> {label}<br />
                        <strong>{value}</strong><br />
                        <span className={`text-${color}-500`}>+{percentage}% </span>vs prev. sprint
                      </div>
                    );
                  })}
                </div>
              </div>
 
              <div className="bg-white rounded-[10px] p-4 border">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">Top Priority Work Items</h3>
                  <button className="text-s text-black-600 border px-3">View More →</button>
                </div>
                <table className="w-full text-s border-separate border-spacing-y-2 [&>tbody>tr>*]:py-[10px] [&>tbody>tr]:border-b">
                  <thead className="text-left bg-gray-200 text-sm [&>tr>*]:py-[10px]">
                    <tr><th>SN</th><th>Work Item</th><th>Prod. Owner</th><th>Status</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {topWorkItems.map(({ sn, item, owner, status, date }) => (
                      <tr key={sn}>
                        <td>{sn}</td>
                        <td>{item}</td>
                        <td>{owner}</td>
                        <td className="text-xs">
                          <span className={`text-white px-2 py-1 rounded ${statusColors[status]}`}>{status}</span>
                        </td>
                        <td>{date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
 
            <div>
              <div className="bg-white rounded-[10px] p-4 border">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">ART Velocity</h3>
                  <select className="text-s border rounded px-2 py-1">
                    <option>Hours</option>
                    <option>Work Item</option>
                  </select>
                </div>
                <ul className="space-y-6 text-m mt-3">
                  {velocity.map(({ name, hrs }) => (
                    <li key={name} className="flex justify-between">
                      <span>{name}</span>
                      <span className="bg-gray-200 px-1 rounded">⏱ {hrs}hrs</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
 
          <div className="mt-6 bg-white p-4 rounded-[10px] border h-[300px]">
            <h3 className="text-lg font-semibold mb-2">Sprint Performance History</h3>
            <canvas ref={sprintChartRef} className="w-full"></canvas>
          </div>
        </main>
      </div>
    </>
  );
};
 
export default Overview;
has context menu