import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 600

function filterBygame(game) {
    $('[wm-game]').each(function(i, e) {
        const isTarget = $(this).attr('wm-game') === game || game === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.gameButtons = function () {
    const games = new Set
    $('[wm-game]').each(function(i, e) {
        games.add($(e).attr('wm-game'))
    })

    const btns = Array.from(games).map(game => {
        const btn = $('<button>').addClass(['btn btn-primary']).html(game)
        btn.on("click", e => filterBygame(game))
        return btn
    })
    const btnAll = $('<button>').addClass('btn btn-success').html('Todos')
    btnAll.on("click", e => filterBygame(null))
    btns.push(btnAll)


    const btnGroup = $('<div>').addClass(['btn-group','d-grid gap-2 d-md-block'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-game-buttons]').gameButtons()
})

