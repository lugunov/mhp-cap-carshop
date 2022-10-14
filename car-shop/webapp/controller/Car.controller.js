sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/m/library"
], function (BaseController, JSONModel, formatter, mobileLibrary) {
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
        
        }
    });

});