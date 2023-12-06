import * as Path from './paths';

//-----------------------auth--------------------//
import SignIn from 'components/views/admin/auth/Login';
import SignUp from 'components/views/admin/auth/Register';

//------------Dashboard--------------------------//
import Dashboard from 'components/views/admin/dashboard/Dashboard';

//------------Profile--------------------------//
import Profile from 'components/views/admin/profile/Profile';
import User from 'components/views/admin/user/index';
import CreateUser from 'components/views/admin/user/create';

import NotFound from 'components/NotFound';

const routes = [  
	{
		path: Path.login,
		exact: true,
		auth: false,
		fallback: true,
		component: SignIn,
	},
	{
		path: Path.Signup,
		exact: true,
		auth: false,
		fallback: true,
		component: SignUp,
	},
	/* dashboard routes */
	{
		path: Path.Dashboard,
		exact: true,
		auth: true,
		component: Dashboard,
	},
	/* profile routes */
	{
		path: Path.Profile,
		exact: true,
		auth: true,
		component: Profile,
	},
	/* users related route */
	{
		path: Path.User,
		exact: true,
		auth: true,
		component: User,
	},
	{
		path: Path.UserAdd,
		exact: true,
		auth: true,
		component: CreateUser,
	},
	/* setting routes */
	{
		path: '/',
		exact: false,
		component: NotFound,
	},

];

export default routes;
