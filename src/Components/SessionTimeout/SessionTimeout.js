import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SessionTimeout.css";

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
const INACTIVITY_LIMIT_MS = 13 * 60 * 1000;  // 13 minutes of inactivity
const WARNING_DURATION_MS = 2 * 60 * 1000;   // 2 minutes warning countdown

// ═══════════════════════════════════════════════════════════════════════════════
// SESSION TIMEOUT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const SessionTimeout = ({ isAuthenticated, onLogout }) => {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_DURATION_MS / 1000); // seconds

  const inactivityTimer = useRef(null);
  const countdownTimer = useRef(null);
  const logoutTimer = useRef(null);

  // ─── Clear all timers ───────────────────────────────────────────────────────
  const clearAllTimers = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
  }, []);

  // ─── Start the warning countdown ───────────────────────────────────────────
  const startWarningCountdown = useCallback(() => {
    setShowWarning(true);
    setCountdown(WARNING_DURATION_MS / 1000);

    // Tick the countdown every second
    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-logout after the warning duration
    logoutTimer.current = setTimeout(() => {
      clearAllTimers();
      setShowWarning(false);
      onLogout();
    }, WARNING_DURATION_MS);
  }, [clearAllTimers, onLogout]);

  // ─── Reset inactivity timer (called on any user activity) ──────────────────
  const resetInactivityTimer = useCallback(() => {
    // Only reset if the warning is NOT currently showing
    if (showWarning) return;

    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    inactivityTimer.current = setTimeout(() => {
      startWarningCountdown();
    }, INACTIVITY_LIMIT_MS);
  }, [showWarning, startWarningCountdown]);

  // ─── Handle "Continue" button click ────────────────────────────────────────
  const handleContinue = () => {
    clearAllTimers();
    setShowWarning(false);
    setCountdown(WARNING_DURATION_MS / 1000);

    // Restart the inactivity timer fresh
    inactivityTimer.current = setTimeout(() => {
      startWarningCountdown();
    }, INACTIVITY_LIMIT_MS);
  };

  // ─── Handle "Log Out" button click ─────────────────────────────────────────
  const handleLogout = () => {
    clearAllTimers();
    setShowWarning(false);
    onLogout();
  };

  // ─── Set up activity listeners when authenticated ──────────────────────────
  useEffect(() => {
    if (!isAuthenticated) {
      clearAllTimers();
      setShowWarning(false);
      return;
    }

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    // Start the inactivity timer on mount
    inactivityTimer.current = setTimeout(() => {
      startWarningCountdown();
    }, INACTIVITY_LIMIT_MS);

    // Attach listeners
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer, { passive: true });
    });

    // Cleanup on unmount or auth change
    return () => {
      clearAllTimers();
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [isAuthenticated, resetInactivityTimer, clearAllTimers, startWarningCountdown]);

  // ─── Don't render anything if not authenticated or no warning ──────────────
  if (!isAuthenticated || !showWarning) return null;

  // ─── SVG countdown circle math ─────────────────────────────────────────────
  const totalSeconds = WARNING_DURATION_MS / 1000;
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const progress = (countdown / totalSeconds) * circumference;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="session-timeout-overlay" id="session-timeout-overlay">
      <div className="session-timeout-modal" role="alertdialog" aria-modal="true"
           aria-labelledby="session-timeout-title" aria-describedby="session-timeout-message">

        {/* Warning Icon */}
        <div className="session-timeout-icon" aria-hidden="true">⚠️</div>

        {/* Title */}
        <h2 className="session-timeout-title" id="session-timeout-title">
          Session Expiring Soon
        </h2>

        {/* Message */}
        <p className="session-timeout-message" id="session-timeout-message">
          The session will expire in <strong>2 minutes</strong>.
          Click <strong>Continue</strong> to stay logged in.
        </p>

        {/* Countdown Timer */}
        <div className="session-timeout-countdown">
          <div className="countdown-circle">
            <svg viewBox="0 0 80 80">
              <circle className="track"  cx="40" cy="40" r={radius} />
              <circle className="progress" cx="40" cy="40" r={radius}
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - progress} />
            </svg>
            <span className="countdown-number">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="countdown-label">Time remaining</span>
        </div>

        {/* Action Buttons */}
        <div className="session-timeout-actions">
          <button
            className="session-timeout-btn btn-continue"
            onClick={handleContinue}
            id="session-continue-btn"
            autoFocus
          >
            Continue Session
          </button>
          <button
            className="session-timeout-btn btn-logout"
            onClick={handleLogout}
            id="session-logout-btn"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeout;
