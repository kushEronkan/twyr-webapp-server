'use strict';

const chai = require('chai'); // eslint-disable-line node/no-unpublished-require
const chaiHttp = require('chai-http'); // eslint-disable-line node/no-unpublished-require

chai.use(chaiHttp);

describe('Profile Feature Test Cases', function() {
	const agent = chai.request.agent('http://localhost:9100');
	const expect = chai.expect;

	chai.should();

	it('Should not return the User details if not logged in', function(done) {
		agent
			.get('/profile/get-image?_random=1538566796891')
			.end((err, response) => {
				expect(response).to.have.status(422);
				done(err);
			});
	});

	it('Should not pass the space at the begining of Firstname and Lastname', function(done) {
		agent
			.patch('/profile/users/22cbadcb-fd90-40a1-a712-0e60d865a2d6')
			.type('form')
			.send({
				'first_name': ' ',
				'last_name': ' '
			})
			.end((err, response) => {
				expect(response).to.have.status(422);
				done(err);
			});
	});

	it('Should not pass null in form for Reset Password', function(done) {
		agent
			.post('/profile/changePassword')
			.type('form')
			.send({
				'CurrentPassword': '',
				'NewPassword': '',
				'ReEnterPassword': ''
			})
			.end((err, response) => {
				expect(response).to.have.status(422);
				done(err);
			});
	});

	it('Should not change password with wrong current password', function(done) {
		agent
			.post('/profile/changePassword')
			.type('form')
			.send({
				'CurrentPassword': 'root',
				'NewPassword': 'twyr',
				'ReEnterPassword': 'twyr'
			})
			.end((err, response) => {
				expect(response).to.have.status(422);
				done(err);
			});
	});

	it('Should not change password with wrong Repeat password', function(done) {
		agent
			.post('/profile/changePassword')
			.type('form')
			.send({
				'CurrentPassword': 'twyr',
				'NewPassword': 'root',
				'ReEnterPassword': 'twyr'
			})
			.end((err, response) => {
				expect(response).to.have.status(422);
				done(err);
			});
	});

	it('Should not post wrong formate of email', function(done) {
		agent
			.post('/profile/user-contacts')
			.send({
				'type': 'email',
				'contact': '1'
			})
			.end((err, response) => {
				expect(response).to.have.status(422);
				done(err);
			});
	});

});

describe('Tenent-Adminstration test cases', function() {
	const agent = chai.request.agent('http://localhost:9100');
	const expect = chai.expect;

	it('Should edit name and set the new one', function(done) {
		agent
			.patch('/tenant-administration/tenants/22c0b7fa-cf94-4c50-ac71-2deaabba4589')
			.send({
				'name': 'twyr'
			})
			.end((err, response) => {
				expect(response).to.have.status(200);
				done(err);
			});
	});
});
