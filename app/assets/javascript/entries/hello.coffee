import React from 'react'

number = 1

export class Mathematics
  least: (x, y) -> if x < y then x else y

maths = new Mathematics()

console.log maths.least(4, 6)

export default number

console.log number

renderStarRating = ({ title }) ->
  <aside title={"Rating: #{title}"}>
    {title}
  </aside>

console.log(renderStarRating('hello there Gaurav'))
