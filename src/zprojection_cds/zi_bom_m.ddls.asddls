@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Projection View for  BOM'
@Metadata.ignorePropagatedAnnotations: true
@Metadata.allowExtensions: true
define view entity ZI_BOM_M as projection on ZR_BOM_M
{
    key BomId,
    ProductId,
      @Consumption.valueHelpDefinition: [
{
    entity: {
        name: 'ZR_RAW_MATERIAL_M',
        element: 'MaterialId'
    }
}]
    
    MaterialId,
    MaterialName,
    Quantity,
    Unit,
    @Semantics.amount.currencyCode : 'currency'
    UnitPrice,
    @Semantics.amount.currencyCode : 'currency'
    TotalAmount,
       @Consumption.valueHelpDefinition: [
{
    entity: {
        name: 'ZR_CURRENCY_M',
        element: 'CurrencyCode'
    }
}]
    Currency,
    CreatedBy,
    CreatedAt,
    LastChangedBy,
    LastChangedAt,
    LocalLastChangedAt,
    /* Associations */
    _Material,
    _Product  : redirected to parent ZI_PRODUCT_M
}
