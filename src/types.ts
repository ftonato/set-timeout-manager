/** A function that takes no arguments and returns no value. */
export type TimeoutFn = () => void;

/** An object to store timeout IDs keyed by string identifiers. */
export type TimeoutIds = Record<string, number | NodeJS.Timeout>;
