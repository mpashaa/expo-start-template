import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  isLoading: boolean;
}

const initialState: CounterState = {
  value: 0,
  isLoading: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset, setLoading } =
  counterSlice.actions;

// Селекторы
export const selectCounter = (state: { counter: CounterState }) =>
  state.counter.value;
export const selectCounterLoading = (state: { counter: CounterState }) =>
  state.counter.isLoading;

export default counterSlice.reducer;
