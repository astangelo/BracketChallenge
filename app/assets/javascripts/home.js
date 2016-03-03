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

function bracketModel (teams){
	var self = this;

	self.tree = ko.observable(new game());
	addChildGames(self.tree());
	addChildGames(self.tree().leftChild());
	addChildGames(self.tree().rightChild());

	addChildGames(self.tree().leftChild().leftChild());
	addChildGames(self.tree().rightChild().leftChild());
	addChildGames(self.tree().leftChild().rightChild());
	addChildGames(self.tree().rightChild().rightChild());


    if(teams) {self.teams = teams;}
    else {
      $modal = $('#myModal');
      $modal.find('.modal-body').text('There was an error with loading the data.  Please try refreshing.\n\nIf that doesn\'t work... blame Commissioner Yuval.');
      $modal.find('.modal-header').text('Shoot and a Miss!!');
      $modal.modal('show');
   	}

	self.games = ListGamesByDisplay(self.tree(), []);

	self.rounds = ko.observableArray([
	  {games: $.grep(self.games, function(e,i){return (e.level() == 0);}), roundClass: 'round4'},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 1);}), roundClass: 'round3'},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 2);}), roundClass: 'round2'},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 3);}), roundClass: 'round1'}
	]);

	seedTeamsInArray(self.teams, self.rounds()[3].games);

	self.savePicks = function(){savePicks(self);};

	self.tallyWins = ko.computed(function() {
		var teamWins = {};
		for (t in self.teams)
		{
			var count = $.grep(self.games, function(e,i){ return (e.winner() == self.teams[t]); }).length;
			teamWins[""+self.teams[t]] = count;
		}
		return teamWins;
	});

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
	self.level = ko.computed(function(){
	  return ((self.parent && self.parent()) ? self.parent().level()+1 : 0);
	});
	self.roundClass = ko.computed(function(){return "round"+self.level;});

	self.winner.subscribe(function(newVal){
		if (self.parent())
		{
			self.parent().winner(undefined);
			if (self.direction == 'left') {
				self.parent().homeTeam(newVal);
			}
			else
			{
				self.parent().awayTeam(newVal);
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
	if (!(list)) {list = [[]];}
	if (list.length <= games.level()) {list.push([])}
	list[games.level()].push(games);
	if (!(games.rightChild())) {
	  return; 
	}
	ListGamesByDisplay(games.rightChild(), list);
	ListGamesByDisplay(games.leftChild(), list);
	x = []; 
	y = list.slice(0).reverse();
	for (j in y) {x = x.concat(y[j]);}
	return x;
}

function seedTeamsInArray (teams, bRow) {
    var x = 3;
	for (g in bRow)
	{
	  if(g<(teams.length / 2))
	  {
	    var t = g*2;
	    bRow[g].homeTeam(teams[t]);
	    if(++t<teams.length)
	    {
	      bRow[g].awayTeam(teams[t]);
	    }
	  }
	}
}

function savePicks(bMod){
  console.log("data", {teams:bMod.tallyWins()});
  $.ajax({
    url:"/test/saveTeamPicks",
    dataType: "json",
    data: {teams:bMod.tallyWins()},
    type: 'POST'}).fail(function (jqXHR,status,error)
    {
      $('#linkStatus').text("Danger, Will Robinson");
      console.log('-------------');
      console.log(jqXHR);
      console.log("Status: "+status);
      console.log("Error: "+error);
      console.log('-------------');
    });
}

function getTeams()
{
  $.ajax({
    url:"/test/getTeamList",
    dataType: "json",
    type: 'GET'}).done(function (data,status,jqXHR)
    {
      $('#linkStatus').text("Yata!!");
      console.log('-------------');
      console.log(data);
      console.log('-------------');
      //return data.teams;
      bModel = new bracketModel(data.teams);
      ko.applyBindings(bModel);
    }).fail(function (jqXHR,status,error)
    {
      $('#linkStatus').text("Danger, Will Robinson");
      console.log('-------------');
      console.log(jqXHR);
      console.log("Status: "+status);
      console.log("Error: "+error);
      console.log('-------------');
      //return [];
      bModel = new bracketModel([]);
      ko.applyBindings(bModel);
    });
}

$('document').ready(function(){
    //getTeams() implements an AJAX call. Bindings are applied as part of response.
    data = getTeams();
});