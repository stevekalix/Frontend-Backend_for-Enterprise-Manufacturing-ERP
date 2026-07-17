@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'View Entity for Materal'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZR_RAW_MATERIAL_M as select from zraw_material_m

 association to parent ZR_SUPPLIER_M as _Supplier
    on $projection.SupplierId = _Supplier.SupplierId
    
 
 association [0..1] to ZR_UNIT_M as _Unit
    on $projection.Unit = _Unit.UnitCode
    
    
  association [0..1] to ZR_SUPPLIER_STATUS as _Status
      on $projection.Status = _Status.Status
      
  association [0..1] to ZR_CATEGORY_M as _Category
  on $projection.Category = _Category.CategoryId

{
    key material_id as MaterialId,
    material_name as MaterialName,
    supplier_id as SupplierId,
    category as Category,
    unit as Unit,
    cuky_field as CukyField,
    @Semantics.amount.currencyCode : 'CukyField'
    unit_price as UnitPrice,
    @Semantics.quantity.unitOfMeasure : 'unit'
    current_stock as CurrentStock,
    @Semantics.quantity.unitOfMeasure : 'unit'
    reorder_level as ReorderLevel,
    status as Status,
   @Semantics.user.createdBy: true
    created_by as CreatedBy,

    @Semantics.systemDateTime.createdAt: true
    created_at as CreatedAt,

    @Semantics.user.lastChangedBy: true
    last_changed_by as LastChangedBy,

    @Semantics.systemDateTime.lastChangedAt: true
    last_changed_at as LastChangedAt,
    local_last_changed_at as LocalLastChangedAt,
    
    _Supplier,
    _Unit,
    _Status,
    _Category
}
