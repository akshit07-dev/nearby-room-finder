import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MapPin, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Phone, 
  Check, 
  Heart, 
  Sparkles, 
  Filter,
  Loader2,
  Plus
} from 'lucide-react';
import { MOCK_FLATMATES } from '../../data/mockFlatmates';
import { flatmateApi } from '../../api/services';
import './FlatmateFinder.css';

export default function FlatmateFinder({ onConnectFlatmate }) {
  const [flatmates, setFlatmates] = useState(MOCK_FLATMATES);
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState('All');
  const [activeTag, setActiveTag] = useState('All');

  const filterTags = ['All', 'Non-Smoker', 'Pet Friendly', 'Early Riser', 'Female Only', 'Work From Home', 'Fitness Fanatic'];

  useEffect(() => {
    let isMounted = true;
    const fetchMates = async () => {
      setLoading(true);
      try {
        const res = await flatmateApi.getAll({
          gender: selectedGender,
          tag: activeTag
        });
        if (isMounted && res.data) {
          setFlatmates(res.data);
        }
      } catch (err) {
        // Fallback local filtering if offline
        if (isMounted) {
          const fallback = MOCK_FLATMATES.filter((mate) => {
            if (selectedGender !== 'All' && mate.gender !== selectedGender) return false;
            if (activeTag !== 'All' && !mate.tags?.includes(activeTag)) return false;
            return true;
          });
          setFlatmates(fallback);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMates();
    return () => { isMounted = false; };
  }, [selectedGender, activeTag]);

  return (
    <div className="rf-flatmates-page animate-fade-in">
      {/* Header Banner */}
      <div className="rf-flatmates-hero">
        <div className="rf-flatmates-hero__inner">
          <span className="rf-badge rf-badge-blue">
            <Users size={12} />
            <span>Roommate & Flatmate Matching (REST API)</span>
          </span>
          <h2 className="rf-flatmates-heading">
            Find Compatible Flatmates <span className="rf-text-gradient">Near You</span>
          </h2>
          <p className="rf-flatmates-sub">
            Connect with verified working professionals and students looking to share 2 & 3 BHK flats in top localities.
          </p>

          {/* Filters Row */}
          <div className="rf-flatmates-filters">
            <div className="rf-flatmates-gender-group">
              {['All', 'Male', 'Female'].map((g) => (
                <button
                  key={g}
                  className={`rf-mate-filter-btn ${selectedGender === g ? 'active' : ''}`}
                  onClick={() => setSelectedGender(g)}
                >
                  {g === 'All' ? 'All Genders' : `${g} Seekers`}
                </button>
              ))}
            </div>

            <div className="rf-flatmates-tag-list">
              {filterTags.map((tag) => (
                <button
                  key={tag}
                  className={`rf-mate-tag-chip ${activeTag === tag ? 'active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Flatmate Cards */}
      <div className="rf-flatmates-grid-wrap">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 12px' }} />
            <p>Loading matching flatmate seekers...</p>
          </div>
        ) : flatmates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <p>No flatmate seekers match the selected filters.</p>
            <button
              className="rf-btn rf-btn--login"
              style={{ marginTop: '12px' }}
              onClick={() => { setSelectedGender('All'); setActiveTag('All'); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="rf-flatmates-grid">
            {flatmates.map((mate) => (
              <div key={mate.id} className="rf-mate-card">
                {/* Top Banner */}
                <div className="rf-mate-card__header">
                  <img src={mate.avatar} alt={mate.name} className="rf-mate-avatar" />
                  <div className="rf-mate-info">
                    <div className="rf-mate-name-row">
                      <h3 className="rf-mate-name">{mate.name}, {mate.age}</h3>
                      <span className="rf-badge rf-badge-emerald">Verified</span>
                    </div>
                    <p className="rf-mate-occ">{mate.occupation}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="rf-mate-card__body">
                  <div className="rf-mate-metric-row">
                    <div className="rf-mate-metric">
                      <span className="rf-metric-label">Target Budget</span>
                      <strong className="rf-metric-val">{mate.budget}</strong>
                    </div>
                    <div className="rf-mate-metric">
                      <span className="rf-metric-label">Looking In</span>
                      <strong className="rf-metric-val">{mate.targetLocality}</strong>
                    </div>
                  </div>

                  <p className="rf-mate-about">"{mate.about}"</p>

                  {/* Lifestyle Tags */}
                  <div className="rf-mate-tags">
                    {mate.tags?.map((t, idx) => (
                      <span key={idx} className="rf-mate-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="rf-mate-card__footer">
                  <a
                    href={`https://wa.me/${mate.contact?.whatsapp?.replace(/[^0-9]/g, '') || '919876543210'}?text=Hi%20${encodeURIComponent(mate.name)},%20I%20saw%20your%20flatmate%20profile%20on%20RoomFinder!`}
                    target="_blank"
                    rel="noreferrer"
                    className="rf-btn rf-btn--post rf-btn--block"
                    onClick={() => onConnectFlatmate && onConnectFlatmate(mate.name)}
                  >
                    <MessageSquare size={14} />
                    <span>Connect & Chat</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
