//property = new Meteor.Collection('property');
import SparqlClient  from 'sparql-client';

if(Meteor.isServer){
	Meteor.methods({
		addquery:function(pincode){
			console.log("pincode",pincode);

			var endpoint="http://landregistry.data.gov.uk/landregistry/query";

			var query ="prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> "+
						"prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> "+
						"prefix owl: <http://www.w3.org/2002/07/owl#> "+
						"prefix xsd: <http://www.w3.org/2001/XMLSchema#> "+
						"prefix sr: <http://data.ordnancesurvey.co.uk/ontology/spatialrelations/> "+
						"prefix lrhpi: <http://landregistry.data.gov.uk/def/hpi/> "+
						"prefix lrppi: <http://landregistry.data.gov.uk/def/ppi/> "+
						"prefix skos: <http://www.w3.org/2004/02/skos/core#>"+
						"prefix lrcommon: <http://landregistry.data.gov.uk/def/common/> ";
			query = query +
					"SELECT ?paon ?saon ?street ?town ?county ?postcode ?amount ?date ?category "+
					"WHERE "+
					"{ "+
					//" VALUES ?postcode {'PL6 8RU'} "+
					" VALUES ?postcode {'"+pincode+"'} "+
					"?addr lrcommon:postcode ?postcode. "+
					"?transx lrppi:propertyAddress ?addr ; "+
					"lrppi:pricePaid ?amount ; "+
					"lrppi:transactionDate ?date ; "+
					"lrppi:transactionCategory/skos:prefLabel ?category. "+
					"OPTIONAL {?addr lrcommon:county ?county} "+
					"OPTIONAL {?addr lrcommon:paon ?paon} "+
  					"OPTIONAL {?addr lrcommon:saon ?saon} "+
  					"OPTIONAL {?addr lrcommon:street ?street} "+
  					"OPTIONAL {?addr lrcommon:town ?town} "+
  					"} "+
  					"ORDER BY ?amount "//+
  					//"LIMIT 11 "
					
			
			var client = new SparqlClient(endpoint);

			
	
			client.query(query);


			var sparqlCreateSync = Meteor.wrapAsync(client.execute,client);
			var properties= sparqlCreateSync();
			//console.log("properties",properties);
			return properties;
			
			
		}
	})
}