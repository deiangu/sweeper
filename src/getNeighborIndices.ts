import type { MinefieldConfig } from "./createField";

export function getNeighborIndices(index: number, config: MinefieldConfig) {
    const candidates = []

    const isFirstRow = index < config.width;
    const isLastRow = index >= config.width * (config.height - 1);
    const isFirstColumn = index % config.width === 0;
    const isLastColumn = (index + 1) % config.width === 0;

    if (!isFirstRow) {
      if (!isFirstColumn) {
        candidates.push(index - config.width - 1);
      }
      candidates.push(index - config.width);
      if (!isLastColumn) {
        candidates.push(index - config.width + 1);
      }
    }

    if (!isFirstColumn) {
      candidates.push(index - 1);
    }
    if (!isLastColumn) {
      candidates.push(index + 1);
    }

    if (!isLastRow) {
      if (!isFirstColumn) {
        candidates.push(index + config.width - 1);
      }
      candidates.push(index + config.width);
      if (!isLastColumn) {
        candidates.push(index + config.width + 1);
      }
    }

    return candidates;
  }