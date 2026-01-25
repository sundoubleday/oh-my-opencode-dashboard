import { describe, expect, it } from "vitest"

import { computeWaitingDing } from "./ding-policy"

describe("computeWaitingDing", () => {
  it("dings on first observation when waiting", () => {
    const res = computeWaitingDing({
      prev: { prevWaiting: null, lastLeftWaitingAtMs: null },
      waiting: true,
      nowMs: 1000,
    })

    expect(res.play).toBe(true)
    expect(res.next.prevWaiting).toBe(true)
  })

  it("dings when entering waiting if last idle round-trip is >= 20s", () => {
    const res = computeWaitingDing({
      prev: { prevWaiting: false, lastLeftWaitingAtMs: 1000 },
      waiting: true,
      nowMs: 21_000,
    })

    expect(res.play).toBe(true)
  })

  it("suppresses ding when waiting round-trip is < 20s", () => {
    const left = computeWaitingDing({
      prev: { prevWaiting: true, lastLeftWaitingAtMs: null },
      waiting: false,
      nowMs: 1000,
    })

    expect(left.play).toBe(false)
    expect(left.next.prevWaiting).toBe(false)
    expect(left.next.lastLeftWaitingAtMs).toBe(1000)

    const back = computeWaitingDing({
      prev: left.next,
      waiting: true,
      nowMs: 20_999,
    })

    expect(back.play).toBe(false)
    expect(back.next.prevWaiting).toBe(true)
    expect(back.next.lastLeftWaitingAtMs).toBe(null)
  })
})
