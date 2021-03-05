Skip to content
262ms (PJAX) 🐢  train-20e27e40 ☠️ 🐈 github/blob Switch to  Rails 7.0.0.alpha.5b2fb8a | Ruby 2.7.1
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@brianamarie 
adobe
/
brackets
1.6k
33k
6.9k
Code
Issues
2.6k
Pull requests
173
Actions
Projects
Wiki
Security
Insights
brackets/src/editor/EditorOptionHandlers.js /
@petetnt
petetnt Issue #11261: keep the search bar open (#14141)
…
Latest commit 32300dc on Mar 2, 2018
 History
 7 contributors
@RaymondLim@lkcampbell@dangoor@MarcelGerber@ficristo@prayagverma@petetnt
108 lines (94 sloc)  4.33 KB
  
/*
 * Copyright (c) 2013 - present Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

define(function (require, exports, module) {
    "use strict";

    var AppInit             = require("utils/AppInit"),
        Editor              = require("editor/Editor").Editor,
        Commands            = require("command/Commands"),
        CommandManager      = require("command/CommandManager"),
        PreferencesManager  = require("preferences/PreferencesManager"),
        Strings             = require("strings"),
        _                   = require("thirdparty/lodash");

    // Constants for the preferences referred to in this file
    var SHOW_LINE_NUMBERS = "showLineNumbers",
        STYLE_ACTIVE_LINE = "styleActiveLine",
        WORD_WRAP         = "wordWrap",
        CLOSE_BRACKETS    = "closeBrackets",
        AUTO_HIDE_SEARCH  = "autoHideSearch";


    /**
     * @private
     *
     * Maps from preference names to the command names needed to update the checked status.
     */
    var _optionMapping = {};
    _optionMapping[SHOW_LINE_NUMBERS] = Commands.TOGGLE_LINE_NUMBERS;
    _optionMapping[STYLE_ACTIVE_LINE] = Commands.TOGGLE_ACTIVE_LINE;
    _optionMapping[WORD_WRAP] = Commands.TOGGLE_WORD_WRAP;
    _optionMapping[CLOSE_BRACKETS] = Commands.TOGGLE_CLOSE_BRACKETS;
    _optionMapping[AUTO_HIDE_SEARCH] = Commands.TOGGLE_SEARCH_AUTOHIDE;



    /**
     * @private
     *
     * Updates the command checked status based on the preference name given.
     *
     * @param {string} name Name of preference that has changed
     */
    function _updateCheckedState(name) {
        var mapping = _optionMapping[name];
        if (!mapping) {
            return;
        }
        CommandManager.get(mapping).setChecked(PreferencesManager.get(name));
    }

    // Listen to preference changes for the preferences we care about
    Object.keys(_optionMapping).forEach(function (preference) {
        PreferencesManager.on("change", preference, function () {
            _updateCheckedState(preference);
        });
    });

    /**
     * @private
     * Creates a function that will toggle the named preference.
     *
     * @param {string} prefName Name of preference that should be toggled by the function
     */
    function _getToggler(prefName) {
        return function () {
            PreferencesManager.set(prefName, !PreferencesManager.get(prefName));
        };
    }

    function _init() {
        _.each(_optionMapping, function (commandName, prefName) {
            CommandManager.get(commandName).setChecked(PreferencesManager.get(prefName));
        });

        if (!Editor.getShowLineNumbers()) {
            Editor._toggleLinePadding(true);
        }
    }

    CommandManager.register(Strings.CMD_TOGGLE_LINE_NUMBERS, Commands.TOGGLE_LINE_NUMBERS, _getToggler(SHOW_LINE_NUMBERS));
    CommandManager.register(Strings.CMD_TOGGLE_ACTIVE_LINE, Commands.TOGGLE_ACTIVE_LINE, _getToggler(STYLE_ACTIVE_LINE));
    CommandManager.register(Strings.CMD_TOGGLE_WORD_WRAP, Commands.TOGGLE_WORD_WRAP, _getToggler(WORD_WRAP));
    CommandManager.register(Strings.CMD_TOGGLE_CLOSE_BRACKETS, Commands.TOGGLE_CLOSE_BRACKETS, _getToggler(CLOSE_BRACKETS));
    CommandManager.register(Strings.CMD_TOGGLE_SEARCH_AUTOHIDE, Commands.TOGGLE_SEARCH_AUTOHIDE, _getToggler(AUTO_HIDE_SEARCH));

    AppInit.htmlReady(_init);
});
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Report bug
Contact GitHub
Pricing
API
Training
Blog
About
