@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'View Entity for  Product Group'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZR_CATEGORYP_M as select from zcategoryp_m
{
    key category_id as CategoryId
}
