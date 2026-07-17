CLASS lhc_bom DEFINITION INHERITING FROM cl_abap_behavior_handler.

  PRIVATE SECTION.

    METHODS CalculateAmount FOR DETERMINE ON MODIFY
      IMPORTING keys FOR BOM~CalculateAmount.
    METHODS FillMaterialDetails FOR DETERMINE ON MODIFY
      IMPORTING keys FOR BOM~FillMaterialDetails.
    METHODS UpdateProductCost FOR DETERMINE ON MODIFY
      IMPORTING keys FOR BOM~UpdateProductCost.
    METHODS UpdateMaterialStock FOR DETERMINE ON MODIFY
      IMPORTING keys FOR BOM~UpdateMaterialStock.

ENDCLASS.

CLASS lhc_bom IMPLEMENTATION.


METHOD CalculateAmount.
  READ ENTITIES OF zr_product_m IN LOCAL MODE
    ENTITY BOM
    ALL FIELDS
    WITH CORRESPONDING #( keys )
    RESULT DATA(lt_bom).

  LOOP AT lt_bom INTO DATA(ls_bom).

    DATA: lv_material_price TYPE zraw_material_m-unit_price.

    SELECT SINGLE unit_price
      FROM zraw_material_m
      WHERE material_id = @ls_bom-MaterialId
      INTO @lv_material_price.
    IF sy-subrc = 0.
      MODIFY ENTITIES OF zr_product_m IN LOCAL MODE
        ENTITY BOM
        UPDATE FIELDS ( UnitPrice TotalAmount )
        WITH VALUE #(
          (
            %tky        = ls_bom-%tky
            UnitPrice   = lv_material_price
            TotalAmount = ls_bom-Quantity * lv_material_price
          )
        ).
    ENDIF.
  ENDLOOP.
ENDMETHOD.


METHOD FillMaterialDetails.
  READ ENTITIES OF ZR_PRODUCT_M IN LOCAL MODE
    ENTITY BOM
    ALL FIELDS
    WITH CORRESPONDING #( keys )
    RESULT DATA(lt_bom).

  LOOP AT lt_bom INTO DATA(ls_bom).

    SELECT SINGLE
           material_name,
           unit,
           unit_price,
           cuky_field
      FROM zraw_material_m
      WHERE material_id = @ls_bom-MaterialId
      INTO (
        @DATA(lv_name),
        @DATA(lv_unit),
        @DATA(lv_price),
        @DATA(lv_currency)
      ).
    IF sy-subrc = 0.
      MODIFY ENTITIES OF ZR_PRODUCT_M IN LOCAL MODE
        ENTITY BOM
        UPDATE FIELDS
        (
          MaterialName
          Unit
          UnitPrice
          Currency
        )
        WITH VALUE #(
        (
          %tky         = ls_bom-%tky
          MaterialName = lv_name
          Unit         = lv_unit
          UnitPrice    = lv_price
          Currency     = lv_currency
        ) ).

    ENDIF.
  ENDLOOP.
ENDMETHOD.
METHOD UpdateProductCost.

  DATA: lv_product_cost TYPE zpproduct_m-product_cost.

  READ ENTITIES OF zr_product_m IN LOCAL MODE
    ENTITY BOM
    ALL FIELDS
    WITH CORRESPONDING #( keys )
    RESULT DATA(lt_bom).

  LOOP AT lt_bom INTO DATA(ls_bom).

    CLEAR lv_product_cost.

    LOOP AT lt_bom INTO DATA(ls_temp)
         WHERE ProductId = ls_bom-ProductId.

      lv_product_cost = lv_product_cost + ls_temp-TotalAmount.

    ENDLOOP.

    MODIFY ENTITIES OF zr_product_m IN LOCAL MODE
      ENTITY Product
      UPDATE FIELDS ( ProductCost )
      WITH VALUE #(
        (
          %key-ProductId = ls_bom-ProductId
          ProductCost    = lv_product_cost
        )
      ).

  ENDLOOP.

ENDMETHOD.

METHOD UpdateMaterialStock.

  READ ENTITIES OF zr_product_m IN LOCAL MODE
    ENTITY BOM
    ALL FIELDS
    WITH CORRESPONDING #( keys )
    RESULT DATA(lt_bom).

  LOOP AT lt_bom INTO DATA(ls_bom).

    DATA lv_current_stock TYPE zraw_material_m-current_stock.

    "Read current stock
    SELECT SINGLE current_stock
      FROM zraw_material_m
      WHERE material_id = @ls_bom-MaterialId
      INTO @lv_current_stock.

    IF sy-subrc = 0.

      "Reduce stock by BOM quantity
      lv_current_stock = lv_current_stock - ls_bom-Quantity.

      IF lv_current_stock < 0.
        lv_current_stock = 0.
      ENDIF.

      "Update Raw Material table
      UPDATE zraw_material_m
        SET current_stock = @lv_current_stock
        WHERE material_id = @ls_bom-MaterialId.

    ENDIF.

  ENDLOOP.

ENDMETHOD.

ENDCLASS.

CLASS lhc_ZR_PRODUCT_M DEFINITION INHERITING FROM cl_abap_behavior_handler.
  PRIVATE SECTION.

    METHODS get_instance_authorizations FOR INSTANCE AUTHORIZATION
      IMPORTING keys REQUEST requested_authorizations FOR zr_product_m RESULT result.

    METHODS get_global_authorizations FOR GLOBAL AUTHORIZATION
      IMPORTING REQUEST requested_authorizations FOR zr_product_m RESULT result.
    METHODS updatesellingprice FOR DETERMINE ON MODIFY
      IMPORTING keys FOR product~updatesellingprice.

ENDCLASS.

CLASS lhc_ZR_PRODUCT_M IMPLEMENTATION.

  METHOD get_instance_authorizations.
  ENDMETHOD.

  METHOD get_global_authorizations.
  ENDMETHOD.

METHOD UpdateSellingPrice.

  DATA lv_selling_price TYPE zpproduct_m-selling_price.

  READ ENTITIES OF zr_product_m IN LOCAL MODE
    ENTITY Product
    ALL FIELDS
    WITH CORRESPONDING #( keys )
    RESULT DATA(lt_product).

  LOOP AT lt_product INTO DATA(ls_product).

    lv_selling_price =
      ls_product-ProductCost +
      ( ls_product-ProductCost *
        ls_product-ProfitPercentage / 100 ).

    MODIFY ENTITIES OF zr_product_m IN LOCAL MODE
      ENTITY Product
      UPDATE FIELDS ( SellingPrice )
      WITH VALUE #(
      (
        %tky         = ls_product-%tky
        SellingPrice = lv_selling_price
      ) ).

  ENDLOOP.

ENDMETHOD.

ENDCLASS.
