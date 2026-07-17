@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'production order'
@Metadata.ignorePropagatedAnnotations: true
define view entity zr_production_ord as select from zproduction_ord
association to parent zi_production_plan as _productionplan
on $projection.PlanId = _productionplan.PlanId
{
    key order_id as OrderId,
    plan_id as PlanId,
    product_id as ProductId,
    @Semantics.quantity.unitOfMeasure: 'Unit'
    order_quantity as OrderQuantity,
    unit as Unit,
    order_date as OrderDate,
    status as Status,
    created_by as CreatedBy,
    created_at as CreatedAt,
    last_changed_by as LastChangedBy,
    last_changed_at as LastChangedAt,
    local_last_changed_at as LocalLastChangedAt,
    _productionplan
}
