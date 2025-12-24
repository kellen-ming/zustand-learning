export interface CounterState {
  count: number
  isLoading: boolean
  lastUpdated?: string
}

export interface CounterActions {
  increment: () => void
  decrement: () => void
  reset: () => void
  incrementAsync: (amount?: number) => Promise<void>
  getCurrentCount: () => number
}

export type CounterStore = CounterState & CounterActions