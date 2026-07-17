@AbapCatalog.viewEnhancementCategory: [#NONE]
@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'View Entity for Currency'
@Metadata.ignorePropagatedAnnotations: true
define view entity ZR_CURRENCY_M as select from zcurrency_m
{
    key currency_code as CurrencyCode,
    currency_name as CurrencyName,
    currency_symbol as CurrencySymbol,
    country as Country
}
