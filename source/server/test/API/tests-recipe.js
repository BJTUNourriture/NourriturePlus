var should = require('should');
var request = require('supertest');
var mongoose = require('mongoose');
var User = require('../../API/models/users');
var Ingredients = require('../../API/models/ingredients');

/*Checks if App was launched*/
if (mongoose.connection.readyState === 0)
{
	var standalone_test = true;
	process.env.NODE_ENV = 'test'
	var app = require('../../app');
}

/*Url of the server*/
var url = 'http://localhost:8101';

/*Testing of the /api/recipes endpoint*/
describe('/api/recipes', function() {

	if (standalone_test)
	{
		/*Clears all the collections to have an empty DB*/
		before(function(done) {
			for (var i in mongoose.connection.collections) {
				mongoose.connection.collections[i].remove(function() {});
			}
			done();
		});
	}

	/*Testing vars*/
	var recipe_id = "";
	var ingredient_id = "";
	var ingredient_name = "";
	var user_id = "";
	var user_name = "";

	describe("Recipes Creation", function () {
		it('should successfully create three recipes', function(done) {

			/*Creates a dummy ingredient*/
			var ingredient = new Ingredients({
				name : "test"
			});

			ingredient.save(function (err) {
				if (err)
					throw err;
				ingredient_id = ingredient._id;
				ingredient_name = ingredient.name;

				/*Creates a dummy user*/
				var user = new User({
					email: "test@test.ru",
					username: "test",
					password: "test"
				});

				user.save(function (err) {
					if (err)
						throw err;
					user_id = user._id;
					user_name = user.username;

					var recipe = {
						title: "test",
						author_id: user_id,
						author_name: user_name,
						ingredients: [{
							id_ingredient : ingredient_id,
							name : ingredient_name
						}],
						pictures : [{
							thumbnail_url : "dummy"
						}]
					};

					var recipe2 = {
						title: "testkek",
						author_id: user_id,
						author_name: user_name,
						ingredients: [{
							id_ingredient : ingredient_id,
							name : ingredient_name
						}],
						pictures : [{
							thumbnail_url : "dummy"
						}]
					};

					var recipe3 = {
						title: "test2",
						author_id: user_id,
						author_name: user_name,
						ingredients: [{
							id_ingredient : ingredient_id,
							name : ingredient_name
						}],
						pictures : [{
							thumbnail_url : "dummy"
						}]
					}

					request(url)
						.post('/api/recipes')
						.send(recipe3)
						.end(function(err, res) {
							  if (err)
								throw err;
							res.status.should.be.equal(200);
						});

					request(url)
						.post('/api/recipes')
						.send(recipe2)
						.end(function(err, res) {
							  if (err)
								throw err;
							res.status.should.be.equal(200);
						});

					request(url)
						.post('/api/recipes')
						.send(recipe)
						.end(function(err, res) {
							  if (err)
								throw err;
							res.status.should.be.equal(200);
							done();
						});

				});
				/*End create dummy user*/
			});		
			/*End create a dummy ingredient*/
		});

		it('should not create a recipe without at least an ingredient', function(done) {
			var recipe = {
				title: "testos",
				author_id: user_id,
				author_name: user_name,
				ingredients: [],
				pictures : [{
					thumbnail_url : "dummy"
				}]
			};

			request(url)
				.post('/api/recipes')
				.send(recipe)
				.end(function(err, res) {
					  if (err)
						throw err;
					res.status.should.be.equal(400);
					done();
				});
		});

		it('should not create a recipe without the author infos', function(done) {
			var recipe = {
				title: "testos",
				ingredients: [{
					id_ingredient : ingredient_id,
					name : ingredient_name
				}],
				pictures : [{
					thumbnail_url : "dummy"
				}]
			};

			request(url)
				.post('/api/recipes')
				.send(recipe)
				.end(function(err, res) {
					  if (err)
						throw err;
					res.status.should.be.equal(400);
					done();
				});
		});

		it('should not create a recipe without the first thumbnail url', function(done) {
			var recipe = {
				title: "testos",
				author_id: user_id,
				author_name: user_name,
				ingredients: [{
					id_ingredient : ingredient_id,
					name : ingredient_name
				}],
				pictures : []
			};

			request(url)
				.post('/api/recipes')
				.send(recipe)
				.end(function(err, res) {
					  if (err)
						throw err;
					res.status.should.be.equal(400);
					done();
				});
		});

	});

	describe("Recipes Retrieval", function () {
		it('should retrieve all the recipes', function(done) {
			request(url)
				.get('/api/recipes')
				.end(function(err, res) {
					  if (err)
						throw err;
					res.body.should.be.lengthOf(3);
					done();
				});			
		});
	});

	if (standalone_test)
	{
		/*Disconnects mongoose from the DB*/
		after(function(done) {
			mongoose.disconnect();
			done();
		})
	}
	else
	{
		after(function(done) {
			for (var i in mongoose.connection.collections) {
		    	mongoose.connection.collections[i].remove(function() {});
		   	}
	  		done();
		})
	}
});

module.exports = "tests-recipe";