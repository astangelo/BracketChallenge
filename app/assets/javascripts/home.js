var seedIndex=[0,15,7,8,4,11,3,12,5,10,2,13,6,9,1,14,16,31,23,24,20,27,19,28,21,26,18,29,22,25,17,30];

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

	var numberOfTeams = 32;

	//Imporant Globals
	self.qModal = ko.observable(new QModal());
	self.editable = ko.observable(false);
	self.bracketType = ko.observable(0);
	self.bracketTypeDef = ["bracket","selected","random","suicide"];

	self.bracketModeOptions = ["actual","selected","random","suicide"];
	self.bracketMode = ko.observable(0);
	self.bracketModeLabel = ko.observable("hello world"); //ko.computed(function(){return "hello world";});

	self.quadrants = ko.observableArray();
	$.each(data.quadrants, function(i,e){self.quadrants().push({name:e, hidden:(numberOfTeams<((i+1)*16))});});

	self.users = ko.observableArray();
	if(data.users) {self.users(data.users);}
	self.selectedUserId = ko.observable(3);
	self.selectedUser = ko.computed(function(){
		return $.grep(self.users(), function(e,i) {return ( e.id == self.selectedUserId());})[0];
	});
	self.user_picks = ko.observableArray();
	self.bracket = ko.observable(new game(self));


	//self.click = 

	//self.css = 

	//Need to replace with an automation
	addChildGames(self.bracket());
	addChildGames(self.bracket().leftChild());
	addChildGames(self.bracket().rightChild());

	addChildGames(self.bracket().leftChild().leftChild());
	addChildGames(self.bracket().rightChild().leftChild());
	addChildGames(self.bracket().leftChild().rightChild());
	addChildGames(self.bracket().rightChild().rightChild());	

	addChildGames(self.bracket().leftChild().leftChild().leftChild());
	addChildGames(self.bracket().leftChild().leftChild().rightChild());
	addChildGames(self.bracket().rightChild().leftChild().leftChild());
	addChildGames(self.bracket().rightChild().leftChild().rightChild());
	addChildGames(self.bracket().leftChild().rightChild().leftChild());
	addChildGames(self.bracket().leftChild().rightChild().rightChild());
	addChildGames(self.bracket().rightChild().rightChild().leftChild());
	addChildGames(self.bracket().rightChild().rightChild().rightChild());
	

    self.teamsArr = [];
    $.each(data.teams2.slice(0,numberOfTeams), function(i,e){self.teamsArr.push(new Team({name:e[0], seed:i, index:seedIndex[i], wins:e[1], pmodel: self}))});
    
    $('#messageDiv').text(JSON.stringify(self.teamsArr));
	//self.teams2 = data.teams2;


    if(data.teams) {self.teams = data.teams;}
    else {
    	self.qModal().show('There was an error with loading the data.  Please try refreshing.\n\nIf that doesn\'t work... blame Commissioner Yuval.','randomError','warning');
   	}


   	if(data.user_picks) {self.user_picks(data.users);}

	self.games = ListGamesByDisplay(self.bracket(), []);

	self.rounds = ko.observableArray([
	  {games: $.grep(self.games, function(e,i){return (e.level() == 0);}), roundClass: 'round5', model: self},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 1);}), roundClass: 'round4', model: self},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 2);}), roundClass: 'round3', model: self},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 3);}), roundClass: 'round2', model: self},
	  {games: $.grep(self.games, function(e,i){return (e.level() == 4);}), roundClass: 'round1', model: self}
	]);

	//seedTeamsInArray(self.teams, self.rounds()[3].games);
	seedTeamsInBracket(self.teamsArr, self.rounds());

	self.savePicks = function(){savePicks(self);};

	self.tallyWins = ko.computed(function() {
		var teamWins = {};
		for (t in self.teamsArr)
		{
			var count = $.grep(self.games, function(e,i){ return (e.winner() == self.teamsArr[t]); }).length;
			teamWins[""+self.teamsArr[t].name] = count;
		}
		return teamWins;
	});

	self.toggleEditable = function(){self.editable(!self.editable());}

}

