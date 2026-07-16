sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.manufacturing.erp.manufacturingerp.controller.Dashboard", {
        onInit: function () {
            var oDashboardModel = new JSONModel({
                productsCount: 0,
                suppliersCount: 0,
                materialsCount: 0,
                bomsCount: 0
            });
            this.getView().setModel(oDashboardModel, "dashboard");

            // Attach route matched to refresh counts when entering the view
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("dashboard").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function () {
            this._loadCounts();
        },

        _loadCounts: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oDashboardModel = this.getView().getModel("dashboard");

            if (!oModel) {
                return;
            }

            // Products count
            oModel.read("/Product/$count", {
                success: function (oData) {
                    oDashboardModel.setProperty("/productsCount", oData);
                },
                error: function () {
                    oDashboardModel.setProperty("/productsCount", 0);
                }
            });

            // Suppliers count
            oModel.read("/Supplier/$count", {
                success: function (oData) {
                    oDashboardModel.setProperty("/suppliersCount", oData);
                },
                error: function () {
                    oDashboardModel.setProperty("/suppliersCount", 0);
                }
            });

            // Materials count
            oModel.read("/Material/$count", {
                success: function (oData) {
                    oDashboardModel.setProperty("/materialsCount", oData);
                },
                error: function () {
                    oDashboardModel.setProperty("/materialsCount", 0);
                }
            });

            // BOM count
            oModel.read("/BOM/$count", {
                success: function (oData) {
                    oDashboardModel.setProperty("/bomsCount", oData);
                },
                error: function () {
                    oDashboardModel.setProperty("/bomsCount", 0);
                }
            });
        },

        onNavigateToProducts: function () {
            this.getOwnerComponent().getRouter().navTo("product");
        },

        onNavigateToSuppliers: function () {
            this.getOwnerComponent().getRouter().navTo("supplier");
        },

        onNavigateToMaterials: function () {
            this.getOwnerComponent().getRouter().navTo("material");
        },

        onNavigateToBoms: function () {
            this.getOwnerComponent().getRouter().navTo("bom");
        }
    });
});
