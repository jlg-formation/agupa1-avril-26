import { interval, Observable, startWith, map, tap } from "rxjs";

const observer = {
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

console.log("start");
// map((d) => d + 1)(
//   map((d) => d + 1)(
//     map((d) => d + 1)(map((d) => d + 1)(startWith(-1)(interval(1000)))),
//   ),
// ).subscribe(observer);

interval(1000)
  .pipe(
    startWith(-1),
    map((d) => d + 1),
    map((d) => d + 1),
    map((d) => d + 1),
    map((d) => d + 1),
    tap((d) => {
      console.log("d: ", d);
    }),
  )
  .subscribe();
