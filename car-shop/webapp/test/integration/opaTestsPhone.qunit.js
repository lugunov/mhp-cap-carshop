/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
	"use strict";

	sap.ui.require([
		"mhp/demo/carshop/test/integration/PhoneJourneys"
	], function() {
		QUnit.start();
	});
});