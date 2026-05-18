export const VESSELS = ["ACA", "MCA", "PCA", "BASILAR"];

export const VESSEL_META = {
  ACA: {
    label: "ACA",
    color: "#D9480F",
    shortDeficit: "leg area",
    summary: "medial/superior cortical territory; leg area",
    ariaLabel:
      "Anterior cerebral artery. Medial and superior cortical territory. Classic deficit association: leg area.",
  },
  MCA: {
    label: "MCA",
    color: "#2563EB",
    shortDeficit: "face/arm + language/attention",
    summary:
      "large lateral cortical territory; face/arm plus language or attention depending on side",
    ariaLabel:
      "Middle cerebral artery. Large lateral cortical territory. Classic deficit association: face and arm plus language or attention depending on side.",
  },
  PCA: {
    label: "PCA",
    color: "#7C3AED",
    shortDeficit: "vision",
    summary: "posterior occipital visual territory; vision",
    ariaLabel:
      "Posterior cerebral artery. Posterior occipital visual territory. Classic deficit association: vision.",
  },
  BASILAR: {
    label: "Basilar",
    color: "#0F766E",
    shortDeficit: "pons/brainstem; locked-in concept",
    summary:
      "midline posterior circulation artery; pons/brainstem and locked-in syndrome concept",
    ariaLabel:
      "Basilar artery. Midline posterior circulation artery associated with pons and brainstem deficits. Basilar occlusion can be associated with the locked-in syndrome concept.",
  },
};

export function getVesselState(vessel, selectedVessel, hoverVessel) {
  if (selectedVessel === vessel) return "selected";
  if (!selectedVessel && hoverVessel === vessel) return "hovered";
  if (selectedVessel && selectedVessel !== vessel) return "inactive";
  return "default";
}

export const stateClass = {
  default: "",
  hovered: "is-hovered",
  selected: "is-selected",
  inactive: "is-inactive",
};
