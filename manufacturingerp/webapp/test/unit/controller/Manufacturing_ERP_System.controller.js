/*global QUnit*/

sap.ui.define([
	"com/manufacturing/erp/manufacturingerp/controller/Manufacturing_ERP_System.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Manufacturing_ERP_System Controller");

	QUnit.test("I should test the Manufacturing_ERP_System controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
