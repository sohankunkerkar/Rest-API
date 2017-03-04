var request = require('request');
var fs = require("fs");
var Promise = require('bluebird');
var parse = require('parse-link-header');


////// FILL IN THE BLANKS
var token = "token " +process.env.TOKEN ;
var userId = process.env.Name;
var repo="RestAPI"
var urlRoot = "https://github.ncsu.edu/api/v3"; 


/* Please comment all the mehtods except one which is plan for execution while running code */

getYourRepos(userId);
listBranches(userId,repo);
createRepos(userId);
createIssue(userId,repo);
EditRepo(userId,repo);

//This function is used to get details about the Repository
function getYourRepos(userName)
{

	var options = {
		url: urlRoot + '/users/' + userName + "/repos",
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token 
		}
	};

	// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body) 
	{
		var obj = JSON.parse(body);
		console.log( obj );
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			console.log( name );
		}
	});

} 

//This code is used to get list of brnanches in a given repo under an owner
function listBranches(owner,repo)
{
	var options = {
		url: urlRoot + '/repos/' +owner+ '/'+repo+'/branches',
		method: 'GET',
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
		};
		// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error, response, body) 
	{
		var obj = JSON.parse(body);
		console.log( obj );
		for( var i = 0; i < obj.length; i++ )
		{
			var name = obj[i].name;
			console.log( name );
		}
	});

}

//This function is used to create Repsitory on github page 
function createRepos(user)
{
	var options = {
		url: urlRoot +'/user/repos',
		method: 'POST',
		body: {name:'Test1',description:'This is my first repo created under Rest API Github'},
		json:true,
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
		};
		// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error,response,body) 
	{
		 console.log(body);
		 console.log("Details about the parameters :");
         console.log("Name"+body.name);
         console.log("Description"+body.description);
	});

}

//This code is used to create an issue for the particular repository present on github
function createIssue(owner,repo)
{
	var options = {
		url: urlRoot +'/repos/'+ owner+'/'+repo+'/issues',
		method: 'POST',
		body: {title:'ProblemStatement',body:'Creating an Issue part fot Github'},
		json:true,
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
		};
		// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error,response,body) 
	{
		 console.log(body);
		 console.log("Details about the parameters :");
         console.log("title"+body.title);
         console.log("body"+body.body);
	});

}

//This code is used to edit the repository name present on the github
function EditRepo(owner,repo)
{
	var options = {
		url: urlRoot +'/repos/'+ owner+'/'+repo ,
		method: 'PATCH',
		body: {name:'RestAPIFunction',description:'Editing Repo'},
		json:true,
		headers: {
			"User-Agent": "EnableIssues",
			"content-type": "application/json",
			"Authorization": token
		}
		};
		// Send a http request to url and specify a callback that will be called upon its return.
	request(options, function (error,response,body) 
	{
		 console.log(body);
		 console.log("Details about the parameters :");
         console.log("title"+body.name);
         console.log("description"+body.description);
	});

}

