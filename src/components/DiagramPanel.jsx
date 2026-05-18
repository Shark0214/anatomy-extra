import CircleOfWillisSchematic from "./CircleOfWillisSchematic.jsx";
import CorticalTerritorySchematic from "./CorticalTerritorySchematic.jsx";
import BrainstemBasilarSchematic from "./BrainstemBasilarSchematic.jsx";
import { VESSEL_META } from "../data/vessels.js";

const diagrams = [
  {
    title: "Circle of Willis schematic",
    helper: "Major named vessels only; communicating arteries are intentionally omitted.",
    Component: CircleOfWillisSchematic,
  },
  {
    title: "Cortical territory schematic",
    helper: "ACA, MCA, and PCA territories cross-highlight with the vessel schematic.",
    Component: CorticalTerritorySchematic,
  },
  {
    title: "Brainstem / basilar schematic",
    helper: "Basilar selection focuses the midline pons/brainstem teaching diagram.",
    Component: BrainstemBasilarSchematic,
  },
];

export default function DiagramPanel({
  selectedVessel,
  hoverVessel,
  onSelectVessel,
  onHoverVessel,
  onClearVessel,
}) {
  const selectedMeta = selectedVessel ? VESSEL_META[selectedVessel] : null;

  return (
    <section className="diagram-system" aria-labelledby="diagram-system-title">
      <div className="diagram-system__header">
        <div>
          <p className="eyebrow">Diagram system only</p>
          <h2 id="diagram-system-title">Interactive vascular schematics</h2>
          <p>
            Click, hover, or tab to a vessel. Enter/Space selects a vessel; Escape clears the current selection.
          </p>
        </div>
        <div
          aria-live="polite"
          id="vtd-selection-summary"
          className="selection-summary"
        >
          {selectedMeta
            ? `Selected ${selectedMeta.label}: ${selectedMeta.summary}.`
            : "No vessel selected. Choose ACA, MCA, PCA, or Basilar."}
        </div>
      </div>

      <div className="diagram-grid">
        {diagrams.map(({ title, helper, Component }) => (
          <article className="diagram-card" key={title}>
            <div className="diagram-card__copy">
              <h3>{title}</h3>
              <p>{helper}</p>
            </div>
            <Component
              selectedVessel={selectedVessel}
              hoverVessel={hoverVessel}
              onSelectVessel={onSelectVessel}
              onHoverVessel={onHoverVessel}
              onClearVessel={onClearVessel}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
