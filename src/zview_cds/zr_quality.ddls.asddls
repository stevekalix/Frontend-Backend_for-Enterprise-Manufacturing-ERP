@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'cds view for quality'
@Metadata.ignorePropagatedAnnotations: true
define view entity zr_quality as select from zquantity_m
association to parent zr_manufacturing as _manufacturing
on $projection.ManufacturingId = _manufacturing.ManufacturingId
{
    key inspection_id as InspectionId,
    manufacturing_id as ManufacturingId,
    order_id as OrderId,
    @Semantics.quantity.unitOfMeasure : 'unit'
    passed_quantity as PassedQuantity,
    @Semantics.quantity.unitOfMeasure : 'unit'
    failed_quantity as FailedQuantity,
    unit as Unit,
    inspector as Inspector,
    remarks as Remarks,
    status as Status,
    created_by as CreatedBy,
    created_at as CreatedAt,
    last_changed_by as LastChangedBy,
    last_changed_at as LastChangedAt,
    local_last_changed_at as LocalLastChangedAt,
    _manufacturing
}
