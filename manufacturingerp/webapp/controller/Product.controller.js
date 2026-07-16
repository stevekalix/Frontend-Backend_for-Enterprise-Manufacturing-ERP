sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/export/Spreadsheet",
    "com/manufacturing/erp/manufacturingerp/model/formatter"
], function (Controller, JSONModel, Filter, FilterOperator, Fragment, MessageToast, MessageBox, Spreadsheet, formatter) {
    "use strict";

    return Controller.extend("com.manufacturing.erp.manufacturingerp.controller.Product", {
        formatter: formatter,

        onInit: function () {
            var oDialogModel = new JSONModel({
                isCreate: true,
                title: "",
                ProductId: "",
                ProductName: "",
                Category: "",
                ProfitPercentage: "0",
                Currency: "USD",
                Status: "Active"
            });
            this.getView().setModel(oDialogModel, "dialog");
        },

        onRefresh: function () {
            var oTable = this.byId("productTable");
            var oBinding = oTable.getBinding("items");
            if (oBinding) {
                oBinding.refresh();
                MessageToast.show("Products refreshed");
            }
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query") || oEvent.getParameter("newValue") || "";
            var oTable = this.byId("productTable");
            var oBinding = oTable.getBinding("items");
            
            if (oBinding) {
                var aFilters = [];
                if (sQuery) {
                    aFilters.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                }
                oBinding.filter(aFilters);
            }
        },

        onCreate: function () {
            var oDialogModel = this.getView().getModel("dialog");
            oDialogModel.setData({
                isCreate: true,
                title: "Create Product",
                ProductId: "",
                ProductName: "",
                Category: "",
                ProfitPercentage: "0",
                Currency: "USD",
                Status: "Active"
            });

            this._openProductDialog();
        },

        onEdit: function () {
            var oTable = this.byId("productTable");
            var oSelectedItem = oTable.getSelectedItem();
            
            if (!oSelectedItem) {
                MessageBox.warning("Please select a product to edit.");
                return;
            }

            var oContext = oSelectedItem.getBindingContext();
            var oDialogModel = this.getView().getModel("dialog");
            
            oDialogModel.setData({
                isCreate: false,
                title: "Edit Product: " + oContext.getProperty("ProductId"),
                ProductId: oContext.getProperty("ProductId"),
                ProductName: oContext.getProperty("ProductName"),
                Category: oContext.getProperty("Category"),
                ProfitPercentage: String(oContext.getProperty("ProfitPercentage") || 0),
                Currency: oContext.getProperty("Currency"),
                Status: oContext.getProperty("Status")
            });

            this._openProductDialog();
        },

        _openProductDialog: function () {
            var oView = this.getView();
            if (!this._pProductDialog) {
                this._pProductDialog = Fragment.load({
                    id: oView.getId(),
                    name: "com.manufacturing.erp.manufacturingerp.view.fragments.ProductDialog",
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pProductDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onSaveProduct: function () {
            var oDialogModel = this.getView().getModel("dialog");
            var oData = oDialogModel.getData();

            if (!oData.ProductId || !oData.ProductName || !oData.Category || !oData.Currency) {
                MessageBox.error("Please fill in all mandatory fields.");
                return;
            }

            var oTable = this.byId("productTable");
            var oBinding = oTable.getBinding("items");
            var oModel = this.getView().getModel();

            var oView = this.getView();
            oView.setBusy(true);
            var that = this;

            if (oData.isCreate) {
                // Create Operation
                var oNewContext = oBinding.create({
                    ProductId: oData.ProductId,
                    ProductName: oData.ProductName,
                    Category: oData.Category,
                    ProfitPercentage: parseFloat(oData.ProfitPercentage) || 0,
                    Currency: oData.Currency,
                    Status: oData.Status
                });

                oNewContext.created().then(function () {
                    oView.setBusy(false);
                    that.onCancelProduct();
                    MessageToast.show("Product created successfully");
                }, function (oError) {
                    oView.setBusy(false);
                    MessageBox.error("Error creating product: " + oError.message);
                });
            } else {
                // Edit Operation
                var oSelectedItem = oTable.getSelectedItem();
                var oContext = oSelectedItem.getBindingContext();
                
                oContext.setProperty("ProductName", oData.ProductName);
                oContext.setProperty("Category", oData.Category);
                oContext.setProperty("ProfitPercentage", parseFloat(oData.ProfitPercentage) || 0);
                oContext.setProperty("Currency", oData.Currency);
                oContext.setProperty("Status", oData.Status);

                // Submit changes for V4 model
                oModel.submitBatch(oBinding.getUpdateGroupId()).then(function () {
                    oView.setBusy(false);
                    that.onCancelProduct();
                    MessageToast.show("Product updated successfully");
                }, function (oError) {
                    oView.setBusy(false);
                    MessageBox.error("Error updating product: " + oError.message);
                });
            }
        },

        onCancelProduct: function () {
            if (this.byId("productDialog")) {
                this.byId("productDialog").close();
            }
        },

        onDelete: function () {
            var oTable = this.byId("productTable");
            var oSelectedItem = oTable.getSelectedItem();
            
            if (!oSelectedItem) {
                MessageBox.warning("Please select a product to delete.");
                return;
            }

            var oContext = oSelectedItem.getBindingContext();
            var sProductId = oContext.getProperty("ProductId");

            MessageBox.confirm("Are you sure you want to delete Product " + sProductId + "?", {
                title: "Confirm Delete",
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.OK) {
                        oContext.delete().then(function () {
                            MessageToast.show("Product deleted successfully");
                        }, function (oError) {
                            MessageBox.error("Error deleting product: " + oError.message);
                        });
                    }
                }
            });
        },

        // Category Value Help
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

        // Currency Value Help
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
        },

        // Excel Export
        onExport: function () {
            var oTable = this.byId("productTable");
            var oRowBinding = oTable.getBinding("items");
            
            if (!oRowBinding) {
                MessageToast.show("No data to export");
                return;
            }

            var aCols = [
                { label: "Product ID", property: "ProductId" },
                { label: "Product Name", property: "ProductName" },
                { label: "Category", property: "Category" },
                { label: "Product Cost", property: "ProductCost", type: "number", scale: 2 },
                { label: "Profit Percentage", property: "ProfitPercentage", type: "number", scale: 2 },
                { label: "Selling Price", property: "SellingPrice", type: "number", scale: 2 },
                { label: "Currency", property: "Currency" },
                { label: "Status", property: "Status" }
            ];

            var oSettings = {
                workbook: { columns: aCols },
                dataSource: oRowBinding,
                fileName: "ProductCatalog.xlsx"
            };

            var oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
                oSheet.destroy();
            });
        }
    });
});
