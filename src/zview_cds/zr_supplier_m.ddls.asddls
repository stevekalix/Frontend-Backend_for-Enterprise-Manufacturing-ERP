@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'View Entity for Supplier'
@Metadata.ignorePropagatedAnnotations: true
define root view entity ZR_SUPPLIER_M as select from zsupplier_m

  composition [0..*] of ZR_RAW_MATERIAL_M as _RawMaterial
  
   association [0..1] to ZR_SUPPLIER_STATUS as _Status
      on $projection.Status = _Status.Status
{

    key supplier_id as SupplierId,
    supplier_name as SupplierName,
    gst_number as GstNumber,
    phone as Phone,
    email as Email,
    address as Address,
    @Consumption.valueHelpDefinition: [
      {
        entity: {
          name: 'ZR_SUPPLIER_STATUS',
          element: 'Status'
        }
      }
    ]
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
    
    _RawMaterial ,
    _Status
}
