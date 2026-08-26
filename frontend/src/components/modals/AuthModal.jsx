import React, { useState } from 'react';
import { X, User, Mail, Lock, Sparkles, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { authApi } from '../../api/services';
import './AuthModal.css';

export default function AuthModal({ onClose, onLogin, currentUser, onLogout }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Verified Room Seeker');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      let res;
      if (isSignUp) {
        res = await authApi.register({
          name: name.trim() || 'Room Seeker',
          email: email.trim(),
          password: password.trim(),
          role
        });
      } else {
        res = await authApi.login({
          email: email.trim(),
          password: password.trim()
        });
      }

      if (res.user) {
        onLogin(res.user);
        onClose();
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (type) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await authApi.demoLogin(type);
      if (res.user) {
        onLogin(res.user);
        onClose();
      }
    } catch (err) {
      // Fallback local demo login if offline
      const fallbackUser = type === 'owner' ? {
        id: 'user-owner-1',
        name: 'Vikram Mehta (Owner)',
        email: 'vikram.mehta@example.com',
        role: 'Property Owner',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
      } : {
        id: 'user-seeker-1',
        name: 'Rahul Sharma (Room Seeker)',
        email: 'rahul.sharma@example.com',
        role: 'Verified Room Seeker',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
      };
      onLogin(fallbackUser);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rf-modal-overlay" onClick={onClose}>
      <div className="rf-modal-content rf-auth-modal animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="rf-modal-header">
          <div className="rf-auth-header-title">
            <User size={18} className="rf-auth-icon" />
            <div>
              <h3>{currentUser ? 'Your Profile' : isSignUp ? 'Create RoomFinder Account' : 'Welcome Back'}</h3>
              <p>{currentUser ? 'Manage your searches and saved listings' : 'Save favorites, chat with owners & schedule visits'}</p>
            </div>
          </div>
          <button className="rf-modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="rf-auth-body">
          {errorMessage && (
            <div className="rf-auth-error-banner animate-fade-in" style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '14px'
            }}>
              {errorMessage}
            </div>
          )}

          {currentUser ? (
            <div className="rf-auth-profile-view">
              <img src={currentUser.avatar} alt={currentUser.name} className="rf-auth-big-avatar" />
              <h4>{currentUser.name}</h4>
              <p className="rf-auth-email">{currentUser.email}</p>
              <span className="rf-badge rf-badge-emerald">
                <ShieldCheck size={12} />
                <span>{currentUser.role}</span>
              </span>

              <div className="rf-auth-stats-row">
                <div className="rf-auth-stat">
                  <strong>{currentUser.stats?.savedRooms ?? (currentUser.savedRoomIds?.length || 0)}</strong>
                  <span>Saved Rooms</span>
                </div>
                <div className="rf-auth-stat">
                  <strong>{currentUser.stats?.visitsBooked ?? 2}</strong>
                  <span>Visits Booked</span>
                </div>
                <div className="rf-auth-stat">
                  <strong>{currentUser.stats?.listedRooms ?? (currentUser.role?.includes('Owner') ? 2 : 0)}</strong>
                  <span>Listed Rooms</span>
                </div>
              </div>

              <button className="rf-btn rf-btn--login rf-btn--block" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          ) : (
            <>
              {/* Quick Demo Logins */}
              <div className="rf-auth-demo-box">
                <span className="rf-demo-title">⚡ 1-Click Quick Demo Login (Connected to REST API):</span>
                <div className="rf-demo-btn-group">
                  <button className="rf-demo-btn" onClick={() => handleQuickDemoLogin('seeker')} disabled={isLoading}>
                    <span>Login as <strong>Room Seeker</strong></span>
                  </button>
                  <button className="rf-demo-btn" onClick={() => handleQuickDemoLogin('owner')} disabled={isLoading}>
                    <span>Login as <strong>Property Owner</strong></span>
                  </button>
                </div>
              </div>

              <div className="rf-auth-divider">
                <span>or continue with email & password</span>
              </div>

              <form onSubmit={handleFormSubmit} className="rf-auth-form">
                {isSignUp && (
                  <>
                    <div className="rf-form-group">
                      <label>Full Name</label>
                      <div className="rf-input-icon-wrap">
                        <User size={15} />
                        <input
                          type="text"
                          placeholder="e.g. Sneha Roy"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="rf-form-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="rf-form-group">
                      <label>I am a</label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="rf-form-select"
                      >
                        <option value="Verified Room Seeker">Room Seeker / Flatmate Seeker</option>
                        <option value="Property Owner (Superhost)">Property Owner / Landlord</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="rf-form-group">
                  <label>Email Address</label>
                  <div className="rf-input-icon-wrap">
                    <Mail size={15} />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rf-form-input"
                      required
                    />
                  </div>
                </div>

                <div className="rf-form-group">
                  <label>Password</label>
                  <div className="rf-input-icon-wrap">
                    <Lock size={15} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rf-form-input"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="rf-btn rf-btn--post rf-btn--block" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>{isSignUp ? 'Create Free Account' : 'Sign In'}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="rf-auth-toggle-row">
                {isSignUp ? (
                  <p>
                    Already have an account?{' '}
                    <button type="button" className="rf-auth-link" onClick={() => { setIsSignUp(false); setErrorMessage(''); }}>
                      Sign In
                    </button>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{' '}
                    <button type="button" className="rf-auth-link" onClick={() => { setIsSignUp(true); setErrorMessage(''); }}>
                      Sign Up (Free)
                    </button>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
