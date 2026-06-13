import { useState } from "react";
import "./Aptitudes.css";
const Aptitudes = () => {
  const aptitudes = [
    "Force surhumaine",
    "Agilité",
    "Endurance",
    "Combat rapproché",
    "Leadership",
    "Intelligence",
    "Vitesse",
  ];

  const [scores] = useState(
    () =>
      aptitudes.map((aptitude) => ({
        label: aptitude,
        value: Math.floor(Math.random() * 101),
      })),
    [],
  );
  return (
    <div className="aptitudes">
      {scores.map(({ label, value }) => (
        <div key={label} className="aptitude-row">
          <div className="aptitude-header">
            <span>{label}</span>
            <span>{value}</span>
          </div>
          <div className="aptitude-bar-bg">
            <div
              className="aptitude-bar-fill"
              style={{
                width: `${value}%`,
                backgroundColor:
                  value > 90
                    ? "var(--color-red-marvel)"
                    : "var(--color-white-text)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Aptitudes;
