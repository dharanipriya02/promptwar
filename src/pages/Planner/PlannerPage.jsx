import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  Sparkles, 
  ArrowLeft, 
  Check,
  Plus,
  Trash2,
  Download,
  Share2,
  Luggage
} from 'lucide-react';
import { destinations, TRIP_TYPES } from '../../data/destinations';
import { generateItinerary, PACKING_PRESETS } from '../../data/itineraryTemplates';
import { useTrips } from '../../context/TripContext';
import { trackEvent } from '../../lib/analytics';

function PlannerPage() {
  const { dispatch } = useTrips();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Selection state
  const [selectedDest, setSelectedDest] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tripType, setTripType] = useState('city');
  const [tripName, setTripName] = useState('');
  
  // Results state
  const [generatedTrip, setGeneratedTrip] = useState(null);

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerate = () => {
    if (!selectedDest || !startDate || !endDate) return;
    
    setLoading(true);
    trackEvent('generate_itinerary', { destination: selectedDest.name, type: tripType });

    // Calculate duration
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Simulate AI generation time
    setTimeout(() => {
      const itinerary = generateItinerary(selectedDest, diffDays, tripType);
      const newTrip = {
        name: tripName || `Trip to ${selectedDest.name}`,
        destinationId: selectedDest.id,
        destinationName: selectedDest.name,
        country: selectedDest.country,
        imageUrl: selectedDest.imageUrl,
        startDate,
        endDate,
        tripType,
        itinerary,
        packingList: PACKING_PRESETS[tripType] || []
      };
      
      setGeneratedTrip(newTrip);
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const handleSave = () => {
    dispatch({ type: 'ADD_TRIP', payload: generatedTrip });
    window.location.hash = 'trips';
  };

  return (
    <div className="planner-page container">
      {/* Step Indicator */}
      <div className="step-indicator">
        {[1, 2, 3].map(s => (
          <div key={s} className={`step-dot ${step === s ? 'active' : ''} ${step > s ? 'done' : ''}`}>
            {step > s ? <Check size={14} /> : s}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="step-content">
          <div className="hero-text">
            <h1 className="step-title">Where to <span className="gradient-text">Next?</span></h1>
            <p className="step-subtitle">Select your destination and travel dates to begin.</p>
          </div>

          <div className="planner-form glass">
            <div className="form-group">
              <label>Destination</label>
              <div className="search-wrapper">
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search city or country..." 
                  value={selectedDest ? selectedDest.name : searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedDest(null);
                  }}
                  className="input-field"
                />
                {searchQuery && !selectedDest && (
                  <div className="search-dropdown glass">
                    {filteredDestinations.map(d => (
                      <button key={d.id} className="dropdown-item" onClick={() => setSelectedDest(d)}>
                        <MapPin size={14} />
                        <span>{d.name}, {d.country}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="date-row">
              <div className="form-group">
                <label>Start Date</label>
                <div className="input-wrapper">
                  <CalendarIcon size={18} className="icon" />
                  <input type="date" className="input-field" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>End Date</label>
                <div className="input-wrapper">
                  <CalendarIcon size={18} className="icon" />
                  <input type="date" className="input-field" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            </div>

            <button 
              className="btn btn-primary w-full btn-lg" 
              disabled={!selectedDest || !startDate || !endDate}
              onClick={() => setStep(2)}
            >
              Continue <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="step-content">
          <button className="back-btn" onClick={() => setStep(1)}><ArrowLeft size={18} /> Back</button>
          
          <div className="hero-text">
            <h1 className="step-title">Customize your <span className="gradient-text">Vibe</span></h1>
            <p className="step-subtitle">Help Wandr AI tailor the perfect experience for you.</p>
          </div>

          <div className="planner-form glass">
            <div className="form-group">
              <label>Trip Name (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. Summer in Europe" 
                className="input-field"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Trip Type</label>
              <div className="type-grid">
                {TRIP_TYPES.map(t => (
                  <button 
                    key={t.id} 
                    className={`type-card glass ${tripType === t.id ? 'active' : ''}`}
                    onClick={() => setTripType(t.id)}
                  >
                    <span className="type-icon">{t.icon}</span>
                    <span className="type-label">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="btn btn-primary w-full btn-lg generate-btn" 
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>Generating your masterpiece... <Sparkles className="animate-pulse" /></>
              ) : (
                <>Generate Itinerary <Sparkles size={18} /></>
              )}
            </button>
          </div>
        </div>
      )}

      {step === 3 && generatedTrip && (
        <div className="step-content results-view">
          <div className="results-header">
            <div className="trip-summary">
              <h1>{generatedTrip.name}</h1>
              <div className="meta">
                <span>{generatedTrip.destinationName}</span> • 
                <span>{new Date(generatedTrip.startDate).toLocaleDateString()} - {new Date(generatedTrip.endDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-ghost" onClick={() => setStep(2)}>Edit</button>
              <button className="btn btn-primary" onClick={handleSave}>Save Trip</button>
            </div>
          </div>

          <div className="itinerary-layout">
            <div className="itinerary-main">
              <h2 className="section-title">Your Day-by-Day Plan</h2>
              <div className="days-list">
                {generatedTrip.itinerary.map((day) => (
                  <div key={day.day} className="day-card glass">
                    <div className="day-header">
                      <h3>Day {day.day}</h3>
                    </div>
                    <div className="slots">
                      {['morning', 'afternoon', 'evening'].map(slot => (
                        <div key={slot} className="slot">
                          <span className="slot-time">{day[slot].time}</span>
                          <div className="slot-content">
                            <span className="slot-activity">{day[slot].activity}</span>
                            <span className="slot-duration">{day[slot].duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="itinerary-sidebar">
              <div className="sidebar-widget glass">
                <div className="widget-header">
                  <Luggage size={18} />
                  <h4>Packing List</h4>
                </div>
                <div className="packing-list">
                  {generatedTrip.packingList.map(item => (
                    <div key={item} className="packing-item">
                      <div className="checkbox"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-widget glass promo-sidebar">
                <h4>Export & Share</h4>
                <div className="promo-btns">
                  <button className="btn-ghost w-full btn-sm"><Download size={14} /> Save as PDF</button>
                  <button className="btn-ghost w-full btn-sm"><Share2 size={14} /> Invite Friends</button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}

      <style jsx>{`
        .planner-page {
          padding-top: var(--space-8);
          padding-bottom: var(--space-12);
        }

        .step-indicator {
          display: flex;
          justify-content: center;
          gap: var(--space-8);
          margin-bottom: var(--space-12);
          position: relative;
        }

        .step-indicator::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 1px;
          background: var(--glass-border);
          z-index: -1;
        }

        .step-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 2px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-xs);
          font-weight: 800;
          color: var(--text-muted);
          transition: all var(--transition-base);
        }

        .step-dot.active {
          border-color: var(--accent-violet);
          color: var(--accent-violet-light);
          box-shadow: var(--shadow-glow-violet);
          background: rgba(124, 58, 237, 0.1);
        }

        .step-dot.done {
          background: var(--accent-violet);
          border-color: var(--accent-violet);
          color: white;
        }

        .hero-text {
          text-align: center;
          margin-bottom: var(--space-12);
        }

        .step-title {
          font-size: var(--font-5xl);
          font-weight: 900;
          margin-bottom: var(--space-2);
        }

        .step-subtitle {
          color: var(--text-secondary);
          font-size: var(--font-lg);
        }

        .planner-form {
          max-width: 500px;
          margin: 0 auto;
          padding: var(--space-8);
        }

        .form-group {
          margin-bottom: var(--space-6);
          position: relative;
        }

        .form-group label {
          display: block;
          font-size: var(--font-xs);
          text-transform: uppercase;
          font-weight: 800;
          letter-spacing: 1px;
          color: var(--text-muted);
          margin-bottom: var(--space-2);
        }

        .search-wrapper, .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon, .icon {
          position: absolute;
          left: var(--space-4);
          color: var(--text-muted);
        }

        .input-field {
          padding-left: var(--space-12);
        }

        .search-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          max-height: 200px;
          overflow-y: auto;
          z-index: 10;
          padding: var(--space-2);
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          border-radius: var(--radius-md);
          font-size: var(--font-sm);
        }

        .dropdown-item:hover {
          background: var(--glass-bg-hover);
        }

        .date-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
        }

        .type-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
        }

        .type-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
          padding: var(--space-4) var(--space-2);
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);
        }

        .type-card:hover {
          background: var(--glass-bg-hover);
        }

        .type-card.active {
          border-color: var(--accent-violet);
          background: rgba(124, 58, 237, 0.1);
        }

        .type-icon {
          font-size: 24px;
        }

        .type-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-weight: 600;
          font-size: var(--font-sm);
          margin-bottom: var(--space-4);
        }

        .generate-btn {
          display: flex;
          gap: 8px;
        }

        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }

        /* Results View */
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: var(--space-12);
        }

        .trip-summary h1 {
          font-size: var(--font-4xl);
          font-weight: 900;
        }

        .meta {
          color: var(--text-muted);
          font-weight: 600;
        }

        .header-actions {
          display: flex;
          gap: var(--space-4);
        }

        .itinerary-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--space-10);
        }

        .days-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .day-card {
          padding: var(--space-6);
        }

        .day-header h3 {
          font-size: var(--font-lg);
          font-weight: 800;
          margin-bottom: var(--space-6);
          color: var(--accent-violet-light);
        }

        .slots {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .slot {
          display: flex;
          gap: var(--space-6);
          position: relative;
        }

        .slot:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 30px;
          top: 24px;
          bottom: -24px;
          width: 1px;
          background: var(--glass-border);
        }

        .slot-time {
          width: 60px;
          font-size: 10px;
          font-weight: 800;
          color: var(--text-muted);
          padding-top: 4px;
        }

        .slot-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .slot-activity {
          font-weight: 700;
          font-size: var(--font-base);
        }

        .slot-duration {
          font-size: 11px;
          color: var(--text-faint);
        }

        .itinerary-sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .widget-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: var(--space-4);
          color: var(--accent-cyan-light);
        }

        .packing-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .packing-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: var(--font-sm);
          color: var(--text-secondary);
        }

        .checkbox {
          width: 16px;
          height: 16px;
          border: 1px solid var(--glass-border);
          border-radius: 4px;
        }

        .promo-sidebar h4 {
          margin-bottom: var(--space-4);
        }

        .promo-btns {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        @media (max-width: 900px) {
          .itinerary-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default PlannerPage;
