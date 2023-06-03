export type DefaultOption = {
  // common
  contentItem: string
  perPage: number
  isNextPrev: boolean
  isHistory: boolean

  // counter
  pageRangeDisplayed: number

  // navigation
  prevEl: string
  nextEl: string

  // pager
  pageNumberWrapEl: string
  pageNumberEl: string
  pageNumberTag: string
  pageNumberHref: string
  isChooseUp: boolean

  // Ellipsis
  isEllipsis: boolean
  ellipsisText: string

  // A11y
  nextMassage: string
  prevMassage: string
  bulletMessage: string
  firstPageMessage: string
  lastPageMessage: string

  // callback
  onPageChange: (current: number) => void | undefined
  onClickNext: () => void | undefined
  onClickPrev: () => void | undefined
  onClickNumber: () => void | undefined
  onBeforeMount: () => void | undefined
  onMounted: () => void | undefined
}

export type PartialOption = Partial<DefaultOption>

export type BreakpointOptions = Pick<PartialOption, "perPage" | "pageRangeDisplayed" | "isChooseUp"> & {
  minWidth: number
}

export type PaginizeOption = PartialOption & {
  breakpoint?: BreakpointOptions
}

export class Pagination {
  readonly targetRoot!: HTMLElement | null

  readonly targetNodes!: NodeListOf<HTMLElement> | null

  readonly pageCounterWrap!: HTMLElement | null

  readonly buttonPrev!: HTMLElement | null

  readonly buttonNext!: HTMLElement | null

  readonly perPage!: number

  readonly pageRangeDisplayed!: number

  readonly isChooseUp!: boolean

  currentPagerEl!: HTMLElement | null

  totalPage!: number

  totalContent!: number

  _perPage!: number

  currentPager!: number

  indexStart!: number

  indexEnd!: number

  _pageRangeDisplayed!: number

  isHistory!: boolean

  isEllipsis!: boolean

  ellipsisText!: string

  pageNumberEl!: string

  pageNumberTag!: string

  pageNumberHref!: string

  _isChooseUp!: boolean

  nextMassage!: string

  prevMassage!: string

  bulletMessage!: string

  firstPageMessage!: string

  lastPageMessage!: string

  breakpoint!: BreakpointOptions

  onPageChange!: (current: number) => void | undefined

  onClickNext!: () => void | undefined

  onClickPrev!: () => void | undefined

  onClickNumber!: () => void | undefined

  onBeforeMount!: () => void | undefined

  onMounted!: () => void | undefined

  constructor(
    root: string,
    {
      // common
      contentItem = ".paginize-item",
      perPage = 5,
      isNextPrev = true,
      isHistory = true,

      // counter
      pageRangeDisplayed = 5,
      isEllipsis = true,
      ellipsisText = ". . .",

      // navigation
      prevEl = ".paginize-prev",
      nextEl = ".paginize-next",

      // pager
      pageNumberWrapEl = ".paginize-counter",
      pageNumberEl = ".paginize-number",
      pageNumberTag = "button",
      pageNumberHref = "",
      isChooseUp = false,

      // A11y
      nextMassage = "Go to next page",
      prevMassage = "Go to prev page",
      bulletMessage = "Go to page {{count}}",
      firstPageMessage = "This is first page",
      lastPageMessage = "This is last page",

      // breakpoint
      breakpoint = {
        minWidth: 768,
      },

      // callback
      onPageChange = undefined,
      onClickNext = undefined,
      onClickPrev = undefined,
      onClickNumber = undefined,
      onBeforeMount = undefined,
      onMounted = undefined,
    }: PaginizeOption
  ) {
    Object.assign(this, {
      perPage,
      isNextPrev,
      isHistory,

      pageRangeDisplayed,
      isEllipsis,
      ellipsisText,

      pageNumberEl,
      pageNumberTag,
      pageNumberHref,
      isChooseUp,

      nextMassage,
      prevMassage,
      bulletMessage,
      firstPageMessage,
      lastPageMessage,

      breakpoint,
      onPageChange,
      onClickNext,
      onClickPrev,
      onClickNumber,
      onBeforeMount,
      onMounted,
    })

    if (onBeforeMount) this.onBeforeMount()

    this.targetRoot = document.querySelector(root)

    if (!this.targetRoot) return

    this.targetNodes = this.targetRoot.querySelectorAll(contentItem)

    this.pageCounterWrap = this.targetRoot.querySelector(pageNumberWrapEl)

    if (isNextPrev) {
      this.buttonPrev = this.targetRoot.querySelector(prevEl)

      this.buttonNext = this.targetRoot.querySelector(nextEl)
    }

    this.currentPagerEl = null

    this.init()

    if (!this.targetNodes) return

    this.totalContent = this.targetNodes.length

    this.totalPage = Math.ceil(this.totalContent / this._perPage)

    this.registerEvents()
    if (this.totalContent === 0) window.location.reload()

    if (onMounted) this.onMounted()
  }

