sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], (BaseController, MessageToast, MessageBox) => {
  "use strict";

  return BaseController.extend("com.manufacturing.erp.manufacturingerp.controller.App", {
      onInit() {
          // Sync routing with side navigation selection
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.attachRouteMatched(this.onRouteMatched, this);
      },

      onRouteMatched(oEvent) {
          var sRouteName = oEvent.getParameter("name");
          var oSideNavigation = this.byId("sideNavigation");
          if (oSideNavigation && sRouteName) {
              oSideNavigation.setSelectedKey(sRouteName);
          }
      },

      onSideNavButtonPress() {
          var oToolPage = this.byId("toolPage");
          var bSideExpanded = oToolPage.getSideExpanded();
          oToolPage.setSideExpanded(!bSideExpanded);
      },

      onSideNavItemSelect(oEvent) {
          var sKey = oEvent.getParameter("item").getKey();
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter.navTo(sKey);
      },

      onNotificationPress() {
          MessageToast.show("Notifications: System is running normally. 0 errors detected.");
      },

      onProfilePress() {
          MessageToast.show("User Profile: Venkatesan (Administrator)");
      },

      onLogoutPress() {
          MessageBox.confirm("Are you sure you want to log out of the Enterprise Manufacturing ERP?", {
              title: "Logout Confirmation",
              onClose: (oAction) => {
                  if (oAction === MessageBox.Action.OK) {
                      MessageToast.show("Logged out successfully");
                  }
              }
          });
      }
  });
});