---
to: <%= path %>/<%= component_name %>.astro
---

---
<% if (have_style) { -%>
import style from "./<%= component_name -%>.module.scss"
<% } -%>
export type Props = {}

const props = Astro.props
---

<div class={style.<%= component_name -%>} {...props}></div>
