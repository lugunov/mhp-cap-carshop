sap.ui.define([
	"./BaseController",
    "../model/formatter",
    "sap/m/MessageToast"
], function (BaseController, formatter, MessageToast) {
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
        },

        onSavePress: function () {

            var oModel = this.getModel();
            // Check for changes
            if (oModel.hasPendingChanges()) {
                // Save the data changed in the OData model
                oModel.submitChanges({
                    success: function () {
                        // Show success message in a Toast
                        MessageToast.show("Car Data saved");
                        // Navigate to the previous view after saving
                        this.getRouter().navTo("object", {
                            objectId: this.sManufacturerID
                        });
                    }.bind(this), // bind the context otherwise this refers to something else
                    error: function () {
                        // Display error and do nothing more 
                        MessageToast.show("Fehler beim Speichern!");
                    }
                });
            } else {
                // No changes message
                MessageToast.show("Keine Änderungen");
                // Navigate to the previous view after message
                this.getRouter().navTo("object", {
                    objectId: this.sManufacturerID
                });
            }

        },



	});

});