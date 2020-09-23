import { SampleExtension } from "./extension";
import { Configuration } from "./configuration";
import { LoggerFactory } from "./utilities/logger-factory";

/**
 * Extension script entry point
 */
export default (parameters) => {
	// Only register this extension in the full review interface
	if (parameters.applicationContext !== "reviewinterface") {
		return;
	}

	const configuration = new Configuration();
	const loggerFactory = new LoggerFactory(configuration);
	
	return new SampleExtension(parameters, configuration, loggerFactory);
};
