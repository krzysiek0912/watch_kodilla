function pad0(value) {
  let result = value.toString();
  if (result.length < 2) {
    result = "0" + result;
  }
  return result;
}

class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.displayResults = results;
    this.results = [];
    this.reset();
    this.print();
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }
  resetResultList() {
    this.results = [];
    this.printResults();
  }

  print() {
    this.display.innerText = this.format(this.times);
  }
  printResults() {
    const { results, displayResults } = this;
    displayResults.innerText = "";
    results.map(result => {
      let li = document.createElement("li");
      li.append(result);
      this.displayResults.append(li);
    });
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }
  stop() {
    this.running = false;
    clearInterval(this.watch);
  }
  resetStoper() {
    this.stop();
    this.reset();
    this.print();
  }
  addResult() {
    const { format, results, printResults, times } = this;
    if (this.running) {
      const newResult = this.format(this.times);
      this.results = [...this.results, newResult];
      this.printResults();
    }
  }
  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }
}
const stopwatch = new Stopwatch(
  document.querySelector(".stopwatch"),
  document.querySelector(".results")
);

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopwatch.start());

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopwatch.stop());

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => stopwatch.resetStoper());

let resultButton = document.getElementById("result");
resultButton.addEventListener("click", () => stopwatch.addResult());

let resetResultListButton = document.getElementById("resetResultList");
resetResultListButton.addEventListener("click", () =>
  stopwatch.resetResultList()
);
