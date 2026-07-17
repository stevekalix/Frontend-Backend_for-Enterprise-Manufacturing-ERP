CLASS zcl_category DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
  INTERFACES if_oo_adt_classrun.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_category IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.
  DATA lt_category TYPE TABLE OF zcategory_m.

lt_category = VALUE #(

  ( category_id = 'Furniture' )
  ( category_id = 'Electronics' )
  ( category_id = 'Electrical' )
  ( category_id = 'Mechanical' )
  ( category_id = 'Raw Material' )
  ( category_id = 'Finished Goods' )
  ( category_id = 'Semi Finished Goods' )
  ( category_id = 'Packaging Material' )
  ( category_id = 'Consumables' )
  ( category_id = 'Hardware' )
  ( category_id = 'Software' )
  ( category_id = 'Steel' )
  ( category_id = 'Stainless Steel' )
  ( category_id = 'Iron' )
  ( category_id = 'Aluminium' )
  ( category_id = 'Copper' )
  ( category_id = 'Brass' )
  ( category_id = 'Plastic' )
  ( category_id = 'Rubber' )
  ( category_id = 'Wood' )
  ( category_id = 'Plywood' )
  ( category_id = 'Glass' )
  ( category_id = 'Ceramic' )
  ( category_id = 'Chemical' )
  ( category_id = 'Paint' )
  ( category_id = 'Adhesive' )
  ( category_id = 'Lubricant' )
  ( category_id = 'Textile' )
  ( category_id = 'Leather' )
  ( category_id = 'Paper' )
  ( category_id = 'Cardboard' )
  ( category_id = 'Foam' )
  ( category_id = 'Fasteners' )
  ( category_id = 'Bolt' )
  ( category_id = 'Nut' )
  ( category_id = 'Washer' )
  ( category_id = 'Screw' )
  ( category_id = 'Nail' )
  ( category_id = 'Pipe' )
  ( category_id = 'Tube' )
  ( category_id = 'Cable' )
  ( category_id = 'Wire' )
  ( category_id = 'Motor' )
  ( category_id = 'Bearing' )
  ( category_id = 'Gear' )
  ( category_id = 'Spring' )
  ( category_id = 'Valve' )
  ( category_id = 'Pump' )
  ( category_id = 'Machine Parts' )
  ( category_id = 'Tools' )
  ( category_id = 'Safety Equipment' )
  ( category_id = 'Office Supplies' )
  ( category_id = 'Stationery' )
  ( category_id = 'Cleaning Material' )
  ( category_id = 'Medical Supplies' )
  ( category_id = 'Agriculture' )
  ( category_id = 'Food Products' )
  ( category_id = 'Beverages' )
  ( category_id = 'Pharmaceutical' )
  ( category_id = 'Automobile Parts' )
  ( category_id = 'Construction Material' )
  ( category_id = 'Energy Equipment' )
  ( category_id = 'Solar Equipment' )
  ( category_id = 'Battery' )
  ( category_id = 'Packaging' )
  ( category_id = 'Miscellaneous' )

).

INSERT zcategory_m
  FROM TABLE @lt_category
  ACCEPTING DUPLICATE KEYS.

  ENDMETHOD.

ENDCLASS.
