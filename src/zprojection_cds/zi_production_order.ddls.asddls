@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'projection production order'
@Metadata.ignorePropagatedAnnotations: true
define view entity zi_production_order 
as projection on zr_production_ord
{
@UI.lineItem: [{ position: 10 }]
  @UI.identification: [{ position: 10 }]
    key OrderId,
     @UI.lineItem: [{ position: 20 }]
    PlanId,
     @UI.lineItem: [{ position: 30 }]
    ProductId,
     @UI.lineItem: [{ position: 40 }]
    @Semantics.quantity.unitOfMeasure: 'Unit'
    OrderQuantity,
     @UI.lineItem: [{ position: 50 }]
    Unit,
     @UI.lineItem: [{ position: 60 }]
    OrderDate,
     @UI.lineItem: [{ position: 70 }]
    Status,
    CreatedBy,
    CreatedAt,
    LastChangedBy,
    LastChangedAt,
    LocalLastChangedAt,
    /* Associations */
    _productionplan : redirected to parent zi_production_plan_m
}
