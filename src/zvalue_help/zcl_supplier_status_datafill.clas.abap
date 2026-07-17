CLASS zcl_supplier_status_datafill DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
  INTERFACES if_oo_adt_classrun.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_supplier_status_datafill IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
   DATA lt_status TYPE TABLE OF zsupplier_status.

    lt_status = VALUE #(
      ( status = 'Active'            description = 'Active Supplier' )
      ( status = 'Inactive'          description = 'Inactive Supplier' )
      ( status = 'Pending Approval' description = 'Pending Approval' )
      ( status = 'Blocked'           description = 'Blocked Supplier' )
      ( status = 'Suspended'         description = 'Suspended Supplier' )
    ).

    INSERT zsupplier_status FROM TABLE @lt_status.

    IF sy-subrc = 0.
      COMMIT WORK.
      out->WRITE( 'Supplier Status inserted successfully.' ).
    ELSE.
      out->write( 'Insertion failed or records already exist.' ).
    ENDIF.


  ENDMETHOD.

ENDCLASS.