//prototype of the game obj
function game (pModel, home, away){
	var self = this;
	self.parentModel = ko.observable(pModel);

	self.topTeamHolder = ko.observable(home);
	self.bottomTeamHolder = ko.observable(away);
	self.bracketMode = ko.computed(function(){return self.parentModel().bracketMode();});
	self.topTeam = ko.computed(function(){
		//return self.topTeamHolder;
		return ((self.bracketMode() == 0) ? self.topTeamHolder() : undefined);
	});
	self.bottomTeam = ko.computed(function(){return ((self.bracketMode() == 0) ? self.bottomTeamHolder() : undefined)	});
	self.teams = ko.computed(function(){return [self.topTeam(), self.bottomTeam()];});
	self.parent = ko.observable();
	self.leftChild = ko.observable();
	self.rightChild = ko.observable();
	self.winner = ko.observable();
	self.direction;
	self.level = ko.computed(function(){
	  return ((self.parent && self.parent()) ? self.parent().level()+1 : 0);
	});
	self.roundClass = ko.computed(function(){return "round"+self.level;});
	self.editable = ko.computed(function(){return self.parentModel().editable();});
	
	self.css = ko.computed(function(){
		//return some classes
		ret = "";
		ret += ((self.parentModel().editable()) ? "editable" : "");
		return ret;
	});
	
	self.click = ko.computed(function(){
		if (!self.parentModel().editable()) {return;}

		//switch off of self.bracketType()
	});

	self.winner.subscribe(function(newVal){
		if (self.parent())
		{
			self.parent().winner(undefined);
			if (self.direction == 'left') {
				self.parent().bottomTeamHolder(newVal);
			}
			else
			{
				self.parent().topTeamHolder(newVal);
			}
		}
	});
	self.winsAbove = ko.computed(function(){
		//set var
		var wins = 0;

		//check self winner (var+1)
		if(self.winner()){ wins++; }
		
		//if(self.parent) var+self.parent.winsAbove()
		if(self.parent()) {wins += self.parent().winsAbove();}

		return wins;
	});

	// --Why were these commentted out?
	self.topTeam.subscribe(function(){self.topTeam().game(self);});
	self.bottomTeam.subscribe(function(){self.bottomTeam().game(self);});

	//------------------------
	self.Real = ko.observable();
	self.Selected = ko.observable();
	self.Random = ko.observable();
	self.Suicide = ko.observable();
}

function Team (team)
{
	var self = this;
	self.name = (team.name || 'N/A');
	self.seed = ((team.seed == undefined) ? -1 : team.seed);
	self.wins = (team.wins || 0);
	self.index = ((team.index == undefined)? -1 : team.index);
	self.game = ko.observable();
	self.parentModel = ko.observable(team.pmodel);
	self.click = function(data){
		if(self.parentModel().editable())
		{
			console.log("click:",self);
			if(self.game()) {self.game().winner(self);}
		}
	}
}

//Seeds the blank child games
function addChildGames(ob){
	ob.leftChild(new game(ob.parentModel()));
	ob.rightChild(new game(ob.parentModel()));
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
	for (g in bRow)
	{
	  if(g<(teams.length / 2))
	  {
	    var t = g*2;
	    bRow[g].topTeamHolder(teams[t]);
	    if(++t<teams.length)
	    {
	      bRow[g].bottomTeamHoder(teams[t]);
	    }
	  }
	}
}

function seedTeamsInBracket(teams, bRounds)
{
	var roundsLen = bRounds.length;
	var bRow = bRounds[roundsLen-1].games;
	for (g in bRow)
	{
	  if(g<(teams.length / 2))
	  {
	    var t = g*2;
	    bRow[g].topTeamHolder(teams[seedIndex[t]]);
	    if(++t<teams.length)
	    {
	      bRow[g].bottomTeamHolder(teams[seedIndex[t]]);
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
			else if((game.bottomTeam && game.bottomTeam()) && (game.bottomTeam().wins > (roundsLen-x-1)))
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
		else {self.headerText('Alert!')}
		if(className) {self.status(className);}
		self.pop();		
	}
}

var ready = function() {
	data = getTeams();
};

$(document).ready(ready);