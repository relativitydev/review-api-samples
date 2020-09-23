import * as log from "loglevel";
import * as logPrefixer from "loglevel-plugin-prefix";
import { Configuration } from "../configuration";

/**
 * Factory class for creating loggers
 * 
 * The logging framework used is loglevel.
 */
export class LoggerFactory {
	private _level: log.LogLevelDesc;

	/**
	 * Creates an instance of LoggerFactory.
	 * @param {Configuration} configuration Extension configuration
	 */
	constructor(configuration: Configuration) {
		this._level = configuration.logLevel;
		logPrefixer.reg(log);
		logPrefixer.apply(log, {
			template: `[SE: %n] [%l]:`,
			levelFormatter: level => level.toUpperCase(),
		});
		log.setDefaultLevel(this._level);
	}

	/**
	 * Creates a new Logger
	 * 
	 * If a logger with the provided name has already been created, the original instance will be returned.
	 * @param {string} name Name of the logger
	 * @returns {log.Logger} Loggere instance
	 */
	public create(name: string): log.Logger {
		const logger = log.getLogger(name);
		logger.setLevel(this._level);
		return logger;
	}	
}
