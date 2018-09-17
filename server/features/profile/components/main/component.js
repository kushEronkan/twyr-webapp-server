'use strict';

/**
 * Module dependencies, required for ALL Twyr' modules
 * @ignore
 */

/**
 * Module dependencies, required for this module
 * @ignore
 */
const TwyrBaseComponent = require('twyr-base-component').TwyrBaseComponent;
const TwyrComponentError = require('twyr-component-error').TwyrComponentError;

/**
 * @class   Main
 * @extends {TwyrBaseComponent}
 * @classdesc The Main component of the Profile Feature - manages CRUD for the User's profile.
 *
 *
 */
class Main extends TwyrBaseComponent {
	// #region Constructor
	constructor(parent, loader) {
		super(parent, loader);
	}
	// #endregion

	// #region Protected methods - need to be overriden by derived classes
	/**
	 * @async
	 * @function
	 * @override
	 * @instance
	 * @memberof Main
	 * @name     _addRoutes
	 *
	 * @returns  {undefined} Nothing.
	 *
	 * @summary  Adds routes to the Koa Router.
	 */
	async _addRoutes() {
		try {
			this.$router.get('/users/:user_id', this._getProfile.bind(this));
			this.$router.patch('/users/:user_id', this._updateProfile.bind(this));
			this.$router.del('/users/:user_id', this._deleteProfile.bind(this));

			this.$router.post('/changePassword', this._changePassword.bind(this));

			await super._addRoutes();
			return null;
		}
		catch(err) {
			throw new TwyrComponentError(`${this.name}::_addRoutes error`, err);
		}
	}
	// #endregion

	// #region Route Handlers
	async _getProfile(ctxt) {
		try {
			const apiSrvc = this.$dependencies.ApiService;
			const userData = await apiSrvc.execute('Main::getProfile', ctxt);

			ctxt.status = 200;
			ctxt.body = userData.shift();

			return null;
		}
		catch(err) {
			throw new TwyrComponentError(`Error retrieving profile data`, err);
		}
	}

	async _updateProfile(ctxt) {
		try {
			const apiSrvc = this.$dependencies.ApiService;
			const userData = await apiSrvc.execute('Main::updateProfile', ctxt);

			ctxt.status = 200;
			ctxt.body = userData.shift();

			return null;
		}
		catch(err) {
			throw new TwyrComponentError(`Error retrieving profile data`, err);
		}
	}

	async _deleteProfile(ctxt) {
		try {
			const apiSrvc = this.$dependencies.ApiService;
			await apiSrvc.execute('Main::deleteProfile', ctxt);

			ctxt.status = 204;
			return null;
		}
		catch(err) {
			throw new TwyrComponentError(`Error deleting profile`, err);
		}
	}

	async _changePassword(ctxt) {
		try {
			const apiSrvc = this.$dependencies.ApiService;
			const status = await apiSrvc.execute('Main::changePassword', ctxt);

			ctxt.status = 200;
			ctxt.body = status.shift();

			return null;
		}
		catch(err) {
			throw new TwyrComponentError(`Error updating password`, err);
		}
	}
	// #endregion

	// #region Properties
	/**
	 * @override
	 */
	get dependencies() {
		return ['ApiService'].concat(super.dependencies);
	}

	/**
	 * @override
	 */
	get basePath() {
		return __dirname;
	}
	// #endregion
}

exports.component = Main;