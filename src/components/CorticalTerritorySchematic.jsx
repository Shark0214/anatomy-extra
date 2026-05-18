import { VESSEL_META, getStateClass } from "../data/vessels.js";

const territories = {
  MCA: {
    id: "territory__territory--mca",
    d: "M 145 286 C 168 224 241 186 340 176 C 446 165 552 190 642 244 C 666 283 662 333 627 374 C 578 432 466 455 345 426 C 254 404 174 356 145 286 Z",
    opacity: 0.84,
  },
  PCA: {
    id: "territory__territory--pca",
    d: "M 558 140 C 625 166 676 219 693 282 C 711 347 678 402 620 433 C 575 405 550 361 548 309 C 546 250 530 190 558 140 Z",
    opacity: 0.86,
  },
  ACA: {
    id: "territory__territory--aca-lateral-edge",
    d: "M 160 196 C 216 132 315 98 439 105 C 540 111 616 157 662 218 C 566 183 459 166 340 176 C 247 184 195 202 160 196 Z",
    opacity: 0.86,
  },
};

const insetAcaPath = "M 650 130 C 688 91 756 88 811 120 C 777 124 725 130 680 151 C 658 161 647 154 650 130 Z";

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

function territoryClass(vessel, selectedVessel, hoverVessel) {
  if (selectedVessel === "BASILAR") return "is-basilar-faded";
  return getStateClass(vessel, selectedVessel, hoverVessel);
}

function Territory({ vessel, selectedVessel, hoverVessel, controls }) {
  const meta = VESSEL_META[vessel];
  const classes = territoryClass(vessel, selectedVessel, hoverVessel);
  const territory = territories[vessel];

  return (
    <path
      id={territory.id}
      className={`vtd-territory ${classes}`}
      data-vessel={vessel}
      role="button"
      tabIndex={0}
      aria-pressed={selectedVessel === vessel}
      aria-label={meta.ariaLabel}
      d={territory.d}
      fill={meta.color}
      opacity={territory.opacity}
      {...makeHandlers(vessel, controls)}
    />
  );
}

