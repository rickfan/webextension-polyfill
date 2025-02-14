(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("webextension-polyfill", ["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.browser = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.10.0 - Mon May 29 2023 15:39:09 */
  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */
  /* vim: set sts=2 sw=2 et tw=80: */
  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  // if (!globalThis.chrome?.runtime?.id) {
  //   throw new Error("This script should only be loaded in a browser extension.");
  // }
  // if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
  //   const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";

  //   // Wrapping the bulk of this polyfill in a one-time-use function is a minor
  //   // optimization for Firefox. Since Spidermonkey does not fully parse the
  //   // contents of a function until the first time it's called, and since it will
  //   // never actually need to be called, this allows the polyfill to be included
  //   // in Firefox nearly for free.
  //   const wrapAPIs = extensionAPIs => {
  //     // NOTE: apiMetadata is associated to the content of the api-metadata.json file
  //     // at build time by replacing the following "include" with the content of the
  //     // JSON file.
  //     const apiMetadata = {
  //       "alarms": {
  //         "clear": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "clearAll": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "get": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "getAll": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         }
  //       },
  //       "bookmarks": {
  //         "create": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "get": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getChildren": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getRecent": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getSubTree": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getTree": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "move": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         },
  //         "remove": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeTree": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "search": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "update": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         }
  //       },
  //       "browserAction": {
  //         "disable": {
  //           "minArgs": 0,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "enable": {
  //           "minArgs": 0,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "getBadgeBackgroundColor": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getBadgeText": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getPopup": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getTitle": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "openPopup": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "setBadgeBackgroundColor": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "setBadgeText": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "setIcon": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "setPopup": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "setTitle": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         }
  //       },
  //       "browsingData": {
  //         "remove": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         },
  //         "removeCache": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeCookies": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeDownloads": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeFormData": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeHistory": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeLocalStorage": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removePasswords": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removePluginData": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "settings": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         }
  //       },
  //       "commands": {
  //         "getAll": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         }
  //       },
  //       "contextMenus": {
  //         "remove": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeAll": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "update": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         }
  //       },
  //       "cookies": {
  //         "get": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getAll": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getAllCookieStores": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "remove": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "set": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         }
  //       },
  //       "devtools": {
  //         "inspectedWindow": {
  //           "eval": {
  //             "minArgs": 1,
  //             "maxArgs": 2,
  //             "singleCallbackArg": false
  //           }
  //         },
  //         "panels": {
  //           "create": {
  //             "minArgs": 3,
  //             "maxArgs": 3,
  //             "singleCallbackArg": true
  //           },
  //           "elements": {
  //             "createSidebarPane": {
  //               "minArgs": 1,
  //               "maxArgs": 1
  //             }
  //           }
  //         }
  //       },
  //       "downloads": {
  //         "cancel": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "download": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "erase": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getFileIcon": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         },
  //         "open": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "pause": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeFile": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "resume": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "search": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "show": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         }
  //       },
  //       "extension": {
  //         "isAllowedFileSchemeAccess": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "isAllowedIncognitoAccess": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         }
  //       },
  //       "history": {
  //         "addUrl": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "deleteAll": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "deleteRange": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "deleteUrl": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getVisits": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "search": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         }
  //       },
  //       "i18n": {
  //         "detectLanguage": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getAcceptLanguages": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         }
  //       },
  //       "identity": {
  //         "launchWebAuthFlow": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         }
  //       },
  //       "idle": {
  //         "queryState": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         }
  //       },
  //       "management": {
  //         "get": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getAll": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "getSelf": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "setEnabled": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         },
  //         "uninstallSelf": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         }
  //       },
  //       "notifications": {
  //         "clear": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "create": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         },
  //         "getAll": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "getPermissionLevel": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "update": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         }
  //       },
  //       "pageAction": {
  //         "getPopup": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getTitle": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "hide": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "setIcon": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "setPopup": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "setTitle": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         },
  //         "show": {
  //           "minArgs": 1,
  //           "maxArgs": 1,
  //           "fallbackToNoCallback": true
  //         }
  //       },
  //       "permissions": {
  //         "contains": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getAll": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "remove": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "request": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         }
  //       },
  //       "runtime": {
  //         "getBackgroundPage": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "getPlatformInfo": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "openOptionsPage": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "requestUpdateCheck": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "sendMessage": {
  //           "minArgs": 1,
  //           "maxArgs": 3
  //         },
  //         "sendNativeMessage": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         },
  //         "setUninstallURL": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         }
  //       },
  //       "sessions": {
  //         "getDevices": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "getRecentlyClosed": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "restore": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         }
  //       },
  //       "storage": {
  //         "local": {
  //           "clear": {
  //             "minArgs": 0,
  //             "maxArgs": 0
  //           },
  //           "get": {
  //             "minArgs": 0,
  //             "maxArgs": 1
  //           },
  //           "getBytesInUse": {
  //             "minArgs": 0,
  //             "maxArgs": 1
  //           },
  //           "remove": {
  //             "minArgs": 1,
  //             "maxArgs": 1
  //           },
  //           "set": {
  //             "minArgs": 1,
  //             "maxArgs": 1
  //           }
  //         },
  //         "managed": {
  //           "get": {
  //             "minArgs": 0,
  //             "maxArgs": 1
  //           },
  //           "getBytesInUse": {
  //             "minArgs": 0,
  //             "maxArgs": 1
  //           }
  //         },
  //         "sync": {
  //           "clear": {
  //             "minArgs": 0,
  //             "maxArgs": 0
  //           },
  //           "get": {
  //             "minArgs": 0,
  //             "maxArgs": 1
  //           },
  //           "getBytesInUse": {
  //             "minArgs": 0,
  //             "maxArgs": 1
  //           },
  //           "remove": {
  //             "minArgs": 1,
  //             "maxArgs": 1
  //           },
  //           "set": {
  //             "minArgs": 1,
  //             "maxArgs": 1
  //           }
  //         }
  //       },
  //       "tabs": {
  //         "captureVisibleTab": {
  //           "minArgs": 0,
  //           "maxArgs": 2
  //         },
  //         "create": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "detectLanguage": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "discard": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "duplicate": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "executeScript": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         },
  //         "get": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getCurrent": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         },
  //         "getZoom": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "getZoomSettings": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "goBack": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "goForward": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "highlight": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "insertCSS": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         },
  //         "move": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         },
  //         "query": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "reload": {
  //           "minArgs": 0,
  //           "maxArgs": 2
  //         },
  //         "remove": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "removeCSS": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         },
  //         "sendMessage": {
  //           "minArgs": 2,
  //           "maxArgs": 3
  //         },
  //         "setZoom": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         },
  //         "setZoomSettings": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         },
  //         "update": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         }
  //       },
  //       "topSites": {
  //         "get": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         }
  //       },
  //       "webNavigation": {
  //         "getAllFrames": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "getFrame": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         }
  //       },
  //       "webRequest": {
  //         "handlerBehaviorChanged": {
  //           "minArgs": 0,
  //           "maxArgs": 0
  //         }
  //       },
  //       "windows": {
  //         "create": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "get": {
  //           "minArgs": 1,
  //           "maxArgs": 2
  //         },
  //         "getAll": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "getCurrent": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "getLastFocused": {
  //           "minArgs": 0,
  //           "maxArgs": 1
  //         },
  //         "remove": {
  //           "minArgs": 1,
  //           "maxArgs": 1
  //         },
  //         "update": {
  //           "minArgs": 2,
  //           "maxArgs": 2
  //         }
  //       }
  //     };
  //     if (Object.keys(apiMetadata).length === 0) {
  //       throw new Error("api-metadata.json has not been included in browser-polyfill");
  //     }

  //     /**
  //      * A WeakMap subclass which creates and stores a value for any key which does
  //      * not exist when accessed, but behaves exactly as an ordinary WeakMap
  //      * otherwise.
  //      *
  //      * @param {function} createItem
  //      *        A function which will be called in order to create the value for any
  //      *        key which does not exist, the first time it is accessed. The
  //      *        function receives, as its only argument, the key being created.
  //      */
  //     class DefaultWeakMap extends WeakMap {
  //       constructor(createItem, items = undefined) {
  //         super(items);
  //         this.createItem = createItem;
  //       }
  //       get(key) {
  //         if (!this.has(key)) {
  //           this.set(key, this.createItem(key));
  //         }
  //         return super.get(key);
  //       }
  //     }

  //     /**
  //      * Returns true if the given object is an object with a `then` method, and can
  //      * therefore be assumed to behave as a Promise.
  //      *
  //      * @param {*} value The value to test.
  //      * @returns {boolean} True if the value is thenable.
  //      */
  //     const isThenable = value => {
  //       return value && typeof value === "object" && typeof value.then === "function";
  //     };

  //     /**
  //      * Creates and returns a function which, when called, will resolve or reject
  //      * the given promise based on how it is called:
  //      *
  //      * - If, when called, `chrome.runtime.lastError` contains a non-null object,
  //      *   the promise is rejected with that value.
  //      * - If the function is called with exactly one argument, the promise is
  //      *   resolved to that value.
  //      * - Otherwise, the promise is resolved to an array containing all of the
  //      *   function's arguments.
  //      *
  //      * @param {object} promise
  //      *        An object containing the resolution and rejection functions of a
  //      *        promise.
  //      * @param {function} promise.resolve
  //      *        The promise's resolution function.
  //      * @param {function} promise.reject
  //      *        The promise's rejection function.
  //      * @param {object} metadata
  //      *        Metadata about the wrapped method which has created the callback.
  //      * @param {boolean} metadata.singleCallbackArg
  //      *        Whether or not the promise is resolved with only the first
  //      *        argument of the callback, alternatively an array of all the
  //      *        callback arguments is resolved. By default, if the callback
  //      *        function is invoked with only a single argument, that will be
  //      *        resolved to the promise, while all arguments will be resolved as
  //      *        an array if multiple are given.
  //      *
  //      * @returns {function}
  //      *        The generated callback function.
  //      */
  //     const makeCallback = (promise, metadata) => {
  //       return (...callbackArgs) => {
  //         if (extensionAPIs.runtime.lastError) {
  //           promise.reject(new Error(extensionAPIs.runtime.lastError.message));
  //         } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
  //           promise.resolve(callbackArgs[0]);
  //         } else {
  //           promise.resolve(callbackArgs);
  //         }
  //       };
  //     };
  //     const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";

  //     /**
  //      * Creates a wrapper function for a method with the given name and metadata.
  //      *
  //      * @param {string} name
  //      *        The name of the method which is being wrapped.
  //      * @param {object} metadata
  //      *        Metadata about the method being wrapped.
  //      * @param {integer} metadata.minArgs
  //      *        The minimum number of arguments which must be passed to the
  //      *        function. If called with fewer than this number of arguments, the
  //      *        wrapper will raise an exception.
  //      * @param {integer} metadata.maxArgs
  //      *        The maximum number of arguments which may be passed to the
  //      *        function. If called with more than this number of arguments, the
  //      *        wrapper will raise an exception.
  //      * @param {boolean} metadata.singleCallbackArg
  //      *        Whether or not the promise is resolved with only the first
  //      *        argument of the callback, alternatively an array of all the
  //      *        callback arguments is resolved. By default, if the callback
  //      *        function is invoked with only a single argument, that will be
  //      *        resolved to the promise, while all arguments will be resolved as
  //      *        an array if multiple are given.
  //      *
  //      * @returns {function(object, ...*)}
  //      *       The generated wrapper function.
  //      */
  //     const wrapAsyncFunction = (name, metadata) => {
  //       return function asyncFunctionWrapper(target, ...args) {
  //         if (args.length < metadata.minArgs) {
  //           throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
  //         }
  //         if (args.length > metadata.maxArgs) {
  //           throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
  //         }
  //         return new Promise((resolve, reject) => {
  //           if (metadata.fallbackToNoCallback) {
  //             // This API method has currently no callback on Chrome, but it return a promise on Firefox,
  //             // and so the polyfill will try to call it with a callback first, and it will fallback
  //             // to not passing the callback if the first call fails.
  //             try {
  //               target[name](...args, makeCallback({
  //                 resolve,
  //                 reject
  //               }, metadata));
  //             } catch (cbError) {
  //               console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
  //               target[name](...args);

  //               // Update the API method metadata, so that the next API calls will not try to
  //               // use the unsupported callback anymore.
  //               metadata.fallbackToNoCallback = false;
  //               metadata.noCallback = true;
  //               resolve();
  //             }
  //           } else if (metadata.noCallback) {
  //             target[name](...args);
  //             resolve();
  //           } else {
  //             target[name](...args, makeCallback({
  //               resolve,
  //               reject
  //             }, metadata));
  //           }
  //         });
  //       };
  //     };

  //     /**
  //      * Wraps an existing method of the target object, so that calls to it are
  //      * intercepted by the given wrapper function. The wrapper function receives,
  //      * as its first argument, the original `target` object, followed by each of
  //      * the arguments passed to the original method.
  //      *
  //      * @param {object} target
  //      *        The original target object that the wrapped method belongs to.
  //      * @param {function} method
  //      *        The method being wrapped. This is used as the target of the Proxy
  //      *        object which is created to wrap the method.
  //      * @param {function} wrapper
  //      *        The wrapper function which is called in place of a direct invocation
  //      *        of the wrapped method.
  //      *
  //      * @returns {Proxy<function>}
  //      *        A Proxy object for the given method, which invokes the given wrapper
  //      *        method in its place.
  //      */
  //     const wrapMethod = (target, method, wrapper) => {
  //       return new Proxy(method, {
  //         apply(targetMethod, thisObj, args) {
  //           return wrapper.call(thisObj, target, ...args);
  //         }
  //       });
  //     };
  //     let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

  //     /**
  //      * Wraps an object in a Proxy which intercepts and wraps certain methods
  //      * based on the given `wrappers` and `metadata` objects.
  //      *
  //      * @param {object} target
  //      *        The target object to wrap.
  //      *
  //      * @param {object} [wrappers = {}]
  //      *        An object tree containing wrapper functions for special cases. Any
  //      *        function present in this object tree is called in place of the
  //      *        method in the same location in the `target` object tree. These
  //      *        wrapper methods are invoked as described in {@see wrapMethod}.
  //      *
  //      * @param {object} [metadata = {}]
  //      *        An object tree containing metadata used to automatically generate
  //      *        Promise-based wrapper functions for asynchronous. Any function in
  //      *        the `target` object tree which has a corresponding metadata object
  //      *        in the same location in the `metadata` tree is replaced with an
  //      *        automatically-generated wrapper function, as described in
  //      *        {@see wrapAsyncFunction}
  //      *
  //      * @returns {Proxy<object>}
  //      */
  //     const wrapObject = (target, wrappers = {}, metadata = {}) => {
  //       let cache = Object.create(null);
  //       let handlers = {
  //         has(proxyTarget, prop) {
  //           return prop in target || prop in cache;
  //         },
  //         get(proxyTarget, prop, receiver) {
  //           if (prop in cache) {
  //             return cache[prop];
  //           }
  //           if (!(prop in target)) {
  //             return undefined;
  //           }
  //           let value = target[prop];
  //           if (typeof value === "function") {
  //             // This is a method on the underlying object. Check if we need to do
  //             // any wrapping.

  //             if (typeof wrappers[prop] === "function") {
  //               // We have a special-case wrapper for this method.
  //               value = wrapMethod(target, target[prop], wrappers[prop]);
  //             } else if (hasOwnProperty(metadata, prop)) {
  //               // This is an async method that we have metadata for. Create a
  //               // Promise wrapper for it.
  //               let wrapper = wrapAsyncFunction(prop, metadata[prop]);
  //               value = wrapMethod(target, target[prop], wrapper);
  //             } else {
  //               // This is a method that we don't know or care about. Return the
  //               // original method, bound to the underlying object.
  //               value = value.bind(target);
  //             }
  //           } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
  //             // This is an object that we need to do some wrapping for the children
  //             // of. Create a sub-object wrapper for it with the appropriate child
  //             // metadata.
  //             value = wrapObject(value, wrappers[prop], metadata[prop]);
  //           } else if (hasOwnProperty(metadata, "*")) {
  //             // Wrap all properties in * namespace.
  //             value = wrapObject(value, wrappers[prop], metadata["*"]);
  //           } else {
  //             // We don't need to do any wrapping for this property,
  //             // so just forward all access to the underlying object.
  //             Object.defineProperty(cache, prop, {
  //               configurable: true,
  //               enumerable: true,
  //               get() {
  //                 return target[prop];
  //               },
  //               set(value) {
  //                 target[prop] = value;
  //               }
  //             });
  //             return value;
  //           }
  //           cache[prop] = value;
  //           return value;
  //         },
  //         set(proxyTarget, prop, value, receiver) {
  //           if (prop in cache) {
  //             cache[prop] = value;
  //           } else {
  //             target[prop] = value;
  //           }
  //           return true;
  //         },
  //         defineProperty(proxyTarget, prop, desc) {
  //           return Reflect.defineProperty(cache, prop, desc);
  //         },
  //         deleteProperty(proxyTarget, prop) {
  //           return Reflect.deleteProperty(cache, prop);
  //         }
  //       };

  //       // Per contract of the Proxy API, the "get" proxy handler must return the
  //       // original value of the target if that value is declared read-only and
  //       // non-configurable. For this reason, we create an object with the
  //       // prototype set to `target` instead of using `target` directly.
  //       // Otherwise we cannot return a custom object for APIs that
  //       // are declared read-only and non-configurable, such as `chrome.devtools`.
  //       //
  //       // The proxy handlers themselves will still use the original `target`
  //       // instead of the `proxyTarget`, so that the methods and properties are
  //       // dereferenced via the original targets.
  //       let proxyTarget = Object.create(target);
  //       return new Proxy(proxyTarget, handlers);
  //     };

  //     /**
  //      * Creates a set of wrapper functions for an event object, which handles
  //      * wrapping of listener functions that those messages are passed.
  //      *
  //      * A single wrapper is created for each listener function, and stored in a
  //      * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
  //      * retrieve the original wrapper, so that  attempts to remove a
  //      * previously-added listener work as expected.
  //      *
  //      * @param {DefaultWeakMap<function, function>} wrapperMap
  //      *        A DefaultWeakMap object which will create the appropriate wrapper
  //      *        for a given listener function when one does not exist, and retrieve
  //      *        an existing one when it does.
  //      *
  //      * @returns {object}
  //      */
  //     const wrapEvent = wrapperMap => ({
  //       addListener(target, listener, ...args) {
  //         target.addListener(wrapperMap.get(listener), ...args);
  //       },
  //       hasListener(target, listener) {
  //         return target.hasListener(wrapperMap.get(listener));
  //       },
  //       removeListener(target, listener) {
  //         target.removeListener(wrapperMap.get(listener));
  //       }
  //     });
  //     const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
  //       if (typeof listener !== "function") {
  //         return listener;
  //       }

  //       /**
  //        * Wraps an onRequestFinished listener function so that it will return a
  //        * `getContent()` property which returns a `Promise` rather than using a
  //        * callback API.
  //        *
  //        * @param {object} req
  //        *        The HAR entry object representing the network request.
  //        */
  //       return function onRequestFinished(req) {
  //         const wrappedReq = wrapObject(req, {} /* wrappers */, {
  //           getContent: {
  //             minArgs: 0,
  //             maxArgs: 0
  //           }
  //         });
  //         listener(wrappedReq);
  //       };
  //     });
  //     const onMessageWrappers = new DefaultWeakMap(listener => {
  //       if (typeof listener !== "function") {
  //         return listener;
  //       }

  //       /**
  //        * Wraps a message listener function so that it may send responses based on
  //        * its return value, rather than by returning a sentinel value and calling a
  //        * callback. If the listener function returns a Promise, the response is
  //        * sent when the promise either resolves or rejects.
  //        *
  //        * @param {*} message
  //        *        The message sent by the other end of the channel.
  //        * @param {object} sender
  //        *        Details about the sender of the message.
  //        * @param {function(*)} sendResponse
  //        *        A callback which, when called with an arbitrary argument, sends
  //        *        that value as a response.
  //        * @returns {boolean}
  //        *        True if the wrapped listener returned a Promise, which will later
  //        *        yield a response. False otherwise.
  //        */
  //       return function onMessage(message, sender, sendResponse) {
  //         let didCallSendResponse = false;
  //         let wrappedSendResponse;
  //         let sendResponsePromise = new Promise(resolve => {
  //           wrappedSendResponse = function (response) {
  //             didCallSendResponse = true;
  //             resolve(response);
  //           };
  //         });
  //         let result;
  //         try {
  //           result = listener(message, sender, wrappedSendResponse);
  //         } catch (err) {
  //           result = Promise.reject(err);
  //         }
  //         const isResultThenable = result !== true && isThenable(result);

  //         // If the listener didn't returned true or a Promise, or called
  //         // wrappedSendResponse synchronously, we can exit earlier
  //         // because there will be no response sent from this listener.
  //         if (result !== true && !isResultThenable && !didCallSendResponse) {
  //           return false;
  //         }

  //         // A small helper to send the message if the promise resolves
  //         // and an error if the promise rejects (a wrapped sendMessage has
  //         // to translate the message into a resolved promise or a rejected
  //         // promise).
  //         const sendPromisedResult = promise => {
  //           promise.then(msg => {
  //             // send the message value.
  //             sendResponse(msg);
  //           }, error => {
  //             // Send a JSON representation of the error if the rejected value
  //             // is an instance of error, or the object itself otherwise.
  //             let message;
  //             if (error && (error instanceof Error || typeof error.message === "string")) {
  //               message = error.message;
  //             } else {
  //               message = "An unexpected error occurred";
  //             }
  //             sendResponse({
  //               __mozWebExtensionPolyfillReject__: true,
  //               message
  //             });
  //           }).catch(err => {
  //             // Print an error on the console if unable to send the response.
  //             console.error("Failed to send onMessage rejected reply", err);
  //           });
  //         };

  //         // If the listener returned a Promise, send the resolved value as a
  //         // result, otherwise wait the promise related to the wrappedSendResponse
  //         // callback to resolve and send it as a response.
  //         if (isResultThenable) {
  //           sendPromisedResult(result);
  //         } else {
  //           sendPromisedResult(sendResponsePromise);
  //         }

  //         // Let Chrome know that the listener is replying.
  //         return true;
  //       };
  //     });
  //     const wrappedSendMessageCallback = ({
  //       reject,
  //       resolve
  //     }, reply) => {
  //       if (extensionAPIs.runtime.lastError) {
  //         // Detect when none of the listeners replied to the sendMessage call and resolve
  //         // the promise to undefined as in Firefox.
  //         // See https://github.com/mozilla/webextension-polyfill/issues/130
  //         if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
  //           resolve();
  //         } else {
  //           reject(new Error(extensionAPIs.runtime.lastError.message));
  //         }
  //       } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
  //         // Convert back the JSON representation of the error into
  //         // an Error instance.
  //         reject(new Error(reply.message));
  //       } else {
  //         resolve(reply);
  //       }
  //     };
  //     const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
  //       if (args.length < metadata.minArgs) {
  //         throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
  //       }
  //       if (args.length > metadata.maxArgs) {
  //         throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
  //       }
  //       return new Promise((resolve, reject) => {
  //         const wrappedCb = wrappedSendMessageCallback.bind(null, {
  //           resolve,
  //           reject
  //         });
  //         args.push(wrappedCb);
  //         apiNamespaceObj.sendMessage(...args);
  //       });
  //     };
  //     const staticWrappers = {
  //       devtools: {
  //         network: {
  //           onRequestFinished: wrapEvent(onRequestFinishedWrappers)
  //         }
  //       },
  //       runtime: {
  //         onMessage: wrapEvent(onMessageWrappers),
  //         onMessageExternal: wrapEvent(onMessageWrappers),
  //         sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
  //           minArgs: 1,
  //           maxArgs: 3
  //         })
  //       },
  //       tabs: {
  //         sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
  //           minArgs: 2,
  //           maxArgs: 3
  //         })
  //       }
  //     };
  //     const settingMetadata = {
  //       clear: {
  //         minArgs: 1,
  //         maxArgs: 1
  //       },
  //       get: {
  //         minArgs: 1,
  //         maxArgs: 1
  //       },
  //       set: {
  //         minArgs: 1,
  //         maxArgs: 1
  //       }
  //     };
  //     apiMetadata.privacy = {
  //       network: {
  //         "*": settingMetadata
  //       },
  //       services: {
  //         "*": settingMetadata
  //       },
  //       websites: {
  //         "*": settingMetadata
  //       }
  //     };
  //     return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
  //   };

  //   // The build process adds a UMD wrapper around this file, which makes the
  //   // `module` variable available.
  //   module.exports = wrapAPIs(chrome);
  // } else {
  //   module.exports = globalThis.browser;
  // }
  function md5(inputString) {
    var hc="0123456789abcdef";
    function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
    function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
  }

  globalThis.localMsgDict = {
    "id": "aaaaaassssssbbbbbddddddkkkkkkkww",
    "getManifest": {
      "version": "1.0.0",
      "version_name": "1.0.0"
    }
  }

  globalThis.chrome = window.browser || window.chrome || {}

  class NativeSendObject {
    constructor(callback, params, cmd) {
      this.sendArgus = params;
      this.key = md5(params.toString()+Date.now().toString());
      this.callback = callback
      this.cmd = cmd || "NativeRuntimeMsgSend"
      this.promiseResolve()
    }

    promiseResolve(){
      if( window.webkit && window.webkit.messageHandlers ){
        window.webkit.messageHandlers.toNative.postMessage({"name":this.cmd, "key": this.key, "params": JSON.stringify(this.sendArgus)})
      }
    }
  }

  // class NativePersistentSendObject {
  //   constructor(callback, params, cmd) {
  //     this.sendArgus = params;
  //     this.key = "NativePersistentSendObject"//md5(params.toString()+Date.now().toString());
  //     this.callback = callback
  //     this.cmd = cmd || "NativePersistentSendObject"
  //     this.promiseResolve()
  //   }

  //   promiseResolve(){
  //     if( window.webkit && window.webkit.messageHandlers ){
  //       window.webkit.messageHandlers.toNative.postMessage({"name":this.cmd, "key": this.key, "params": JSON.stringify(this.sendArgus)})
  //     }
  //   }
  // }

  function nativeSendMessage(name, key, params) {
    if( window.webkit && window.webkit.messageHandlers ){
      window.webkit.messageHandlers.toNative.postMessage({"name":name, "key": key, "params":JSON.stringify(params)})
    }
  }

  window.messageBridgePromise = {}

  window.writeInitInfos = function(name, key, res) {
    console.log("writeInitInfos input", name, key, res)

    let params = null
    if (res && typeof res == "string"){
      params = JSON.parse(res)
    }else{
      params = res
    }
    if(name == "NativeRuntimeMsgSend" 
    || name == "NativeStorageSet"
    || name == "NativeStorageGet"
    || name == "NativeConnectPost"
    ) {
      console.log("runtime.onMessage: back",  typeof window.messageBridgePromise[key])
      let msgObj = window.messageBridgePromise[key]
      if ( msgObj && msgObj.constructor.name == "NativeSendObject" ) {
        if (params != null){
          msgObj.callback(params)
        }else{
          msgObj.callback()
        }
        delete window.messageBridgePromise[key]
      }
    }
    for (const pairKey in window.messageBridgePromise) {
      if (name == "NativeRuntimeMsgSend" && pairKey.startsWith("runtime-")) {
        let listener = window.messageBridgePromise[pairKey]
        // console.log(`runtime.onMessage: onmessage ${pairKey}: ${listener}`);
        if (listener && typeof listener == "function") {
          listener(params, {
            id: globalThis.localMsgDict.id
          }, () => {
            let newKey = md5(arguments.toString()+Date.now().toString()+key);
            nativeSendMessage("RuntimeMsgResponse", newKey, {
              respKey: key,
              argus: arguments
            })
          })
        }
      } else if (name == "NativeRuntimeMsgSend" && pairKey.startsWith("persistent-")) {
        let listener = window.messageBridgePromise[pairKey]
        console.log(`runtime.onMessage: onpersistent ${pairKey}: ${listener}`);
        if (listener && typeof listener == "function") {
          listener(params)
        }
      } else if (name == "NativeStorageSet" && pairKey.startsWith("storage-")) {
        let listener = window.messageBridgePromise[pairKey]
        console.log(`storage.onMessage: onmessage ${pairKey}: ${listener}`);
        if (listener && typeof listener == "function") {
          listener(params, {
            id: globalThis.localMsgDict.id
          }, () => {
            let newKey = md5(arguments.toString()+Date.now().toString()+key);
            nativeSendMessage("RuntimeMsgResponse", newKey, {
              respKey: key,
              argus: arguments
            })
          })
        }
      } else if (name == "NativeConnectPost" && pairKey.startsWith("connect-")) {
        let listener = window.messageBridgePromise[pairKey]
        console.log(`connect.onMessage: ${pairKey}: ${listener}`);
        if (listener && typeof listener == "function") {
          listener(params)
        }
      }
    }
  }

  // sendMessage("getManifest")

  console.log("type: ", typeof globalThis.chrome)
  if(typeof globalThis.chrome.runtime == "undefined") {
    globalThis.chrome.runtime = {}
  }
  globalThis.chrome.runtime.id = function () {
    return globalThis.localMsgDict["id"]
  }
  globalThis.chrome.runtime.getManifest = function () {
    return globalThis.localMsgDict["getManifest"]
  }
  globalThis.chrome.runtime.getURL = function (path) {
    return path
  }
  globalThis.chrome.runtime.connect = function () {
    return {
      name: "translateCard",
      postMessage: (param) => {
        console.log("runtime.connect.postMessage: ", param)
        return new Promise((resolve, reject) => {
          let obj = new NativeSendObject((resp) => {
            resolve(resp)
          }, param, "NativeConnectPost")
          window.messageBridgePromise[obj.key] = obj
        });
      },
      disconnect: () => {},
      onDisconnect: {
        addListener:  (listener) => {
          console.log("runtime.onDisconnect.onMessage: add", listener)
        }, 
        removeListener:  (listener) => {
          console.log("runtime.onDisconnect.onMessage: remove", listener)
        }, 
      },
      onMessage: {
        addListener:  (listener) => {
          console.log("runtime.connect.onMessage: add", listener)
          window.messageBridgePromise["connect-"+md5(listener.toString())] = listener
        }, 
        removeListener:  (listener) => {
          console.log("runtime.connect.onMessage: remove", listener)
          // window.messageBridge.push(listener)
          delete window.messageBridgePromise["connect-"+md5(listener.toString())]
        }, 
      }
    }
  }
  globalThis.chrome.runtime.onMessage = {
    addListener:  (listener, isPersistent) => {
      console.log("runtime.onMessage: add", listener)
      if (isPersistent == true) {
        window.messageBridgePromise["persistent-"+md5(listener.toString())] = listener
      }else{
        window.messageBridgePromise["runtime-"+md5(listener.toString())] = listener
      }
    }, 
    removeListener:  (listener, isPersistent) => {
      console.log("runtime.onMessage: remove", listener)
      if (isPersistent == true) {
        delete window.messageBridgePromise["persistent-"+md5(listener.toString())]
      }else{
        delete window.messageBridgePromise["runtime-"+md5(listener.toString())]
      }
    }, 
  }

  globalThis.chrome.runtime.sendMessage = function () {
    console.log("runtime.sendMessage: ", arguments)
    let argus = arguments
    return new Promise((resolve, reject) => {
      let obj = new NativeSendObject((resp) => {
        resolve(resp)
      }, argus)
      window.messageBridgePromise[obj.key] = obj
    });
  }

  // globalThis.chrome.runtime.sendPersistentMessage = function () {
  //   console.log("runtime.sendMessage: ", arguments)
  //   let argus = arguments
  //   return new Promise((resolve, reject) => {
  //     let obj = new NativePersistentSendObject((resp) => {
  //       resolve(resp)
  //     }, argus)
  //     window.messageBridgePromise[obj.key] = obj
  //   });
  // }
  
  
  globalThis.chrome.storage = {
    local: {
      get: function (param) {
        console.log("chrome.storage.get: ", param)
        return new Promise((resolve, reject) => {
          var res = {}
          for (const prop in param) {
            if (Object.hasOwn(param, prop)) {
              console.log("chrome.storage.get key: ", prop, param[prop])
              if (prop == "guardChatgptTabId") {
                res["guardChatgptTabId"] = 0

                resolve(res);
                return;
              // } else if(prop == "theme") {
              //   res["theme"] = "light"
              // }else{
              }
            }
          }

          let obj = new NativeSendObject((resp) => {
            resolve(resp)
          }, param, "NativeStorageGet")
          window.messageBridgePromise[obj.key] = obj
        
        });
      },
      set: function (params) {
        console.log("chrome.storage.set: ", params)
        // let argus = arguments
        return new Promise((resolve, reject) => {
          let obj = new NativeSendObject((resp) => {
            resolve(resp)
          }, params, "NativeStorageSet")
          window.messageBridgePromise[obj.key] = obj
        });
      },
      onChanged: {
        removeListener:  (listener) => {
          console.log("storage.local.onChanged: remove", listener)
          delete window.messageBridgePromise["storage-"+md5(listener.toString())]
        },
  
        addListener: (listener) => {
          console.log("storage.local.onChanged: add", listener)
          window.messageBridgePromise["storage-"+md5(listener.toString())] = listener
        }
        
      }
    }
    // session: {
    //   get: function (obj) {
    //     console.log("chrome.session.get: ", obj)
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve(obj);
    //       }, 300);
    //     });
    //   },
    //   set: function (obj) {
    //     console.log("chrome.session.set: ", obj)
    //     return new Promise((resolve, reject) => {
    //       setTimeout(() => {
    //         resolve(obj);
    //       }, 300);
    //     });
    //   },
    //   onChange: {
    //     removeListener:  (listener) => {
    //       console.log("storage.session.onChanged: remove", listener)
    //       delete window.messageBridgePromise["session-"+md5(listener.toString())]
    //     },

    //     addListener: (listener) => {
    //       console.log("storage.session.onChanged", listener)
    //       window.messageBridgePromise["session-"+md5(listener.toString())] = listener
    //     }
    //   }
    // }
  }
  
  module.exports = globalThis.chrome
  
});
//# sourceMappingURL=browser-polyfill.js.map
