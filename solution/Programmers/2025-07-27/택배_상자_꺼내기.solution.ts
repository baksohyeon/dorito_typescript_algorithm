export const solution = (n: number, w: number, num: number) => {
  // Find which layer the target box is in (0-indexed)
  const targetLayer = Math.floor((num - 1) / w);
  const positionInLayer = (num - 1) % w;

  // Calculate the column position based on layer direction
  let targetColumn: number;
  if (targetLayer % 2 === 0) {
    // Even layers (0, 2, 4...): left to right
    targetColumn = positionInLayer;
  } else {
    // Odd layers (1, 3, 5...): right to left  
    targetColumn = w - 1 - positionInLayer;
  }

  let boxesToRemove = 1; // Include the target box itself

  // Check each layer above the target layer
  const totalLayers = Math.ceil(n / w);

  for (let layer = targetLayer + 1; layer < totalLayers; layer++) {
    const layerStartBox = layer * w + 1;
    const layerEndBox = Math.min((layer + 1) * w, n);

    // Calculate which box number is at the target column in this layer
    let boxAtColumn: number;

    if (layer % 2 === 0) {
      // Even layer: left to right
      boxAtColumn = layerStartBox + targetColumn;
    } else {
      // Odd layer: right to left
      boxAtColumn = layerStartBox + (w - 1 - targetColumn);
    }

    // Check if this box exists and is within the layer bounds
    if (boxAtColumn >= layerStartBox && boxAtColumn <= layerEndBox) {
      boxesToRemove++;
    }
  }

  return boxesToRemove;
};
