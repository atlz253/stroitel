/* закрытие всех всплывающих окон */

function popup_close() {
    document.querySelector('.mask').style.display = 'none'
    document.querySelector('.ordercall').style.display = 'none'
    document.querySelector('.zoom-card').style.display = 'none'
}

/* окно 'оставьте номер' */

function ordercall() {
    popup_close()
    document.querySelector('.mask').style.display = 'block'
    document.querySelector('.ordercall').style.display = 'flex'
}

/* слайдер */

var house = bath = gazebo = flat = office = shop = 1 // номер слайда

function card_slider(element) {
    function next_slide(variable) {
        if (element.classList[1].match('left')) {
            variable -= 1
            if (variable == 0) {
                variable = 5
            }
        }
        else {
            variable += 1
            if (variable == 6) {
                variable = 1
            }
        }
    
        return variable
    }

    var slider_name = element.classList[2].split('_')[3]

    gsap.to(`.slider-card__photo_${slider_name}-${this[slider_name]}`, {opacity: 0, duration: 0.3});
    gsap.to(`.slider-card__bottom-title_${slider_name}`, {opacity: 0, duration: 0.3});
    gsap.to('.zoom-card__photo-card', {opacity: 1}) // сброс блока zoom
    gsap.to('.zoom-card__card-photo', {opacity: 1})
    gsap.to(`.slider-card__bottom-meter_${slider_name}-${this[slider_name]}`, {opacity: 0, duration: 0.3});
    setTimeout(function() {
        document.querySelector(`.slider-card__bottom-title_${slider_name}`).classList.add(`slider-card__bottom-title_${next_slide(this[slider_name])}`)
        document.querySelector(`.slider-card__bottom-title_${slider_name}`).classList.remove(`slider-card__bottom-title_${this[slider_name]}`)

        document.querySelector(`.slider-card__bottom-meter_${slider_name}-${this[slider_name]}`).classList.add(`slider-card__bottom-meter_${slider_name}-${next_slide(this[slider_name])}`)
        document.querySelector(`.slider-card__bottom-meter_${slider_name}-${this[slider_name]}`).classList.remove(`slider-card__bottom-meter_${slider_name}-${this[slider_name]}`)

        document.querySelector(`.slider-card__bottom-price_${slider_name}-${this[slider_name]}`).classList.add(`slider-card__bottom-price_${slider_name}-${next_slide(this[slider_name])}`)
        document.querySelector(`.slider-card__bottom-price_${slider_name}-${this[slider_name]}`).classList.remove(`slider-card__bottom-price_${slider_name}-${this[slider_name]}`)

        document.querySelector(`.slider-card__photo_${slider_name}-${this[slider_name]}`).classList.add(`slider-card__photo_${slider_name}-${next_slide(this[slider_name])}`)
        document.querySelector(`.slider-card__photo_${slider_name}-${this[slider_name]}`).classList.remove(`slider-card__photo_${slider_name}-${this[slider_name]}`)

        gsap.to(`.slider-card__photo_${slider_name}-${next_slide(this[slider_name])}`, {opacity: 1, duration: 0.3});
        gsap.to(`.slider-card__bottom-title_${slider_name}`, {opacity: 1, duration: 0.3});
        gsap.to(`.slider-card__bottom-meter_${slider_name}-${next_slide(this[slider_name])}`, {opacity: 1, duration: 0.3});
        this[slider_name] = next_slide(this[slider_name])
    }, 300)
}

/* окно с увеличенным слайдером */

