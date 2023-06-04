# Paginize
[![ci](https://github.com/kokoro-hart/Paginize/actions/workflows/ci.yml/badge.svg)](https://github.com/kokoro-hart/Paginize/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![License: MIT](https://img.shields.io/badge/vresion-1.1.0-blue)](https://www.npmjs.com/package/@kokorotobita/paginize?activeTab=readme)


**Paginize** is a library for easily applying pagination to the existing DOM, implemented in **TypeScrip**t. Furthermore, it can reliably create pagination UI that complies with [WAI-ARIA guidelines](https://design-system.w3.org/components/pagination.html "タイトル")  with minimal configuration. <br>
You can also get this with just a little CSS writing: note: you will need to write your own CSS to get this UI. This package does not provide CSS.


![vue-awesome-pagination-k](https://github.com/kokoro-hart/Paginize/assets/84849551/f38a36d3-e61e-4dd8-995c-4786758ce12b)

Following are some of the interactions handled by the library:-
- Apply paging to already existing DOM elements
- Toggle each aria attribute
- Save each page to browser history
 
※Asynchronous paging is not supported

# Installation
Paginize is provided by npm and can be installed from the command line.

```
npm i @kokorotobita/paginize
```

# Usage
1. Add the pagination markup

```html
<!-- [1] Wrapper-->
<div class="paginize">
  <!-- [2] Contents-->
  <ul class="paginize-contents">
    <li class="paginize-content">item-1</li>
    <li class="paginize-content">item-2</li>
    <li class="paginize-content">item-3</li>
    ...Repeat below
  </ul>

  <!-- [3] Paginaiton-->
  <nav aria-label="pagination" class="paginize-wrapper">
    <button type="button" class="paginize-prev" aria-label="Back to Previous Page"> &lt;</button>
    <ol class="paginize-counter-list" aria-busy="true">
      <!-- [4] The page numbers will be inserted here-->
    </ol>
    <button type="button" class="paginize-next" aria-label="Go to next page">&gt;</button>
  </nav>
</div>
```

**[ 1 ] Wrapper<br>**
This is the outermost container for pagination and the content to which it switches. The role of this container is to limit the scope.

**[ 2 ] Contents<br>**
Add contents.

**[ 3 ] Paginaiton<br>**
Wrapper element for pagination.The aria-label attribute adds to the `<nav>` element. This is because the main site navigation also uses the `<nav>` element. If there are multiple `<nav> `elements on a single page, they must all be given unique, accessible names with `aria-label`.

**[ 4 ] PageNumbers<br>**
A page number list is output here.　The `aria-busy` attribute is added to explicitly indicate that the contents are updated each time.



