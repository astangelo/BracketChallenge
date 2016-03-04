var seedIndex=[0,15,7,8,4,11,3,12,5,10,2,13,6,9,1,14];

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
var bModel, qModal;

function bracketModel (data){
	var self = this;

	self.qModal = ko.observable(new QModal());

	self.tree = ko.observable(new game());
	addChildGames(self.tree());
	addChildGames(self.tree().leftChild());
	addChildGames(self.tree().rightChild());

	addChildGames(self.tree().leftChild().leftChild());
	addChildGames(self.tree().rightChild().leftChild());
	addChildGames(self.tree().leftChild().rightChild());
	addChildGames(self.tree().rightChild().rightChild());

    self.teamsArr = [];
    $.each(data.teams2.slice(0,16), function(i,e){self.teamsArr.push(new Team({name:e[0], index:i, wins:e[1]}))});
    
    $('#messageDiv').text(JSON.stringify(self.teamsArr));
	//self.teams2 = data.teams2;


    if(data.teams) {self.teams = data.teams;}
    else {
    	self.qModal().show('There was an error with loading the data.  Please try refreshing.\n\nIf that doesn\'t work... blame Commissioner Yuval.','randomError','warning');
   	}

	self.games = ListGamesByDisplay(self.tree(), []);

	self.rounds = ko.observableArray([
	  {games: $.grep(self.games, function(e,i){return (e.level() == 0);}), roundClass: 'round4'},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 1);}), roundClass: 'round3'},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 2);}), roundClass: 'round2'},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 3);}), roundClass: 'round1'}
	]);

	//seedTeamsInArray(self.teams, self.rounds()[3].games);
	seedTeamsInTree(self.teamsArr, self.rounds());

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
	self.topTeam = ko.observable(home);
	self.bottomTeam = ko.observable(away);
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
				self.parent().bottomTeam(newVal);
			}
			else
			{
				self.parent().topTeam(newVal);
			}
		}
	});
}

function Team (team)
{
	var self = this;
	self.name = (team.name || 'N/A');
	self.seed = ((team.seed == undefined) ? -1 : team.seed);
	self.wins = (team.wins || 0);
	self.index = ((team.index == undefined)? -1 : team.index);
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
	var x = []; 
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
	    bRow[g].topTeam(teams[t]);
	    if(++t<teams.length)
	    {
	      bRow[g].bottomTeam(teams[t]);
	    }
	  }
	}
}

function seedTeamsInTree (teams, bRounds)
{
	var roundsLen = bRounds.length;
	var bRow = bRounds[roundsLen-1].games;
	for (g in bRow)
	{
	  if(g<(teams.length / 2))
	  {
	    var t = g*2;
	    bRow[g].topTeam(teams[seedIndex[t]]);
	    if(++t<teams.length)
	    {
	      bRow[g].bottomTeam(teams[seedIndex[t]]);
	    }
	  }
	}

	var teamWins = {};

	//Create hash of teamName to wins
	$.each(teams,function(i,e){teamWins[e.name]=e.wins;});

	//iterate through each round
	//define winner by higher win #
	for( x = (roundsLen-1); x>=0; x--)
	{
		console.log('We are in round '+x);
		var games = bRounds[x].games
		$.each(games, function(i,game){
			//compare win # of top and bottom team to round (x)
			//assign winner
			if((game.topTeam && game.topTeam()) && (game.topTeam().wins > (roundsLen-x-1)))
			{
				game.winner(game.topTeam());
			}
			else if((game.bottomTeam && game.bottomTeam()) && (game.bottomTeam().wins > (roundsLen-x)))
			{
				game.winner(game.bottomTeam());
			}
		});

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
      bModel = new bracketModel(data);
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
      bModel = new bracketModel({teams:[]});
      ko.applyBindings(bModel);
    });
}

function QModal() {
	var self = this;
	self.modal = $('#myModal');
	self.modal.on('hidden.bs.modal', function (e) { self.default(); });
	self.pop = function(){self.modal.modal('show');}
	self.default = function(){self.headerText('Alert'); self.message('&#9834;&#9836;One shining momemnt...&#9836;&#9835;'); self.status('');}
	self.statusOpts = ['warning'];
	self.status = ko.observable('');
	self.message = ko.observable();
	self.headerText = ko.observable();
	self.randomWarningHeaders = ["Shoot... and a miss", "Aaaaaiiirbaaall... Aaaaaiiirbaaall!", "Brick!"];
	self.show = function(msg, headerTxt, className)
	{
		self.message(msg);
		if((headerTxt) && (headerTxt.length > 0)) {
			if (headerTxt == "randomError")
			{
				var len = self.randomWarningHeaders.length * .999;
				var rand = ~~(Math.random()*len);
				self.headerText(self.randomWarningHeaders[rand]);
			}
			else {self.headerText(headerTxt);}
		}
		if(className) {self.status(className);}
		self.pop();		
	}
}

$('document').ready(function(){
    //getTeams() implements an AJAX call. Bindings are applied as part of response.
    data = getTeams();
});