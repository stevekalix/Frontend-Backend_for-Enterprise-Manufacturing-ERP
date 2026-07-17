@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'manufacturing cds'
@Metadata.ignorePropagatedAnnotations: true
define root view entity zr_manufacturing as select from zmanufacturing
composition [0..*] of zr_quality as _quality
{
    key manufacturing_id as ManufacturingId,
    order_id as OrderId,
    machine_id as MachineId,
    employee_id as EmployeeId,
    @Semantics.quantity.unitOfMeasure:'unit'
    produced_quantity as ProducedQuantity,
    unit as Unit,
    status as Status,
    created_by as CreatedBy,
    created_at as CreatedAt,
    last_changed_by as LastChangedBy,
    last_changed_at as LastChangedAt,
    local_last_changed_at as LocalLastChangedAt,
    _quality
}
