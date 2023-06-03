module.exports = {
  extends: ["markuplint:recommended"],
  parser: {
    ".astro$": "@markuplint/astro-parser",
  },
  rules: {
    "attr-duplication": true,
    "attr-equal-space-after": "never",
    "attr-equal-space-before": "never",
    "attr-spacing": true,
    "attr-value-quotes": "double",
    "case-sensitive-attr-name": "lower",
    "case-sensitive-tag-name": "lower",
    "character-reference": false,
    "deprecated-attr": true,
    "deprecated-element": true,
    doctype: "always",
    "end-tag": true,
    "id-duplication": true,
    "ineffective-attr": true,
    "invalid-attr": {
      options: {
        allowAttrs: [
          "{...props}",
          // ...TODO: .astroコンポーネント上でやむを得ず必要な属性があれば追加する
        ],
      },
    },
    "landmark-roles": true,
    "no-boolean-attr-value": true,
    "no-default-value": false,
    // 'no-hard-code-id': true, 仕組み化できたらtrueにしたい
    "no-refer-to-non-existent-id": false,
    "no-use-event-handler-attr": true,
    "permitted-contents": true,
    "require-accessible-name": true,
    "required-attr": true,
    "required-element": true,
    "required-h1": true,
    "use-list": true,
    "wai-aria": true,
  },
  nodeRules: [
    {
      selector: "head",
      rules: {
        "invalid-attr": {
          option: {
            attrs: {
              prefix: {
                type: "String",
              },
            },
          },
        },
      },
    },
    {
      selector: "meta[property]",
      rules: {
        "invalid-attr": {
          option: {
            attrs: {
              property: {
                type: "String",
              },
              content: {
                type: "String",
              },
            },
          },
        },
      },
    },
    {
      selector: "link",
      rules: {
        "no-use-event-handler-attr": false,
      },
    },
    {
      selector: "img",
      rules: {
        "required-attr": ["alt", "width", "height", "decoding"],
      },
    },
    {
      selector: "button",
      rules: {
        "required-attr": ["type"],
      },
    },
    {
      selector: "option",
      rules: {
        "require-accessible-name": false,
      },
    },
  ],
}
