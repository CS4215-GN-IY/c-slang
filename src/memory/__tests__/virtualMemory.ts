import { VirtualMemory } from '../virtualMemory';
import { Segment } from '../segment';

describe('VirtualMemory', () => {
  test('should allocate page tables correctly', () => {
    const virtualMemory = new VirtualMemory(1000, 1000, 1000, 1000);

    const textSegmentAddress = virtualMemory.segmentAddresses.get(Segment.TEXT);
    expect(textSegmentAddress).toBeDefined();
    expect(textSegmentAddress?.baseAddress).toBe(0);
    expect(textSegmentAddress?.getFreeAddress()).toBe(0);
    expect(textSegmentAddress?.topAddress).toBe(8000);

    const dataSegmentAddress = virtualMemory.segmentAddresses.get(Segment.DATA);
    expect(dataSegmentAddress).toBeDefined();
    expect(dataSegmentAddress?.baseAddress).toBe(8000);
    expect(dataSegmentAddress?.getFreeAddress()).toBe(8000);
    expect(dataSegmentAddress?.topAddress).toBe(16000);

    const stackSegmentAddress = virtualMemory.segmentAddresses.get(
      Segment.STACK
    );
    expect(stackSegmentAddress).toBeDefined();
    expect(stackSegmentAddress?.baseAddress).toBe(16000);
    expect(stackSegmentAddress?.getFreeAddress()).toBe(16000);
    expect(stackSegmentAddress?.topAddress).toBe(24000);

    const heapSegmentAddress = virtualMemory.segmentAddresses.get(Segment.HEAP);
    expect(heapSegmentAddress).toBeDefined();
    expect(heapSegmentAddress?.baseAddress).toBe(24000);
    expect(heapSegmentAddress?.getFreeAddress()).toBe(24000);
    expect(heapSegmentAddress?.topAddress).toBe(32000);

    expect(virtualMemory.l2PageTables.length).toBe(1);
    expect(virtualMemory.l3PageTables.length).toBe(1);
    expect(virtualMemory.l4PageTables.length).toBe(1);
    expect(virtualMemory.l5PageTables.length).toBe(8);
  });
});
