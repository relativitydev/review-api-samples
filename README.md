# Relativity Review Sample Extension

This is an example Relativity Review extension project. It shows how to use Webpack and TypeScript to build custom functionality for the Relativity Review Interface using an extension script.

### Using the Sample Extension Project
- [Developer Setup](#developer-setup)
- [Build](#build)
- [Deploy](#deploy)
- [Running the Sample ](#running-the-sample)
	- [Verifying the Extension Loaded](#verifying-the-extension-loaded)
	- [Filtering Logs](#filtering-logs)
	- [Sample Functionality](#sample-functionality)

### How the Sample Extension Works
- [Build System](#build-system)
	- [Webpack](#webpack)
	- [Plugins](#plugins)
- [Polyfills](#polyfills)
- [Logging](#logging)
	- [Logging Levels](#logging-levels)
	- [Custom Prefixes](#custom-prefixes)
- [Communicating Between Cards](#communicating-between-cards)
- [Coordinating with Navigation](#coordinating-with-navigation)
	- [Listening for Navigation Events](#listening-for-navigation-events)
	- [Invoking Navigation](#invoking-navigation)


## Developer Setup

1. Ensure you have [Node.js](https://nodejs.org/en/) installed.

	We do not have a recommended version of Node.js. However, we suggest using the [nvm-windows](https://github.com/coreybutler/nvm-windows) tool to manage your Node.js version. `nvm-windows` allows you to switch easily between different versions of Node.js, making it easier to test on different versions, upgrade, and work on multiple projects.

2. Install application dependencies

	To install the application dependencies, run the following from within the project root:

	```
	$ npm install
	```

3. Install a text editor or IDE of your choice

	We suggest Visual Studio Code. It has an integrated terminal, great intellisense, and support for many plugins like ESLint (which we would recommend integrating into this application's build).


## Build

To perform a development build, run:

```
$ npm run build.dev
```

This will build the application into the `/dist` directory without performing minification and obfuscation.

To perform a production build, run:

```
$ npm run build
```

This will enable code minification and obfuscation for a smaller script size.


## Deploy

To deploy the extension, build and upload the resources files in the `/dist` directory as resource files for a Relativity application. For more details, refer to [Resource files](https://help.relativity.com/10.3/Content/Relativity/Resource_files.htm).

In the future, Publish To Relativity could be used to automate deploying the extension to Relativity.


## Running the Sample

Once the extension has been uploaded to a Relativity application, to run the extension: 
1. Install the application to a workspace.
2. If the application or extension is newly installed to the workspace, it may be necessary to enable developer mode to circumvent server-side caching of extension scripts or to wait 10 minutes for the cache to expire.
3. View a document in the workspace. The extension should be loaded and running.

### Verifying the Extension Loaded

To verify that the extension is loaded and running successfully:
1. Open developer tools in Chrome.
2. Open the Network tab.
3. Go to the workspace where the extension application has been installed.
4. View a document in the Review Interface.
5. In the developer tools Network tab, filter for `GetReviewExtensionScripts` (the Name will appear as the workspace's artifact ID). Ensure that the extension script's name is listed in the response from `GetReviewExtensionScripts`.
6. In the developer tools Network tab, filter for the name of your extension script (e.g., `review.index.sample.extension.js`). Ensure that there is a network request for the extension script.
7. Open the Console tab and switch to the ReviewInterface iframe. Update the following lines with your extension's ID and run them in the console:
```
var myExtensionId = "relativity.sample.extension";
var myExtension = review.extensions.getById(myExtensionId);
myExtension.status === "loaded";
```
If this returns true, your extension has been successfully parsed by the Review Interface and is running.

### Filtering Logs

Filtering console logs to only the Sample Extension's logs makes it easier to see or debug what the Sample Extension is doing without having to sift through chatter coming from other code. Follow these steps to filter the logging:

1. Open developer tools in Chrome.
2. Open the Console.
3. In the "Filter" text box on the top toolbar, type `[SE`.

### Sample Functionality

The sample extension has three custom cards: Clock, Color Controls, and Navigation. They are defined by setting the `cards` value on the [IExtensionConfig](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/extensions.iextensionconfig.html#cards) to an array of [ICardConfig](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/cards.icardconfig.html) objects. The sample extension also uses the Review Interface [IExtensionLifecycle.ready](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/extensions.iextensionlifecycle.html#ready) event to show the cards within the Review Interface by invoking [createCard](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/cards.icardservice.html#createcard).
* The Clock card is an iframe card that loads custom HTML, CSS, and JS files to display a clock alongside the coding pane.
* The Color Controls card is also an iframe card loading custom HTML, CSS, and JS files. It has button that changes the background color of the Navigation card.
* The Navigation card has a custom loader. It displays the current document's artifact ID (staying up-to-date as the Review Interface moves between documents) and has two buttons, previous and next, that can invoke the Review Interface's document navigation.

The sample extension also has one custom context menu option, Show Selected Text. It is defined by setting the `viewerContextMenus` option on the [IExtensionConfig](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/extensions.iextensionconfig.html#viewercontextmenus). In the native and text viewers when text has been highlighted, this custom context menu option is available. When clicked, Show Selected Text will display a browser alert containing the text that was selected.

There are additional features that enable extension scripts to define [custom viewers](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/extensions.iextensionconfig.html#viewers) and custom [toolbar controls](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/extensions.iextensionconfig.html#viewertoolbarcontrols). The [lifecycle events](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/extensions.iextensionconfig.html#lifecycle) also have access to the full Review Interface API and can be used to run any code to customize the Review Interface.


## Build System

This extension is built using the [TypeScript](https://www.typescriptlang.org/) compiler and the [Webpack](https://webpack.js.org/) bundler. The TypeScript configuration can be found in `tsconfig.json` and the Webpack configuration can be found in `webpack.config.js`. It is important to note that you can replace the TypeScript compiler with something like Babel if you choose, as we are not leveraging any TypeScript-specific features other than its type system.

### Webpack

[Webpack](https://webpack.js.org/) is configured to build this extension via the `webpack.config.js` file:
* `entry`: is used to specify the main file for the extension. Webpack uses this property to start processing module dependencies and bundle them into a single file. In this sample, `/src/index.ts` is the entry file.
* `output`: specifies the path and filename to be used to emit the bundle file/s for the extension. In this sample, `review.index.sample.extension.js` is written to the `/dist` directory.

More info on Webpack configuration can be found [here](https://webpack.js.org/concepts/).

### Webpack Plugins

This project uses two Webpack plugins. The first is a custom plugin called `ReviewExtensionPlugin` that packages your output as a Review Extension Script so that it is ready to be uploaded to Relativity. The plugin source code can be found in `/build-utilities/review-extension-plugin.js`.

When using the `ReviewExtensionPlugin`, the entry file (in this case, `/src/index.ts`) should define a default export function that returns an [IExtensionConfig](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/extensions.iextensionconfig.html). The plugin will add the invocation of the function so that the extension script out-put to the `/dist` directory is an immediately invoked function expression ([IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)):
```javascript
(function(parameters){
	// This function is defined from your entry file and its dependencies.
}(params))
```

When you are NOT using the `ReviewExtensionPlugin`, your extension script must already be an an immediately invoked function expression ([IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)). Keep in mind that choosing to use or not to use the plugin will affect the format of the extension code.

The second plugin is `CopyPlugin`, which is used to prefix file names so that they are recognized by the Review Extension Framework. The HTML, CSS, or JS files referenced from iframe cards, for example, need to be uploaded to the Relativity application as additional resource files. The `CopyPlugin` is configured to copy these files to the `/dist` folder and update each file name to begin with `review.` (for example, clock.css becomes review.clock.css). NOTE: When adding additional resource files, this section of `webpack.config.js` needs to be updated include those files.


## Polyfills

For the most part, polyfills will not be necessary. Because your extension is being executed in the same window as the Review Interface, it will benefit from many of the polyfills that the Review Interface provides, such as `Promise` and `Array.includes`.


## Logging

A logging framework has been integrated into the extension to facilitate logging. The framework we chose is [loglevel](https://github.com/pimterry/loglevel). We chose this framework for the following reasons:

- It is lightweight
- It supports custom prefixes which can make it easy to filter logs
- It support configurable logging levels
- It binds directly to the console methods to make it clear which components are logging

### Logging Levels

The `loglevel` logging framework supports customizable logging levels. The extension is configured to set the logging level based on the `developerMode` configuration setting. You can set `developerMode` or explicitly set the logging level in extension configuration, located in `/src/configuration.ts`.

By default, the logging level is set to `DEBUG` when `developerMode` is enabled and `WARN` when `developerMode` is disabled. By default, `developerMode` is hardcoded to true.

### Custom Prefixes

The `loglevel` framework also supports customizable logging prefixes and templates. In `/src/utilities/logger-factory.ts`, this extension defines a template to prefix all logging messages with `[SE`, which can be used to filter console logs. For more details, see [Filtering Logs](#filtering-logs).

If you use this sample extension to build a new extension of your own, we suggest updating the logging prefix to use a unique abbreviation, rather than SE (for "Sample Extension").


## Communicating Between Cards
In this sample extension, the Color Controls and Navigation cards demonstrate how two cards can communicate with one another.

The Navigation card implements and exposes a public method `updateBackgroundGradient` on its [card instance](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/cards.icardinstance.html).

The Color Controls card uses custom JavaScript to access the Navigation card via the Review Interface API and invoke the Navigation card's public method to update its background. (This code could as easily run in the `ColorControlsCardInstance` rather than in a JS file loaded by the Color Controls card.)

## Coordinating with Navigation
The Navigation card uses a [Viewer Collection](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/viewer.iviewercollection.html) event handler to display the current document's artifact ID and keep it up to date.

### Listening for Navigation Events

The Navigation card listens on the Viewer Collection [ContentChanged](https://platform.relativity.com/relativityreviewapi/12.0/enums/viewer.viewercollectioneventtype.html#contentchanged) event, which fires when the content displayed by the viewer changes. The content is usually a document, but it can also be an RDO file or a "placeholder" when there is no document or when an error has occurred. The ContentChanged event is triggered when navigating to a different document, or switching to a different viewer type, for example.

In the future, the Review Interface may have multiple Viewer Collections. This sample extension is not future-proofed for that eventuality. The sample extension passes the [main collection](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/viewer.iviewerservice.html#maincollection) into the Navigation card when it is created in the [Ready](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/extensions.iextensionlifecycle.html#ready) lifecycle event handler and never updates the Navigation card's registered viewer collection.

### Invoking Navigation

The Navigation card can also control the Review Interface's navigation using its previous and next buttons. The previous and next buttons simply invoke the Queue Pointer's [navigateToNext](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/queue.iqueuepointer.html#navigatetonext) and [navigateToPrevious](https://platform.relativity.com/relativityreviewapi/12.0/interfaces/queue.iqueuepointer.html#navigatetoprevious) API methods.