function zoom_card(element) {
    document.querySelector('.mask').style.display = 'block'
    document.querySelector('.zoom-card').style.display = 'block'

    if (element.classList[0] != 'other__card') {
        var cardname = element.classList[2].split('_')[3].split('-')

        document.querySelector('.zoom-card__body').style.width = '580px'
        document.querySelector('.zoom-card__right').style.display = 'none'
        document.querySelector('.zoom-card__left').style.padding = '20px 0px'
    
        document.querySelector('.zoom-card__card-top').innerHTML = document.querySelector(`.slider-card__top_${cardname[0]}`).innerHTML

        document.querySelector('.zoom-card__card-photo').classList.remove(document.querySelector('.zoom-card__card-photo').classList[2])
        document.querySelector('.zoom-card__card-photo').classList.add(element.classList[2])

        document.querySelector('.zoom-card__card-title').innerHTML = document.querySelector(`.slider-card__bottom-title_${cardname[0]}`).innerHTML
        document.querySelector('.zoom-card__card-title').classList.remove(document.querySelector('.zoom-card__card-title').classList[2])
        document.querySelector('.zoom-card__card-title').classList.add(document.querySelector(`.slider-card__bottom-title_${cardname[0]}`).classList[2])

        document.querySelector('.zoom-card__card-meter').classList.remove(document.querySelector('.zoom-card__card-meter').classList[2])
        document.querySelector('.zoom-card__card-meter').classList.add(`slider-card__bottom-meter_${cardname[0]}-${cardname[1]}`)

        document.querySelector('.zoom-card__card-price').classList.remove(document.querySelector('.zoom-card__card-price').classList[2])
        document.querySelector('.zoom-card__card-price').classList.add(`slider-card__bottom-price_${cardname[0]}-${cardname[1]}`)

        photocard = document.querySelectorAll('.zoom-card__photo-card')
        for (var i = 0; i < 5; i++) { 
            photocard[i].classList.remove(photocard[i].classList[1])
            photocard[i].classList.remove('zoom-card__photo-card_active')
            photocard[i].classList.add(`slider-card__photo_${cardname[0]}-${i + 1}`)

            if (i + 1 == cardname[1]) {
                photocard[i].classList.add('zoom-card__photo-card_active')
            }
        }
    }
    else {
        var cardname = element.classList[1].split('-')[1]
        console.log(cardname)

        document.querySelector('.zoom-card__body').style.width = '1030px'
        document.querySelector('.zoom-card__right').style.display = ''
        document.querySelector('.zoom-card__left').style.padding = '20px 0px 20px 20px'

        document.querySelector('.zoom-card__card-top').innerHTML = document.querySelector(`.other__card-${cardname}>.other__card-title`).innerHTML

        document.querySelector('.zoom-card__card-photo').classList.remove(document.querySelector('.zoom-card__card-photo').classList[2])
        document.querySelector('.zoom-card__card-photo').classList.add(`slider-card__photo_${cardname}-1`)

        document.querySelector('.zoom-card__card-title').innerHTML = document.querySelector(`.other__card-${cardname}>.other__card-title`).innerHTML
        document.querySelector('.zoom-card__card-title').classList.remove(document.querySelector('.zoom-card__card-title').classList[2])
        document.querySelector('.zoom-card__card-title').classList.add('slider-card__bottom-title_1')

        document.querySelector('.zoom-card__card-meter').classList.remove(document.querySelector('.zoom-card__card-meter').classList[2])
        document.querySelector('.zoom-card__card-meter').classList.add(`slider-card__bottom-meter_${cardname}-1`)

        document.querySelector('.zoom-card__card-price').classList.remove(document.querySelector('.zoom-card__card-price').classList[2])
        document.querySelector('.zoom-card__card-price').classList.add(`slider-card__bottom-price_${cardname}-1`)

        photocard = document.querySelectorAll('.zoom-card__photo-card')
        for (var i = 0; i < 5; i++) { 
            photocard[i].classList.remove(photocard[i].classList[1])
            photocard[i].classList.remove('zoom-card__photo-card_active')
            photocard[i].classList.add(`slider-card__photo_${cardname}-${i + 1}`)

            if (i + 1 == 1) {
                photocard[i].classList.add('zoom-card__photo-card_active')
            }
        }

        document.querySelector('.zoom-card__title').classList.remove(document.querySelector('.zoom-card__title').classList[1])
        document.querySelector('.zoom-card__title').classList.add(`zoom-card__title_${cardname}`)

        document.querySelector('.zoom-card__subtitle').classList.remove(document.querySelector('.zoom-card__subtitle').classList[1])
        document.querySelector('.zoom-card__subtitle').classList.add(`zoom-card__subtitle_${cardname}`)

        var slider_lists = document.querySelectorAll('.zoom-card__list')
        for (var i = 0; i < 4; i++) {
            slider_lists[i].style.display = 'none'
        }
        document.querySelector(`.zoom-card__list_${cardname}`).style.display = 'block'

        document.querySelector('.zoom-card__question').classList.remove(document.querySelector('.zoom-card__question').classList[1])
        document.querySelector('.zoom-card__question').classList.add(`zoom-card__question_${cardname}`)
    }
}

function zoom_slider(element) {
    function next_slide(num) {
        var slide = element.classList[1].split('_')[3]

        if (slide == 'left') {
            num -= 1
            if (num == 0) {
                num = 5
            }
        }
        else {
            num += 1
            if (num == 6) {
                num = 1
            }
        }

        return num
    }

    gsap.to('.zoom-card__card-photo', {opacity: 0, duration: 0.3});
    gsap.to('.zoom-card__card-title', {opacity: 0, duration: 0.3});
    gsap.to('.zoom-card__card-meter', {opacity: 0, duration: 0.3});
    gsap.to('.zoom-card__card-price', {opacity: 0, duration: 0.3});
    setTimeout(function() {
        var slider_name = document.querySelector('.zoom-card__card-photo').classList[2].split('_')[3].split('-')[0]
        if (element.classList[0].match('photo-card')) {
            var slider_num = element.classList[1].split('_')[3].split('-')[1]
        }
        else {
            var slider_num = next_slide(parseInt(document.querySelector('.zoom-card__card-photo').classList[2].split('-')[2]))
        }
        
        document.querySelector('.zoom-card__card-photo').classList.remove(document.querySelector('.zoom-card__card-photo').classList[2])
        document.querySelector('.zoom-card__card-photo').classList.add(`slider-card__photo_${slider_name}-${slider_num}`)
        
        document.querySelector('.zoom-card__photo-card_active').classList.remove('zoom-card__photo-card_active')
        document.querySelector(`.zoom-card__photo-card.slider-card__photo_${slider_name}-${slider_num}`).classList.add('zoom-card__photo-card_active')

        document.querySelector('.zoom-card__card-title').classList.remove(document.querySelector('.zoom-card__card-title').classList[2])
        document.querySelector('.zoom-card__card-title').classList.add(`slider-card__bottom-title_${slider_num}`)

        document.querySelector('.zoom-card__card-meter').classList.remove(document.querySelector('.zoom-card__card-meter').classList[2])
        document.querySelector('.zoom-card__card-meter').classList.add(`slider-card__bottom-meter_${slider_name}-${slider_num}`)

        document.querySelector('.zoom-card__card-price').classList.remove(document.querySelector('.zoom-card__card-price').classList[2])
        document.querySelector('.zoom-card__card-price').classList.add(`slider-card__bottom-price_${slider_name}-${slider_num}`)

        gsap.to('.zoom-card__card-photo', {opacity: 1, duration: 0.3});
        gsap.to('.zoom-card__card-title', {opacity: 1, duration: 0.3});
        gsap.to('.zoom-card__card-meter', {opacity: 1, duration: 0.3});
        gsap.to('.zoom-card__card-price', {opacity: 1, duration: 0.3});
    }, 300)
    
}