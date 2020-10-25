

const checkCollision = (a, b) => {
  var DistanceX = a.cx - b.cx;
  var DistanceY = a.y2 - b.y2;
  console.log("A, B CX", a.cx, b.cx, DistanceX, DistanceY, a.rad, b.rad);
  var DistanceCenter = Math.sqrt(DistanceX * DistanceX + DistanceY * DistanceY);
  var CollisionDistance = b.rad;
  if (a.rad) {
    CollisionDistance += a.rad;
  }
  return DistanceCenter <= CollisionDistance;
};

const fun = (ra) => {
  for (let i = 1; i < ra.length; i++) {
    let k = 0;
    while (k < i)
      checkCollision(ra[i], ra[k]) ? (ra[i].cx++, ra[i].y2++, (k = 0)) : k++;
  }
  return ra;
};
console.log(
  ...fun([
    { cx: 2, y2: 3, rad: 3 },
    { cx: 2, y2: 3, rad: 3 },
    { cx: 2, y2: 3, rad: 3 },
    { cx: 2, y2: 3, rad: 3 },
    { cx: 2, y2: 3, rad: 3 }
  ])
);
