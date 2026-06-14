import "./Loader.css";

const Loader = ({ label = "Chargement" }) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader-rings">
        <span className="loader-ring" />
        <span className="loader-ring" />
        <span className="loader-core" />
      </div>
      <p className="loader-label">
        {label}
        <span className="loader-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  );
};

export default Loader;
