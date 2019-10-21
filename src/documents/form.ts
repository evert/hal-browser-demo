import { Context } from '@curveball/core';

export default function form(ctx: Context) {

  ctx.response.type = 'application/prs.hal-forms+json';
  ctx.response.body = {
    _links: {
      self: { href: '/form' },
      describedby: { href: 'https://rwcbook.github.io/hal-forms/' , title: 'We implement the HAL-Forms spec' },
    },

    _templates : {
      default : {
        title : "Leave feedback",
        "method" : "post",
        "contentType" : "application/x-www-form-urlencoded",
        "properties" : [
          {"name" : "title", "required" : true, "value" : "", "prompt" : "Title", "regex" : "", "templated" : false},
          {"name" : "completed", "required" : false, "value" : "false", "prompt" : "Completed", "regex" : ""}
        ]
      }
    }
  }
}
