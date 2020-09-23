import { LogLevelDesc, levels } from "loglevel";

/**
 * Relativity Sample Extension configuration
 */
export class Configuration {
	/**
	 * Whether or not the extension is in developer mode
	 * 
	 * This influences things like logging level and whether or not the developer card is available. Currently, this is 
	 * hard-coded, but eventually this could be driven off of the Relativity or Relativity Review settings.
	 */
	public developerMode: boolean = true;

	/**
	 * Logging level
	 * 
	 * This determines which logs are output to the console. If developer mode is on, this defaults to DEBUG. If developer 
	 * mode is off, this defaults to WARN.
	 */
	public get logLevel(): LogLevelDesc {
		return this.developerMode ? levels.DEBUG : levels.WARN;
	}
}
