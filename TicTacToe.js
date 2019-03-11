'use strict'

let _imageCross = true
document.addEventListener('DOMContentLoaded', prepareBoard)

function prepareBoard () {
  Array.from(document.getElementsByTagName('td')).forEach(td => {
    td.addEventListener('click', makeTurn)
  })
}

function resetBoard () {
  // delete all images and remove classes
  Array.from(document.getElementsByTagName('img')).forEach(img => img.remove())
  Array.from(document.getElementsByTagName('td')).forEach(td => td.classList.remove('x', 'o'))
  _imageCross = true
  prepareBoard()
}

function makeTurn () {
  const img = new window.Image()
  img.src = _imageCross ? 'img/x.png' : 'img/o.png'
  this.appendChild(img)
  this.classList.add(_imageCross ? 'x' : 'o')

  if (hasWinner(this)) {
    reportGameEnd(`${_imageCross ? 'X' : 'O'} has won`)
  } else if (document.getElementsByTagName('img').length === 9) {
    reportGameEnd('Cats game!')
  }

  this.removeEventListener('click', makeTurn)
  _imageCross = !_imageCross
}

function reportGameEnd (txt) {
  const dlg = document.getElementById('alertDialog')
  dlg.innerText = txt
  dlg.addEventListener('close', resetBoard)
  dlg.showModal()
}

function hasWinner (td) {
  // all possible lines to cross
  const lines = ['r1', 'r2', 'r3', 'c1', 'c2', 'c3', 'd1', 'd2']
  return lines.filter(c => td.classList.contains(c))
    .map(c => document.getElementsByClassName(c))
    .map(l => Array.from(l).filter(e => e.classList.contains(_imageCross ? 'x' : 'o')))
    .filter(l => l.length === 3)
    .length
}
