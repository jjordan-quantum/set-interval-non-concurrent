export async function sleep(timeout: number | string): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, typeof(timeout) === 'number'
    ? timeout
    : parseInt(timeout)
  ));
}

export function setIntervalNoConcurrency(callback: Function, timeout: number, logging?: boolean): void {
  (async () => {
    let last = Date.now();

    while(true) {
      logging ? console.log('--- executing callback') : {};
      await callback();
      const now: number = Date.now();
      const elapsed: number = now - last;
      logging ? console.log(`--- elapsed: ${elapsed}ms`) : {};

      if(elapsed < timeout) {
        // wait until next interval has elapsed
        logging ? console.log(`--- insufficient timeout elapsed - waiting: ${timeout - elapsed}ms`) : {};
        await sleep(timeout - elapsed);
      } else if(elapsed > timeout) {
        // determine how many timeouts have lapsed
        const periods: number = Math.floor(elapsed / timeout);
        logging ? console.log(`--- sufficient timeout elapsed: ${periods} periods`) : {};

        // update last to end of last period
        last += timeout * periods;

        // sleep until next period
        const next: number = last + timeout;
        logging ? console.log(`--- waiting until next period: ${next - now}ms`) : {};
        await sleep(next - now);
      }

      last += timeout;
    }
  })();
}
