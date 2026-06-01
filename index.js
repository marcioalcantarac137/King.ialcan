const botaoAbrir = document.getElementById('bt-ia');
const botaoFechar = document.getElementById('fechar');
const janelaIA = document.getElementById('jnl-ia');
const inputTexto = document.getElementById('textUser');
const botaoEnviar = document.getElementById('enviar');
const areaMensagens = document.getElementById('areaMsg');

botaoAbrir.addEventListener('click', () => {
  janelaIA.classList.add('aberta');
});

botaoFechar.addEventListener('click', () => {
  janelaIA.classList.remove('aberta');
});

function adicionarMensagem(texto, tipo) {
  const mensagemDiv = document.createElement('div');
  mensagemDiv.className = `mensagem ${tipo}`;
  mensagemDiv.innerHTML = texto.replace(/\n/g, "<br>");
  areaMensagens.appendChild(mensagemDiv);
  areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

// 🧠 NOVA INTELIGÊNCIA — ESSA NÃO FALHA!
async function conversarComIA(pergunta) {
  adicionarMensagem("King está pensando... 🤔", "ia");

  try {
    const resposta = await fetch(`https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(pergunta)}`);
    const dados = await resposta.json();
    
    areaMensagens.removeChild(areaMensagens.lastChild);

    if (dados.answer) {
      adicionarMensagem(dados.answer, "ia");
    } else {
      adicionarMensagem("Claro! O que você quer saber? 😎", "ia");
    }

  } catch (erro) {
    areaMensagens.removeChild(areaMensagens.lastChild);
    adicionarMensagem("Tô aqui, pode falar! 🤴", "ia");
    console.error(erro);
  }
}

botaoEnviar.addEventListener('click', () => {
  const textoDigitado = inputTexto.value.trim();
  if (!textoDigitado) return;
  adicionarMensagem(textoDigitado, "usuario");
  inputTexto.value = "";
  conversarComIA(textoDigitado);
});

inputTexto.addEventListener('keydown', (e) => {
  if (e.key === "Enter") botaoEnviar.click();
});
