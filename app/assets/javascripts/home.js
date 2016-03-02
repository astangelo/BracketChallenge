//alert("works");

function ommit(id)
{
  var x = $('#txt_input').val();
  $.ajax({
    url:"/test/testVar",
    dataType: "json",
    data: {vars: x},
    type: 'GET',
    success: function (data,status,jqXHR)
    {
      $('#linkStatus').text("Yata!!");
      console.log('-------------');
      console.log(data);
      console.log('-------------');
    },
    error: function (jqXHR,status,error)
    {
      $('#linkStatus').text("Danger, Will Robinson");
      console.log('-------------');
      console.log(jqXHR);
      console.log("Status: "+status);
      console.log("Error: "+error);
      console.log('-------------');
    }
  });
}
var bModel;

function bracketModel (){
	var self = this;

	self.tree = ko.observable(new game());
	addChildGames(self.tree());
	addChildGames(self.tree().leftChild());
	addChildGames(self.tree().rightChild());

	self.tree().leftChild().leftChild().homeTeam('Purdue');
	self.tree().leftChild().leftChild().awayTeam('Maryland');
	self.tree().leftChild().rightChild().homeTeam('Indiana');
	self.tree().leftChild().rightChild().awayTeam('Michigan');
	self.tree().rightChild().leftChild().homeTeam('Michigan State');
	self.tree().rightChild().leftChild().awayTeam('Ohio State');
	self.tree().rightChild().rightChild().homeTeam('Wisconsin');
	self.tree().rightChild().rightChild().awayTeam('Iowa');

	/*self.games = [
	  self.tree().rightChild().rightChild(),
	  self.tree().rightChild().leftChild(),
	  self.tree().leftChild().rightChild(),
	  self.tree().leftChild().leftChild(),
	  self.tree().rightChild(),
	  self.tree().leftChild(),
	  self.tree()
	];*/

	self.games = ListGamesByDisplay2(self.tree(), []);

	self.rounds = ko.observableArray([
	  {games:[self.tree()], roundClass: 'round3'},
	  {games:[self.tree().rightChild(), self.tree().leftChild()], roundClass:  'round2'},
	  {games:[self.tree().rightChild().rightChild(), self.tree().rightChild().leftChild(), self.tree().leftChild().rightChild(), self.tree().leftChild().leftChild()], roundClass: 'round1'}
	]);





}

//prototype of the game obj
function game (home, away){
	var self = this;
	self.homeTeam = ko.observable(home);
	self.awayTeam = ko.observable(away);
	self.parent = ko.observable();
	self.leftChild = ko.observable();
	self.rightChild = ko.observable();
	self.winner = ko.observable();
	self.direction;
	//self.levelSet = ko.observable(0);
	self.level = ko.computed(function(){
	  return ((self.parent && self.parent()) ? self.parent().level()+1 : 0);
	});
	self.roundClass = ko.computed(function(){return "round"+self.level;});

	self.winner.subscribe(function(newVal){
		if (self.parent())
		{
			self.parent().winner(undefined);
			if (self.direction == 'left') {
				self.parent().awayTeam(newVal);
			}
			else
			{
				self.parent().homeTeam(newVal);
			}
		}
	});
}

//Seeds the blank child games
function addChildGames(ob){
	ob.leftChild(new game());
	ob.rightChild(new game());
	ob.leftChild().parent(ob);
	ob.rightChild().parent(ob);
	ob.leftChild().direction = 'left';
	ob.rightChild().direction = 'right';
	//ob.levelSet((ob.parent()) ? ob.parent().level+1 : 0);
}

function setWinner(game, winner)
{
	//console.log(game, winner);
	game.winner(winner);
}

function setWinner2(data, event)
{
	console.log(data, event);
	//game.winner(winner);
}

function ListGamesByDisplay(games, list){
	if (!(games.rightChild())) {
	  list.push(games); 
	  return; 
	}
	if (!(list)) {list = []}
	var retList = [];
	var val1, val2;
	ListGamesByDisplay(games.rightChild(), list);
	ListGamesByDisplay(games.leftChild(), list);
	return list;
}

function ListGamesByDisplay2(games, list){
	if (!(list)) {list = [[]];}
	if (list.length <= games.level()) {list.push([])}
	list[games.level()].push(games);
	if (!(games.rightChild())) {
	  return; 
	}
	ListGamesByDisplay2(games.rightChild(), list);
	ListGamesByDisplay2(games.leftChild(), list);
	x = []; 
	y = list.slice(0).reverse();
	for (j in y) {x = x.concat(y[j]);}
	return x;
}

$('document').ready(function(){
    bModel = new bracketModel();
    ko.applyBindings(bModel);
});