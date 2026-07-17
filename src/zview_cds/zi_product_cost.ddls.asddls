@AccessControl.authorizationCheck: #NOT_REQUIRED
@EndUserText.label: 'Product Cost'
define view entity ZI_PRODUCT_COST
  as select from zbom_m
{
  key product_id,

  @Semantics.amount.currencyCode: 'currency'
  sum( total_amount ) as ProductCost,

  currency
}
group by product_id, currency;
