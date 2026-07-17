@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'View Entity for Product'
@Metadata.ignorePropagatedAnnotations: true

define root view entity ZR_PRODUCT_M
  as select from zpproduct_m
  
 association [0..1] to ZR_CATEGORYP_M as _Category
  on $projection.Category = _Category.CategoryId

  composition [0..*] of ZR_BOM_M as _BOM
{
  key product_id            as ProductId,
      product_name          as ProductName,
      category              as Category,

  @Semantics.amount.currencyCode: 'Currency'
      product_cost          as ProductCost,

      profit_percentage     as ProfitPercentage,

  @Semantics.amount.currencyCode: 'Currency'
      selling_price         as SellingPrice,

      currency              as Currency,
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

      _BOM,
      _Category
}
