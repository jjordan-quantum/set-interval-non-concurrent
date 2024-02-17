export async function sleep(timeout: number | string): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, typeof(timeout) === 'number'
    ? timeout
    : parseInt(timeout, 10)
  ));
}

export function setIntervalNoConcurrency(callback: () => void, timeout: number, logging?: boolean): void {
  (async () => {
    let last = Date.now();

    while(true) {
      await callback();
      const now: number = Date.now();
      const elapsed: number = now - last;

      if(elapsed < timeout) {
        // wait until next interval has elapsed
        await sleep(timeout - elapsed);
      } else if(elapsed > timeout) {
        // determine how many timeouts have lapsed
        const periods: number = Math.floor(elapsed / timeout);

        // update last to end of last period
        last += timeout * periods;

        // sleep until next period
        const next: number = last + timeout;
        await sleep(next - now);
      }

      last += timeout;
    }
  })();
}
