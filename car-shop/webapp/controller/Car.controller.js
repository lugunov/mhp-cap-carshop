sap.ui.define([
	"./BaseController",
	"../model/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("mhp.demo.carshop.controller.Car", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		onInit : function () {
			this.getRouter().getRoute("car").attachPatternMatched(this._onRouteMatched, this)
        },
        
        _onRouteMatched: function (oEvent) {

            // Read routing arguments for later use (e.g. back navigation)

            this.sManufacturerID = oEvent.getParameter("arguments").objectId;
            this.sCarID = oEvent.getParameter("arguments").carId;

            // Set the layout to three Column layout
            this.getModel("appView").setProperty("/layout", "ThreeColumnsMidExpanded");

            // After the metamodel was loaded (Promise) Create the binding path 
            // based on routing arguments for this car
            this.getModel().metadataLoaded().then(function () {
                var sCarPath = this.getModel().createKey("Cars", {
                    ID: this.sCarID
                });
                // Bind this car to the view
                this._bindView("/" + sCarPath);
            }.bind(this));
        },

        _bindView: function (sObjectPath) {
            this.getView().bindElement({
                path: sObjectPath
            });
        }


	});

});