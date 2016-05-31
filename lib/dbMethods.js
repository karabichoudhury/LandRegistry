import {SparqlClient}  from 'sparql-client';
import { Meteor } from 'meteor/meteor';

if(Meteor.isServer){
	Meteor.methods({

	dbExecute:function(){
		var endpoint = 'http://dbpedia.org/sparql';

		//var query = "select distinct ?Concept from <http://dbpedia.org> where {[] a ?Concept} limit 10";
		var query = "SELECT * FROM <http://dbpedia.org> WHERE {?city <http://dbpedia.org/property/leaderName> ?leaderName} LIMIT 10"
		var client = new SparqlClient(endpoint);
		console.log("Query to " + endpoint);
		console.log("Query: " + query);
	
		client.query(query);
		client.bind('city', '<http://dbpedia.org/resource/Vienna>')
  		client.execute(
  			function(error, results) {
  				console.log("error",error);
  				console.log("results",results,error);
  				return results;
  			}
  		);
	}

})
}
