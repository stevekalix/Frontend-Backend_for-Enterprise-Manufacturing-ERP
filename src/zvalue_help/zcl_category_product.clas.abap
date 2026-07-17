CLASS zcl_category_product DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
  INTERFACES if_oo_adt_classrun.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_category_product IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.


  DATA lt_category TYPE TABLE OF zcategoryp_m.

lt_category = VALUE #(

  ( category_id = 'Furniture' )
  ( category_id = 'Office Furniture' )
  ( category_id = 'Home Furniture' )
  ( category_id = 'Bedroom Furniture' )
  ( category_id = 'Living Room Furniture' )
  ( category_id = 'Dining Furniture' )
  ( category_id = 'Kitchen Furniture' )
  ( category_id = 'Chair' )
  ( category_id = 'Office Chair' )
  ( category_id = 'Plastic Chair' )
  ( category_id = 'Wooden Chair' )
  ( category_id = 'Steel Chair' )
  ( category_id = 'Table' )
  ( category_id = 'Office Table' )
  ( category_id = 'Study Table' )
  ( category_id = 'Dining Table' )
  ( category_id = 'Computer Table' )
  ( category_id = 'Bed' )
  ( category_id = 'Single Bed' )
  ( category_id = 'Double Bed' )
  ( category_id = 'Sofa' )
  ( category_id = 'Sofa Set' )
  ( category_id = 'Cupboard' )
  ( category_id = 'Wardrobe' )
  ( category_id = 'Cabinet' )
  ( category_id = 'Bookshelf' )
  ( category_id = 'TV Unit' )
  ( category_id = 'Shoe Rack' )
  ( category_id = 'Storage Rack' )
  ( category_id = 'Bench' )
  ( category_id = 'Desk' )
  ( category_id = 'Workstation' )
  ( category_id = 'Reception Desk' )
  ( category_id = 'Conference Table' )
  ( category_id = 'Coffee Table' )
  ( category_id = 'Side Table' )
  ( category_id = 'Dressing Table' )
  ( category_id = 'Mirror Frame' )
  ( category_id = 'Wooden Door' )
  ( category_id = 'Wooden Window' )
  ( category_id = 'Partition' )
  ( category_id = 'Modular Furniture' )
  ( category_id = 'School Furniture' )
  ( category_id = 'Hospital Furniture' )
  ( category_id = 'Industrial Furniture' )
  ( category_id = 'Outdoor Furniture' )
  ( category_id = 'Custom Furniture' )
  ( category_id = 'Metal Furniture' )
  ( category_id = 'Plastic Furniture' )
  ( category_id = 'Other Products' )

).

INSERT zcategoryp_m FROM TABLE @lt_category
  ACCEPTING DUPLICATE KEYS.

  out->write( |Category data inserted successfully.| ).



  ENDMETHOD.

ENDCLASS.
