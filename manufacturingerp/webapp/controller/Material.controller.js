sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "com/manufacturing/erp/manufacturingerp/model/formatter"
], function (Controller, JSONModel, Filter, FilterOperator, Fragment, MessageToast, MessageBox, formatter) {
    "use strict";

    return Controller.extend("com.manufacturing.erp.manufacturingerp.controller.Material", {
        formatter: formatter,

        onInit: function () {
            var oDialogModel = new JSONModel({
                isCreate: true,
                title: "",
                MaterialId: "",
                MaterialName: "",
                SupplierId: "",
                Category: "",
                Unit: "",
                UnitPrice: "0",
                CukyField: "USD",
                CurrentStock: "0",
                Status: "In Stock"
            });
            this.getView().setModel(oDialogModel, "dialog");
        },

        onRefresh: function () {
            var oTable = this.byId("materialTable");
            var oBinding = oTable.getBinding("items");
            if (oBinding) {
                oBinding.refresh();
                MessageToast.show("Materials refreshed");
            }
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || "";
            var oTable = this.byId("materialTable");
            var oBinding = oTable.getBinding("items");
            
            if (oBinding) {
                var aFilters = [];
                if (sQuery) {
                    aFilters.push(new Filter("MaterialName", FilterOperator.Contains, sQuery));
                }
                oBinding.filter(aFilters);
            }
        },

        onCreate: function () {
            var oDialogModel = this.getView().getModel("dialog");
            oDialogModel.setData({
                isCreate: true,
                title: "Create Raw Material",
                MaterialId: "",
                MaterialName: "",
                SupplierId: "",
                Category: "",
                Unit: "",
                UnitPrice: "0",
                CukyField: "USD",
                CurrentStock: "0",
                Status: "In Stock"
            });

            this._openMaterialDialog();
        },

        onEdit: function () {
            var oTable = this.byId("materialTable");
            var oSelectedItem = oTable.getSelectedItem();
            
            if (!oSelectedItem) {
                MessageBox.warning("Please select a material to edit.");
                return;
            }

            var oContext = oSelectedItem.getBindingContext();
            var oDialogModel = this.getView().getModel("dialog");
            
            oDialogModel.setData({
                isCreate: false,
                title: "Edit Raw Material: " + oContext.getProperty("MaterialId"),
                MaterialId: oContext.getProperty("MaterialId"),
                MaterialName: oContext.getProperty("MaterialName"),
                SupplierId: oContext.getProperty("SupplierId"),
                Category: oContext.getProperty("Category"),
                Unit: oContext.getProperty("Unit"),
                UnitPrice: String(oContext.getProperty("UnitPrice") || 0),
                CukyField: oContext.getProperty("CukyField"),
                CurrentStock: String(oContext.getProperty("CurrentStock") || 0),
                Status: oContext.getProperty("Status")
            });

            this._openMaterialDialog();
        },

        _openMaterialDialog: function () {
            var oView = this.getView();
            if (!this._pMaterialDialog) {
                this._pMaterialDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.MaterialDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pMaterialDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onSaveMaterial: function () {
            var oDialogModel = this.getView().getModel("dialog");
            var oData = oDialogModel.getData();

            if (!oData.MaterialId || !oData.MaterialName || !oData.SupplierId || !oData.Category || !oData.Unit || !oData.CukyField) {
                MessageBox.error("Please fill in all mandatory fields.");
                return;
            }

            var oTable = this.byId("materialTable");
            var oModel = this.getView().getModel();

            var oView = this.getView();
            oView.setBusy(true);
            var that = this;

            if (oData.isCreate) {
                // Create Operation
                var oPayload = {
                    MaterialId: oData.MaterialId,
                    MaterialName: oData.MaterialName,
                    Category: oData.Category,
                    Unit: oData.Unit,
                    UnitPrice: String(parseFloat(oData.UnitPrice) || 0),
                    CukyField: oData.CukyField,
                    CurrentStock: String(parseFloat(oData.CurrentStock) || 0),
                    Status: oData.Status
                };
                oModel.create("/Supplier(SupplierId='" + oData.SupplierId + "')/to_RawMaterial", oPayload, {
                    success: function () {
                        oView.setBusy(false);
                        that.onCancelMaterial();
                        MessageToast.show("Material created successfully");
                    },
                    error: function (oError) {
                        oView.setBusy(false);
                        var sErrorMsg = "Error creating material";
                        try {
                            var oResponse = JSON.parse(oError.responseText);
                            sErrorMsg = oResponse.error.message.value;
                        } catch (e) {}
                        MessageBox.error(sErrorMsg);
                    }
                });
            } else {
                // Edit Operation
                var oPayload = {
                    MaterialName: oData.MaterialName,
                    Category: oData.Category,
                    Unit: oData.Unit,
                    UnitPrice: String(parseFloat(oData.UnitPrice) || 0),
                    CukyField: oData.CukyField,
                    CurrentStock: String(parseFloat(oData.CurrentStock) || 0),
                    Status: oData.Status
                };
                oModel.update("/Material(MaterialId='" + oData.MaterialId + "')", oPayload, {
                    success: function () {
                        oView.setBusy(false);
                        that.onCancelMaterial();
                        MessageToast.show("Material updated successfully");
                    },
                    error: function (oError) {
                        oView.setBusy(false);
                        var sErrorMsg = "Error updating material";
                        try {
                            var oResponse = JSON.parse(oError.responseText);
                            sErrorMsg = oResponse.error.message.value;
                        } catch (e) {}
                        MessageBox.error(sErrorMsg);
                    }
                });
            }
        },

        onCancelMaterial: function () {
            if (this.byId("materialDialog")) {
                this.byId("materialDialog").close();
            }
        },

        onDelete: function () {
            var oTable = this.byId("materialTable");
            var oSelectedItem = oTable.getSelectedItem();
            
            if (!oSelectedItem) {
                MessageBox.warning("Please select a material to delete.");
                return;
            }

            var oContext = oSelectedItem.getBindingContext();
            var sMaterialId = oContext.getProperty("MaterialId");
            var oModel = this.getView().getModel();
            var oView = this.getView();

            MessageBox.confirm("Are you sure you want to delete Material " + sMaterialId + "?", {
                title: "Confirm Delete",
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        oView.setBusy(true);
                        oModel.remove("/Material(MaterialId='" + sMaterialId + "')", {
                            success: function () {
                                oView.setBusy(false);
                                MessageToast.show("Material deleted successfully");
                            },
                            error: function (oError) {
                                oView.setBusy(false);
                                MessageBox.error("Error deleting material");
                            }
                        });
                    }
                }
            });
        },

        // Value Helps
        onSupplierValueHelpRequest: function (oEvent) {
            this._valueHelpInput = oEvent.getSource();
            var oView = this.getView();

            if (!this._pSupplierHelpDialog) {
                this._pSupplierHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.SupplierHelp",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pSupplierHelpDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onSupplierValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("SupplierName", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onSupplierValueHelpConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this._valueHelpInput.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

        onSupplierValueHelpCancel: function (oEvent) {
            oEvent.getSource().getBinding("items").filter([]);
        },

        onCategoryValueHelpRequest: function (oEvent) {
            this._valueHelpInput = oEvent.getSource();
            var oView = this.getView();

            if (!this._pCategoryHelpDialog) {
                this._pCategoryHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.CategoryHelp",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pCategoryHelpDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCategoryValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("CategoryId", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onCategoryValueHelpConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this._valueHelpInput.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

        onCategoryValueHelpCancel: function (oEvent) {
            oEvent.getSource().getBinding("items").filter([]);
        },

        onUnitValueHelpRequest: function (oEvent) {
            this._valueHelpInput = oEvent.getSource();
            var oView = this.getView();

            if (!this._pUnitHelpDialog) {
                this._pUnitHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.UnitHelp",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pUnitHelpDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onUnitValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("UnitOfMeasure", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onUnitValueHelpConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this._valueHelpInput.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

        onUnitValueHelpCancel: function (oEvent) {
            oEvent.getSource().getBinding("items").filter([]);
        },

        onCurrencyValueHelpRequest: function (oEvent) {
            this._valueHelpInput = oEvent.getSource();
            var oView = this.getView();

            if (!this._pCurrencyHelpDialog) {
                this._pCurrencyHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.CurrencyHelp",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pCurrencyHelpDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onCurrencyValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("CurrencyCode", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onCurrencyValueHelpConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this._valueHelpInput.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

        onCurrencyValueHelpCancel: function (oEvent) {
            oEvent.getSource().getBinding("items").filter([]);
        }
    });
});
