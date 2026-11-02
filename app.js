function wa(texto) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto); }
var saudacao = "Olá Lú! Vim pela página da Lú's Market.";
["heroWa", "fab", "topnum"].forEach(function (id) { document.getElementById(id).href = wa(saudacao); });

if (LOGO) {
  var img = document.getElementById("logo");
  img.onload = function () { document.getElementById("brand").classList.add("has-logo"); };
  img.src = LOGO;
}

var atual = "Todos";
var chips = document.getElementById("chips");
var grid = document.getElementById("grid");

function desenharChips() {
  chips.innerHTML = "";
  CATS.forEach(function (c) {
    var b = document.createElement("button");
    b.className = "chip"; b.type = "button"; b.textContent = c;
    b.setAttribute("aria-pressed", c === atual ? "true" : "false");
    b.onclick = function () { atual = c; desenharChips(); desenharGrelha(); };
    chips.appendChild(b);
  });
}

function desenharGrelha() {
  grid.innerHTML = "";
  PRODUTOS.filter(function (p) { return atual === "Todos" || p.cat === atual; }).forEach(function (p) {
    var card = document.createElement("article"); card.className = "card";
    var foto = document.createElement("div"); foto.className = "photo";
    if (p.img) { var im = document.createElement("img"); im.src = p.img; im.alt = p.nome; im.loading = "lazy"; im.onerror = function () { foto.textContent = p.nome; }; foto.appendChild(im); }
    else { foto.textContent = p.nome; }
    var info = document.createElement("div"); info.className = "info";
    info.innerHTML = '<p class="cat"></p><h3 class="name"></h3><p class="desc"></p><p class="price"></p>';
    info.querySelector(".cat").textContent = p.cat;
    info.querySelector(".name").textContent = p.nome;
    info.querySelector(".desc").textContent = p.desc;
    info.querySelector(".price").textContent = p.preco ? p.preco : "Preço: pergunta à Lú";
    var a = document.createElement("a"); a.className = "order"; a.target = "_blank"; a.rel = "noopener";
    a.href = wa("Olá Lú! Quero saber mais sobre: " + p.nome + ".");
    a.textContent = "Pedir no WhatsApp";
    info.appendChild(a);
    card.appendChild(foto); card.appendChild(info); grid.appendChild(card);
  });
}
desenharChips(); desenharGrelha();
