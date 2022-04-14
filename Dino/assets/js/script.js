function start() { // Inicio da função start()

	$("#inicio").hide();	
	$("#fundoGame").append("<div id='jogador'></div>");
	$("#fundoGame").append("<div id='cacto'></div>");
	$("#fundoGame").append("<div id='placar'></div>");





//Principais variáveis do jogo
clica = true;
var pontos=0;
var velocidade = 10;
var jogo = {};
var TECLA = {
UP: 38,
S: 32,
D: 90,
Q: 37,
E: 39
}

//Verifica se o usuário pressionou alguma tecla	
jogo.pressionou = [];

$(document).keydown(function(e){
    jogo.pressionou[e.which] = true;
    });


    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });

    
jogo.timer = setInterval(loop,30);

//Função loop
function loop() {
placar();
colisao();
gerarcacto();
movefundo();
clicajogador();
} // Fim da função loop()

function movefundo() {

	//Move Fundo
    var esquerda = parseInt($("#fundoGame").css("background-position"));
    $("#fundoGame").css("background-position",esquerda-velocidade);
    
} // fim da função movefundo()


function clicajogador() 
{
	//Ação da tecla
	if (jogo.pressionou[TECLA.S]) 
	{
		$("#jogador").css("top", 460);

		window.setTimeout(timer, 450)

		function timer()
		{
			$("#jogador").css("top", 550);	
		}
	}

}//fim da ação

function gerarcacto()
{
	//Gera cactos
	posicaoX = parseInt($("#cacto").css("left"));
	$("#cacto").css("left",posicaoX-velocidade);
	
	if (posicaoX<=0) 
	{			
		$("#cacto").css("left",875);
		posicaoY = parseInt(Math.random() * +725);
		//$("#cacto").css("left",852);
		$("#cacto").css("left",posicaoY);
	}
}//fim da função gera cactos

function colisao() 
{
	//colisão
	var colisao1 = ($("#jogador").collision($("#cacto")));

	if (colisao1.length>0) {
			
		inimigo1X = parseInt($("#cacto").css("left"));	
		gameOver();
	}
	else{
		pontos=pontos+1;
	}

}//fim da função colisão

function placar() {
	
	$("#placar").html("<h2> Pontos: " + pontos +"</h2>");
	
} //fim da função placar()

function gameOver() 
{
	//Fim de jogo
	fimdejogo=true;
	
	window.clearInterval(jogo.timer);
	jogo.timer=null;
	
	$("#jogador").remove();
	$("#cacto").remove();
	
	$("#fundoGame").append("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	
} // Fim da função gameOver();

}
function reiniciaJogo() 
{
	$("#fim").remove();
	start();
	
} //Fim da função reiniciaJogo
