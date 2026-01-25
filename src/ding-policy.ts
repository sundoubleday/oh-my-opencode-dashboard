export type WaitingDingState = {
  prevWaiting: boolean | null
  lastLeftWaitingAtMs: number | null
}

export function computeWaitingDing(opts: {
  prev: WaitingDingState
  waiting: boolean
  nowMs: number
  suppressMs?: number
}): { play: boolean; next: WaitingDingState } {
  const suppressMs = opts.suppressMs ?? 20_000

  let lastLeftWaitingAtMs = opts.prev.lastLeftWaitingAtMs

  if (opts.prev.prevWaiting === true && opts.waiting === false) {
    lastLeftWaitingAtMs = opts.nowMs
  }

  let play = false
  if (opts.prev.prevWaiting === false && opts.waiting === true) {
    const dt = typeof lastLeftWaitingAtMs === "number" ? opts.nowMs - lastLeftWaitingAtMs : null
    play = !(typeof dt === "number" && dt >= 0 && dt < suppressMs)
  }

  if (opts.waiting === true) {
    lastLeftWaitingAtMs = null
  }

  return {
    play,
    next: {
      prevWaiting: opts.waiting,
      lastLeftWaitingAtMs,
    },
  }
}
