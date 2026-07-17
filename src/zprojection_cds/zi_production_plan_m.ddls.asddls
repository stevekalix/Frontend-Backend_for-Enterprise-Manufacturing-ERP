@AccessControl.authorizationCheck: #NOT_ALLOWED
@EndUserText.label: 'projection production plan'
@ObjectModel.modelingPattern: #ANALYTICAL_QUERY
@ObjectModel.supportedCapabilities: [#ANALYTICAL_QUERY]
@Metadata.allowExtensions: true
define root view entity zi_production_plan_m
provider contract transactional_query
as projection on zi_production_plan
{
@UI.lineItem: [{ position: 10 }]
@UI.identification: [{ position: 10 }]
    key PlanId,
    @UI.lineItem: [{ position: 20 }]
@UI.identification: [{ position: 20 }]
    ProductId,
    @UI.lineItem: [{ position: 30 }]
    PlannedQuantity,
    @UI.lineItem: [{ position: 40 }]
    Unit,
    @UI.lineItem: [{ position: 50 }]
    StartDate,
     @UI.lineItem: [{ position: 60 }]
    EndDate,
     @UI.lineItem: [{ position: 70 }]
    Status,
    CreatedBy,
    CreatedAt,
    LastChangedBy,
    LastChangedAt,
    LocalLastChangedAt,
    /* Associations */
    _productionord : redirected to composition child zi_production_order
}
