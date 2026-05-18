import { VESSEL_META, getStateClass } from "../data/vessels.js";

const vesselPaths = {
  ACA: [
    {
      id: "cow__aca-left-a1-a2",
      d: "M 340 298 C 360 257 389 216 424 186 C 419 146 429 108 450 86",
      strokeWidth: 12,
    },
    {
      id: "cow__aca-right-a1-a2",
      d: "M 560 298 C 540 257 511 216 476 186 C 481 146 471 108 450 86",
      strokeWidth: 12,
    },
  ],
  MCA: [
    {
      id: "cow__mca-left",
      d: "M 340 298 C 300 288 260 292 224 313 C 191 332 165 362 140 401",
      strokeWidth: 12,
    },
    {
      id: "cow__mca-right",
      d: "M 560 298 C 600 288 640 292 676 313 C 709 332 735 362 760 401",
      strokeWidth: 12,
    },
  ],
  PCA: [
    {
      id: "cow__pca-left",
      d: "M 450 366 C 421 366 392 379 365 402 C 336 427 306 448 272 458",
      strokeWidth: 12,
    },
    {
      id: "cow__pca-right",
      d: "M 450 366 C 479 366 508 379 535 402 C 564 427 594 448 628 458",
      strokeWidth: 12,
    },
  ],
  BASILAR: [
    {
      id: "cow__basilar",
      d: "M 450 498 C 450 464 450 430 450 400 C 450 383 450 373 450 366",
      strokeWidth: 13,
    },
  ],
};

const layerIds = {
  ACA: "cow__vessel--aca",
  MCA: "cow__vessel--mca",
  PCA: "cow__vessel--pca",
  BASILAR: "cow__vessel--basilar",
};

function makeHandlers(vessel, { onSelectVessel, onHoverVessel }) {
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
        onHoverVessel(null);
      }
    },
  };
}

function VesselGroup({ vessel, selectedVessel, hoverVessel, controls }) {
  const meta = VESSEL_META[vessel];
  const classes = getStateClass(vessel, selectedVessel, hoverVessel);

  return (
    <g
      id={layerIds[vessel]}
      data-vessel={vessel}
      role="button"
      tabIndex={0}
      aria-pressed={selectedVessel === vessel}
      aria-label={meta.ariaLabel}
      className="vtd-focus-ring"
      {...makeHandlers(vessel, controls)}
    >
      {vesselPaths[vessel].map((path) => (
        <path
          key={path.id}
          id={path.id}
          className={`vtd-vessel ${classes}`}
          data-vessel={vessel}
          d={path.d}
          stroke={meta.color}
          strokeWidth={path.strokeWidth}
        />
      ))}
    </g>
  );
}

