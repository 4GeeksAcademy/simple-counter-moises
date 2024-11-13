import React, { useState, useEffect } from "react";

const SecondsCounter = ({ seconds }) => {
    const timeString = String(seconds).padStart(6, '0').split('');

    return (
        <div className="counter-container">
            <div className="icon"><i className="fa-regular fa-clock"></i></div>
            {timeString.map((num, index) => (
                <div key={index} className="digit">
                    {num}
                </div>
            ))}
        </div>
    );
};

const Home = () => {
    const [seconds, setSeconds] = useState(0);
    const [isCounting, setIsCounting] = useState(false); 
    const [alertTime, setAlertTime] = useState(null);

    useEffect(() => {
        let interval = null;

        if (isCounting) {
            interval = setInterval(() => {
                setSeconds(prev => prev + 1);
                if (alertTime !== null && seconds + 1 === alertTime) {
                    alert(`¡Has alcanzado ${alertTime} segundos!`);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isCounting, seconds, alertTime]);

    const start = () => setIsCounting(true);
    const stop = () => setIsCounting(false);
    const reset = () => {
        setIsCounting(false);
        setSeconds(0);
        window.location.reload(); 
    };

    const handleAlertChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 0) {
            setAlertTime(value); 
        } else {
            setAlertTime(null); 
        }
    };

    return (
        <div className="main-container">
            <div className="app-container">
                <SecondsCounter seconds={seconds} />
                <div className="button-container">
                    <button onClick={start} className="modern-button">Iniciar</button>
                    <button onClick={stop} className="modern-button">Parar</button>
                    <button onClick={reset} className="modern-button">Reiniciar</button>
                </div>
                <div className="alert-input">
                    <label>
                        Tiempo limite:
                        <input 
                            type="number" 
                            onChange={handleAlertChange} 
                            min="0" 
                        />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Home;
