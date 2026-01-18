import { Tile } from './Tile';
import type { TileData } from '../../stores/gameStore';

interface TileRowProps {
  rowIndex: number;
  tiles: TileData[];
  position: [number, number, number];
}

export function TileRow({ rowIndex, tiles, position }: TileRowProps) {
  return (
    <group position={position}>
      {tiles.map((tileData, colIndex) => (
        <Tile
          key={`${rowIndex}-${colIndex}`}
          letter={tileData.letter}
          state={tileData.state}
          position={[(colIndex - 2) * 1.3, 0, 0]}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))}
    </group>
  );
}
