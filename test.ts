interface ClockInterface{
  currentTime: number;
  alert(): void
}
// 通过implements限制了实现的方法

interface ClockStatic{
  new (h:number, m:number): ClockInterface
  time: string;
}
// 通过const Clock:ClockStatic限制了构造函数、静态方法
const Clock:ClockStatic = class Clock implements ClockInterface {
  constructor (h:number, m:number) {
    console.log(h);
  }

  static time = 'clock'
  currentTime = 1
  alert () {}
};

// const clock = new Clock(1, 2);
// clock.alert

interface InClockConstructor { // !构造函数类型
  new (hour: number, minute: number): ClockConstructor;
  souce(): void
}
function createClock(Ctor: InClockConstructor, hour: number, minute: number) {
  return new Ctor(hour, minute);
}
class ClockConstructor {
  hour: number;
  minute: number;
  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }
  static souce() {}
  tick() {
    console.log(this.hour, this.minute);
  }
}
const clock = createClock(ClockConstructor, 1, 1);

function createConstru<T>(Ctor: { new (hour: number, minute: number): T }, hour: number, minute: number): T {
  return new Ctor(hour, minute);
}
createConstru(ClockConstructor, 1, 1);