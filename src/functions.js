const math = require("mathjs");

//uniforme
// //dicotomica
// //aurea

function SecaoAurea(A, B, e) {
  let a = A,
    b = B,
    E = e,
    u,
    l,
    k,
    x;

  k = 1;
  u = a + 0.382 * (b - a);
  l = a + 0.618 * (b - a);

  console.log("k a      b      b-a    u      l      f(u)   f(l)");

  while (b - a > E) {
    console.log(
      k +
        " " +
        a.toFixed(4) +
        " " +
        b.toFixed(4) +
        " " +
        (b - a).toFixed(4) +
        " " +
        u.toFixed(4) +
        " " +
        l.toFixed(4) +
        " " +
        math.evaluate("12a^2-16a+8", { a: u }).toFixed(4) +
        " " +
        math.evaluate("12a^2-16a+8", { a: l }).toFixed(4)
    );

    if (
      math.evaluate("12a^2-16a+8", { a: u }) >
      math.evaluate("12a^2-16a+8", { a: l })
    ) {
      a = u;
      u = l;
      l = a + 0.618 * (b - a);
    } else {
      b = l;
      l = u;
      u = a + 0.382 * (b - a);
    }
    k++;
  }

  x = (a + b) / 2;

  console.log("");
  console.log("x = " + x.toFixed(4));
}

function BuscaDicotomica(func, A, B, e, delta) {
  let a = A,
    b = B,
    D = delta,
    E = e,
    x,
    z,
    k;

  console.log("k a      b      b-a    x      z      f(x)   f(z)");
  k = 0;

  while (b - a >= E) {
    x = (a + b) / 2 - D;
    z = (a + b) / 2 + D;
    console.log(
      k +
        " " +
        a.toFixed(4) +
        " " +
        b.toFixed(4) +
        " " +
        (b - a).toFixed(4) +
        " " +
        x.toFixed(4) +
        " " +
        z.toFixed(4) +
        " " +
        math.evaluate(func, { a: x }).toFixed(4) +
        " " +
        math.evaluate(func, { a: z }).toFixed(4) +
        " "
    );

    if (math.evaluate(func, { a: x }) > math.evaluate(func, { a: z })) {
      // f(x)>f(z)
      a = x;
    } else {
      b = z;
    }
    k++;
  }

  x = (a + b) / 2;

  console.log("");
  console.log("x = " + x.toFixed(4));

  return x.toFixed(4);
}

function BuscaUniforme() {
  let a = -1,
    b = 6,
    x = 0,
    D = 0.35,
    f2 = 10000,
    f1 = 10000;

  x = a; //inicia como x=a

  for (let i = 0; i < 2; i++) {
    console.log("");
    console.log("Delta = " + D.toFixed(4));
    console.log("");
    console.log("x       f(x)");

    do {
      f1 = f2;
      f2 = math.evaluate("e^a-a^3+1", { a: x });

      console.log(x.toFixed(4) + " " + f2.toFixed(4)); // print das iterações

      if (f1 > f2) {
        x = x + D;
      }

      // console.log(x);
    } while (f1 > f2 || f2 == 0); //teste dos criterios de parada

    x = x - D * 2;
    D = D / 10;

    f1 = 0;
  }

  D = D * 10; //correções de valores para a resposta
  x = x + D;

  console.log("");
  console.log("x = " + x.toFixed(4));
}

//BuscaUniforme();
SecaoAurea(0.5, 0.8, 0.01);
//BuscaDicotomica();
