import { Context } from '@curveball/core';

export default function form(ctx: Context) {

  ctx.response.type = 'application/hal+json';
  ctx.response.body = {
    _links: {
      self: { href: '/form' },
      describedby: { href: 'https://github.com/Dwolla/hal-forms', title: 'We implement the Dwolla HAL-Forms implementeation' },
    },
    title: 'Feedback form. Please note, this is fake!',

    _forms: {
      default: {
        _links: {
          target: {
            href: 'http://api.example.com/customers'
          }
        },
        method: 'POST',
        contentType: 'application/hal+json',
        fields: [
          {
            name: 'name',
            path: '/name',
            type: 'string',
            value: 'Dwolla',
            displayText: 'Name',
            validations: {
              required: true
            }
          },
          {
            name: 'email',
            path: '/email',
            type: 'email',
            displayText: 'Email',
            validations: {
              required: true
            }
          },
          {
            name: 'password',
            path: '/password',
            type: 'sensitive',
            displayText: 'Password',
            validations: {
              required: true
            }
          },
          {
            name: 'businessType',
            path: '/businessType',
            type: 'string',
            displayText: 'Business Type',
            validations: {
              required: true
            },
            accepted: {
              values: [
                {
                  value: 'corporation',
                  key: 'CORPORATION',
                  displayText: 'Corporation'
                },
                {
                  value: 'llc',
                  key: 'LLC',
                  displayText: 'LLC'
                },
                {
                  value: 'partnership',
                  key: 'PARTNERSHIP',
                  displayText: 'Partnership'
                },
                {
                  value: 'soleproprietorship',
                  key: 'SOLEPROPRIETORSHIP',
                  displayText: 'Sole Proprietorship'
                }
              ]
            }
          },
          {
            name: 'businessClassification',
            path: '/businessClassification',
            type: 'string',
            displayText: 'Business Classification',
            validations: {
              required: true
            },
            accepted: {
              groupedValues: [
                {
                  key: 'FOOD_RETAIL_AND_SERVICE',
                  displayText: 'Food retail and service',
                  values: [
                    {
                      value: 'breweries',
                      key: 'BREWERIES',
                      displayText: 'Breweries'
                    },
                    {
                      value: 'distilleries',
                      key: 'DISTILLERIES',
                      displayText: 'Distilleries'
                    }
                  ]
                },
                {
                  key: 'MANUFACTURING',
                  displayText: 'Manufacturing',
                  values: [
                    {
                      value: 'computers',
                      key: 'COMPUTER_AND_ELECTRONIC_PRODUCT_MANUFACTURING',
                      displayText: 'Computer and electronic product manufacturing'
                    },
                    {
                      value: 'furniture',
                      key: 'FURNITURE_AND_RELATED_PRODUCT_MANUFACTURING',
                      displayText: 'Furniture and related product manufacturing'
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    }

  };

}
