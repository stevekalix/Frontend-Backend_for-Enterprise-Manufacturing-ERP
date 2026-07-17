@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Projection View for  Material'
@Metadata.ignorePropagatedAnnotations: true
@Metadata.allowExtensions: true
define view entity ZI_RAW_MATERIAL_M as projection on ZR_RAW_MATERIAL_M
{
    key MaterialId,
    MaterialName,
    SupplierId,
    
    @Consumption.valueHelpDefinition: [
{
  entity: {
    name    : 'ZR_CATEGORY_M',
    element : 'CategoryId'
  }
}]
    Category,
    @Consumption.valueHelpDefinition: [
  {
  entity: {
    name: 'I_UnitOfMeasure',
    element: 'UnitOfMeasure'
  }
  }]
    Unit,
    CukyField,
    @Semantics.amount.currencyCode : 'CukyField'
    UnitPrice,
    @Semantics.quantity.unitOfMeasure : 'unit'
    CurrentStock,
    @Semantics.quantity.unitOfMeasure : 'unit'
    ReorderLevel,
    @Consumption.valueHelpDefinition: [
      {
        entity: {
          name: 'ZR_SUPPLIER_STATUS',
          element: 'Status'
        }
      }
    ]
    Status,
    CreatedBy,
    CreatedAt,
    LastChangedBy,
    LastChangedAt,
    LocalLastChangedAt,
    /* Associations */
    _Supplier : redirected to parent ZI_SUPPLIER_M
}
