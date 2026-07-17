@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Projection View for  Supplier'
@Metadata.ignorePropagatedAnnotations: true
@Metadata.allowExtensions: true
define root view entity ZI_SUPPLIER_M as projection on ZR_SUPPLIER_M
{
    key SupplierId,
    SupplierName,
    GstNumber,
    Phone,
    Email,
    Address,
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
    _RawMaterial : redirected to composition child ZI_RAW_MATERIAL_M
}
