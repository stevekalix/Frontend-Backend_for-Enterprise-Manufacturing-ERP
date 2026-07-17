@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Value help for Supplier Status'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZR_SUPPLIER_STATUS as select from zsupplier_status
{
    key status as Status,
    description as Description
}
