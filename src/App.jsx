import { useEffect, useMemo, useState } from "react";
import DiagramPanel from "./components/DiagramPanel.jsx";
import { VESSEL_META, VESSELS } from "./data/vessels.js";

export default function App() {
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [hoverVessel, setHoverVessel] = useState(null);

  const selectedMeta = selectedVessel ? VESSEL_META[selectedVessel] : null;

  const supportingText = useMemo(() => {
    if (!selectedVessel) {
      return "Select a vessel in any diagram to see cross-highlighting across the schematic system.";
    }

    if (selectedVessel === "MCA") {
      return "MCA teaching note: dominant/usually left MCA involvement is associated with language findings; nondominant/usually right MCA involvement is associated with attention/neglect findings.";
    }

    if (selectedVessel === "BASILAR") {
      return "Basilar teaching note: this simplified system intentionally routes the basilar focus to the pons/brainstem diagram rather than drawing a cortical basilar territory.";
    }

    return `${selectedMeta.label} teaching note: ${selectedMeta.summary}.`;
  }, [selectedMeta, selectedVessel]);

  function handleSelectVessel(vessel) {
    setSelectedVessel((current) => (current === vessel ? null : vessel));
  }

  function handleClearVessel() {
    setSelectedVessel(null);
  }

  useEffect(() => {
    function clearOnEscape(event) {
      if (event.key === "Escape") {
        setSelectedVessel(null);
      }
    }

    window.addEventListener("keydown", clearOnEscape);
    return () => window.removeEventListener("keydown", clearOnEscape);
  }, []);

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Vessel to Deficit</p>
        <h1>Vessel to Deficit: A Stroke Anatomy Simulator</h1>
        <p className="hero__lede">
          Learn cerebral blood supply by predicting what happens when a vessel is blocked.
        </p>
      </header>

      <section className="control-card" aria-labelledby="controls-title">
        <div>
          <h2 id="controls-title">Select a supported vessel</h2>
          <p>{supportingText}</p>
        </div>
        <div className="vessel-buttons" aria-label="Supported vessel shortcuts">
          {VESSELS.map((vessel) => (
            <button
              key={vessel}
              type="button"
              className="vessel-button"
              data-vessel={vessel}
              aria-pressed={selectedVessel === vessel}
              onClick={() => handleSelectVessel(vessel)}
              onMouseEnter={() => setHoverVessel(vessel)}
              onMouseLeave={() => setHoverVessel(null)}
              onFocus={() => setHoverVessel(vessel)}
              onBlur={() => setHoverVessel(null)}
            >
              <span className="vessel-button__swatch" aria-hidden="true" />
              <span>
                <strong>{VESSEL_META[vessel].label}</strong>
                <small>{VESSEL_META[vessel].shortDeficit}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      <DiagramPanel
        selectedVessel={selectedVessel}
        hoverVessel={hoverVessel}
        onSelectVessel={handleSelectVessel}
        onHoverVessel={setHoverVessel}
        onClearVessel={handleClearVessel}
      />
    </main>
  );
}
