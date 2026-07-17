@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'View Entity for Unit'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZR_UNIT_M as select from zunit_m
{
    key unit_code as UnitCode,
    unit_name as UnitName,
    unit_symbol as UnitSymbol
}
