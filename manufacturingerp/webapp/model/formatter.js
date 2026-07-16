sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * Returns a value state based on the status text
         * @public
         * @param {string} sStatus Status text
         * @returns {string} The value state (Success, Warning, Error, None)
         */
        statusState: function (sStatus) {
            if (!sStatus) {
                return "None";
            }
            var sLower = sStatus.toLowerCase();
            switch (sLower) {
                case "active":
                case "approved":
                case "in stock":
                case "available":
                    return "Success";
                case "inactive":
                case "out of stock":
                case "terminated":
                    return "Error";
                case "pending":
                case "reorder":
                case "low stock":
                    return "Warning";
                default:
                    return "None";
            }
        },

        /**
         * Formats a numeric value to a decimal string
         * @public
         * @param {string|number} fValue The numeric value
         * @returns {string} Formatted number
         */
        formatNumber: function (fValue) {
            if (fValue === undefined || fValue === null || fValue === "") {
                return "0.00";
            }
            var parseFloatVal = parseFloat(fValue);
            return isNaN(parseFloatVal) ? "0.00" : parseFloatVal.toFixed(2);
        },

        /**
         * Combines unit price and currency
         * @public
         * @param {string|number} fPrice Price
         * @param {string} sCurrency Currency
         * @returns {string} Formatted string
         */
        formatCurrency: function (fPrice, sCurrency) {
            if (!fPrice) {
                return "0.00 " + (sCurrency || "");
            }
            return parseFloat(fPrice).toFixed(2) + " " + (sCurrency || "");
        }
    };
});
