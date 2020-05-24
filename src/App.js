import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
const math = require("mathjs");

function SecaoAurea(func, A, B, e) {
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
        math.evaluate(func, { x: u }).toFixed(4) +
        " " +
        math.evaluate(func, { x: l }).toFixed(4)
    );

    if (math.evaluate(func, { x: u }) > math.evaluate(func, { x: l })) {
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

  return x.toFixed(4);
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
    console.log(x + "/" + z);

    if (math.evaluate(func, { x: x }) > math.evaluate(func, { x: z })) {
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

function BuscaUniforme(func, A, B, delta) {
  var a = A,
    b = B,
    x = 0,
    D = delta,
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
      f2 = math.evaluate(func, { x: x });

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

  return x.toFixed(4);
}

function newton(func, A, B, e) {
  var a = A,
    b = B,
    E = e,
    der1,
    der2,
    x,
    aux; //newton

  x = a;

  der1 = math.derivative(func, "x").evaluate({ x: x }); //derivada primeira

  if (math.abs(der1) <= E) {
    return x.toFixed(4);
  }
  der2 = math.derivative(math.derivative(func, "x"), "x").evaluate({ x: x }); //derivada segunda

  if (der2 == E) {
    return x.toFixed(4);
  }
  console.log("x       CP     f'(x)    f''(x)");
  console.log(
    x.toFixed(4) + "       " + der1.toFixed(4) + " " + der2.toFixed(4)
  );
  do {
    aux = x;
    x = x - der1 / der2;

    der1 = math.derivative(func, "x").evaluate({ x: x }); //derivada primeira
    if (math.abs(der1) <= E) {
      //testa se f'(X) < E
      return x.toFixed(4);
    }

    der2 = math.derivative(math.derivative(func, "x"), "x").evaluate({ x: x }); //derivada segunda
    if (der2 == E) {
      //testa se f''(X) = E
      return x.toFixed(4);
    }

    if (math.abs(x - aux) / math.max(math.abs(x), 1) < E) {
      //testa se |x1-x0| / max{|x1|,1} < E
      return x.toFixed(4);
    }

    console.log(
      x.toFixed(4) +
        " " +
        (math.abs(x - aux) / math.max(math.abs(x), 1)).toFixed(4) +
        " " +
        der1.toFixed(4) +
        " " +
        der2.toFixed(4)
    );
  } while (true);
}

function Bissecao(func, A, B, e) {
  //func
  var a = A,
    b = B,
    E = e,
    der1,
    x,
    N; //bisseção
  N = 0;
  for (let i = 0; i < 9999; i++) {
    //calcula o N por tentativa e erro

    if (Math.pow(2, i) >= 1 / (E / (b - a))) {
      N = i;
      break;
    }
  }
  console.log("k a      b      x      f'(x)");
  for (let i = 0; i <= N; i++) {
    x = (a + b) / 2;

    der1 = math.derivative(func, "x").evaluate({ x: x }); //derivada primeira
    console.log(
      i +
        " " +
        a.toFixed(4) +
        " " +
        b.toFixed(4) +
        " " +
        x.toFixed(4) +
        " " +
        der1.toFixed(4)
    );
    if (der1 < 0) {
      a = x;
    } else {
      if (der1 > 0) {
        b = x;
      } else {
        if (der1 == 0) {
          break;
        }
      }
    }
  }
  /*do{ //parte que esta misteriosamente dando erro devido ao while, é equivalente ao for acima
        x=(a+b)/2;
        console.log(x.toFixed(4));
        console.log(k);
        
        if(math.derivative('func', 'x').evaluate({x:x})<0){

            a = x;

            }else{
                b = x;
            }
        
        k++;
    //}while( math.derivative('func', 'x').evaluate({x:x})!==0 || k<=N);
    }while(k<=N);*/

  return x.toFixed(4);
}

function MetodoFibonacci(func, A, B, e) {
  var a = A,
    b = B,
    E = e,
    u,
    l,
    Fn,
    N,
    Fib,
    Fib2,
    x,
    k,
    var1 = 1,
    var2 = 1,
    aux,
    k = 0; //fibonacci
  //var a=0.1, b=3, E=0.1,der1, N;//bisseção

  function Fibonacci(aux) {
    var1 = 1;
    var2 = 1;
    // console.log(aux.toFixed(4));
    if (aux == 0 || aux == 1) {
      //console.log('aux='+aux.toFixed(4)+' Fib='+Fib.toFixed(4));
      return 1;
    } else {
      for (let i = 0; i <= aux - 2; i++) {
        Fib = var1 + var2;
        var1 = var2;
        var2 = Fib;
        //console.log('for fib='+Fib.toFixed(4)+' var1='+var1.toFixed(4)+' var2='+var2.toFixed(4));
      }
    }
    //console.log('aux='+aux.toFixed(4)+' Fib='+Fib.toFixed(4));
    return Fib;
  }

  function InteracoesFibonacci(Fib) {
    N = 1;

    if (Fib == 0) {
      N = 0;
    } else {
      do {
        N++;
        Fib2 = var1 + var2;
        var1 = var2;
        var2 = Fib2;
      } while (Fib2 <= Fib);
    }
  }

  function BuscaDeFibonacci() {
    Fn = (b - a) / E;
    InteracoesFibonacci(Fn);
    // console.log(Fn.toFixed(4));
    console.log(N.toFixed(4));
    // console.log(k.toFixed(4));
    u = a + (Fibonacci(N - k - 2) / Fibonacci(N - k)) * (b - a);
    l = a + (Fibonacci(N - k - 1) / Fibonacci(N - k)) * (b - a);
    console.log("k a      b      b-a    u      l      f(u)   f(l)");

    do {
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
          math.evaluate(func, { a: u }).toFixed(4) +
          " " +
          math.evaluate(func, { a: l }).toFixed(4) +
          " "
      );

      //'a^3-a^2-a+3'
      if (math.evaluate(func, { a: u }) > math.evaluate(func, { a: l })) {
        //f(u)>f(l)

        a = u;
        u = l;

        l = a + (Fibonacci(N - k - 1) / Fibonacci(N - k)) * (b - a);
        // console.log('error: N='+N.toFixed(4)+' k='+k.toFixed(4)+' a='+a.toFixed(4)+' b='+b.toFixed(4)+' l='+l.toFixed(4))
      } else {
        b = l;
        l = u;
        u = a + (Fibonacci(N - k - 2) / Fibonacci(N - k)) * (b - a);
      }
      k++;
    } while (k < N - 1);
    //console.log(a.toFixed(4)+' '+b.toFixed(4));
    x = (a + b) / 2;
    console.log(x);
  }
  BuscaDeFibonacci();
  console.log("");
  console.log("x = " + x.toFixed(4));

  return x.toFixed(4);
}

function App() {
  const [func, setFunc] = useState("");
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [delta, setDelta] = useState();
  const [e, setE] = useState();
  const [x, setX] = useState();
  const [operacao, setOperacao] = useState(1);
  const [nomeFuncao, setNomeFuncao] = useState("Seção Áurea");

  return (
    <div className="App">
      <h1 style={{ marginTop: 50, marginBottom: 40 }}>Trabalho P.O</h1>
      <div class="dropdown">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenu2"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {nomeFuncao}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button
            onClick={() => {
              setNomeFuncao("Seção Áurea");
              setOperacao(1);
            }}
            class="dropdown-item"
            type="button"
          >
            Seção Áurea
          </button>
          <button
            onClick={() => {
              setNomeFuncao("Busca Dicotômica");
              setOperacao(2);
            }}
            class="dropdown-item"
            type="button"
          >
            Dicotômica
          </button>
          <button
            onClick={() => {
              setNomeFuncao("Busca Uniforme");
              setOperacao(3);
            }}
            class="dropdown-item"
            type="button"
          >
            Busca Uniforme
          </button>
          <button
            onClick={() => {
              setNomeFuncao("Newton");
              setOperacao(4);
            }}
            class="dropdown-item"
            type="button"
          >
            Newton
          </button>
          <button
            onClick={() => {
              setNomeFuncao("Bisseção");
              setOperacao(5);
            }}
            class="dropdown-item"
            type="button"
          >
            Bisseção
          </button>
          <button
            onClick={() => {
              setNomeFuncao("Fibonacci");
              setOperacao(6);
            }}
            class="dropdown-item"
            type="button"
          >
            Fibonacci
          </button>
        </div>
      </div>
      <form style={{ marginTop: 40 }}>
        <div>
          <label htmlFor="">f(x) =</label>
          <input
            value={func ? func : ""}
            placeholder="Digite aqui a função de x"
            onChange={(e) => {
              setFunc(e.target.value);
            }}
            class="form-control"
            type="text"
            style={{
              width: "40vw",
              margin: "auto",
            }}
          />
        </div>

        <div className="input-container">
          <div class="form-group">
            <label htmlFor="">a =</label>
            <input
              value={a ? a : ""}
              onChange={(e) => {
                setA(e.target.value);
              }}
              class="form-control"
              type="text"
            />
          </div>
          <div class="form-group">
            <label>b =</label>
            <input
              value={b ? b : ""}
              onChange={(e) => {
                setB(e.target.value);
              }}
              class="form-control"
              type="text"
            />
          </div>
          <div class="form-group">
            <label>ε =</label>
            <input
              disabled={operacao == 3 ? true : false}
              value={e ? e : ""}
              onChange={(e) => {
                setE(e.target.value);
              }}
              class="form-control"
              type="text"
            />
          </div>
          <div className="form-group">
            <label>Δ =</label>
            <input
              disabled={operacao != 2 && operacao != 3 ? true : false}
              class="form-control"
              type="text"
              onChange={(e) => setDelta(e.target.value)}
            />
          </div>
        </div>
      </form>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 40,

          width: "30vw",
          justifyContent: "center",
        }}
        className="function-result"
      >
        <button
          class="btn btn-success "
          onClick={() => {
            console.log(a + "/" + b + "/" + e);
            switch (operacao) {
              case 1:
                setX(
                  SecaoAurea(func, parseFloat(a), parseFloat(b), parseFloat(e))
                );
                break;
              case 2:
                setX(
                  BuscaDicotomica(
                    func,
                    parseFloat(a),
                    parseFloat(b),
                    parseFloat(e),
                    parseFloat(delta)
                  )
                );
                break;
              case 3:
                setX(
                  BuscaUniforme(
                    func,
                    parseFloat(a),
                    parseFloat(b),
                    parseFloat(delta)
                  )
                );
                break;
              case 4:
                setX(newton(func, parseFloat(a), parseFloat(b), parseFloat(e)));
                break;
              case 5:
                setX(
                  Bissecao(func, parseFloat(a), parseFloat(b), parseFloat(e))
                );
                break;
              case 6:
                setX(
                  MetodoFibonacci(
                    func,
                    parseFloat(a),
                    parseFloat(b),
                    parseFloat(e)
                  )
                );
                break;
            }
          }}
        >
          Calcular
        </button>
        <button
          class="btn btn-danger "
          onClick={() => {
            setA("");
            setB("");
            setE("");
            setFunc("");
            setDelta("");
            setX("");
          }}
          style={{ marginLeft: 40 }}
        >
          Limpar campos
        </button>
        <h2 style={{ marginTop: 40 }}>x = {x}</h2>
      </div>

      <p style={{ marginTop: 40 }}>Créditos:</p>
      <p>Gabriel Dadamos Rossetto</p>
      <p>Rafael Mendes Costa</p>
      <p>Rafael Kawagoe Gomes Muller</p>
      <p>Ciência da Computação - Unesp Bauru - 2020</p>
    </div>
  );
}

export default App;
