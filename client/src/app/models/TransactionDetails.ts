export interface TransactionDetails {
  transaction_details: {
    transaction_info: {
      paypal_account_id: string;
      transaction_id: string;
      transaction_event_code: string;
      transaction_initiation_date: string;
      transaction_updated_date: string;
      transaction_amount: {
        currency_code: string;
        value: string;
      };
      fee_amount: {
        currency_code: string;
        value: string;
      };
      transaction_status: string;
      protection_eligibility: string;
    };
    payer_info: {
      account_id: string;
      email_address: string;
      address_status: string;
      payer_status: string;
      payer_name: {
        given_name: string;
        surname: string;
        alternate_full_name: string;
      };
      country_code: string;
    };
    shipping_info: {
      name: string;
      method: string;
      address: {
        line1: string;
        city: string;
        country_code: string;
        postal_code: string;
      };
    };
    cart_info: {
      item_details: {
        item_code: string;
        item_name: string;
        item_quantity: string;
        item_unit_price: {
          currency_code: string;
          value: string;
        };
        item_amount: {
          currency_code: string;
          value: string;
        };
        tax_amounts: {
          tax_amount: {
            currency_code: string;
            value: string;
          };
        }[];
        basic_shipping_amount: {
          currency_code: string;
          value: string;
        };
        total_item_amount: {
          currency_code: string;
          value: string;
        };
      }[];
    };
    store_info: {};
    auction_info: {
      auction_site: string;
      auction_item_site: string;
      auction_buyer_id: string;
      auction_closing_date: string;
    };
    incentive_info: {};
  }[];
  account_number: string;
  last_refreshed_datetime: string;
  page: number;
  total_items: number;
  total_pages: number;
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
}
