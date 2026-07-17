@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Projection View for  Product'
@Metadata.ignorePropagatedAnnotations: true
@Metadata.allowExtensions: true
define root view entity ZI_PRODUCT_M as projection on ZR_PRODUCT_M
{
    key ProductId,
    ProductName,
    @Consumption.valueHelpDefinition: [
    {
        entity: {
        name: 'ZR_CATEGORYP_M',
        element: 'CategoryId'
     }
    }]
    Category,
    @Semantics.amount.currencyCode : 'currency'
    ProductCost,
    ProfitPercentage,
    @Semantics.amount.currencyCode : 'currency'
    SellingPrice,
       @Consumption.valueHelpDefinition: [
    {
    entity: {
        name: 'ZR_CURRENCY_M',
        element: 'CurrencyCode'
    }
     }]
    Currency,
    Status,
    CreatedBy,
    CreatedAt,
    LastChangedBy,
    LastChangedAt,
    LocalLastChangedAt,
    /* Associations */
    _BOM  : redirected to composition child ZI_BOM_M
}
