import { VESSEL_META, getVesselState, stateClass } from "../data/vessels.js";

const basilarPath = "M 330 392 C 332 350 331 310 330 270 C 329 225 330 180 330 118";

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

function basilarState(selectedVessel, hoverVessel) {
  if (selectedVessel && selectedVessel !== "BASILAR") return "inactive";
  return getVesselState("BASILAR", selectedVessel, hoverVessel);
}

function markerClass(selectedVessel) {
  if (selectedVessel === "BASILAR") return "is-selected is-occlusion-selected";
  if (selectedVessel) return "is-inactive";
  return "is-occlusion-default";
}

export default function BrainstemBasilarSchematic({
  selectedVessel,
  hoverVessel,
  onSelectVessel,
  onHoverVessel,
  onClearVessel,
}) {
  const controls = { onSelectVessel, onHoverVessel, onClearVessel };
  const currentState = basilarState(selectedVessel, hoverVessel);
  const classes = stateClass[currentState];
  const handlers = makeHandlers("BASILAR", controls);

  return (
    <svg
      id="vtd-brainstem-basilar"
      className="vtd-svg"
      viewBox="0 0 720 480"
      role="img"
      aria-labelledby="brainstem-title brainstem-desc"
    >
      <title id="brainstem-title">Basilar artery and brainstem schematic</title>
      <desc id="brainstem-desc">
        Clickable basilar artery schematic over the pons and brainstem, connecting basilar occlusion to the locked-in syndrome concept.
      </desc>

      <g id="brainstem__bg">
        <rect x="0" y="0" width="720" height="480" fill="#F8FAFC" />
      </g>

      <g id="brainstem__brainstem-context">
        <path
          id="brainstem__stem-shape"
          d="M 330 70 C 362 112 365 165 354 206 C 383 247 377 319 348 350 C 340 381 339 408 340 430 L 300 430 C 301 408 300 381 292 350 C 263 319 257 247 286 206 C 275 165 278 112 310 70 Z"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="2"
        />
      </g>

      <g id="brainstem__pons">
        <ellipse
          id="brainstem__pons-bulge"
          cx="330"
          cy="247"
          rx="132"
          ry="86"
          fill="#F1F5F9"
          stroke="#94A3B8"
          strokeWidth="2"
        />
      </g>

      <g
        id="brainstem__basilar"
        data-vessel="BASILAR"
        role="button"
        tabIndex={0}
        aria-pressed={selectedVessel === "BASILAR"}
        aria-label={VESSEL_META.BASILAR.ariaLabel}
        className={`vtd-focus-ring ${classes}`}
        {...handlers}
      >
        <path
          id="brainstem__basilar-path"
          className={`vtd-vessel ${classes}`}
          data-vessel="BASILAR"
          d={basilarPath}
          stroke="#0F766E"
          strokeWidth="14"
        />
      </g>

      <g id="brainstem__occlusion-marker" data-vessel="BASILAR" className={markerClass(selectedVessel)}>
        <circle
          cx="330"
          cy="225"
          r="18"
          fill="#FEE2E2"
          stroke="#DC2626"
          strokeWidth="4"
        />
        <path
          d="M 320 215 L 340 235 M 340 215 L 320 235"
          stroke="#DC2626"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      <g id="brainstem__labels">
        <text
          id="brainstem__label--basilar"
          data-vessel="BASILAR"
          x="292"
          y="138"
          textAnchor="end"
          className="vtd-label vtd-clickable-label"
          aria-label={VESSEL_META.BASILAR.ariaLabel}
          {...handlers}
        >
          Basilar artery
        </text>
        <text id="brainstem__label--pons" x="330" y="302" textAnchor="middle" className="vtd-small-label">
          pons/brainstem
        </text>
      </g>

      <g id="brainstem__locked-in-callout" data-vessel="BASILAR" className={classes}>
        <rect
          x="480"
          y="138"
          width="180"
          height="184"
          rx="18"
          fill="#FFFFFF"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <text x="500" y="172" className="vtd-small-label">Basilar occlusion</text>
        <text x="500" y="206" className="vtd-small-label">↓ pons ischemia</text>
        <text x="500" y="246" className="vtd-label">Locked-in</text>
        <text x="500" y="272" className="vtd-small-label">syndrome concept</text>
        <text x="500" y="304" className="vtd-microcopy">awake/aware</text>
        <text x="500" y="322" className="vtd-microcopy">unable to move/speak</text>
      </g>

      <g id="brainstem__connector-arrow" className={selectedVessel && selectedVessel !== "BASILAR" ? "is-inactive" : ""}>
        <path
          d="M 350 225 C 410 205 444 205 472 218"
          fill="none"
          stroke="#0F766E"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 472 218 L 458 210 L 460 226 Z" fill="#0F766E" />
      </g>

      <g id="brainstem__hit-targets" aria-hidden="true">
        <path
          className="vtd-hit-path"
          data-vessel="BASILAR"
          d={basilarPath}
          {...handlers}
        />
      </g>

      <g id="brainstem__microcopy">
        <text x="360" y="468" textAnchor="middle" className="vtd-microcopy">
          Simplified teaching schematic, not a complete vascular atlas.
        </text>
      </g>
    </svg>
  );
}
