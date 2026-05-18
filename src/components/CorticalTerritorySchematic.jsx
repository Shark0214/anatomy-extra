import { VESSEL_META, getVesselState, stateClass } from "../data/vessels.js";

const territories = {
  MCA: {
    id: "territory__territory--mca",
    d: "M 118 229 C 148 189 205 174 357 172 C 453 171 548 187 620 211 C 632 256 619 300 586 335 C 535 389 444 406 330 392 C 221 379 142 339 119 287 C 113 272 113 249 118 229 Z",
  },
  PCA: {
    id: "territory__territory--pca",
    d: "M 518 157 C 582 177 626 222 631 272 C 636 325 597 374 535 394 C 495 360 476 315 478 267 C 480 219 495 184 518 157 Z",
  },
  ACA: {
    id: "territory__territory--aca",
    d: "M 138 178 C 196 106 316 78 438 96 C 520 108 588 154 620 211 C 547 187 455 172 357 172 C 263 172 194 172 138 178 Z",
  },
};

function makeHandlers(vessel, { onSelectVessel, onHoverVessel, onClearVessel }) {
  return {
    onClick: () => onSelectVessel(vessel),
    onMouseEnter: () => onHoverVessel(vessel),
    onMouseLeave: () => onHoverVessel(null),
    onFocus: () => onHoverVessel(vessel),
    onBlur: () => onHoverVessel(null),
    onKeyDown: (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelectVessel(vessel);
      }
      if (event.key === "Escape") {
        event.preventDefault();
        onClearVessel();
      }
    },
  };
}

function territoryClass(vessel, selectedVessel, hoverVessel) {
  if (selectedVessel === "BASILAR") return "is-basilar-faded";
  return stateClass[getVesselState(vessel, selectedVessel, hoverVessel)];
}

function Territory({ vessel, selectedVessel, hoverVessel, controls }) {
  const meta = VESSEL_META[vessel];
  const classes = territoryClass(vessel, selectedVessel, hoverVessel);
  const handlers = makeHandlers(vessel, controls);

  return (
    <path
      id={territories[vessel].id}
      className={`vtd-territory ${classes}`}
      data-vessel={vessel}
      role="button"
      tabIndex={0}
      aria-pressed={selectedVessel === vessel}
      aria-label={meta.ariaLabel}
      d={territories[vessel].d}
      fill={meta.color}
      opacity="0.86"
      {...handlers}
    />
  );
}

function Label({ id, vessel, x, y, className, children, controls }) {
  return (
    <text
      id={id}
      data-vessel={vessel}
      x={x}
      y={y}
      textAnchor="middle"
      className={`${className} vtd-clickable-label`}
      aria-label={VESSEL_META[vessel].ariaLabel}
      {...makeHandlers(vessel, controls)}
    >
      {children}
    </text>
  );
}

export default function CorticalTerritorySchematic({
  selectedVessel,
  hoverVessel,
  onSelectVessel,
  onHoverVessel,
  onClearVessel,
}) {
  const controls = { onSelectVessel, onHoverVessel, onClearVessel };

  return (
    <svg
      id="vtd-cortical-territories"
      className="vtd-svg"
      viewBox="0 0 720 480"
      role="img"
      aria-labelledby="territory-title territory-desc"
    >
      <title id="territory-title">Simplified cortical vascular territories</title>
      <desc id="territory-desc">
        Clickable cortical territory schematic showing ACA superior medial territory, MCA large lateral territory, and PCA posterior occipital territory.
      </desc>

      <g id="territory__bg">
        <rect x="0" y="0" width="720" height="480" fill="#F8FAFC" />
      </g>

      <defs id="territory__clip-defs">
        <clipPath id="territory__clip-brain">
          <path d="M 105 258 C 105 155 192 88 340 84 C 477 80 604 143 628 242 C 649 329 560 404 410 408 C 291 411 188 381 137 329 C 112 303 105 281 105 258 Z" />
        </clipPath>
      </defs>

      <g id="territory__brain-outline">
        <path
          id="territory__brain-shape"
          d="M 105 258 C 105 155 192 88 340 84 C 477 80 604 143 628 242 C 649 329 560 404 410 408 C 291 411 188 381 137 329 C 112 303 105 281 105 258 Z"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="2"
        />
      </g>

      <g id="territory__territories" clipPath="url(#territory__clip-brain)">
        {Object.keys(territories).map((vessel) => (
          <Territory
            key={vessel}
            vessel={vessel}
            selectedVessel={selectedVessel}
            hoverVessel={hoverVessel}
            controls={controls}
          />
        ))}
      </g>

      <g id="territory__labels">
        <Label id="territory__label--aca-1" vessel="ACA" x="328" y="124" className="vtd-label" controls={controls}>ACA</Label>
        <Label id="territory__label--aca-2" vessel="ACA" x="328" y="148" className="vtd-small-label" controls={controls}>leg area</Label>

        <Label id="territory__label--mca-1" vessel="MCA" x="330" y="246" className="vtd-label" controls={controls}>MCA</Label>
        <Label id="territory__label--mca-2" vessel="MCA" x="330" y="272" className="vtd-small-label" controls={controls}>face/arm</Label>
        <Label id="territory__label--mca-3" vessel="MCA" x="330" y="296" className="vtd-small-label" controls={controls}>language/attention</Label>

        <Label id="territory__label--pca-1" vessel="PCA" x="552" y="260" className="vtd-label" controls={controls}>PCA</Label>
        <Label id="territory__label--pca-2" vessel="PCA" x="552" y="284" className="vtd-small-label" controls={controls}>vision</Label>
      </g>

      <g id="territory__orientation">
        <text x="110" y="442" textAnchor="start" className="vtd-small-label">Anterior</text>
        <text x="628" y="442" textAnchor="end" className="vtd-small-label">Posterior</text>
        <line x1="188" y1="438" x2="540" y2="438" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M 110 438 L 126 430 L 126 446 Z" fill="#CBD5E1" />
        <path d="M 628 438 L 612 430 L 612 446 Z" fill="#CBD5E1" />
      </g>

      {selectedVessel === "BASILAR" && (
        <g id="territory__basilar-note" aria-hidden="true">
          <rect x="204" y="360" width="312" height="42" rx="21" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="360" y="386" textAnchor="middle" className="vtd-small-label">
            Basilar focus is shown in the brainstem diagram
          </text>
        </g>
      )}

      <g id="territory__hit-targets" aria-hidden="true">
        {Object.entries(territories).map(([vessel, territory]) => (
          <path
            key={`${territory.id}--hit`}
            className="vtd-hit-path vtd-hit-fill"
            data-vessel={vessel}
            d={territory.d}
            {...makeHandlers(vessel, controls)}
          />
        ))}
      </g>

      <g id="territory__microcopy">
        <text x="360" y="468" textAnchor="middle" className="vtd-microcopy">
          Simplified lateral teaching map: territories are approximate and clipped to brain silhouette.
        </text>
      </g>
    </svg>
  );
}
