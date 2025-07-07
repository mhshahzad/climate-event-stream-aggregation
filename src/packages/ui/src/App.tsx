import React, {useEffect, useState} from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {CandlestickMap, fetchCandlesticks} from "./api/fetchCandlestickData";
import CandlestickChart from "./components/candlestickChart";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const cities = ["Berlin", "NewYork", "Tokyo", "SaoPaulo", "CapeTown"];

const App = () => {
    const [city, setCity] = useState(cities[0]);
    const [candlesticks, setCandlesticks] = useState<CandlestickMap>({});
    const [loading, setLoading] = useState(false);

    const updateChart = async (selectedCity: string) => {
        setLoading(true);
        const data = await fetchCandlesticks(selectedCity);
        setCandlesticks(data);
        setLoading(false);
    };

    useEffect(() => {
        void updateChart(city);
        const interval = setInterval(() => updateChart(city), 30000);
        return () => clearInterval(interval);
    }, [city]);


    return (
        <div style={{fontFamily: "sans-serif", margin: "2rem"}}>
            <h1 style={{textAlign: "center"}}>Climate Candlestick Visualization</h1>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "2rem"}}>
                {/* Render city buttons like radio buttons */}
                {cities.map((c) => (
                    <button
                        key={c}
                        onClick={() => setCity(c)}
                        style={{
                            marginRight: "0.5rem",
                            padding: "0.75rem 1.5rem",
                            border: city === c ? "2px solid #1976d2" : "1px solid #ccc",
                            background: city === c ? "#e3f2fd" : "#fff",
                            color: city === c ? "#1976d2" : "#333",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: city === c ? "bold" : "normal",
                            fontSize: "1.1rem"
                        }}
                        aria-pressed={city === c}
                    >
                        {c}
                    </button>
                ))}
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{width: 1100, height: 600}}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <CandlestickChart data={candlesticks}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;