function Label({ id, vessel, x, y, anchor = "middle", children, selectedVessel, hoverVessel, controls }) {
  const classes = getStateClass(vessel, selectedVessel, hoverVessel);

  return (
    <text
      id={id}
      data-vessel={vessel}
      x={x}
      y={y}
      textAnchor={anchor}
      className={`vtd-label vtd-clickable-label ${classes}`}
      aria-label={VESSEL_META[vessel].ariaLabel}
      {...makeHandlers(vessel, controls)}
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
}) {
  const controls = { onSelectVessel, onHoverVessel };

  return (
    <svg
      id="vtd-cow"
      className="vtd-svg"
      viewBox="0 0 900 620"
      role="img"
      aria-labelledby="cow-title cow-desc"
    >
      <title id="cow-title">Intermediate schematic Circle of Willis</title>
      <desc id="cow-desc">
        Simplified inferior-view Circle of Willis showing clickable ACA, MCA, PCA, and basilar artery with muted non-clickable context vessels.
      </desc>

      <g id="cow__bg">
        <rect x="0" y="0" width="900" height="620" fill="var(--vtd-bg)" />
      </g>

      <g id="cow__brain-base" aria-hidden="true">
        <path
          id="cow__brain-base-outline"
          d="M 144 312 C 144 165 255 80 450 80 C 645 80 756 165 756 312 C 756 465 628 540 450 540 C 272 540 144 465 144 312 Z"
          fill="var(--vtd-brain-soft)"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <line
          id="cow__midline"
          x1="450"
          y1="92"
          x2="450"
          y2="528"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeDasharray="7 9"
        />
      </g>

      <g id="cow__orientation">
        <text x="150" y="86" textAnchor="start" className="vtd-small-label">Patient L</text>
        <text x="750" y="86" textAnchor="end" className="vtd-small-label">Patient R</text>
        <text x="450" y="58" textAnchor="middle" className="vtd-small-label">Anterior</text>
        <text x="450" y="578" textAnchor="middle" className="vtd-small-label">Posterior</text>
      </g>

      <g id="cow__context-vessels" className="vtd-context" aria-hidden="true" pointerEvents="none">
        <g id="cow__context--ica-left">
          <path id="cow__ica-left" className="vtd-context-vessel" d="M 314 500 C 312 456 315 410 326 374 C 333 350 338 327 340 298" />
        </g>
        <g id="cow__context--ica-right">
          <path id="cow__ica-right" className="vtd-context-vessel" d="M 586 500 C 588 456 585 410 574 374 C 567 350 562 327 560 298" />
        </g>
        <g id="cow__context--acom">
          <path id="cow__acom" className="vtd-context-vessel-thin" d="M 424 186 C 438 177 462 177 476 186" />
        </g>
        <g id="cow__context--pcom-left">
          <path id="cow__pcom-left" className="vtd-context-vessel-thin" d="M 340 298 C 352 331 376 357 406 374" />
        </g>
        <g id="cow__context--pcom-right">
          <path id="cow__pcom-right" className="vtd-context-vessel-thin" d="M 560 298 C 548 331 524 357 494 374" />
        </g>
        <g id="cow__context--vertebral-left">
          <path id="cow__vertebral-left" className="vtd-context-vessel" d="M 398 552 C 410 528 424 510 450 498" />
        </g>
        <g id="cow__context--vertebral-right">
          <path id="cow__vertebral-right" className="vtd-context-vessel" d="M 502 552 C 490 528 476 510 450 498" />
        </g>
      </g>

      <g id="cow__interactive-vessels">
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

      <g id="cow__hit-targets" aria-hidden="true">
        {Object.entries(vesselPaths).map(([vessel, paths]) =>
          paths.map((path) => (
            <path
              key={`${path.id}--hit`}
              data-vessel={vessel}
              className="vtd-hit-path"
              d={path.d}
              {...makeHandlers(vessel, controls)}
            />
          )),
        )}
      </g>

      <g id="cow__labels">
        <Label id="cow__label--aca" vessel="ACA" x="450" y="122" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>ACA</Label>
        <Label id="cow__label--mca-left" vessel="MCA" x="166" y="382" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>MCA</Label>
        <Label id="cow__label--mca-right" vessel="MCA" x="734" y="382" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>MCA</Label>
        <Label id="cow__label--pca-left" vessel="PCA" x="286" y="438" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>PCA</Label>
        <Label id="cow__label--pca-right" vessel="PCA" x="614" y="438" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>PCA</Label>
        <Label id="cow__label--basilar" vessel="BASILAR" x="485" y="478" anchor="start" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>Basilar</Label>
      </g>

      <g id="cow__context-labels" aria-hidden="true" pointerEvents="none">
        <text x="304" y="486" textAnchor="end" className="vtd-context-label">ICA</text>
        <text x="596" y="486" textAnchor="start" className="vtd-context-label">ICA</text>
        <text x="450" y="176" textAnchor="middle" className="vtd-context-label">ACom</text>
        <text x="372" y="352" textAnchor="middle" className="vtd-context-label">PCom</text>
        <text x="528" y="352" textAnchor="middle" className="vtd-context-label">PCom</text>
        <text x="386" y="566" textAnchor="end" className="vtd-context-label">vertebral</text>
        <text x="514" y="566" textAnchor="start" className="vtd-context-label">vertebral</text>
      </g>

      <g id="cow__legend">
        <rect x="44" y="520" width="276" height="58" rx="14" fill="#FFFFFF" stroke="#CBD5E1" />
        <line x1="64" y1="540" x2="104" y2="540" stroke="var(--vtd-mca)" strokeWidth="8" strokeLinecap="round" />
        <text x="116" y="545" className="vtd-microcopy">Colored = interactive study vessel</text>
        <line x1="64" y1="562" x2="104" y2="562" stroke="var(--vtd-context-vessel)" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
        <text x="116" y="567" className="vtd-microcopy">Gray = context vessel, not tested</text>
      </g>

      <g id="cow__microcopy">
        <text x="450" y="600" textAnchor="middle" className="vtd-microcopy">
          Intermediate schematic: context vessels restore orientation but are not tested in this app.
        </text>
      </g>
    </svg>
  );
}
