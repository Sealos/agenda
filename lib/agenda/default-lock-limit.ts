import { Agenda } from ".";
import createDebugger from "debug";

const debug = createDebugger("agenda:defaultLockLimit");


/**
 * Set default lock limit per job type
 * @name Agenda#defaultLockLimit
 * @function
 * @param {Number} times Lock limit per job
 * @returns {Agenda} agenda instance
 */
export function defaultLockLimit(this: Agenda, times: number): Agenda {
    debug('Agenda.defaultLockLimit(%d)', times);
    this._defaultLockLimit = times;
    return this;
}
