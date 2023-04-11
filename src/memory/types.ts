import { type MappedMemoryRegion } from './mappedMemoryRegion';

export interface Segments extends Record<string, MappedMemoryRegion> {
  text: MappedMemoryRegion;
  data: MappedMemoryRegion;
  stack: MappedMemoryRegion;
  heap: MappedMemoryRegion;
}
