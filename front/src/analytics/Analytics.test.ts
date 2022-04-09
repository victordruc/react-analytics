import { UserAction } from "./Analytics";

test("UserAction object creation default timestamp", () => {
  // HW: check timestamp

  // Set mock time ------------->
  const now = Date.now();
  Date.now = () => now;

  // Set mock time -------------<

  // Emulate delay
  for (let i = 0; i <= 10000000; i++) {}
  // Emulate delay

  const testedUserAction = new UserAction("click");
  const expectedUserAction = { type: "click", timestamp: now };

  expect(testedUserAction).toMatchObject(expectedUserAction);

  // Restore realTime --------------------->
  Date.now = () => new Date().getTime();
  // Restore realTime ---------------------<
});

test("UserAction object creation send timestamp", () => {
  // HW: check timestamp
  const now = Date.now();

  // Emulate delay
  for (let i = 0; i <= 10000000; i++) {}
  // Emulate delay

  const testedUserAction = new UserAction("click", now);
  const expectedUserAction = { type: "click", timestamp: now };

  expect(testedUserAction).toMatchObject(expectedUserAction);
});
