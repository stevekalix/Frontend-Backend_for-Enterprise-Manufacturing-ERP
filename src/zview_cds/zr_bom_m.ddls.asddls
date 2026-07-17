@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'View Entity for Bill of Product'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZR_BOM_M as select from zbom_m
   association to parent  ZR_PRODUCT_M      as _Product
    on $projection.ProductId = _Product.ProductId
    
    association [1..1] to ZR_RAW_MATERIAL_M as _Material
    on $projection.MaterialId = _Material.MaterialId
    
    association [0..1] to ZR_CURRENCY_M as _Currency
    on $projection.Currency = _Currency.CurrencyCode
{
    key bom_id as BomId,
    @Consumption.valueHelpDefinition: [
{
    entity: {
        name: 'ZR_RAW_MATERIAL_M',
        element: 'MaterialId'
    }
}]

    material_id           as MaterialId,
    product_id as ProductId,
//    @Consumption.valueHelpDefinition: [{
//    entity: {
//        name: 'ZR_RAW_MATERIAL_M',
//        element: 'MaterialName'
//    }
//}]
    material_name as MaterialName,
    quantity as Quantity,
    unit as Unit,
    @Semantics.amount.currencyCode : 'currency'
    unit_price as UnitPrice,
    @Semantics.amount.currencyCode : 'currency'
    total_amount as TotalAmount,
    @Consumption.valueHelpDefinition: [
{
    entity: {
        name: 'ZR_CURRENCY_M',
        element: 'CurrencyCode'
    }
}]
    currency as Currency,
   @Semantics.user.createdBy: true
    created_by as CreatedBy,

    @Semantics.systemDateTime.createdAt: true
    created_at as CreatedAt,

    @Semantics.user.lastChangedBy: true
    last_changed_by as LastChangedBy,

    @Semantics.systemDateTime.lastChangedAt: true
    last_changed_at as LastChangedAt,
    local_last_changed_at as LocalLastChangedAt,
    
    _Product,
    _Material,
    _Currency
}
