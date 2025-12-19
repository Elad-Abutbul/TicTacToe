export const GAME_CONSTANTS = {
  RESUME: "resume",
  STOP: "stop",
  X: "X",
  O: "O",
  BOARD_SIZE: 9 as number,
  TURN_DURATION_SECONDS: 10 as number,
  TIMER_INTERVAL_MS: 1000 as number,
  WINNING_LINES: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
} as const;
