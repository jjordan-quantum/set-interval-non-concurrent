import {setIntervalNoConcurrency, sleep} from "../src";
import {expect} from "chai";

describe('setIntervalNonConcurrent', async () => {
  it('should execute 5 intervals over 5 seconds when millis is 1000', async () => {
    let count = 0;

    setIntervalNoConcurrency(() => {
      count++;
    }, 1000, true);

    await sleep(5000);
    expect(count).to.eql(5);
  }).timeout(7000);
});
