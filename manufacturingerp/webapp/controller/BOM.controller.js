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

    return Controller.extend("com.manufacturing.erp.manufacturingerp.controller.BOM", {
        formatter: formatter,

        onInit: function () {
            var oDialogModel = new JSONModel({
                isCreate: true,
                title: "",
                BomId: "",
                ProductId: "",
                MaterialId: "",
                MaterialName: "",
                Quantity: "1",
                Unit: "",
                UnitPrice: "0",
                TotalAmount: "0",
                Currency: ""
            });
            this.getView().setModel(oDialogModel, "dialog");
        },

        onRefresh: function () {
            var oTable = this.byId("bomTable");
            var oBinding = oTable.getBinding("items");
            if (oBinding) {
                oBinding.refresh();
                MessageToast.show("BOMs refreshed");
            }
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || "";
            var oTable = this.byId("bomTable");
            var oBinding = oTable.getBinding("items");
            
            if (oBinding) {
                var aFilters = [];
                if (sQuery) {
                    aFilters.push(new Filter("ProductId", FilterOperator.Contains, sQuery));
                }
                oBinding.filter(aFilters);
            }
        },

        onCreate: function () {
            var oDialogModel = this.getView().getModel("dialog");
            oDialogModel.setData({
                isCreate: true,
                title: "Create BOM Record",
                BomId: "",
                ProductId: "",
                MaterialId: "",
                MaterialName: "",
                Quantity: "1",
                Unit: "",
                UnitPrice: "0",
                TotalAmount: "0",
                Currency: ""
            });

            this._openBomDialog();
        },

        onEdit: function () {
            var oTable = this.byId("bomTable");
            var oSelectedItem = oTable.getSelectedItem();
            
            if (!oSelectedItem) {
                MessageBox.warning("Please select a BOM record to edit.");
                return;
            }

            var oContext = oSelectedItem.getBindingContext();
            var oDialogModel = this.getView().getModel("dialog");
            
            oDialogModel.setData({
                isCreate: false,
                title: "Edit BOM: " + oContext.getProperty("BomId"),
                BomId: oContext.getProperty("BomId"),
                ProductId: oContext.getProperty("ProductId"),
                MaterialId: oContext.getProperty("MaterialId"),
                MaterialName: oContext.getProperty("MaterialName"),
                Quantity: String(oContext.getProperty("Quantity") || 0),
                Unit: oContext.getProperty("Unit"),
                UnitPrice: String(oContext.getProperty("UnitPrice") || 0),
                TotalAmount: String(oContext.getProperty("TotalAmount") || 0),
                Currency: oContext.getProperty("Currency")
            });

            this._openBomDialog();
        },

        _openBomDialog: function () {
            var oView = this.getView();
            if (!this._pBomDialog) {
                this._pBomDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.BOMDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pBomDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onQuantityChange: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var fQty = parseFloat(sValue) || 0;
            var oDialogModel = this.getView().getModel("dialog");
            var fPrice = parseFloat(oDialogModel.getProperty("/UnitPrice")) || 0;
            var fTotal = fQty * fPrice;
            oDialogModel.setProperty("/TotalAmount", fTotal.toFixed(2));
        },

        onSaveBom: function () {
            var oDialogModel = this.getView().getModel("dialog");
            var oData = oDialogModel.getData();

            if (!oData.BomId || !oData.ProductId || !oData.MaterialId || !oData.Quantity) {
                MessageBox.error("Please fill in all mandatory fields (BOM ID, Product, Material, Quantity).");
                return;
            }

            var oTable = this.byId("bomTable");
            var oBinding = oTable.getBinding("items");
            var oModel = this.getView().getModel();

            var oView = this.getView();
            oView.setBusy(true);
            var that = this;

            if (oData.isCreate) {
                // Create Operation
                var oNewContext = oBinding.create({
                    BomId: oData.BomId,
                    ProductId: oData.ProductId,
                    MaterialId: oData.MaterialId,
                    MaterialName: oData.MaterialName,
                    Quantity: parseFloat(oData.Quantity) || 0,
                    Unit: oData.Unit,
                    UnitPrice: parseFloat(oData.UnitPrice) || 0,
                    TotalAmount: parseFloat(oData.TotalAmount) || 0,
                    Currency: oData.Currency
                });

                oNewContext.created().then(function () {
                    oView.setBusy(false);
                    that.onCancelBom();
                    MessageToast.show("BOM created successfully");
                }, function (oError) {
                    oView.setBusy(false);
                    MessageBox.error("Error creating BOM: " + oError.message);
                });
            } else {
                // Edit Operation
                var oSelectedItem = oTable.getSelectedItem();
                var oContext = oSelectedItem.getBindingContext();
                
                oContext.setProperty("ProductId", oData.ProductId);
                oContext.setProperty("MaterialId", oData.MaterialId);
                oContext.setProperty("MaterialName", oData.MaterialName);
                oContext.setProperty("Quantity", parseFloat(oData.Quantity) || 0);
                oContext.setProperty("Unit", oData.Unit);
                oContext.setProperty("UnitPrice", parseFloat(oData.UnitPrice) || 0);
                oContext.setProperty("TotalAmount", parseFloat(oData.TotalAmount) || 0);
                oContext.setProperty("Currency", oData.Currency);

                // Submit changes for V4 model
                oModel.submitBatch(oBinding.getUpdateGroupId()).then(function () {
                    oView.setBusy(false);
                    that.onCancelBom();
                    MessageToast.show("BOM updated successfully");
                }, function (oError) {
                    oView.setBusy(false);
                    MessageBox.error("Error updating BOM: " + oError.message);
                });
            }
        },

        onCancelBom: function () {
            if (this.byId("bomDialog")) {
                this.byId("bomDialog").close();
            }
        },

        onDelete: function () {
            var oTable = this.byId("bomTable");
            var oSelectedItem = oTable.getSelectedItem();
            
            if (!oSelectedItem) {
                MessageBox.warning("Please select a BOM record to delete.");
                return;
            }

            var oContext = oSelectedItem.getBindingContext();
            var sBomId = oContext.getProperty("BomId");

            MessageBox.confirm("Are you sure you want to delete BOM Record " + sBomId + "?", {
                title: "Confirm Delete",
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        oContext.delete().then(function () {
                            MessageToast.show("BOM record deleted successfully");
                        }, function (oError) {
                            MessageBox.error("Error deleting BOM: " + oError.message);
                        });
                    }
                }
            });
        },

        // Product Value Help
        onProductValueHelpRequest: function (oEvent) {
            this._valueHelpInput = oEvent.getSource();
            var oView = this.getView();

            if (!this._pProductHelpDialog) {
                this._pProductHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.ProductHelp",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pProductHelpDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onProductValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("ProductId", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onProductValueHelpConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                this._valueHelpInput.setValue(oSelectedItem.getTitle());
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

        onProductValueHelpCancel: function (oEvent) {
            oEvent.getSource().getBinding("items").filter([]);
        },

        // Material Value Help
        onMaterialValueHelpRequest: function (oEvent) {
            this._valueHelpInput = oEvent.getSource();
            var oView = this.getView();

            if (!this._pMaterialHelpDialog) {
                this._pMaterialHelpDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.MaterialHelp",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pMaterialHelpDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onMaterialValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("MaterialId", FilterOperator.Contains, sValue);
            oEvent.getSource().getBinding("items").filter([oFilter]);
        },

        onMaterialValueHelpConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
                var oContext = oSelectedItem.getBindingContext();
                var oDialogModel = this.getView().getModel("dialog");
                
                oDialogModel.setProperty("/MaterialId", oContext.getProperty("MaterialId"));
                oDialogModel.setProperty("/MaterialName", oContext.getProperty("MaterialName"));
                oDialogModel.setProperty("/Unit", oContext.getProperty("Unit"));
                oDialogModel.setProperty("/UnitPrice", oContext.getProperty("UnitPrice") || 0);
                oDialogModel.setProperty("/Currency", oContext.getProperty("CukyField"));

                // Recalculate total amount
                var fQty = parseFloat(oDialogModel.getProperty("/Quantity")) || 0;
                var fPrice = parseFloat(oContext.getProperty("UnitPrice")) || 0;
                oDialogModel.setProperty("/TotalAmount", (fQty * fPrice).toFixed(2));
            }
            oEvent.getSource().getBinding("items").filter([]);
        },

        onMaterialValueHelpCancel: function (oEvent) {
            oEvent.getSource().getBinding("items").filter([]);
        }
    });
});
