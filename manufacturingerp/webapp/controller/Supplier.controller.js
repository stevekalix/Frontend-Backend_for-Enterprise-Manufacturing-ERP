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

    return Controller.extend("com.manufacturing.erp.manufacturingerp.controller.Supplier", {
        formatter: formatter,

        onInit: function () {
            var oDialogModel = new JSONModel({
                isCreate: true,
                title: "",
                SupplierId: "",
                SupplierName: "",
                GstNumber: "",
                Phone: "",
                Email: "",
                Address: "",
                Status: "Active"
            });
            this.getView().setModel(oDialogModel, "dialog");
        },

        onRefresh: function () {
            var oTable = this.byId("supplierTable");
            var oBinding = oTable.getBinding("items");
            if (oBinding) {
                oBinding.refresh();
                MessageToast.show("Suppliers refreshed");
            }
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || "";
            var oTable = this.byId("supplierTable");
            var oBinding = oTable.getBinding("items");
            
            if (oBinding) {
                var aFilters = [];
                if (sQuery) {
                    aFilters.push(new Filter("SupplierName", FilterOperator.Contains, sQuery));
                }
                oBinding.filter(aFilters);
            }
        },

        onCreate: function () {
            var oDialogModel = this.getView().getModel("dialog");
            oDialogModel.setData({
                isCreate: true,
                title: "Create Supplier",
                SupplierId: "",
                SupplierName: "",
                GstNumber: "",
                Phone: "",
                Email: "",
                Address: "",
                Status: "Active"
            });

            this._openSupplierDialog();
        },

        onEdit: function () {
            var oTable = this.byId("supplierTable");
            var oSelectedItem = oTable.getSelectedItem();
            
            if (!oSelectedItem) {
                MessageBox.warning("Please select a supplier to edit.");
                return;
            }

            var oContext = oSelectedItem.getBindingContext();
            var oDialogModel = this.getView().getModel("dialog");
            
            oDialogModel.setData({
                isCreate: false,
                title: "Edit Supplier: " + oContext.getProperty("SupplierId"),
                SupplierId: oContext.getProperty("SupplierId"),
                SupplierName: oContext.getProperty("SupplierName"),
                GstNumber: oContext.getProperty("GstNumber"),
                Phone: oContext.getProperty("Phone"),
                Email: oContext.getProperty("Email"),
                Address: oContext.getProperty("Address"),
                Status: oContext.getProperty("Status")
            });

            this._openSupplierDialog();
        },

        _openSupplierDialog: function () {
            var oView = this.getView();
            if (!this._pSupplierDialog) {
                this._pSupplierDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.SupplierDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pSupplierDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onSaveSupplier: function () {
            var oDialogModel = this.getView().getModel("dialog");
            var oData = oDialogModel.getData();

            if (!oData.SupplierId || !oData.SupplierName || !oData.GstNumber) {
                MessageBox.error("Please fill in all mandatory fields (Supplier ID, Name, GST Number).");
                return;
            }

            var oTable = this.byId("supplierTable");
            var oBinding = oTable.getBinding("items");
            var oModel = this.getView().getModel();

            var oView = this.getView();
            oView.setBusy(true);
            var that = this;

            if (oData.isCreate) {
                // Create Operation
                var oNewContext = oBinding.create({
                    SupplierId: oData.SupplierId,
                    SupplierName: oData.SupplierName,
                    GstNumber: oData.GstNumber,
                    Phone: oData.Phone,
                    Email: oData.Email,
                    Address: oData.Address,
                    Status: oData.Status
                });

                oNewContext.created().then(function () {
                    oView.setBusy(false);
                    that.onCancelSupplier();
                    MessageToast.show("Supplier created successfully");
                }, function (oError) {
                    oView.setBusy(false);
                    MessageBox.error("Error creating supplier: " + oError.message);
                });
            } else {
                // Edit Operation
                var oSelectedItem = oTable.getSelectedItem();
                var oContext = oSelectedItem.getBindingContext();
                
                oContext.setProperty("SupplierName", oData.SupplierName);
                oContext.setProperty("GstNumber", oData.GstNumber);
                oContext.setProperty("Phone", oData.Phone);
                oContext.setProperty("Email", oData.Email);
                oContext.setProperty("Address", oData.Address);
                oContext.setProperty("Status", oData.Status);

                // Submit changes for V4 model
                oModel.submitBatch(oBinding.getUpdateGroupId()).then(function () {
                    oView.setBusy(false);
                    that.onCancelSupplier();
                    MessageToast.show("Supplier updated successfully");
                }, function (oError) {
                    oView.setBusy(false);
                    MessageBox.error("Error updating supplier: " + oError.message);
                });
            }
        },

        onCancelSupplier: function () {
            if (this.byId("supplierDialog")) {
                this.byId("supplierDialog").close();
            }
        },

        onDelete: function () {
            var oTable = this.byId("supplierTable");
            var oSelectedItem = oTable.getSelectedItem();
            
            if (!oSelectedItem) {
                MessageBox.warning("Please select a supplier to delete.");
                return;
            }

            var oContext = oSelectedItem.getBindingContext();
            var sSupplierId = oContext.getProperty("SupplierId");

            MessageBox.confirm("Are you sure you want to delete Supplier " + sSupplierId + "?", {
                title: "Confirm Delete",
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        oContext.delete().then(function () {
                            MessageToast.show("Supplier deleted successfully");
                        }, function (oError) {
                            MessageBox.error("Error deleting supplier: " + oError.message);
                        });
                    }
                }
            });
        }
    });
});
