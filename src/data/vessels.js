export const VESSELS = ["ACA", "MCA", "PCA", "BASILAR"];

export const VESSEL_META = {
  ACA: {
    label: "ACA",
    color: "#D9480F",
    shortDeficit: "medial leg area",
    summary:
      "ACA: mostly medial and superior cortex; high-yield deficit association is medial leg area.",
    ariaLabel:
      "Anterior cerebral artery. Medial and superior cortical territory. Classic deficit association: medial leg area.",
  },
  MCA: {
    label: "MCA",
    color: "#2563EB",
    shortDeficit: "lateral face/arm + language/attention",
    summary:
      "MCA: large lateral territory; face and arm plus language on dominant side or attention on nondominant side.",
    ariaLabel:
      "Middle cerebral artery. Large lateral cortical territory. Classic deficit association: lateral face and arm plus language or attention depending on side.",
  },
  PCA: {
    label: "PCA",
    color: "#7C3AED",
    shortDeficit: "occipital vision",
    summary:
      "PCA: posterior occipital territory; high-yield deficit association is vision.",
    ariaLabel:
      "Posterior cerebral artery. Posterior occipital visual territory. Classic deficit association: vision.",
  },
  BASILAR: {
    label: "Basilar",
    color: "#0F766E",
    shortDeficit: "pons/brainstem; locked-in concept",
    summary:
      "Basilar: pons and brainstem association; basilar occlusion can be associated with the locked-in syndrome concept.",
    ariaLabel:
      "Basilar artery. Midline posterior circulation artery on the anterior pons. Basilar occlusion can injure the pons and is associated with the locked-in syndrome concept.",
  },
};

export function getVesselState(vessel, selectedVessel, hoverVessel) {
  if (selectedVessel === vessel) return "selected";
  if (selectedVessel && selectedVessel !== vessel) return "inactive";
  if (!selectedVessel && hoverVessel === vessel) return "hovered";
  return "default";
}

export function getStateClass(vessel, selectedVessel, hoverVessel) {
  const state = getVesselState(vessel, selectedVessel, hoverVessel);

  if (state === "selected") return "is-selected";
  if (state === "hovered") return "is-hovered";
  if (state === "inactive") return "is-inactive";
  return "";
}

export const stateClass = {
  default: "",
  hovered: "is-hovered",
  selected: "is-selected",
  inactive: "is-inactive",
};
