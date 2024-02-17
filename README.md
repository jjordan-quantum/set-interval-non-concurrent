### set-interval-non-concurrent

Simple async execution interval that guarantees only one instance of your function will be running at any moment - aka non concurrency.

Install like this:

```shell
npm i set-interval-non-concurrent
```

Include in file like this:

```typescript
import {setIntervalNoConcurrency} from "set-interval-non-concurrent";
```

Use like this:

```typescript
setIntervalNoConcurrency(() => {
  console.log(`Do something amazing every 1 second!`);
  console.log(`And if it takes longer than 1 second, wait until it's done before doing it again!`);
}, 1000);
```

Note: after an execution that takes longer that the specified interval, it will wait until the next interval to execute again - will not execute immediately as in loop continuation.

