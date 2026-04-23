import { Observable } from "rxjs";

const obs = new Observable((subscriber) => {
  subscriber.next(123);
  subscriber.next({ titi: false });
  const timer = setTimeout(() => {
    console.log("top");
    subscriber.next("tutu");
    subscriber.error(new Error("oups"));
  }, 2000);

  return () => {
    console.log("housekeeping");
    clearTimeout(timer);
  };
});

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

const subscription = obs.subscribe(observer);

setTimeout(() => {
  subscription.unsubscribe();
}, 500);
