@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'projection for quality'
@Metadata.ignorePropagatedAnnotations: true
define view entity zi_quality as projection on zr_quality
{
 @UI.lineItem: [{ position: 10 }]
  @UI.identification: [{ position: 10 }]
    key InspectionId,
    @UI.lineItem: [{ position: 20 }]
    ManufacturingId,
    @UI.lineItem: [{ position: 30 }]
    OrderId,
    @UI.lineItem: [{ position: 40 }]
    @Semantics.quantity.unitOfMeasure : 'unit'
    PassedQuantity,
    @UI.lineItem: [{ position: 50 }]
    @Semantics.quantity.unitOfMeasure : 'unit'
    FailedQuantity,
    @UI.lineItem: [{ position: 60 }]
    Unit,
    @UI.lineItem: [{ position: 70 }]
    Inspector,
    Remarks,
    @UI.lineItem: [{ position: 80 }]
    Status,
    CreatedBy,
    CreatedAt,
    LastChangedBy,
    LastChangedAt,
    LocalLastChangedAt,
    /* Associations */
    _manufacturing : redirected to parent zi_manufacturing
}
