import { VESSEL_META, getVesselState, stateClass } from "../data/vessels.js";

const vesselPaths = {
  ACA: [
    { id: "cow__aca-left", d: "M 360 238 C 335 198 329 147 343 102" },
    { id: "cow__aca-right", d: "M 360 238 C 385 198 391 147 377 102" },
  ],
  MCA: [
    { id: "cow__mca-left", d: "M 360 238 C 292 204 236 190 176 190 C 137 190 111 203 96 224" },
    { id: "cow__mca-right", d: "M 360 238 C 428 204 484 190 544 190 C 583 190 609 203 624 224" },
  ],
  PCA: [
    { id: "cow__pca-left", d: "M 360 248 C 317 257 283 279 256 312 C 238 335 218 354 194 368" },
    { id: "cow__pca-right", d: "M 360 248 C 403 257 437 279 464 312 C 482 335 502 354 526 368" },
  ],
  BASILAR: [
    { id: "cow__basilar", d: "M 360 414 C 360 367 360 321 360 275 C 360 260 360 249 360 238" },
  ],
};

const layerIds = {
  ACA: "cow__vessel--aca",
  MCA: "cow__vessel--mca",
  PCA: "cow__vessel--pca",
  BASILAR: "cow__vessel--basilar",
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

function VesselGroup({ vessel, selectedVessel, hoverVessel, controls }) {
  const meta = VESSEL_META[vessel];
  const currentState = getVesselState(vessel, selectedVessel, hoverVessel);
  const classes = stateClass[currentState];
  const handlers = makeHandlers(vessel, controls);

  return (
    <g
      id={layerIds[vessel]}
      data-vessel={vessel}
      role="button"
      tabIndex={0}
      aria-pressed={selectedVessel === vessel}
      aria-label={meta.ariaLabel}
      className={`vtd-focus-ring ${classes}`}
      {...handlers}
    >
      {vesselPaths[vessel].map((path) => (
        <path
          key={path.id}
          id={path.id}
          className={`vtd-vessel ${classes}`}
          data-vessel={vessel}
          d={path.d}
          stroke={meta.color}
          strokeWidth="12"
        />
      ))}
    </g>
  );
}

function Label({ id, vessel, x, y, anchor = "middle", children, controls }) {
  const handlers = makeHandlers(vessel, controls);
  return (
    <text
      id={id}
      data-vessel={vessel}
      x={x}
      y={y}
      textAnchor={anchor}
      className="vtd-label vtd-clickable-label"
      aria-label={VESSEL_META[vessel].ariaLabel}
      {...handlers}
    >
      {children}
    </text>
  );
}

export default function CircleOfWillisSchematic({
  selectedVessel,
  hoverVessel,
  onSelectVessel,
  onHoverVessel,
  onClearVessel,
}) {
  const controls = { onSelectVessel, onHoverVessel, onClearVessel };

  return (
    <svg
      id="vtd-cow"
      className="vtd-svg"
      viewBox="0 0 720 480"
      role="img"
      aria-labelledby="cow-title cow-desc"
    >
      <title id="cow-title">Simplified Circle of Willis schematic</title>
      <desc id="cow-desc">
        Clickable schematic showing ACA, MCA, PCA, and basilar artery with patient left and right orientation.
      </desc>

      <g id="cow__bg">
        <rect x="0" y="0" width="720" height="480" fill="#F8FAFC" />
      </g>

      <g id="cow__brain-context">
        <path
          id="cow__brain-outline"
          d="M 118 230 C 118 122 205 66 360 66 C 515 66 602 122 602 230 C 602 345 510 410 360 410 C 210 410 118 345 118 230 Z"
          fill="#F1F5F9"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          id="cow__midline"
          x1="360"
          y1="76"
          x2="360"
          y2="406"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeDasharray="6 8"
        />
      </g>

      <g id="cow__orientation">
        <text x="126" y="96" className="vtd-small-label" textAnchor="start">Patient L</text>
        <text x="594" y="96" className="vtd-small-label" textAnchor="end">Patient R</text>
        <text x="360" y="52" className="vtd-small-label" textAnchor="middle">Anterior</text>
        <text x="360" y="444" className="vtd-small-label" textAnchor="middle">Posterior</text>
      </g>

      <g id="cow__vessels">
        {Object.keys(vesselPaths).map((vessel) => (
          <VesselGroup
            key={vessel}
            vessel={vessel}
            selectedVessel={selectedVessel}
            hoverVessel={hoverVessel}
            controls={controls}
          />
        ))}
      </g>

      <g id="cow__labels">
        <Label id="cow__label--aca" vessel="ACA" x="360" y="118" controls={controls}>ACA</Label>
        <Label id="cow__label--mca-left" vessel="MCA" x="142" y="206" controls={controls}>MCA</Label>
        <Label id="cow__label--mca-right" vessel="MCA" x="578" y="206" controls={controls}>MCA</Label>
        <Label id="cow__label--pca-left" vessel="PCA" x="226" y="344" controls={controls}>PCA</Label>
        <Label id="cow__label--pca-right" vessel="PCA" x="494" y="344" controls={controls}>PCA</Label>
        <Label id="cow__label--basilar" vessel="BASILAR" x="402" y="356" anchor="start" controls={controls}>Basilar</Label>
      </g>

      <g id="cow__hit-targets" aria-hidden="true">
        {Object.entries(vesselPaths).map(([vessel, paths]) =>
          paths.map((path) => (
            <path
              key={`${path.id}--hit`}
              className="vtd-hit-path"
              data-vessel={vessel}
              d={path.d}
              {...makeHandlers(vessel, controls)}
            />
          )),
        )}
      </g>

      <g id="cow__state-overlays" />
      <g id="cow__microcopy">
        <text x="360" y="468" textAnchor="middle" className="vtd-microcopy">
          Simplified teaching view: major named vessels only; communicating arteries omitted.
        </text>
      </g>
    </svg>
  );
}
