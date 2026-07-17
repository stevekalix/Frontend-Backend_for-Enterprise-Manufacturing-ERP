CLASS lhc_Supplier DEFINITION INHERITING FROM cl_abap_behavior_handler.
  PRIVATE SECTION.

    METHODS get_instance_authorizations FOR INSTANCE AUTHORIZATION
      IMPORTING keys REQUEST requested_authorizations FOR Supplier RESULT result.

    METHODS get_global_authorizations FOR GLOBAL AUTHORIZATION
      IMPORTING REQUEST requested_authorizations FOR Supplier RESULT result.
    METHODS GenerateGST FOR DETERMINE ON MODIFY
      IMPORTING keys FOR Supplier~GenerateGST.

ENDCLASS.

CLASS lhc_Supplier IMPLEMENTATION.

  METHOD get_instance_authorizations.
  ENDMETHOD.

  METHOD get_global_authorizations.
  ENDMETHOD.

  METHOD GenerateGST.
   DATA lv_uuid TYPE sysuuid_x16.
    DATA lv_gst  TYPE zsupplier_m-gst_number.

    LOOP AT keys INTO DATA(ls_key).

      "Generate UUID
      TRY.
          lv_uuid = cl_system_uuid=>create_uuid_x16_static( ).
        CATCH cx_uuid_error.
          "handle exception
      ENDTRY.

      "Create GST Number
      lv_gst = |GST{ lv_uuid }|.

      MODIFY ENTITIES OF zr_supplier_m IN LOCAL MODE
        ENTITY Supplier
        UPDATE
        FIELDS ( GstNumber )
        WITH VALUE #(
          (
            %tky      = ls_key-%tky
            GstNumber = lv_gst
          )
        ).

    ENDLOOP.
  ENDMETHOD.

ENDCLASS.
