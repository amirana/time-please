import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("stopwatch");

  // Stopwatch
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  // Stopwatch useEffect
  useEffect(() => {
    if (isRunning) {
      const intervalId = setInterval(() => {
        if (seconds === 59) {
          setSeconds(0);
          if (minutes === 59) {
            setMinutes(0);
            setHours(hours + 1);
          } else {
            setMinutes(minutes + 1);
          }
        } else {
          setSeconds(seconds + 1);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, seconds, minutes, hours]);

  function start() {
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  // Timer useEffect
  useEffect(() => {
    if (timerIsRunning) {
      const timerIntervalId = setInterval(() => {
        if (timerSeconds === 0 && timerMinutes === 0 && timerHours === 0) {
          setTimerIsRunning(false);
          setTimeIsUp(true);
          setResetKey((prev) => prev + 1);
          return;
        }

        if (timerSeconds === 0) {
          setTimerSeconds(59);
          if (timerMinutes === 0) {
            setTimerMinutes(59);
            setTimerHours(timerHours - 1);
          } else {
            setTimerMinutes(timerMinutes - 1);
          }
        } else {
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);

      return () => clearInterval(timerIntervalId);
    }
  }, [timerIsRunning, timerSeconds, timerMinutes, timerHours]);

  function startTimer() {
    setTimerHours(inputHours);
    setTimerMinutes(inputMinutes);
    setTimerSeconds(inputSeconds);
    setTimerIsRunning(true);
    setTimerStarted(true);
    setTimeIsUp(false);
  }

  function pauseTimer() {
    setTimerIsRunning(false);
  }

  function resetTimer() {
    setTimerIsRunning(false);
    setTimerHours(0);
    setTimerMinutes(0);
    setTimerSeconds(0);
    setTimeIsUp(false);
    setTimerStarted(false);
    setResetKey((prev) => prev + 1);
  }

  return (
    <>
      <section className="app-container">
        <div className="app-wrapper">
          <nav className="tabs-nav">
            <ul className="tabs-list">
              <li
                className={`tab-item ${activeTab === "stopwatch" ? "active" : ""}`}
                onClick={() => setActiveTab("stopwatch")}
              >
                Stopwatch
              </li>
              <li
                className={`tab-item ${activeTab === "timer" ? "active" : ""}`}
                onClick={() => setActiveTab("timer")}
              >
                Timer
              </li>
            </ul>
          </nav>

          {activeTab === "stopwatch" && (
            <div id="stopwatch" className="content-panel">
              <div className="display-section">
                <p className="time-display">
                  <span className="time-unit">
                    {String(hours).padStart(2, "0")}
                  </span>
                  <span className="time-separator">:</span>
                  <span className="time-unit">
                    {String(minutes).padStart(2, "0")}
                  </span>
                  <span className="time-separator">:</span>
                  <span className="time-unit">
                    {String(seconds).padStart(2, "0")}
                  </span>
                </p>
              </div>

              <div className="controls-group">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={start}
                >
                  Start
                </button>
                <button
                  className="btn btn-secondary"
                  type="submit"
                  onClick={pause}
                >
                  Pause
                </button>
                <button
                  className="btn btn-tertiary"
                  type="submit"
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {activeTab === "timer" && (
            <div id="timer" className="content-panel">
              <div className="timer-content">
                {timeIsUp && timerStarted && (
                  <p className="time-up-message">Time's Up! ⏰</p>
                )}

                <div className="display-section">
                  <p className="time-display">
                    <span className="time-unit">
                      {String(timerHours).padStart(2, "0")}
                    </span>
                    <span className="time-separator">:</span>
                    <span className="time-unit">
                      {String(timerMinutes).padStart(2, "0")}
                    </span>
                    <span className="time-separator">:</span>
                    <span className="time-unit">
                      {String(timerSeconds).padStart(2, "0")}
                    </span>
                  </p>
                </div>
                <div className="inputs-group" key={resetKey}>
                  <input
                    className="time-input"
                    type="number"
                    name="hours"
                    min="0"
                    max="23"
                    placeholder="HH"
                    onChange={(e) => setInputHours(Number(e.target.value))}
                  />
                  <input
                    className="time-input"
                    type="number"
                    name="minutes"
                    min="0"
                    max="59"
                    placeholder="MM"
                    onChange={(e) => setInputMinutes(Number(e.target.value))}
                  />
                  <input
                    className="time-input"
                    type="number"
                    name="seconds"
                    min="0"
                    max="59"
                    placeholder="SS"
                    onChange={(e) => setInputSeconds(Number(e.target.value))}
                  />
                </div>
                <div className="controls-group">
                  <button className="btn btn-primary" onClick={startTimer}>
                    Start
                  </button>
                  <button className="btn btn-secondary" onClick={pauseTimer}>
                    Pause
                  </button>
                  <button className="btn btn-tertiary" onClick={resetTimer}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
