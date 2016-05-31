import {SparqlClient}  from 'sparql-client';


Router.map(function(){

	this.route('',{
		path:'/',
		// onBeforeAction: function() {
  //           this.redirect('/landRegistry');
  //       },
        fastRender: true
	});

	this.route('landRegistry',{
		path:'/landRegistry',
		layoutTemplate:'layout',
		fastRender:true
	});


})