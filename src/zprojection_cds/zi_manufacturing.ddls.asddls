@AccessControl.authorizationCheck: #NOT_ALLOWED
@EndUserText.label: 'projection for manufacturing'
@ObjectModel.modelingPattern: #ANALYTICAL_QUERY
@ObjectModel.supportedCapabilities: [#ANALYTICAL_QUERY]
define root view entity zi_manufacturing
provider contract transactional_query
as projection on zr_manufacturing
{
@UI.lineItem: [{ position: 10 }]
  @UI.identification: [{ position: 10 }]
    key ManufacturingId,
    @UI.lineItem: [{ position: 20 }]
    OrderId,
    @UI.lineItem: [{ position: 30 }]
    MachineId,
    @UI.lineItem: [{ position: 40 }]
    EmployeeId,
    @UI.lineItem: [{ position: 50 }]
    ProducedQuantity,
    @UI.lineItem: [{ position: 60 }]
    Unit,
    @UI.lineItem: [{ position: 70 }]
    Status,
    CreatedBy,
    CreatedAt,
    LastChangedBy,
    LastChangedAt,
    LocalLastChangedAt,
    /* Associations */
    _quality : redirected to composition child zi_quality
}