function Label({ id, vessel, x, y, className = "vtd-label", children, selectedVessel, hoverVessel, controls }) {
  const classes = territoryClass(vessel, selectedVessel, hoverVessel);

  return (
    <text
      id={id}
      data-vessel={vessel}
      x={x}
      y={y}
      textAnchor="middle"
      className={`${className} vtd-clickable-label ${classes}`}
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
}) {
  const controls = { onSelectVessel, onHoverVessel };
  const acaInsetClass = territoryClass("ACA", selectedVessel, hoverVessel);

  return (
    <svg
      id="vtd-territory"
      className="vtd-svg"
      viewBox="0 0 900 620"
      role="img"
      aria-labelledby="territory-title territory-desc"
    >
      <title id="territory-title">Intermediate schematic cerebral artery territories</title>
      <desc id="territory-desc">
        Simplified lateral hemisphere map showing MCA lateral territory, PCA occipital territory, and ACA mostly medial territory using a superior edge and medial inset.
      </desc>

      <g id="territory__bg">
        <rect x="0" y="0" width="900" height="620" fill="var(--vtd-bg)" />
      </g>

      <g id="territory__context-brainstem" aria-hidden="true" pointerEvents="none">
        <path
          id="territory__brainstem-context"
          d="M 610 410 C 638 425 650 456 638 488 C 626 521 592 538 560 528 C 582 499 589 465 582 432 C 586 418 596 411 610 410 Z"
          fill="#E2E8F0"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
      </g>

      <g id="territory__context-cerebellum" aria-hidden="true" pointerEvents="none">
        <path
          id="territory__cerebellum-context"
          d="M 626 392 C 684 389 728 421 736 466 C 744 511 705 545 642 542 C 607 540 579 525 560 502 C 596 484 617 449 626 392 Z"
          fill="#E2E8F0"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
      </g>

      <defs id="territory__clip-defs">
        <clipPath id="territory__clip-brain">
          <path
            id="territory__brain-clip-path"
            d="M 116 303 C 105 230 146 166 218 129 C 282 96 373 86 470 102 C 565 118 647 172 686 245 C 724 317 696 389 620 433 C 551 473 451 477 364 455 C 324 477 260 464 220 424 C 178 415 137 369 116 303 Z"
          />
        </clipPath>
      </defs>

      <g id="territory__brain-outline">
        <path
          id="territory__brain-shape"
          d="M 116 303 C 105 230 146 166 218 129 C 282 96 373 86 470 102 C 565 118 647 172 686 245 C 724 317 696 389 620 433 C 551 473 451 477 364 455 C 324 477 260 464 220 424 C 178 415 137 369 116 303 Z"
          fill="var(--vtd-brain-fill)"
          stroke="var(--vtd-brain-stroke)"
          strokeWidth="2.5"
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

      <g id="territory__sulci" aria-hidden="true" pointerEvents="none">
        <path
          id="territory__sylvian-fissure"
          d="M 202 305 C 274 282 345 297 405 321 C 466 345 524 351 588 333"
          fill="none"
          stroke="var(--vtd-sulcus)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.72"
        />
        <path
          id="territory__central-sulcus"
          d="M 392 132 C 376 176 382 219 365 267 C 353 302 352 334 371 365"
          fill="none"
          stroke="var(--vtd-sulcus)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.64"
        />
        <path
          id="territory__parieto-occipital-cue"
          d="M 575 158 C 553 211 554 270 582 328"
          fill="none"
          stroke="var(--vtd-sulcus)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="7 8"
          opacity="0.58"
        />
      </g>

      <g id="territory__labels">
        <Label id="territory__label--mca-1" vessel="MCA" x="372" y="292" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>MCA</Label>
        <Label id="territory__label--mca-2" vessel="MCA" x="372" y="318" className="vtd-small-label" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>lateral face/arm</Label>
        <Label id="territory__label--mca-3" vessel="MCA" x="372" y="341" className="vtd-small-label" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>language/attention</Label>
        <Label id="territory__label--pca-1" vessel="PCA" x="620" y="287" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>PCA</Label>
        <Label id="territory__label--pca-2" vessel="PCA" x="620" y="312" className="vtd-small-label" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>occipital vision</Label>
        <Label id="territory__label--aca-edge" vessel="ACA" x="322" y="153" className="vtd-small-label" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>ACA superior edge</Label>
      </g>

      <g id="territory__inset-medial">
        <rect x="612" y="54" width="254" height="134" rx="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <text x="632" y="82" className="vtd-context-label">Medial surface inset</text>

        <g id="territory__inset-outline">
          <path
            id="territory__medial-outline"
            d="M 642 126 C 678 84 760 78 819 117 C 854 140 858 180 827 208 C 781 250 691 244 646 198 C 624 176 625 148 642 126 Z"
            fill="var(--vtd-brain-soft)"
            stroke="var(--vtd-brain-stroke)"
            strokeWidth="2"
          />
        </g>

        <path
          id="territory__inset-territory--aca"
          className={`vtd-territory ${acaInsetClass}`}
          data-vessel="ACA"
          role="button"
          tabIndex={0}
          aria-pressed={selectedVessel === "ACA"}
          aria-label={VESSEL_META.ACA.ariaLabel}
          d={insetAcaPath}
          fill="var(--vtd-aca)"
          opacity="0.9"
          {...makeHandlers("ACA", controls)}
        />

        <g id="territory__inset-labels">
          <Label id="territory__label--aca-1" vessel="ACA" x="733" y="133" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>ACA</Label>
          <Label id="territory__label--aca-2" vessel="ACA" x="733" y="157" className="vtd-small-label" selectedVessel={selectedVessel} hoverVessel={hoverVessel} controls={controls}>medial leg area</Label>
        </g>
      </g>

      <g id="territory__orientation">
        <text x="114" y="552" textAnchor="start" className="vtd-small-label">Anterior</text>
        <text x="696" y="552" textAnchor="end" className="vtd-small-label">Posterior</text>
        <line x1="190" y1="548" x2="620" y2="548" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M 114 548 L 130 540 L 130 556 Z" fill="#CBD5E1" />
        <path d="M 696 548 L 680 540 L 680 556 Z" fill="#CBD5E1" />
      </g>

      {selectedVessel === "BASILAR" && (
        <g id="territory__basilar-note">
          <rect x="300" y="468" width="330" height="46" rx="23" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="465" y="497" textAnchor="middle" className="vtd-small-label">
            Basilar focus is shown in the brainstem diagram
          </text>
        </g>
      )}

      <g id="territory__microcopy">
        <text x="450" y="594" textAnchor="middle" className="vtd-microcopy">
          Territories are simplified. ACA is mostly medial; lateral view shows only its superior edge.
        </text>
      </g>
    </svg>
  );
}
