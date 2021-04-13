document.addEventListener('DOMContentLoaded', function () {
  // search form
  $('.search__btn').on('click', () => {
    $('.search__form').fadeIn(250)
    $('.search__form input').focus()
  })
  $('.search__form-close').on('click', () => {
    $('.search__form').fadeOut(250)
  })

  // Info shape
  const shapeBtn = '.advantages__info-icon',
    shapeText = '.advantages__info-text',
    zoomIn = 'show animate__animated animate__zoomIn',
    zoomOut = 'animate__animated animate__zoomOut',
    active = 'is-active'

  $(shapeBtn).on('click', function () {
    // click for icon
    const th = $(this),
      textModal = th.next(),
      parrentContainer = th.closest('.advantages')

    if (!th.hasClass(active)) {
      parrentContainer.find($(shapeBtn)).removeClass(active)
      parrentContainer.find('.show').removeClass(zoomIn).addClass(zoomOut)

      th.addClass(active)
      textModal.removeClass(zoomOut).addClass(zoomIn)
    } else {
      th.removeClass(active)
      textModal.removeClass(zoomIn).addClass(zoomOut)
    }
  })

  $(document).on('click', function (e) {
    // click for document
    if (!$(shapeText).is(e.target) && $(shapeBtn).has(e.target).length === 0) {
      $(shapeBtn).removeClass(active)
      $(e.target)
        .closest('body')
        .find(`${shapeText}.show`)
        .removeClass(zoomIn)
        .addClass(zoomOut)
    }
  })

  // wrap span first string .name-block
  $('.name-block__name').html(function (index, text) {
    return text.replace(
      /^(\w+|[[а-яА-ЯёЁ]+)/,
      '<span class="name-block__name-border">$1</span>'
    )
  })

  // quiz

  const numberSteps = $('.quiz__step').length
  let count = 0

  $('.quiz__form').each(function () {
    // add progress bar
    $(this).prepend(
      `<div class="quiz__progress">
        <span class="quiz__progress-line"></span>
       </div>`
    )

    // add number steps
    $(this).prepend('<div class="quiz__number"></div>')
    for (let i = 1; i <= numberSteps; i++) {
      $(this)
        .find('.quiz__number')
        .append(`<div class="quiz__number-item">Вопрос #${i}</div>`)
    }
  })

  function progressUp(i) {
    let elem = $(`.quiz__number-item:eq(${i})`)
    let elemWidth = $(`.quiz__number-item:eq(${i})`).width() / 2
    let positionItem = elem.position().left + elemWidth
    $('.quiz__progress-line').css('width', `${positionItem}px`)
  }

  progressUp(count)

  $('.quiz__step').each(function () {
    // add button next/prev
    const th = $(this)
    th.append(`
    <div class="quiz__btns">
      <button class="quiz__btns-prev quiz__btns-btn" type="button">Назад</button>
      <button class="quiz__btns-next quiz__btns-btn" type="button">Далее</button>
    </div>`)
  })

  $('.quiz__number-item:first-of-type').addClass('is-active')
  $('.quiz__step:first-of-type')
    .addClass('is-active')
    .find('.quiz__btns-prev')
    .remove()
  $('.quiz__step:last-of-type .quiz__btns-next').remove()

  $('.quiz__btns-next').on('click', function () {
    // next step
    const th = $(this)
    let validate = 0

    th.closest('.quiz__step')
      .find('input')
      .each(function (i, e, a) {
        validate += $(e).prop('checked')
      })

    if (validate > 0) {
      th.closest('.quiz__step').removeClass('error')
      th.closest('.quiz__step').removeClass('is-active')
      th.closest('.quiz__step').next().addClass('is-active')
      th.closest('.quiz__form')
        .find('.quiz__number-item.is-active')
        .next()
        .addClass('is-active')

      // progress line next
      count++
      progressUp(count)
    } else {
      th.closest('.quiz__step').addClass('error')
    }
  })

  $('.quiz__btns-prev').on('click', function () {
    // prev step
    const th = $(this)
    th.closest('.quiz__step').removeClass('is-active')
    th.closest('.quiz__step').prev().addClass('is-active')
    th.closest('.quiz__form')
      .find('.quiz__number-item.is-active')
      .removeClass('is-active')
      .prev()
      .addClass('is-active')

    // progress line prev
    count--
    progressUp(count)
  })

  // radio click
  function clickRadio(el) {
    var siblings = document.querySelectorAll(
      "input[type='radio'][name='" + el.name + "']"
    )
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i] != el) siblings[i].oldChecked = false
    }
    if (el.oldChecked) el.checked = false
    el.oldChecked = el.checked
  }

  $('input[type="radio"]').on('click', function () {
    clickRadio(this)
  })

  // mask

  $('.phone-js').inputmask('+7 (999) 99 99 999 ')

  // licenze-slider
  let licenzeSlider = new Swiper('.licenze-slider__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },

    // autoplay
    autoplay: {
      delay: 6000
    },

    // Navigation arrows
    navigation: {
      nextEl: '.licenze-slider .swiper-button-next',
      prevEl: '.licenze-slider .swiper-button-prev'
    }
  })

  let benefitSlider = new Swiper('.benefit-slider .swiper-container', {
    slidesPerView: 'auto',
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '.benefit-slider .swiper-button-next',
      prevEl: '.benefit-slider .swiper-button-prev'
    }
  })

  let commentSlider = new Swiper('.comment-slider__container', {
    spaceBetween: 10,
    autoHeight: true,
    allowTouchMove: false,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },

    // autoplay
    autoplay: {
      delay: 6000
    },
    navigation: {
      nextEl: '.comment-slider .swiper-button-next',
      prevEl: '.comment-slider .swiper-button-prev'
    }
  })

  // countSwipre
  function countSwipre(swiperName, swiperClass) {
    let counter = $(`.${swiperClass} .swiper-fraction`)
    let countAll = $(`.${swiperClass} .swiper-slide`).length
    let currentCount = $(`<span class="count">1/${countAll}<span/>`)
    counter.append(currentCount)

    swiperName.on('transitionStart', function () {
      let index = this.activeIndex + 1
      currentCount = $(`<span class="count next">${index}/${countAll}<span/>`)
      counter.html(currentCount)
    })
  }

  countSwipre(licenzeSlider, 'licenze-slider__slider')
  countSwipre(commentSlider, 'comment-slider__container')

  let commentThumbSlider = new Swiper('.comment-thumb .swiper-container', {
    slidesPerView: 'auto',
    slidesPerColumn: 1,
    loop: true,
    initialSlide: 1,
    // centeredSlides: true,
    autoHeight: true,
    allowTouchMove: false,

    // autoplay
    autoplay: {
      delay: 6000
    },
    navigation: {
      nextEl: '.comment-slider .swiper-button-next',
      prevEl: '.comment-slider .swiper-button-prev'
    }
  })

  let commentTextSlider = new Swiper('.comment-text .swiper-container', {
    slidesPerView: 1,
    slidesPerColumn: 1,
    loop: true,
    initialSlide: 0,
    effect: 'fade',
    // centeredSlides: true,
    autoHeight: true,
    allowTouchMove: false,

    // autoplay
    autoplay: {
      delay: 6000
    },
    navigation: {
      nextEl: '.comment-slider .swiper-button-next',
      prevEl: '.comment-slider .swiper-button-prev'
    }
  })

  // animate wow

  const wow = new WOW({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'animate__animated', // animation css class (default is animated)
    offset: 100, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null // optional scroll container selector, otherwise use window
  })
  wow.init()

  // graph tabs
  $('.tabs__nav-item').eq(0).addClass('is-active')
  $('.tabs__content').eq(0).addClass('is-active')

  // line tabs
  let lineElem = $('.graph__nav-line')
  let tabNav = $('.tabs__nav-item')
  let lineWidth = tabNav.eq(0).innerWidth()
  let linePosition = tabNav.eq(0).position().left

  function lineAnimate(e, elem) {
    setTimeout(() => {
      lineWidth = tabNav.eq(e).innerWidth()
      linePosition = tabNav.eq(e).position().left

      elem.css({
        width: `${lineWidth}px`,
        left: `${linePosition}px`
      })
    }, 30)
  }

  lineAnimate(0, lineElem)

  // tabs click
  tabNav.on('click', function () {
    const parent = $(this).closest('.tabs')
    const index = parent.find(tabNav).index(this)
    parent.find(tabNav).removeClass('is-active')
    $(this).addClass('is-active')
    parent.find('.tabs__content').removeClass('is-active')
    parent.find('.tabs__content').eq(index).addClass('is-active')
    lineAnimate(index, lineElem)
  })

  // benefit

  function benefitImgWidth() {
    const widthImg = $('.benefit__body').offset().left
    $('.benefit__img').css({
      width: `${widthImg}px`
    })
  }

  benefitImgWidth()

  $(window).on('resize', function () {
    benefitImgWidth()
  })

  // benefit height reduction

  const benefitItem = $('.benefit-card__item')

  benefitItem.each(function () {
    const th = $(this)
    const height = th.find('.benefit-card__item--body').outerHeight()
    const even = (n) => n % 2
    const imemsLength = benefitItem.length

    // last delete border
    if (!even(imemsLength)) {
      benefitItem.slice(-2).addClass('last')
    } else {
      benefitItem.slice(-1).addClass('last')
    }

    // last height reduction
    if (height > 101) {
      th.addClass('owerflow')
    }
  })

  // faq
  $('.faq__item-title').on('click', function () {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open')
      $(this).next().slideUp()
    } else {
      $(this).closest('.faq__wrap').find('.faq__item-title').removeClass('open')
      $(this).toggleClass('open')
      $(this).closest('.faq__wrap').find('.faq__item-text').slideUp()
      $(this).next().slideDown()
    }
  })
})
