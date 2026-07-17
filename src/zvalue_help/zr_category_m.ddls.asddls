@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'View Entity for Category'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZR_CATEGORY_M as select from zcategory_m
{
    key category_id as CategoryId
}