  protected init() {
    const listener = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches) {
        this._perPage = this.breakpoint.perPage ? this.breakpoint.perPage : this.perPage
        this._pageRangeDisplayed = this.breakpoint.pageRangeDisplayed
          ? this.breakpoint.pageRangeDisplayed
          : this.pageRangeDisplayed
        this._isChooseUp = this.breakpoint.isChooseUp ? this.breakpoint.isChooseUp : this.isChooseUp

        this.initConstructor()
        this.initQueryParams()
      } else {
        this._perPage = this.perPage
        this._pageRangeDisplayed = this.pageRangeDisplayed
        this._isChooseUp = this.isChooseUp
        this.initConstructor()
        this.initQueryParams()
      }
    }

    const mediaQueryList = window.matchMedia(`(min-width: ${this.breakpoint.minWidth}px)`)
    mediaQueryList.onchange = listener
    listener(mediaQueryList)
  }

  protected initConstructor() {
    if (!this.pageCounterWrap || !this.targetNodes) return
    this.pageCounterWrap.innerHTML = ""

    this.currentPager = 0

    this.indexStart = 0

    this.indexEnd = 0

    this.totalPage = Math.ceil(this.targetNodes.length / this._perPage)
  }

  protected initQueryParams() {
    if (!this.isHistory) {
      this.updatePageState()
      this.updateCurrentButton()
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const pagedParam = urlParams.get("paged")

    if (pagedParam === null || pagedParam === "0") {
      this.updatePageState()
      this.updateCurrentButton()
    } else {
      this.updatePageState(Number(pagedParam))
    }
  }

  protected registerEvents() {
    if (!this.buttonNext || !this.buttonPrev) return
    this.buttonNext.addEventListener("click", () => {
      this.updatePageState((this.currentPager += 1))
      if (this.onPageChange !== undefined) this.onPageChange(this.currentPager)
      if (this.onClickNext !== undefined) this.onClickNext()
    })

    this.buttonPrev.addEventListener("click", () => {
      this.updatePageState((this.currentPager -= 1))
      if (this.onPageChange !== undefined) this.onPageChange(this.currentPager)
      if (this.onClickPrev() !== undefined) this.onClickPrev()
    })
  }

  protected activateButtonPrev() {
    if (!this.buttonPrev) return
    this.buttonPrev.dataset.disable = "false"
    this.buttonPrev.style.pointerEvents = "auto"
    this.buttonPrev.setAttribute("aria-label", this.prevMassage)
  }

  protected activateButtonNext() {
    if (!this.buttonNext) return
    this.buttonNext.dataset.disable = "false"
    this.buttonNext.style.pointerEvents = "auto"
    this.buttonNext.setAttribute("aria-label", this.nextMassage)
  }

  protected disabledButtonPrev() {
    if (!this.buttonPrev) return
    this.buttonPrev.dataset.disable = "true"
    this.buttonPrev.style.pointerEvents = "none"
    this.buttonPrev.removeAttribute("aria-label")
  }

  protected disabledButtonNext = () => {
    if (!this.buttonNext) return
    this.buttonNext.dataset.disable = "true"
    this.buttonNext.style.pointerEvents = "none"
    this.buttonNext.removeAttribute("aria-label")
  }

  protected updateCurrentButton(count = 1) {
    this.currentPagerEl = document.querySelector(`.paginize-number[data-counter-id="${count}"]`)
    this.currentPagerEl?.setAttribute("data-current", "true")
  }

  protected updateContentsView(current: number, counts: number) {
    if (!this.targetNodes) return

    this.indexStart = current * counts - counts
    this.indexEnd = current * counts - 1
    const indexArray: number[] = []
    for (let i = this.indexStart; i < this.indexEnd + 1; i += 1) {
      indexArray.push(i)
    }

    this.targetNodes.forEach((element) => {
      const el = element
      el.style.display = "none"
    })

    this.targetNodes.forEach((element, index) => {
      if (indexArray.indexOf(index) !== -1) {
        const el = element
        el.style.display = "block"
      }
    })
  }

  protected updatePageState(currentCount?: number) {
    if (!this.pageCounterWrap) return

    if (currentCount === 1 || currentCount === undefined || this.currentPager === 1) {
      this.currentPager = 1
      this.activateButtonNext()
      this.disabledButtonPrev()
    } else if (currentCount === this.totalPage) {
      this.currentPager = currentCount
      this.disabledButtonNext()
      this.activateButtonPrev()
    } else {
      this.currentPager = currentCount
      this.activateButtonNext()
      this.activateButtonPrev()
    }
    if (this.totalPage === 1) {
      this.disabledButtonNext()
      this.disabledButtonPrev()
    }

    this.updateContentsView(this.currentPager, this._perPage)

    this.pageCounterWrap.innerHTML = ""

    this.createPageCounter(this.currentPager, this.totalPage)

    if (this.isHistory) {
      const params = new URLSearchParams({ paged: String(this.currentPager) })
      const currentURL = new URL(window.location.href)
      currentURL.search = params.toString()
      window.history.replaceState({}, "", currentURL.toString())
    }

    this.updateCurrentButton(currentCount)

    document.querySelectorAll(this.pageNumberEl).forEach((element) => {
      element.addEventListener("click", () => {
        this.currentPager = Number(element.getAttribute("data-counter-id"))
        this.updatePageState(this.currentPager)
        if (this.onPageChange !== undefined) this.onPageChange(this.currentPager)
        if (this.onClickNumber !== undefined) this.onClickNumber()
      })
    })
  }

  protected createPageCounter(current: number, totalPage: number) {
    if (this.isEllipsis) {
      this.createPageCounterWithEllipsis(current, totalPage)
    } else {
      for (let i = 1; i <= totalPage; i += 1) {
        this.createPagerEls(i)
      }
    }
  }

  protected createPagerEls(i: number) {
    if (!this.pageCounterWrap) return

    const countList = document.createElement(`${this.pageNumberHref ? "a" : this.pageNumberTag}`)

    if (this.pageNumberHref) countList.setAttribute("href", `${this.pageNumberHref}${i}`)
    if (this.pageNumberTag === "button") countList.setAttribute("type", "button")

    countList.setAttribute("data-counter-id", String(i))
    if (i === this.totalPage) {
      countList.setAttribute("aria-label", `${this.lastPageMessage}`)
    } else if (i === 1) {
      countList.setAttribute("aria-label", `${this.firstPageMessage}`)
    } else {
      const bulletMessage = this.bulletMessage.replace("{{count}}", String(i))
      countList.setAttribute("aria-label", bulletMessage)
    }
    countList.classList.add(this.pageNumberEl.replace(".", ""))
    countList.textContent = String(i)
    this.pageCounterWrap.appendChild(countList)
  }

  protected createPageCounterWithEllipsis(current: number, totalPage: number) {
    const createEllipsis = () => {
      if (!this.pageCounterWrap) return
      const ellipsis = document.createElement("span")
      ellipsis.classList.add("paginize-ellipsis")
      ellipsis.innerHTML = this.ellipsisText
      this.pageCounterWrap.appendChild(ellipsis)
    }

    if (totalPage > this._pageRangeDisplayed && this._pageRangeDisplayed > 4) {
      const startPage = 1

      if (totalPage === 5 + 1) {
        for (let i = 1; i <= totalPage; i += 1) {
          this.createPagerEls(i)
        }
      } else if (current <= 5 / 2 + 1.5) {
        const plusNum = this._isChooseUp ? 2 : 1

        for (let i = startPage; i <= current + plusNum; i += 1) {
          this.createPagerEls(i)
        }

        if (current < totalPage - 2) {
          createEllipsis()
        }

        this.createPagerEls(totalPage)
      } else if (current >= totalPage - 2) {
        for (let i = startPage; i <= 2; i += 1) {
          this.createPagerEls(i)
        }

        createEllipsis()

        const lastPageStart = totalPage - 3
        for (let i = lastPageStart; i <= totalPage; i += 1) {
          this.createPagerEls(i)
        }
      } else {
        for (let i = startPage; i <= 1; i += 1) {
          this.createPagerEls(i)
        }

        createEllipsis()
        const plusNum = this._isChooseUp ? 2 : 1
        for (let i = current - plusNum; i <= current + plusNum; i += 1) {
          this.createPagerEls(i)
        }

        createEllipsis()

        this.createPagerEls(totalPage)
      }
    } else {
      for (let i = 1; i <= totalPage; i += 1) {
        this.createPagerEls(i)
      }
    }
  }
}
