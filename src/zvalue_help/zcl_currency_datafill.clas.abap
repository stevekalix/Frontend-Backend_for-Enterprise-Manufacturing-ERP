CLASS zcl_currency_datafill DEFINITION
  PUBLIC
  FINAL
  CREATE PUBLIC .

  PUBLIC SECTION.
  INTERFACES if_oo_adt_classrun.
  PROTECTED SECTION.
  PRIVATE SECTION.
ENDCLASS.



CLASS zcl_currency_datafill IMPLEMENTATION.
  METHOD if_oo_adt_classrun~main.

  DATA lt_currency TYPE TABLE OF zcurrency_m.
lt_currency = VALUE #(

  ( currency_code = 'INR' currency_name = 'Indian Rupee'        currency_symbol = '₹'  country = 'IN' )
  ( currency_code = 'USD' currency_name = 'US Dollar'           currency_symbol = '$'  country = 'US' )
  ( currency_code = 'EUR' currency_name = 'Euro'                currency_symbol = '€'  country = 'DE' )
  ( currency_code = 'GBP' currency_name = 'Pound Sterling'      currency_symbol = '£'  country = 'GB' )
  ( currency_code = 'JPY' currency_name = 'Japanese Yen'        currency_symbol = '¥'  country = 'JP' )
  ( currency_code = 'CNY' currency_name = 'Chinese Yuan'        currency_symbol = '¥'  country = 'CN' )
  ( currency_code = 'AUD' currency_name = 'Australian Dollar'   currency_symbol = 'A$' country = 'AU' )
  ( currency_code = 'CAD' currency_name = 'Canadian Dollar'     currency_symbol = 'C$' country = 'CA' )
  ( currency_code = 'CHF' currency_name = 'Swiss Franc'         currency_symbol = 'CHF' country = 'CH' )
  ( currency_code = 'SGD' currency_name = 'Singapore Dollar'    currency_symbol = 'S$' country = 'SG' )
  ( currency_code = 'MYR' currency_name = 'Malaysian Ringgit'   currency_symbol = 'RM' country = 'MY' )
  ( currency_code = 'THB' currency_name = 'Thai Baht'           currency_symbol = '฿'  country = 'TH' )
  ( currency_code = 'IDR' currency_name = 'Indonesian Rupiah'   currency_symbol = 'Rp' country = 'ID' )
  ( currency_code = 'KRW' currency_name = 'South Korean Won'    currency_symbol = '₩'  country = 'KR' )
  ( currency_code = 'AED' currency_name = 'UAE Dirham'          currency_symbol = 'د.إ' country = 'AE' )
  ( currency_code = 'SAR' currency_name = 'Saudi Riyal'         currency_symbol = '﷼'  country = 'SA' )
  ( currency_code = 'QAR' currency_name = 'Qatari Riyal'        currency_symbol = 'ر.ق' country = 'QA' )
  ( currency_code = 'KWD' currency_name = 'Kuwaiti Dinar'       currency_symbol = 'KD' country = 'KW' )
  ( currency_code = 'OMR' currency_name = 'Omani Rial'          currency_symbol = 'ر.ع.' country = 'OM' )
  ( currency_code = 'BHD' currency_name = 'Bahraini Dinar'      currency_symbol = 'BD' country = 'BH' )
  ( currency_code = 'NZD' currency_name = 'New Zealand Dollar'  currency_symbol = 'NZ$' country = 'NZ' )
  ( currency_code = 'ZAR' currency_name = 'South African Rand'  currency_symbol = 'R'  country = 'ZA' )
  ( currency_code = 'BRL' currency_name = 'Brazilian Real'      currency_symbol = 'R$' country = 'BR' )
  ( currency_code = 'MXN' currency_name = 'Mexican Peso'        currency_symbol = '$'  country = 'MX' )
  ( currency_code = 'TRY' currency_name = 'Turkish Lira'        currency_symbol = '₺'  country = 'TR' )
  ( currency_code = 'PKR' currency_name = 'Pakistani Rupee'     currency_symbol = '₨'  country = 'PK' )
  ( currency_code = 'LKR' currency_name = 'Sri Lankan Rupee'    currency_symbol = 'Rs' country = 'LK' )
  ( currency_code = 'NPR' currency_name = 'Nepalese Rupee'      currency_symbol = 'Rs' country = 'NP' )
  ( currency_code = 'BDT' currency_name = 'Bangladeshi Taka'    currency_symbol = '৳'  country = 'BD' )

).

INSERT zcurrency_m FROM TABLE @lt_currency
  ACCEPTING DUPLICATE KEYS.


  ENDMETHOD.

ENDCLASS.
