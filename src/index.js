"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
var Pagination = /** @class */ (function () {
    function Pagination(root, _a) {
        var 
        // common
        _b = _a.contentItem, 
        // common
        contentItem = _b === void 0 ? '.pagininze-item' : _b, _c = _a.perPage, perPage = _c === void 0 ? 5 : _c, _d = _a.isNextPrev, isNextPrev = _d === void 0 ? true : _d, _e = _a.isHistory, isHistory = _e === void 0 ? true : _e, 
        // counter
        _f = _a.pageRangeDisplayed, 
        // counter
        pageRangeDisplayed = _f === void 0 ? 5 : _f, _g = _a.isEllipsis, isEllipsis = _g === void 0 ? true : _g, _h = _a.ellipsisText, ellipsisText = _h === void 0 ? '. . .' : _h, 
        // navigation
        _j = _a.prevEl, 
        // navigation
        prevEl = _j === void 0 ? '.pagininze-prev' : _j, _k = _a.nextEl, nextEl = _k === void 0 ? '.pagininze-next' : _k, 
        // pager
        _l = _a.pageNumberWrapEl, 
        // pager
        pageNumberWrapEl = _l === void 0 ? '.pagininze-counter' : _l, _m = _a.pageNumberEl, pageNumberEl = _m === void 0 ? '.pagininze-number' : _m, _o = _a.pageNumberTag, pageNumberTag = _o === void 0 ? 'button' : _o, _p = _a.pageNumberHref, pageNumberHref = _p === void 0 ? '' : _p, _q = _a.isChooseUp, isChooseUp = _q === void 0 ? false : _q, 
        // A11y
        _r = _a.nextMassage, 
        // A11y
        nextMassage = _r === void 0 ? 'Go to next page' : _r, _s = _a.prevMassage, prevMassage = _s === void 0 ? 'Go to prev page' : _s, _t = _a.bulletMessage, bulletMessage = _t === void 0 ? 'Go to page {{count}}' : _t, _u = _a.firstPageMessage, firstPageMessage = _u === void 0 ? 'This is first page' : _u, _v = _a.lastPageMessage, lastPageMessage = _v === void 0 ? 'This is last page' : _v, 
        // breakpoint
        _w = _a.breakpoint, 
        // breakpoint
        breakpoint = _w === void 0 ? {
            minWidth: 768,
        } : _w, 
        // callback
        _x = _a.onPageChange, 
        // callback
        onPageChange = _x === void 0 ? undefined : _x, _y = _a.onClickNext, onClickNext = _y === void 0 ? undefined : _y, _z = _a.onClickPrev, onClickPrev = _z === void 0 ? undefined : _z, _0 = _a.onClickNumber, onClickNumber = _0 === void 0 ? undefined : _0, _1 = _a.onBeforeMount, onBeforeMount = _1 === void 0 ? undefined : _1, _2 = _a.onMounted, onMounted = _2 === void 0 ? undefined : _2;
        var _this = this;
        this.disabledButtonNext = function () {
            if (!_this.buttonNext)
                return;
            _this.buttonNext.dataset.disable = 'true';
            _this.buttonNext.style.pointerEvents = 'none';
            _this.buttonNext.removeAttribute('aria-label');
        };
        Object.assign(this, {
            perPage: perPage,
            isNextPrev: isNextPrev,
            isHistory: isHistory,
            pageRangeDisplayed: pageRangeDisplayed,
            isEllipsis: isEllipsis,
            ellipsisText: ellipsisText,
            pageNumberEl: pageNumberEl,
            pageNumberTag: pageNumberTag,
            pageNumberHref: pageNumberHref,
            isChooseUp: isChooseUp,
            nextMassage: nextMassage,
            prevMassage: prevMassage,
            bulletMessage: bulletMessage,
            firstPageMessage: firstPageMessage,
            lastPageMessage: lastPageMessage,
            breakpoint: breakpoint,
            onPageChange: onPageChange,
            onClickNext: onClickNext,
            onClickPrev: onClickPrev,
            onClickNumber: onClickNumber,
            onBeforeMount: onBeforeMount,
            onMounted: onMounted,
        });
        if (onBeforeMount)
            this.onBeforeMount();
        this.targetRoot = document.querySelector(root);
        if (!this.targetRoot)
            return;
        this.targetNodes = this.targetRoot.querySelectorAll(contentItem);
        this.pageCounterWrap = this.targetRoot.querySelector(pageNumberWrapEl);
        if (isNextPrev) {
            this.buttonPrev = this.targetRoot.querySelector(prevEl);
            this.buttonNext = this.targetRoot.querySelector(nextEl);
        }
        this.currentPagerEl = null;
        this.init();
        if (!this.targetNodes)
            return;
        this.totalContent = this.targetNodes.length;
        this.totalPage = Math.ceil(this.totalContent / this._perPage);
        this.registerEvents();
        if (this.totalContent === 0)
            window.location.reload();
        if (onMounted)
            this.onMounted();
    }
    Pagination.prototype.init = function () {
        var _this = this;
        var listener = function (event) {
            if (event.matches) {
                _this._perPage = _this.breakpoint.perPage ? _this.breakpoint.perPage : _this.perPage;
                _this._pageRangeDisplayed = _this.breakpoint.pageRangeDisplayed
                    ? _this.breakpoint.pageRangeDisplayed
                    : _this.pageRangeDisplayed;
                _this._isChooseUp = _this.breakpoint.isChooseUp ? _this.breakpoint.isChooseUp : _this.isChooseUp;
                _this.initConstructor();
                _this.initQueryParams();
            }
            else {
                _this._perPage = _this.perPage;
                _this._pageRangeDisplayed = _this.pageRangeDisplayed;
                _this._isChooseUp = _this.isChooseUp;
                _this.initConstructor();
                _this.initQueryParams();
            }
        };
        var mediaQueryList = window.matchMedia("(min-width: ".concat(this.breakpoint.minWidth, "px)"));
        mediaQueryList.onchange = listener;
        listener(mediaQueryList);
    };
    Pagination.prototype.initConstructor = function () {
        if (!this.pageCounterWrap || !this.targetNodes)
            return;
        this.pageCounterWrap.innerHTML = '';
        this.currentPager = 0;
        this.indexStart = 0;
        this.indexEnd = 0;
        this.totalPage = Math.ceil(this.targetNodes.length / this._perPage);
    };
    Pagination.prototype.initQueryParams = function () {
        if (!this.isHistory) {
            this.updatePageState();
            this.updateCurrentButton();
            return;
        }
        var urlParams = new URLSearchParams(window.location.search);
        var pagedParam = urlParams.get('paged');
        if (pagedParam === null || pagedParam === '0') {
            this.updatePageState();
            this.updateCurrentButton();
        }
        else {
            this.updatePageState(Number(pagedParam));
        }
    };
    Pagination.prototype.registerEvents = function () {
        var _this = this;
        if (!this.buttonNext || !this.buttonPrev)
            return;
        this.buttonNext.addEventListener('click', function () {
            _this.updatePageState((_this.currentPager += 1));
            _this.onPageChange !== undefined && _this.onPageChange(_this.currentPager);
            _this.onClickNext() !== undefined && _this.onClickNext();
        });
        this.buttonPrev.addEventListener('click', function () {
            _this.updatePageState((_this.currentPager -= 1));
            _this.onPageChange !== undefined && _this.onPageChange(_this.currentPager);
            _this.onClickPrev() !== undefined && _this.onClickPrev();
        });
    };
    Pagination.prototype.activateButtonPrev = function () {
        if (!this.buttonPrev)
            return;
        this.buttonPrev.dataset.disable = 'false';
        this.buttonPrev.style.pointerEvents = 'auto';
        this.buttonPrev.setAttribute('aria-label', this.prevMassage);
    };
    Pagination.prototype.activateButtonNext = function () {
        if (!this.buttonNext)
            return;
        this.buttonNext.dataset.disable = 'false';
        this.buttonNext.style.pointerEvents = 'auto';
        this.buttonNext.setAttribute('aria-label', this.nextMassage);
    };
    Pagination.prototype.disabledButtonPrev = function () {
        if (!this.buttonPrev)
            return;
        this.buttonPrev.dataset.disable = 'true';
        this.buttonPrev.style.pointerEvents = 'none';
        this.buttonPrev.removeAttribute('aria-label');
    };
    Pagination.prototype.updateCurrentButton = function (count) {
        var _a;
        if (count === void 0) { count = 1; }
        this.currentPagerEl = document.querySelector(".pagininze-number[data-counter-id=\"".concat(count, "\"]"));
        (_a = this.currentPagerEl) === null || _a === void 0 ? void 0 : _a.setAttribute('data-current', 'true');
    };
    Pagination.prototype.updateContentsView = function (current, counts) {
        if (!this.targetNodes)
            return;
        this.indexStart = current * counts - counts;
        this.indexEnd = current * counts - 1;
        var indexArray = [];
        for (var i = this.indexStart; i < this.indexEnd + 1; i += 1) {
            indexArray.push(i);
        }
        this.targetNodes.forEach(function (element) {
            element.style.display = 'none';
        });
        this.targetNodes.forEach(function (element, index) {
            if (indexArray.indexOf(index) !== -1) {
                element.style.display = 'block';
            }
        });
    };
    Pagination.prototype.updatePageState = function (currentCount) {
        var _this = this;
        if (!this.pageCounterWrap)
            return;
        if (currentCount === 1 || currentCount === undefined || this.currentPager === 1) {
            this.currentPager = 1;
            this.activateButtonNext();
            this.disabledButtonPrev();
        }
        else if (currentCount === this.totalPage) {
            this.currentPager = currentCount;
            this.disabledButtonNext();
            this.activateButtonPrev();
        }
        else {
            this.currentPager = currentCount;
            this.activateButtonNext();
            this.activateButtonPrev();
        }
        if (this.totalPage === 1) {
            this.disabledButtonNext();
            this.disabledButtonPrev();
        }
        this.updateContentsView(this.currentPager, this._perPage);
        this.pageCounterWrap.innerHTML = '';
        this.createPageCounter(this.currentPager, this.totalPage);
        if (this.isHistory) {
            var params = new URLSearchParams({ paged: String(this.currentPager) });
            var currentURL = new URL(window.location.href);
            currentURL.search = params.toString();
            window.history.replaceState({}, '', currentURL.toString());
        }
        this.updateCurrentButton(currentCount);
        document.querySelectorAll(this.pageNumberEl).forEach(function (element) {
            element.addEventListener('click', function () {
                _this.currentPager = Number(element.getAttribute('data-counter-id'));
                _this.updatePageState(_this.currentPager);
                _this.onPageChange !== undefined && _this.onPageChange(_this.currentPager);
                _this.onClickNumber !== undefined && _this.onClickNumber();
            });
        });
    };
    Pagination.prototype.createPageCounter = function (current, totalPage) {
        if (this.isEllipsis) {
            this.createPageCounterWithEllipsis(current, totalPage);
        }
        else {
            for (var i = 1; i <= totalPage; i += 1) {
                this.createPagerEls(i);
            }
        }
    };
    Pagination.prototype.createPagerEls = function (i) {
        if (!this.pageCounterWrap)
            return;
        var countList = document.createElement("".concat(this.pageNumberHref ? 'a' : this.pageNumberTag));
        this.pageNumberHref && countList.setAttribute('href', "".concat(this.pageNumberHref).concat(i));
        this.pageNumberTag === 'button' && countList.setAttribute('type', 'button');
        countList.setAttribute('data-counter-id', String(i));
        if (i === this.totalPage) {
            countList.setAttribute('aria-label', "".concat(this.lastPageMessage));
        }
        else if (i === 1) {
            countList.setAttribute('aria-label', "".concat(this.firstPageMessage));
        }
        else {
            var bulletMessage = this.bulletMessage.replace('{{count}}', String(i));
            countList.setAttribute('aria-label', bulletMessage);
        }
        countList.classList.add(this.pageNumberEl.replace('.', ''));
        countList.textContent = String(i);
        this.pageCounterWrap.appendChild(countList);
    };
    Pagination.prototype.createPageCounterWithEllipsis = function (current, totalPage) {
        var _this = this;
        var createEllipsis = function () {
            if (!_this.pageCounterWrap)
                return;
            var ellipsis = document.createElement('span');
            ellipsis.classList.add('pagininze-ellipsis');
            ellipsis.innerHTML = _this.ellipsisText;
            _this.pageCounterWrap.appendChild(ellipsis);
        };
        if (totalPage > this._pageRangeDisplayed && this._pageRangeDisplayed > 4) {
            var startPage = 1;
            if (totalPage === 5 + 1) {
                for (var i = 1; i <= totalPage; i += 1) {
                    this.createPagerEls(i);
                }
            }
            else if (current <= 5 / 2 + 1.5) {
                var plusNum = this._isChooseUp ? 2 : 1;
                for (var i = startPage; i <= current + plusNum; i += 1) {
                    this.createPagerEls(i);
                }
                if (current < totalPage - 2) {
                    createEllipsis();
                }
                this.createPagerEls(totalPage);
            }
            else if (current >= totalPage - 2) {
                for (var i = startPage; i <= 2; i += 1) {
                    this.createPagerEls(i);
                }
                createEllipsis();
                var lastPageStart = totalPage - 3;
                for (var i = lastPageStart; i <= totalPage; i += 1) {
                    this.createPagerEls(i);
                }
            }
            else {
                for (var i = startPage; i <= 1; i += 1) {
                    this.createPagerEls(i);
                }
                createEllipsis();
                var plusNum = this._isChooseUp ? 2 : 1;
                for (var i = current - plusNum; i <= current + plusNum; i += 1) {
                    this.createPagerEls(i);
                }
                createEllipsis();
                this.createPagerEls(totalPage);
            }
        }
        else {
            for (var i = 1; i <= totalPage; i += 1) {
                this.createPagerEls(i);
            }
        }
    };
    return Pagination;
}());
exports.Pagination = Pagination;
