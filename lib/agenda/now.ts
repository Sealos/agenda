import createDebugger from "debug";
import { Agenda } from ".";
import { Job, JobAttributesData } from "../job";

const debug = createDebugger("agenda:now");


/**
 * Create a job for this exact moment
 * @name Agenda#now
 * @function
 * @param name name of job to schedule
 * @param data data to pass to job
 * @param options
 */
export async function now<T extends JobAttributesData>(
    this: Agenda,
    name: string,
    data: T,
    options?: {
        priority: string | number
    }
): Promise<Job> {
    debug('Agenda.now(%s, [Object])', name);
    try {
        const job = this.create(name, data);

        job.schedule(new Date());

        if (options?.priority) {
            job.priority(options.priority);
        }

        await job.save();

        return job;
    } catch (error) {
        debug('error trying to create a job for this exact moment');
        throw error;
    }
}
