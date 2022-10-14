sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "../model/formatter",
    "sap/m/library"
], function (BaseController, JSONModel, MessageToast, formatter, mobileLibrary) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;

    return BaseController.extend("mhp.demo.carshop.controller.Car", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        onInit: function () {

            this.getRouter().getRoute("car").attachPatternMatched(this._onRouteMatched, this);
            
        },

        _onRouteMatched: function (oEvent) {
            this.getModel("appView").setProperty("/layout", "ThreeColumnsMidExpanded");

            this.sManufacturerID = oEvent.getParameter("arguments").objectId;
            this.sCarId = oEvent.getParameter("arguments").carId;

            this.getModel().metadataLoaded().then(function () {
                var sCarPath = this.getModel().createKey("Cars", {
                    ID: this.sCarId
                });
                // Bind this car to the view
                this._bindView("/" + sCarPath);
            }.bind(this));                

        },

        _bindView: function (sObjectPath) {
            this.getView().bindElement({
                path: sObjectPath
            });
        
        },

        onSavePress : function () {
            var oModel = this.getModel();
            // Check for changes
debugger;
            if (oModel.hasPendingChanges()) {
                // Save the data changed in the OData model
                oModel.submitChanges({
                    success: function () {
                        // Show success message in a Toast
                        MessageToast.show("Car Data saved");
                        // Navigate to the previous view after saving
                        this.getRouter().navTo("object", {
                            objectId: this.sManufacturerID
                        });
                    }.bind(this), // bind the context otherwise this refers to something else
                    error: function () {
                        // Display error and do nothing more 
                        MessageToast.show("Fehler beim Speichern!");
                    }
                });
            } else {
                // No changes message
                MessageToast.show("Keine Änderungen");
                // Navigate to the previous view after message
                this.getRouter().navTo("object", {
                    objectId: this.sManufacturerID
                });
            }

        }
    });

});