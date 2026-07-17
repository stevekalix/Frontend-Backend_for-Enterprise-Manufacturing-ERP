@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'production plan'
@Metadata.ignorePropagatedAnnotations: true
@Search.searchable: true
define root view entity zi_production_plan
  as select from zproduction_plan
 composition [0..*] of zr_production_ord as _productionord
{
  key plan_id               as PlanId,
  @Search.defaultSearchElement: true
      product_id            as ProductId,
     @Semantics.quantity.unitOfMeasure: 'Unit'
      planned_quantity      as PlannedQuantity,
      unit                  as Unit,
      start_date            as StartDate,
      end_date              as EndDate,
      status                as Status,
     @Semantics.user.createdBy: true
    created_by as CreatedBy,

    @Semantics.systemDateTime.createdAt: true
    created_at as CreatedAt,

    @Semantics.user.lastChangedBy: true
    last_changed_by as LastChangedBy,

    @Semantics.systemDateTime.lastChangedAt: true
    last_changed_at as LastChangedAt,
    
      local_last_changed_at as LocalLastChangedAt,
      
      _productionord
}
