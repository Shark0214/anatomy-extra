import { VESSEL_META, getStateClass } from "../data/vessels.js";

const basilarPath = "M 360 468 C 360 424 360 382 360 342 C 360 300 360 255 360 205";

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

function basilarClass(selectedVessel, hoverVessel) {
  if (selectedVessel && selectedVessel !== "BASILAR") return "is-inactive";
  return getStateClass("BASILAR", selectedVessel, hoverVessel);
}

function markerClass(selectedVessel) {
  if (selectedVessel === "BASILAR") return "is-selected is-occlusion-selected";
  if (selectedVessel) return "is-occlusion-inactive";
  return "is-occlusion-default";
}

export default function BrainstemBasilarSchematic({
  selectedVessel,
  hoverVessel,
  onSelectVessel,
  onHoverVessel,
}) {
  const controls = { onSelectVessel, onHoverVessel };
  const classes = basilarClass(selectedVessel, hoverVessel);
  const handlers = makeHandlers("BASILAR", controls);

  return (
    <svg
      id="vtd-brainstem"
      className="vtd-svg"
      viewBox="0 0 900 620"
      role="img"
      aria-labelledby="brainstem-title brainstem-desc"
    >
      <title id="brainstem-title">Basilar artery and brainstem schematic</title>
      <desc id="brainstem-desc">
        Simplified anterior brainstem schematic showing the basilar artery over the pons and a locked-in syndrome concept callout.
      </desc>

      <g id="brainstem__bg">
        <rect x="0" y="0" width="900" height="620" fill="var(--vtd-bg)" />
      </g>

      <g id="brainstem__context-cerebellum" aria-hidden="true" pointerEvents="none">
        <path
          id="brainstem__cerebellum-left"
          d="M 210 250 C 146 270 112 332 132 391 C 152 452 221 486 304 465 C 272 422 260 369 272 316 C 258 282 238 260 210 250 Z"
          fill="var(--vtd-brain-soft)"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
        <path
          id="brainstem__cerebellum-right"
          d="M 510 250 C 574 270 608 332 588 391 C 568 452 499 486 416 465 C 448 422 460 369 448 316 C 462 282 482 260 510 250 Z"
          fill="var(--vtd-brain-soft)"
          stroke="#CBD5E1"
          strokeWidth="2"
        />
      </g>

      <g id="brainstem__brainstem-shapes">
        <g id="brainstem__midbrain">
          <path
            id="brainstem__midbrain-shape"
            d="M 300 128 C 316 96 344 82 360 82 C 376 82 404 96 420 128 C 430 154 420 188 394 205 C 378 215 342 215 326 205 C 300 188 290 154 300 128 Z"
            fill="var(--vtd-brain-fill)"
            stroke="var(--vtd-brain-stroke)"
            strokeWidth="2.5"
          />
        </g>

        <g id="brainstem__pons">
          <path
            id="brainstem__pons-shape"
            d="M 246 258 C 258 214 304 190 360 190 C 416 190 462 214 474 258 C 490 318 450 364 360 370 C 270 364 230 318 246 258 Z"
            fill="var(--vtd-brain-soft)"
            stroke="var(--vtd-brain-stroke)"
            strokeWidth="2.5"
          />
        </g>

        <g id="brainstem__medulla">
          <path
            id="brainstem__medulla-shape"
            d="M 328 360 C 346 372 374 372 392 360 C 388 412 384 464 374 526 C 368 548 352 548 346 526 C 336 464 332 412 328 360 Z"
            fill="var(--vtd-brain-fill)"
            stroke="var(--vtd-brain-stroke)"
            strokeWidth="2.5"
          />
        </g>
      </g>

      <g id="brainstem__context-vessels" className="vtd-context" aria-hidden="true" pointerEvents="none">
        <g id="brainstem__context--vertebral-left">
          <path id="brainstem__vertebral-left" className="vtd-context-vessel" d="M 304 548 C 318 510 336 486 360 468" />
        </g>
        <g id="brainstem__context--vertebral-right">
          <path id="brainstem__vertebral-right" className="vtd-context-vessel" d="M 416 548 C 402 510 384 486 360 468" />
        </g>
      </g>

      <g
        id="brainstem__basilar"
        data-vessel="BASILAR"
        role="button"
        tabIndex={0}
        aria-pressed={selectedVessel === "BASILAR"}
        aria-label={VESSEL_META.BASILAR.ariaLabel}
        className="vtd-focus-ring"
        {...handlers}
      >
        <path
          id="brainstem__basilar-path"
          className={`vtd-vessel ${classes}`}
          data-vessel="BASILAR"
          d={basilarPath}
          stroke="var(--vtd-basilar)"
          strokeWidth="14"
        />
      </g>

      <g id="brainstem__occlusion-marker" data-vessel="BASILAR" className={markerClass(selectedVessel)}>
        <circle
          id="brainstem__occlusion-circle"
          cx="360"
          cy="292"
          r="21"
          fill="var(--vtd-occlusion-soft)"
          stroke="var(--vtd-occlusion)"
          strokeWidth="4"
        />
        <path
          id="brainstem__occlusion-x"
          d="M 347 279 L 373 305 M 373 279 L 347 305"
          stroke="var(--vtd-occlusion)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      <g id="brainstem__connector-arrow" aria-hidden="true" pointerEvents="none" className={selectedVessel && selectedVessel !== "BASILAR" ? "is-inactive" : ""}>
        <path
          d="M 383 292 C 454 274 503 280 538 304"
          fill="none"
          stroke="var(--vtd-basilar)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 538 304 L 521 295 L 524 314 Z" fill="var(--vtd-basilar)" />
      </g>

      <g id="brainstem__labels">
        <text x="262" y="150" textAnchor="end" className="vtd-small-label">midbrain</text>
        <text x="238" y="298" textAnchor="end" className="vtd-small-label">pons</text>
        <text x="292" y="452" textAnchor="end" className="vtd-small-label">medulla</text>
        <text
          id="brainstem__label--basilar"
          data-vessel="BASILAR"
          x="390"
          y="225"
          textAnchor="start"
          className={`vtd-label vtd-clickable-label ${classes}`}
          aria-label={VESSEL_META.BASILAR.ariaLabel}
          {...handlers}
        >
          Basilar artery
        </text>
        <text x="286" y="552" textAnchor="end" className="vtd-context-label">vertebral</text>
        <text x="434" y="552" textAnchor="start" className="vtd-context-label">vertebral</text>
      </g>

      <g id="brainstem__locked-in-callout" data-vessel="BASILAR" className={classes}>
        <rect x="548" y="176" width="288" height="254" rx="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <text x="574" y="216" className="vtd-small-label">Basilar occlusion</text>
        <text x="574" y="246" className="vtd-small-label">↓</text>
        <text x="574" y="276" className="vtd-small-label">Pons/brainstem ischemia</text>
        <text x="574" y="328" className="vtd-label">Locked-in syndrome</text>
        <text x="574" y="358" className="vtd-small-label">concept</text>
        <text x="574" y="396" className="vtd-microcopy">awake/aware</text>
        <text x="574" y="416" className="vtd-microcopy">severe motor output loss</text>
      </g>

      <g id="brainstem__hit-targets" aria-hidden="true">
        <path data-vessel="BASILAR" className="vtd-hit-path" d={basilarPath} {...handlers} />
      </g>

      <g id="brainstem__microcopy">
        <text x="450" y="590" textAnchor="middle" className="vtd-microcopy">
          Basilar schematic focuses on pons/brainstem. No cortical basilar territory is shown.
        </text>
      </g>
    </svg>
  );
}
